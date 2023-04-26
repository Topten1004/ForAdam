using Domain.Business;
using Microsoft.AspNetCore.Identity;

namespace Domain.Customer
{
    public class AppUser : IdentityUser
    {
        public DateTime Created { get; set; } = DateTime.UtcNow;

        public string DisplayName { get; set; }

        public bool isVenueOwner { get; set; }

        public ICollection<VenueAttendee> VenueAttendees { get; set; } = new List<VenueAttendee>();

        public ICollection<Photo> Photos { get; set; }
    }
}