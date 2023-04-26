using Domain.Business;
using Domain.Customer;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, DataContext context)
        {
            if (!userManager.Users.Any() && !context.Venues.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "The Bob",
                        UserName = "Bob",
                        Email = "bob@test.com",
                        isVenueOwner = true,
                    },
                    new AppUser
                    {
                        DisplayName = "The Jane Full Name",
                        UserName = "Jane",
                        Email = "jane@test.com",
                        isVenueOwner= true,
                    },
                    new AppUser
                    {
                        DisplayName = "The Tom",
                        UserName = "Tom",
                        Email = "tom@test.com",
                        isVenueOwner= true,
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                string newGuid = "00000000-0000-0000-0000-000000000000";
                Guid _newGuid = Guid.Parse(newGuid);

                var venues = new List<Venue>
                {
    
                new Venue
                    {
                        Name = "Digigene",
                        Address = "Ridge Court Street",
                        Created = DateTime.UtcNow,
                        City = "Bucharest",
                        Category = "drinks",
                        Country = "Romania",
                        Logo = "https://randomuser.me/api/portraits/men/46.jpg",
                        Phone = "07459654789",
                        Status = "Enabled",
                        QrCode = "Zdye16fo4i",
                        Offers = new List<Offer>
                        {
                            new Offer
                            {
                                Name = "Digigene-coffee-lovers",
                                Description = "BUY 9 GET YOUR 10TH COFFEE FREE",
                                Terms = "Buy a coffee for a stamp",
                                MaxNumberOfStamps = 9,
                                CreatedAt = DateTime.UtcNow,
                                ExpireDate = DateTime.UtcNow.AddYears(1),
                                Status = "Active",
                                StampsToGiveWhenJoin = 1,
                                OfferRewards = new List<OfferReward>
                                {
                                    new OfferReward
                                    {
                                        Reward = new Reward
                                        {
                                            Name = "Free Coffee from Digigene",
                                            IsRewarded = true,
                                            UserId = _newGuid
                                        },
                                        AttachToStampNumber = 9,
                                        DaysToExpire = 0
                                    }
                                }
                            }
                        },
                        VenueAttendees = new List<VenueAttendee>
                        {
                            new VenueAttendee
                            {
                                AppUser = users[0],
                                isVenueOwner = true,
                            },
                            new VenueAttendee
                            {
                                AppUser = users[1],
                                isVenueOwner = false,
                            }
                        },
                    },
                    new Venue
                    {
                        Name = "Dropshot",
                        Address = "Bd-ul Iuliu Maniu",
                        Created = DateTime.UtcNow,
                        Category = "coffee",
                        City = "Bucharest",
                        Country = "Romania",
                        Logo = "https://randomuser.me/api/portraits/men/46.jpg",
                        Phone = "07459654789",
                        Status = "Enabled",
                        QrCode = "3mEZgZETn1",
                        Offers = new List<Offer>
                        {
                            new Offer
                            {
                                Name = "pinguin-lovers",
                                Description = "BUY 2 GET YOUR 3TH COFFEE FREE",
                                Terms = "Buy a coffee for a stamp",
                                MaxNumberOfStamps = 2,
                                CreatedAt = DateTime.UtcNow,
                                ExpireDate = DateTime.UtcNow.AddYears(1),
                                Status = "Active",
                                StampsToGiveWhenJoin = 0,
                                OfferRewards = new List<OfferReward>
                                {
                                    new OfferReward
                                    {
                                        Reward = new Reward
                                        {
                                            Name = "Free Coffee From Penguin",
                                            IsRewarded = true,
                                            UserId = _newGuid
                                        },
                                        AttachToStampNumber = 2,
                                        DaysToExpire = 0
                                    }
                                }
                            }
                        },
                        VenueAttendees = new List<VenueAttendee>
                        {
                            new VenueAttendee
                            {
                                AppUser = users[1],
                                isVenueOwner = true,
                            },
                            new VenueAttendee
                            {
                                AppUser = users[2],
                                isVenueOwner = false,
                            }
                        },
                    },
                    new Venue
                    {
                        Name = "M60",
                        Address = "Ridge Court Street",
                        Created = DateTime.UtcNow,
                        City = "Alba-Iulia",
                        Category = "culture",
                        Country = "Romania",
                        Logo = "https://randomuser.me/api/portraits/men/46.jpg",
                        Phone = "07459654789",
                        Status = "Enabled",
                        QrCode = "9pc7HJ0Ayl",
                        Offers = new List<Offer>
                        {
                            new Offer
                            {
                                Name = "m60-coffee-lovers",
                                Description = "BUY 3 GET YOUR 4TH COFFEE FREE",
                                Terms = "Buy a coffee for a stamp",
                                MaxNumberOfStamps = 3,
                                CreatedAt = DateTime.UtcNow,
                                ExpireDate = DateTime.UtcNow.AddYears(1),
                                Status = "Active",
                                StampsToGiveWhenJoin = 1,
                                OfferRewards = new List<OfferReward>
                                {
                                    new OfferReward
                                    {
                                        Reward = new Reward
                                        {
                                            Name = "Free Coffee from M60",
                                            IsRewarded = true,
                                            UserId = _newGuid
                                        },
                                        AttachToStampNumber = 3,
                                        DaysToExpire = 0
                                    }
                                }
                            }
                        }
                    },
                    new Venue
                    {
                        Name = "Origo",
                        Address = "Ridge Court Street",
                        Created = DateTime.UtcNow,
                        Category = "music",
                        City = "Bucharest",
                        Country = "Romania",
                        Logo = "https://randomuser.me/api/portraits/men/46.jpg",
                        Phone = "07459654789",
                        Status = "Enabled",
                        QrCode = "ZgCx5q5QIv",
                        Offers = new List<Offer>
                        {
                            new Offer
                            {
                                Name = "origo-coffee-lovers",
                                Description = "BUY 9 GET YOUR 10TH COFFEE FREE",
                                Terms = "Buy a coffee for a stamp",
                                MaxNumberOfStamps = 9,
                                CreatedAt = DateTime.UtcNow,
                                ExpireDate = DateTime.UtcNow.AddYears(1),
                                Status = "Active",
                                StampsToGiveWhenJoin = 1,
                                OfferRewards = new List<OfferReward>
                                {
                                    new OfferReward
                                    {
                                        Reward = new Reward
                                        {
                                            Name = "Free Coffee from Origo",
                                            IsRewarded = true,
                                            UserId = _newGuid
                                        },
                                        AttachToStampNumber = 9,
                                        DaysToExpire = 0
                                    }
                                }
                            }
                        }
                    },
                    new Venue
                    {
                        Name = "5 ToGo",
                        Address = "Ridge Court Street",
                        Created = DateTime.UtcNow,
                        Category = "food",
                        City = "Bucharest",
                        Country = "Romania",
                        Logo = "https://randomuser.me/api/portraits/men/46.jpg",
                        Phone = "07459654789",
                        Status = "Enabled",
                        QrCode = "R1f5cX5qlC",
                        Offers = new List<Offer>
                        {
                            new Offer
                            {
                                Name = "5togo-coffee-lovers",
                                Description = "BUY 4 GET YOUR 5TH COFFEE FREE",
                                Terms = "Buy a coffee for a stamp",
                                MaxNumberOfStamps = 4,
                                CreatedAt = DateTime.UtcNow,
                                ExpireDate = DateTime.UtcNow.AddYears(1),
                                Status = "Active",
                                StampsToGiveWhenJoin = 1,
                                OfferRewards = new List<OfferReward>
                                {
                                    new OfferReward
                                    {
                                        Reward = new Reward
                                        {
                                            Name = "Free Coffee from 5 ToGo",
                                            IsRewarded = true,
                                            UserId = _newGuid
                                        },
                                        AttachToStampNumber = 4,
                                        DaysToExpire = 0
                                    }
                                }
                            }
                        }
                    },
                    new Venue
                    {
                        Name = "Saint Rostery",
                        Address = "Bd-ul Iuliu Maniu",
                        Created = DateTime.UtcNow,
                        Category = "coffee",
                        City = "Bucharest",
                        Country = "Romania",
                        Logo = "https://randomuser.me/api/portraits/men/46.jpg",
                        Phone = "07459654789",
                        Status = "Enabled",
                        QrCode = "eYqbnKcBva",
                        Offers = new List<Offer>
                        {
                            new Offer
                            {
                                Name = "saint-roastery-lovers",
                                Description = "BUY 6 GET YOUR 7TH COFFEE FREE",
                                Terms = "Buy a coffee for a stamp",
                                MaxNumberOfStamps = 6,
                                CreatedAt = DateTime.UtcNow,
                                ExpireDate = DateTime.UtcNow.AddYears(1),
                                Status = "Active",
                                StampsToGiveWhenJoin = 0,
                                OfferRewards = new List<OfferReward>
                                {
                                    new OfferReward
                                    {
                                        Reward = new Reward
                                        {
                                            Name = "Free Coffee From Saint",
                                            IsRewarded = true,
                                            UserId = _newGuid
                                        },
                                        AttachToStampNumber = 6,
                                        DaysToExpire = 0
                                    }
                                }
                            }
                        }
                    },
                };

                await context.Venues.AddRangeAsync(venues);
                await context.SaveChangesAsync();
            }
        }
    }
}