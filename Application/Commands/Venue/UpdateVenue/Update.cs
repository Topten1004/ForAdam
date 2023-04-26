using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Commands.Venue.UpdateVenue
{
    public class UpdateVenue
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Domain.Business.Venue Venue { get; set; }
        }

        //public class CommandValidator : AbstractValidator<Command>
        //{
        //    public CommandValidator()
        //    {
        //        RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
        //    }
        //}

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Venues.FindAsync(request.Venue.Id);
                if (activity is null) return null;
                _mapper.Map(request.Venue, activity);

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                return result switch
                {
                    false => Result<Unit>.Failure("Failed to update the venue"),
                    _ => Result<Unit>.Success(Unit.Value)
                };
            }
        }
    }
}
