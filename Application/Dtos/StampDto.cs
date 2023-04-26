using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos
{
    public class StampDto
    {
        public Guid VendorId { get; set; }
        public Guid OfferId { get; set; }
        public Guid OfferRewardId { get; set; }
        public DateTime StampDate { get; set; }
        public Guid MemberId { get; set; }
    }
}
