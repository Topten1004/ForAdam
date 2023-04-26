namespace Domain.Business
{
    // business/12345/offers
    public class Offer
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime ExpireDate { get; set; }
        public int MaxNumberOfStamps { get; set; }
        public int? StampsToGiveWhenJoin { get; set; } = 0;
        public DateTime CreatedAt { get; set; }
        public string Terms { get; set; }
        public string Status { get; set; }

        public ICollection<OfferReward> OfferRewards { get; set; } = new List<OfferReward>();

    }
}
