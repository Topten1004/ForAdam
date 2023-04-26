using API.Interfaces;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Queries.Profile.GetProfile
{
    public class GetProfile
    {
        public class Query : IRequest<Result<Dtos.Profile>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Dtos.Profile>>
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

            public async Task<Result<Dtos.Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .ProjectTo<Dtos.Profile>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUserName() })
                    .SingleOrDefaultAsync(u => u.Username == request.Username, cancellationToken: cancellationToken);
                return user is null ? null : Result<Dtos.Profile>.Success(user);
            }
        }
    }
}
