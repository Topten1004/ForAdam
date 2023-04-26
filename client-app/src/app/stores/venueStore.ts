import { MemberData } from "./../models/user";
import { Venue, Stamp, VenueFormValues } from "./../models/venue";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { Profile } from "../models/Profile";
import { format } from "date-fns";
import agent from "../api/agent";

export default class VenueStore {
  venues: Venue[] = [];
  venueRegistry = new Map<string, Venue>();
  selectedVenue: Venue | undefined = undefined;
  loadingInitial: boolean = false;
  loading: boolean = false;
  member: MemberData | null = null;
  stampInfo: Stamp[] = [];
  checkFlag: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get venuesByDate() {
    return Array.from(this.venueRegistry.values()).sort(
      (a, b) => a.created!.getTime() - b.created!.getTime()
    );
  }

  checkStamps = async (venueId : string | undefined) => {
    try {
      await agent.Stamps.checkStamps(venueId);
    } catch (err) {
      console.log(err);
    }
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
      await agent.Member.updateMember();
      await agent.Venues.attend(this.selectedVenue!.id);
      runInAction(() => {
        if (this.selectedVenue?.isGoing) {
          this.selectedVenue.attendees = this.selectedVenue.attendees?.filter(
            (a) => a.username !== user?.userName
          );
          this.selectedVenue.isGoing = false;
        } else {
          const attendee = new Profile(user!);

          this.selectedVenue?.attendees?.push(attendee);
          this.selectedVenue!.isGoing = true;
        }
        this.venueRegistry.set(this.selectedVenue!.id, this.selectedVenue!);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  cancelActivityToggle = async () => {
    this.loading = true;
    try {
      await agent.Venues.attend(this.selectedVenue!.id);
      runInAction(() => {
        this.selectedVenue!.isCancelled = !this.selectedVenue?.isCancelled;
        this.venueRegistry.set(this.selectedVenue!.id, this.selectedVenue!);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  loadVenues = async () => {
    try {
      this.setLoadingInitial(true);
      const venues = await agent.Venues.list();
      venues.forEach((venue: Venue) => {
        this.SetVenue(venue);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  loadVenue = async (id: string) => {
    let venue = this.getVenue(id);
    let sta = await agent.Stamps.lists(id);
    this.stampInfo = sta;

    if (venue) this.selectedVenue = venue;
    else {
      this.setLoadingInitial(true);
      try {
        venue = await agent.Venues.details(id);
        this.SetVenue(venue);
        this.selectedVenue = venue;
        this.setLoadingInitial(false);
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  loadMember = async () => {
    try {
      let member = await agent.Member.current();
      if (member) this.member = member;
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  private getVenue = (id: string) => {
    return this.venueRegistry.get(id);
  };

  get groupedActivities() {
    return Object.entries(
      this.venuesByDate.reduce((venues, venue) => {
        const date = format(venue.created!, "dd MMM yyyy");
        venues[date] = venues[date] ? [...venues[date], venue] : [venue];
        return venues;
      }, {} as { [key: string]: Venue[] })
    );
  }

  private SetVenue = (venue: Venue) => {
    const user = store.userStore.user;
    if (user) {
      venue.isGoing = venue.attendees!.some(
        (a) => a.username === user.userName
      );
      venue.isVenueOwner = venue.hostUsername === user.userName;
      venue.host = venue.attendees?.find(
        (x) => x.username === venue.hostUsername
      );
    }
    venue.created = new Date(venue.created!);
    this.venueRegistry.set(venue.id, venue);
  };

  createVenue = async (venue: VenueFormValues) => {
    const user = store.userStore.user;
    const attendee = new Profile(user!);
    try {
      await agent.Venues.create(venue);
      const newVenue = new Venue(venue);
      newVenue.hostUsername = user!.userName;
      newVenue.attendees = [attendee];
      this.SetVenue(newVenue);
      runInAction(() => {
        this.selectedVenue = newVenue;
      });
    } catch (error) {
      console.log(error);
    }
  };

  stamp = async (venueId: string, code: string) => {
    try {
      const stampDate = new Date(); // get the current date/time

      // send the stamp data to the server to be saved to the database
      const res = await agent.Stamps.stamp(venueId, code);

      let member = await agent.Member.current();

      // update the UI by finding the first unstamped circle and setting it to red
      runInAction(() => {
        const venue = this.venues.find((v) => v.id === venueId);
        if (venue) {
          const offer = venue.offers[0]; // assuming only one offer per venue

          const memberOffer = member.memberOffers.find(
            (mo: { offerId: string }) => mo.offerId === offer.id
          );
          if (memberOffer) {
            const lastStamp = memberOffer.lastStamp;
            if (!lastStamp || lastStamp) {
              for (let i = 0; i < offer.maxNumberOfStamps; i++) {
                const stamp = offer.stamps[i];
                if (!stamp.stampDate) {
                  memberOffer.lastStamp = stampDate.toISOString();
                  memberOffer.numberOfStamps++;
                  memberOffer.activeStamps++;
                  break;
                }
              }
            }
          }
        }
        this.member = member;
      });

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  updateVenue = async (venue: VenueFormValues) => {
    try {
      await agent.Venues.update(venue);
      runInAction(() => {
        if (venue.id) {
          let updatedVenue = {
            ...this.getVenue(venue.id),
            ...venue,
          };
          this.venueRegistry.set(venue.id, updatedVenue as Venue);
          this.selectedVenue = updatedVenue as Venue;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}
