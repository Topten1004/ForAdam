using Application.Dtos;
using Domain.Business;
using Domain.Customer;
using Profile = AutoMapper.Profile;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Venue, Venue>();
            CreateMap<Venue, VenueDto>()
                .ForMember(dest => dest.HostUsername, opt => opt.MapFrom(src =>
                    src.VenueAttendees.FirstOrDefault(va => va.isVenueOwner).AppUser.UserName))
                .ForMember(dest => dest.Attendees, opt => opt.MapFrom(src =>
                    src.VenueAttendees.Select(va => new Dtos.Profile
                    {
                        Username = va.AppUser.UserName,
                        DisplayName = va.AppUser.DisplayName,
                        Email = va.AppUser.Email,
                        Created = va.AppUser.Created,
                    })))
                .ForMember(dest => dest.Offers, opt => opt.MapFrom(src =>
                    src.Offers.Select(o => new Offer
                    {
                        Id = o.Id,
                        Name = o.Name,
                        Description = o.Description,
                        ExpireDate = o.ExpireDate,
                        MaxNumberOfStamps = o.MaxNumberOfStamps,
                        StampsToGiveWhenJoin = o.StampsToGiveWhenJoin,
                        CreatedAt = o.CreatedAt,
                        Terms = o.Terms,
                        Status = o.Status,
                        OfferRewards = o.OfferRewards.Select(or => new OfferReward
                        {
                            Id = or.Id,
                            AttachToStampNumber = or.AttachToStampNumber,
                            DaysToExpire = or.DaysToExpire,
                            RewardImage = or.RewardImage,
                            Reward = or.Reward
                        }).ToList()
                    })));

            CreateMap<VenueAttendee, Dtos.Profile>()
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.AppUser.UserName))
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.AppUser.DisplayName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.AppUser.Email))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.AppUser.Created));

            CreateMap<OfferReward, OfferReward>();
            CreateMap<Stamp, StampDto>();
            CreateMap<AppUser, Dtos.Profile>()
                 .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<VenueAttendee, UserVenueDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Venue.Id))
                .ForMember(d => d.Date, o => o.MapFrom(s => s.Venue.Created))
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Venue.Category))
                .ForMember(d => d.Title, o => o.MapFrom(s => s.Venue.Name))
                .ForMember(d => d.HostUsername,
                    o => o.MapFrom(s => s.Venue.VenueAttendees.FirstOrDefault(x => x.isVenueOwner).AppUser.UserName));

        }
    }
}
