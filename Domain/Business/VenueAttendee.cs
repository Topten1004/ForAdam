using Domain.Customer;

namespace Domain.Business
{
    public class VenueAttendee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        public Guid VenueId { get; set; }
        public Venue Venue { get; set; }

        public bool isVenueOwner { get; set; }
    }
}
