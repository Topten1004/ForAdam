using Domain;

namespace Application.Dtos
{
    public class Profile
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }

        public bool isVenueOwner { get; set; }
        public string Email { get; set; }
        public DateTime Created { get; set; }
        public string Image { get; set; }
        public bool Following { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
    }
}
