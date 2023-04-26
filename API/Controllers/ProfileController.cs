using Application.Queries.Profile.GetProfile;
using Application.Queries.Venue.GetAllVenues;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfileController : BaseApiController
    {
        public ProfileController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string userName)
        {
            return HandleResult(await Mediator.Send(new GetProfile.Query {Username = userName}));
        }


        [HttpGet("{username}/venues")]
        public async Task<IActionResult> GetUserVenues(string userName, string predicate)
        {
            return HandleResult(await Mediator.Send(new GetUserVenues.Query{Username = userName, Predicate = predicate}));
        }
    }
}
