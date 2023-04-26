
namespace Domain.Business
{
    public class Stamp
    {
        public Guid Id { get; set; }
        public Guid VendorId { get; set; }
        public Guid OfferId { get; set; }
        public Guid OfferRewardId { get; set; }
        public DateTime StampDate { get; set; }
        public Guid MemberId { get; set; }
    }
}
