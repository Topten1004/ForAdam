using API.Interfaces;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Queries.Member.GetMember
{
    public class GetMember
    {
        public class Query : IRequest<Result<Domain.Customer.Member>> { }

        public class Handler : IRequestHandler<Query, Result<Domain.Customer.Member>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Domain.Customer.Member>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUserName(), cancellationToken);
                if (user == null)
                    return Result<Domain.Customer.Member>.Failure($"User not found");

                var member = await _context.Members.Include(m => m.MemberOffers).FirstOrDefaultAsync(x => x.Email == user.Email, cancellationToken);
                if (member == null)
                {
                    return Result<Domain.Customer.Member>.Failure($"Member not found");
                }
                return Result<Domain.Customer.Member>.Success(member);
            }
        }
    }
}
