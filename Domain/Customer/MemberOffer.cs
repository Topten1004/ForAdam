
namespace Domain.Customer
{
    public class MemberOffer
    {
        public Guid Id { get; set; }

        public Guid OfferId { get; set; }

        public Guid MemberId { get; set; }

        public int NumberOfStamps { get; set; } = 0;

        public DateTime? LastStamp { get; set; }

        public int ActiveStamps { get; set; } = 0;

        public bool CompletedStamps { get; set; }

        public int NumberOfRewards { get; set; } = 0;
    }
}
