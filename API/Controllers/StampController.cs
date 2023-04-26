using Application.Commands.Stamp.CheckStamp;
using Application.Commands.Stamp.CreateStamp;
using Application.Queries.Stamp.GetStampById;
using Application.Queries.Venue.GetAllVenues;
using Application.Queries.Venue.GetVenue;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/stamp")]
    public class StampController : BaseApiController
    {
        public StampController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetStampsById(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetStampById.Query { Id = id }));
        }

        [HttpPost("{id:guid}/{qrcode}")]
        public async Task<ActionResult> Stamp(Guid id, string qrcode)
        {
            var command = new CreateStamp.Command { Id = id, qrcode = qrcode };
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult> CheckStamp(Guid id)
        {
            var command = new CheckStamp.Command { Id = id };
            return HandleResult(await Mediator.Send(command));
        }
    }
}
