using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Commands.Venue.DeleteVenue
{
    public class DeleteVenue
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }

            public class Delete : IRequestHandler<Command, Result<Unit>>
            {
                private readonly DataContext _context;

                public Delete(DataContext context)
                {
                    _context = context;
                }
                public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
                {
                    var activity = await _context.Venues.FindAsync(request.Id);
                    if (activity is null) return null;
                    _context.Remove(activity);

                    var result = await _context.SaveChangesAsync(cancellationToken) > 0;
                    return result switch
                    {
                        false => Result<Unit>.Failure("Failed to delete the venue"),
                        _ => Result<Unit>.Success(Unit.Value)
                    };
                }
            }
        }
    }
}
