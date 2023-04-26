namespace Domain.Business
{
    public class Reward
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public Guid UserId { get; set; }
        public bool IsRewarded { get; set; }
    }
}
