import { createContext, useContext } from "react";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import VenueStore from "./venueStore";
import ProfileStore from "./profileStore";
import RewardStore from './rewardStore';

interface Store {
  userStore: UserStore;
  commonStore: CommonStore;
  venueStore: VenueStore;
  profileStore: ProfileStore;
  rewardStore: RewardStore;
}

export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  venueStore: new VenueStore(),
  profileStore: new ProfileStore(),
  rewardStore: new RewardStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
