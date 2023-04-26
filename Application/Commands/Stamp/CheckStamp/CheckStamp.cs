using API.Interfaces;
using Application.Core;
using Domain.Business;
using Domain.Customer;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands.Stamp.CheckStamp
{
    public class CheckStamp
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    var venue = await _context.Venues
                        .Include(a => a.Offers)
                        .ThenInclude(u => u.OfferRewards)
                        .ThenInclude(r => r.Reward)
                        .FirstOrDefaultAsync(v => v.Id == request.Id, cancellationToken);

                    if (venue == null)
                        return Result<Unit>.Failure($"Venue with ID {request.Id} not found");

                    var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName(), cancellationToken);
                    if (user == null)
                        return Result<Unit>.Failure($"User not found");

                    var member = await _context.Members
                        .Include(m => m.MemberOffers)
                        .FirstOrDefaultAsync(x => x.Email == user.Email);
                    if (member == null)
                        return Result<Unit>.Failure($"Member not found");

                    var memberOffer = member.MemberOffers.FirstOrDefault(mo => mo.OfferId == venue?.Offers?.FirstOrDefault()?.Id);

                    if (memberOffer == null)
                    {
                        memberOffer = new MemberOffer
                        {
                            OfferId = venue.Offers.FirstOrDefault().Id
                        };
                        member.MemberOffers.Add(memberOffer);
                    }

                    memberOffer.ActiveStamps = 0;
                    memberOffer.CompletedStamps = false;
                    memberOffer.NumberOfStamps = 0;

                    var rewardId = venue?.Offers?.Where(x => x.Id == memberOffer.OfferId)?.LastOrDefault()?.OfferRewards?.LastOrDefault()?.Reward?.Id;

                    string newGuid = "00000000-0000-0000-0000-000000000000";
                    Guid _newGuid = Guid.Parse(newGuid);

                    if (rewardId != _newGuid)
                    {
                        var stamps = _context.Stamps.Where(x => x.VendorId == venue.Id && x.OfferId == memberOffer.OfferId);

                        foreach (var item in stamps)
                        {
                            item.OfferRewardId = (Guid)rewardId;
                        }
                    }

                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                    return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to post stamp");
                }
                catch (Exception ex)
                {
                    return Result<Unit>.Failure($"Error checking stamp: {ex.Message}");
                }
            }
        }

    }

}
