
namespace Domain.Customer
{
    public class Member
    {
        public Guid Id { get; set; }

        public string Email { get; set; }

        public string Username { get; set; }

        public string? PhoneNumber { get; set; }

        public ICollection<MemberOffer> MemberOffers { get; set; } = new List<MemberOffer>();
    }
}
