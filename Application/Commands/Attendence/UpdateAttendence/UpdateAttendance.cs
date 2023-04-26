using API.Interfaces;
using Application.Core;
using Domain.Business;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Diagnostics;

namespace Application.Commands.Attendence.UpdateAttendence
{
    public class UpdateAttendance
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
                        .Include(a => a.VenueAttendees)
                        .ThenInclude(u => u.AppUser)
                        .SingleOrDefaultAsync(v => v.Id == request.Id, cancellationToken);

                    if (venue == null)
                        return Result<Unit>.Failure($"Venue with ID {request.Id} not found");

                    var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName(), cancellationToken);
                    if (user == null)
                        return Result<Unit>.Failure($"User not found");

                    var hostUsername = venue.VenueAttendees.FirstOrDefault(x => x.isVenueOwner)?.AppUser.UserName;
                    var attendance = venue.VenueAttendees.FirstOrDefault(a => a.AppUser.UserName == user.UserName);

                    if (attendance != null && hostUsername == user.UserName)
                    {
                        venue.IsCancelled = !venue.IsCancelled;
                    }

                    if (attendance != null && hostUsername != user.UserName)
                    {
                        venue.VenueAttendees.Remove(attendance);
                    }

                    if (attendance == null)
                    {
                        attendance = new VenueAttendee
                        {
                            AppUser = user,
                            Venue = venue,
                            isVenueOwner = false
                        };
                        venue.VenueAttendees.Add(attendance);
                    }

                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;
                    return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to update attendance");
                }
                catch (Exception ex)
                {
                    return Result<Unit>.Failure($"Error updating attendance: {ex.Message}");
                }
            }
        }
    }
}
