using API.Interfaces;
using Application.Core;
using Application.Dtos;
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

namespace Application.Commands.Rewards.CreateReward
{
    public class CheckReward
    {
        public class Command : IRequest<Result<List<RewardDTO>>>
        {
            public Guid id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<List<RewardDTO>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<List<RewardDTO>>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName(), cancellationToken);
                    if (user == null)
                        return Result<List<RewardDTO>>.Failure($"User not found");

                    var member = await _context.Members.Include(m => m.MemberOffers).FirstOrDefaultAsync(x => x.Email == user.Email, cancellationToken);
                    if (member == null)
                    {
                        return Result<List<RewardDTO>>.Failure($"Member not found");
                    }

                    var venues = await _context.Venues
                        .Include(d => d.VenueAttendees)
                        .ThenInclude(b => b.AppUser)
                        .Include(a => a.Offers)
                        .ThenInclude(u => u.OfferRewards)
                        .ThenInclude(r => r.Reward).ToListAsync();

                    var result = new List<RewardDTO>();

                    foreach (var item in venues)
                    {
                        foreach (var attend in item.VenueAttendees)
                        {
                            if (attend.AppUserId == user.Id)
                            {
                                foreach (var offer in item.Offers)
                                {
                                    foreach (var offerReward in offer.OfferRewards)
                                    {
                                        if (offerReward.Reward.IsRewarded == false)
                                        {
                                            if (offerReward.Reward.Id != request.id)
                                            {
                                                var tempData = new RewardDTO
                                                {
                                                    Id = offerReward.Reward.Id,
                                                    Name = offerReward.Reward.Name,
                                                    VenueName = item.Name
                                                };
                                                
                                                result.Add( tempData );
                                            }
                                            else
                                                offerReward.Reward.IsRewarded = true;
                                        }
                                        
                                    }
                                }
                            }
                        }
                    }

                    await _context.SaveChangesAsync();
                    return Result<List<RewardDTO>>.Success(result);
                }
                catch (Exception ex)
                {
                    return Result<List<RewardDTO>>.Failure($"Checking rewards: {ex.Message}");
                }

            }
        }

    }

}
