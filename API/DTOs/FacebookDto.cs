namespace API.DTOs
{
    public class FacebookDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public FacebookPicture Picture { get; set; }
    }

    public class FacebookPicture
    {
        public FacebookPictureData Data { get; set; }
    }

    public class FacebookPictureData
    {
        public string Url { get; set; }
    }
}
