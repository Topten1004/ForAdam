using API.Interfaces;
using Application.Core;
using Application.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Queries.Rewards.GetRewards
{
    public class GetRewardsList
    {
        public class Query : IRequest<Result<List<RewardDTO>>> { }

        public class Handler : IRequestHandler<Query, Result<List<RewardDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }
            public async Task<Result<List<RewardDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    var result = new List<RewardDTO>();

                    var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName(), cancellationToken);
                    if (user == null)
                        return Result<List<RewardDTO>>.Failure($"User not found");

                    var member = await _context.Members.Include(m => m.MemberOffers).FirstOrDefaultAsync(x => x.Email == user.Email, cancellationToken);
                    if (member == null)
                    {
                        return Result<List<RewardDTO>>.Success(result);
                    }

                    var venues = await _context.Venues
                        .Include(d => d.VenueAttendees)
                        .ThenInclude(b => b.AppUser)
                        .Include(a => a.Offers)
                        .ThenInclude(u => u.OfferRewards)
                        .ThenInclude(r => r.Reward).ToListAsync();

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
                                        if (offerReward.Reward.IsRewarded == false && offerReward.Reward.UserId == member.Id)
                                        {
                                            var tempData = new RewardDTO
                                            {
                                                Id = offerReward.Reward.Id,
                                                Name = offerReward.Reward.Name,
                                                VenueName = item.Name
                                            };

                                            result.Add(tempData);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    return Result<List<RewardDTO>>.Success(result);
                }
                catch (Exception ex)
                {
                    return Result<List<RewardDTO>>.Failure($"Error getting rewards: {ex.Message}");
                }
            }
        }
    }

}
