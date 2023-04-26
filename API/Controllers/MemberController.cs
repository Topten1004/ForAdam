using Application.Commands.Profile.UpdateProfile;
using Application.Queries.Member.GetMember;
using Domain.Customer;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/member")]
    public class MemberController : BaseApiController
    {
        public MemberController(IMediator mediator) : base(mediator) {}

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<Member>> GetCurrentMember()
        {
            return HandleResult(await Mediator.Send(new GetMember.Query()));
        }

        [HttpPost("update")]
        public async Task<ActionResult<Unit>> UpdateMember()
        {
            return HandleResult(await Mediator.Send(new Update.Command()));
        }
    }
}
