using Application.Core;
using Application.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Queries.Venue.GetVenue
{
    public class GetVenueById
    {
        public class Query : IRequest<Result<VenueDto>>
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<VenueDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<VenueDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var venue = await _context.Venues
                    .ProjectTo<VenueDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken: cancellationToken);

                return Result<VenueDto>.Success(venue);
            }
        }
    }
}