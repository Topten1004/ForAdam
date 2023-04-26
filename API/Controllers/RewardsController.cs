using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Application.Commands.Rewards.CreateReward;
using Application.Queries.Rewards.GetRewards;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/reward")]
    public class RewardsController : BaseApiController
    {
        public RewardsController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet()]
        public async Task<ActionResult> GetRewards()
        {
            var command = new GetRewardsList.Query {};
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPost("{id:guid}")]
        public async Task<ActionResult> CheckReward(Guid id)
        {
            var command = new CheckReward.Command {id = id};
            return HandleResult(await Mediator.Send(command));
        }
    }
}
