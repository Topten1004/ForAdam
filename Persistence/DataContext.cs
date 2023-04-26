using Domain.Business;
using Domain.Customer;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {

        public DataContext(DbContextOptions options) : base(options)
        {
           
        }
        public DbSet<Venue> Venues { get; set; }

        public DbSet<Stamp> Stamps { get; set; }

        public DbSet<Member> Members { get; set; }

        public DbSet<VenueAttendee> VenueAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<VenueAttendee>(x => x.HasKey(va => new { va.AppUserId, va.VenueId }));

            builder.Entity<VenueAttendee>()
                .HasOne(va => va.AppUser)
                .WithMany(au => au.VenueAttendees)
                .HasForeignKey(va => va.AppUserId);

            builder.Entity<VenueAttendee>()
                .HasOne(va => va.Venue)
                .WithMany(v => v.VenueAttendees)
                .HasForeignKey(va => va.VenueId);

            builder.Entity<VenueAttendee>()
                .Property(va => va.isVenueOwner)
                .IsRequired();
        }
    }
}
