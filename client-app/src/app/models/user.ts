export interface User {
  userName: string;
  displayName: string;
  email: string;
  token: string;
  isVenueOwner: number;
  image?: string;
}

export interface UserLoginValues {
  email: string;
  password: string;
}

export interface UserRegisterValues {
  displayName: string;
  username?: string;
  email: string;
  password: string;
}

export interface MemberData {
  id: string;
  email: string;
  username: string;
  displayName: string;
  phoneNumber: string | null;
  memberOffers: MemberOffer[];
}

export interface Stamp {
  vendorId: string;
  offerId: string;
  offerRewardId: string;
  stampDate: string;
  memberId: string;
}

export interface MemberOffer {
  id: string;
  offerId: string;
  memberId: string;
  numberOfStamps: number;
  lastStamp: string | null;
  activeStamps: number;
  completedStamps: boolean;
  numberOfRewards: number;
}
