import { Profile } from "./Profile";

export interface Reward {
  id: string;
  name: string;
  venueName : string;
}

export interface OfferReward {
  id: string;
  reward: Reward;
  attachToStampNumber: number;
  rewardImage?: any;
  daysToExpire: number;
}

export interface Offer {
  id: string;
  name: string;
  description: string;
  expireDate: string;
  maxNumberOfStamps: number;
  stampsToGiveWhenJoin: number;
  createdAt: Date | null;
  terms: string;
  status: string;
  offerRewards: OfferReward[];
  stamps: Stamp[];
}

export interface Stamp {
  id: string;
  memberId: string;
  vendorId: string;
  offerId: string;
  stampDate: Date;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  created: Date;
  country: string;
  city: string;
  logo: string;
  phone: string;
  status: string;
  qrCode: string;
  offers: Offer[];
  hostUsername: string;
  isCancelled: boolean;
  isGoing: boolean;
  isVenueOwner: boolean;
  host?: Profile;
  attendees: Profile[];
}

export class Venue implements Venue {
  constructor(init?: VenueFormValues) {
    Object.assign(this, init);
  }
}

export class VenueFormValues {
  id?: string = undefined;
  date: Date | null = null;
  category: string = "";
  city: string = "";
  venue: string = "";
  address: string = "";
  country: string = "";
  logo: string = "";
  phone: string = "";
  status: string = "";
  qrCode: string = "";
  offers: Offer[] = [];

  constructor(venue?: VenueFormValues) {
    if (venue) {
      this.id = venue.id;
      this.category = venue.category;
      this.date = venue.date;
      this.venue = venue.venue;
      this.city = venue.city;
      this.address = venue.address;
      this.country = venue.country;
      this.logo = venue.logo;
      this.phone = venue.phone;
      this.status = venue.status;
      this.qrCode = venue.qrCode;
      this.offers = venue.offers;
    }
  }
}
