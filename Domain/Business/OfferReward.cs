namespace Domain.Business
{
    public class OfferReward
    {
        public Guid Id { get; set; }
        public Reward Reward { get; set; }
        public int AttachToStampNumber { get; set; }
        public string? RewardImage { get; set; }
        public int? DaysToExpire { get; set; } = 0;
    }
}
