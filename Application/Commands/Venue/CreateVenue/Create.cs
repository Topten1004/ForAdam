using API.Interfaces;
using Application.Core;
using Domain.Business;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Commands.Venue.CreateVenue
{
    public class CreateVenue
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Domain.Business.Venue Venue { get; set; }
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
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                var attendee = new VenueAttendee
                {
                    AppUser = user,
                    Venue = request.Venue,
                    isVenueOwner = true
                };
                request.Venue.VenueAttendees.Add(attendee);
                _context.Venues.Add(request.Venue);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create venue");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
