namespace API.DTOs
{
    public class UserDto
    {
        public string Token { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Image { get; set; }
        public bool IsVenueOwner { get; set; }
    }
}
