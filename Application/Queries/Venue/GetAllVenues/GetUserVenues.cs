using Application.Core;
using Application.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Queries.Venue.GetAllVenues
{
    public class GetUserVenues
    {
        public class Query : IRequest<Result<List<UserVenueDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserVenueDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<UserVenueDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    var query = _context.VenueAttendees
                        .Where(u => u.AppUser.UserName == request.Username)
                        .OrderBy(a => a.Venue.Created)
                        .ProjectTo<UserVenueDto>(_mapper.ConfigurationProvider)
                        .AsQueryable();

                    query = request.Predicate switch
                    {
                        "past" => query.Where(a => a.Date <= DateTime.UtcNow),
                        "active" => query.Where(a => a.Date <= DateTime.UtcNow),
                        _ => query.Where(a => a.Date >= DateTime.UtcNow)
                    };

                    var venues = await query.ToListAsync(cancellationToken: cancellationToken);
                    return Result<List<UserVenueDto>>.Success(venues);
                } catch(Exception ex)
                {
                    return Result<List<UserVenueDto>>.Failure($"Error get user venues stamp: {ex.Message}");
                }
            }
        }
    }
}
