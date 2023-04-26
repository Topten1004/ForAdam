using Domain.Business;

namespace Application.Dtos
{
    public class VenueDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime Created { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string? Logo { get; set; }
        public string? Phone { get; set; }
        public string Status { get; set; }
        public string QrCode { get; set; }
        public bool IsCancelled { get; set; }
        public string HostUsername { get; set; }
        public ICollection<Offer> Offers { get; set; } = new List<Offer>();
        public ICollection<Profile> Attendees { get; set; } = new List<Profile>();
    }
}
