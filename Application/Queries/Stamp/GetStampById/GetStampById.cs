using API.Interfaces;
using Application.Core;
using Application.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Business;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Queries.Stamp.GetStampById
{
    public class GetStampById
    {
        public class Query : IRequest<Result<List<StampDto>>>
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<List<StampDto>>>
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

            public async Task<Result<List<StampDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    var venue = await _context.Venues
                        .Include(a => a.Offers)
                        .ThenInclude(u => u.OfferRewards)
                        .ThenInclude(r => r.Reward)
                        .FirstOrDefaultAsync(v => v.Id == request.Id, cancellationToken);

                    var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName(), cancellationToken);

                    if (user == null)
                        return Result<List<StampDto>>.Failure($"User not found");

                    var member = await _context.Members.Include(m => m.MemberOffers).FirstOrDefaultAsync(x => x.Email == user.Email, cancellationToken);

                    var maxStamp = venue.Offers.FirstOrDefault().MaxNumberOfStamps;

                    if (member == null)
                    {
                        var listStamp = new List<StampDto>();
                        var list = new StampDto[maxStamp];
                        listStamp.AddRange(list);
                        return Result<List<StampDto>>.Success(listStamp);
                    }

                    string newGuid = "00000000-0000-0000-0000-000000000000";
                    Guid _newGuid = Guid.Parse(newGuid);

                    var query = _context.Stamps
                        .Where(u => u.VendorId == request.Id && u.MemberId == member.Id && u.OfferRewardId == _newGuid)
                        .OrderBy(a => a.StampDate)
                        .ProjectTo<StampDto>(_mapper.ConfigurationProvider)
                        .AsQueryable();

                    var stamps = await query.ToListAsync(cancellationToken: cancellationToken);

                    var newList = new StampDto[maxStamp - stamps.Count];

                    stamps.AddRange(newList);

                    return Result<List<StampDto>>.Success(stamps);
                }
                catch (Exception ex)
                {
                    return Result<List<StampDto>>.Failure($"Error get stamp by id: {ex.Message}");
                }
            }
        }
    }

}
