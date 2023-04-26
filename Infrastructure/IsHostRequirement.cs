using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class isVenueOwnerRequirement : IAuthorizationRequirement
    {
    }

    public class IHostRequirementHandler : AuthorizationHandler<isVenueOwnerRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, isVenueOwnerRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null) return Task.CompletedTask;

            var venueId = Guid.Parse(_httpContextAccessor.HttpContext?.Request?.RouteValues?
                .SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var attendee = _dbContext.VenueAttendees.AsNoTracking().SingleOrDefaultAsync(
                x =>x.AppUserId == userId && x.VenueId == venueId).Result;

            if (attendee is null) return Task.CompletedTask;

            if (attendee.isVenueOwner)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
