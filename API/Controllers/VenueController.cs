using Application.Commands.Attendence.UpdateAttendence;
using Application.Commands.Venue.CreateVenue;
using Application.Commands.Venue.DeleteVenue;
using Application.Commands.Venue.UpdateVenue;
using Application.Queries.Venue.GetAllVenues;
using Application.Queries.Venue.GetVenue;
using Domain.Business;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/venues")]
    public class VenueController : BaseApiController
    {
        public VenueController(IMediator mediator) : base(mediator)
        {
            
        }

        [HttpGet]
        public async Task<IActionResult> GetVenues()
        {
            return HandleResult(await Mediator.Send(new GetAllVenues.Query()));
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetVenue(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetVenueById.Query { Id = id }));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpPost]
        public async Task<IActionResult> CreateVenue(Venue venue)
        {
            return Ok(await Mediator.Send(new CreateVenue.Command { Venue = venue}));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Venue venue)
        {
            venue.Id = id;
            return HandleResult(await Mediator.Send(new UpdateVenue.Command { Venue = venue }));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteVenue.Command { Id = id }));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            var command = new UpdateAttendance.Command { Id = id };
            return HandleResult(await Mediator.Send(command));
        }
    }
}
