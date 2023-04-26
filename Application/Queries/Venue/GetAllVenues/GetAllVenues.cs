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

namespace Application.Queries.Venue.GetAllVenues
{
    public class GetAllVenues
    {
        public class Query : IRequest<Result<List<VenueDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<VenueDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<VenueDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    var venues = await _context.Venues
                       .ProjectTo<VenueDto>(_mapper.ConfigurationProvider)
                       .ToListAsync(cancellationToken: cancellationToken);

                    return Result<List<VenueDto>>.Success(venues);
                } catch(Exception ex)
                {
                    return Result<List<VenueDto>>.Failure($"Error get all venues: {ex.Message}");
                }
            }
        }
    }

}
