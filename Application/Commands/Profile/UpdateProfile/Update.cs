using API.Interfaces;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Commands.Profile.UpdateProfile
{
    public class Update
    {
        public class Command : IRequest<Result<Unit>> { }

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
                if (user == null)
                    return Result<Unit>.Failure($"User not found");

                var member = new Domain.Customer.Member
                {
                    Username = _userAccessor.GetUserName(),
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    //ActiveStamps = 0,
                    //CompletedStamps = 0,
                    //NumberOfRedeems = 0,
                    //NumberOfRewards = 0,
                    //NumberOfStamps = 0,
                    //LastStamp = null
                };
                _context.Members.Add(member);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create member");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
