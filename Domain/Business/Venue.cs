using Domain.Customer;

namespace Domain.Business
{
    //business/venues
    public class Venue
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime Created { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string? Logo { get; set; }
        public string Category { get; set; }
        public string? Phone { get; set; }
        public string Status { get; set; }
        public string QrCode { get; set; }
        public bool IsCancelled { get; set; }
        public ICollection<Offer> Offers { get; set; } = new List<Offer>();
        public ICollection<VenueAttendee> VenueAttendees { get; set; } = new List<VenueAttendee>();
    }
}
