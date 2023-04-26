using API.Interfaces;
using Application.Core;
using Domain.Business;
using Domain.Customer;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Commands.Stamp.CreateStamp
{
    public class CreateStamp
    {
        public class Command : IRequest<Result<string>>
        {
            public Guid Id { get; set; }

            public string qrcode { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<string>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    var venue = await _context.Venues
                        .Include(a => a.Offers)
                        .ThenInclude(u => u.OfferRewards)
                        .ThenInclude(r => r.Reward)
                        .FirstOrDefaultAsync(v => v.Id == request.Id, cancellationToken);

                    if (venue == null)
                        return Result<string>.Failure($"Venue with ID {request.Id} not found");

                    var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName(), cancellationToken);
                    if (user == null)
                        return Result<string>.Failure($"User not found");

                    var member = await _context.Members
                        .Include(m => m.MemberOffers)
                        .FirstOrDefaultAsync(x => x.Email == user.Email);

                    if (member == null)
                        return Result<string>.Failure($"Member not found");

                    if (request.qrcode != venue.QrCode)
                        return Result<string>.Success($"Please enter a valid code.");

                    Guid userId = member.Id;

                    var memberOffer = member.MemberOffers.FirstOrDefault(mo => mo.OfferId == venue?.Offers?.FirstOrDefault()?.Id);

                    if (memberOffer == null)
                    {
                        memberOffer = new MemberOffer
                        {
                            OfferId = venue.Offers.FirstOrDefault().Id
                        };
                        member.MemberOffers.Add(memberOffer);
                    }

                    memberOffer.NumberOfStamps++;

                    if (memberOffer.ActiveStamps < venue?.Offers?.FirstOrDefault()?.MaxNumberOfStamps)
                    {
                        memberOffer.ActiveStamps++;
                        memberOffer.LastStamp = DateTime.UtcNow;
                        memberOffer.CompletedStamps = memberOffer.ActiveStamps == venue?.Offers?.FirstOrDefault()?.MaxNumberOfStamps;

                        if (memberOffer.ActiveStamps <= venue?.Offers?.FirstOrDefault()?.MaxNumberOfStamps)
                        {
                            var stamp = new Domain.Business.Stamp
                            {
                                MemberId = member.Id,
                                VendorId = venue.Id,
                                OfferId = venue.Offers.FirstOrDefault().Id,
                                StampDate = (DateTime)memberOffer.LastStamp
                            };

                            _context.Stamps.Add(stamp);
                        }
                    }

                    if (memberOffer?.NumberOfStamps == venue?.Offers?.FirstOrDefault()?.MaxNumberOfStamps)
                    {
                        var reward = new Reward
                        {
                            Name = venue.Offers.FirstOrDefault().OfferRewards.FirstOrDefault().Reward.Name,
                            IsRewarded = false,
                            UserId = userId,
                        };
                        var offerReward = new OfferReward
                        {
                            Reward = reward,
                            AttachToStampNumber = memberOffer.ActiveStamps,
                            RewardImage = "reward-image.png",
                            DaysToExpire = 30 // Add any expiration days here
                        };
                        venue?.Offers?.FirstOrDefault()?.OfferRewards.Add(offerReward);
                    }

                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;
                    return result ? Result<string>.Success("Success") : Result<string>.Failure("Failed to post stamp");
                }
                catch (Exception ex)
                {
                    return Result<string>.Failure($"Error posting stamp: {ex.Message}");
                }
            }
        }

    }
}
