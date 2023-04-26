import { Venue } from "./../models/venue";
import { Profile, UserVenue } from "./../models/Profile";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";

export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile = false;
  uploading = false;
  loading = false;
  followings: Profile[] = [];
  loadingFollowings: boolean = false;
  activeTab = 0;
  userVenues: UserVenue[] = [];
  loadingVenues = false;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveTab = (activeTab: any) => {
    this.activeTab = activeTab;
  };

  get isCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.userName === this.profile.username;
    }
    return false;
  }

  loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingProfile = false;
      });
    }
  };

  loadUserVenues = async (username: string, predicate?: string) => {
    this.loadingVenues = true;
    try {
      const venues = await agent.Profiles.listVenues(username, predicate!);
      runInAction(() => {
        this.userVenues = venues;
        this.loadingVenues = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingVenues = false;
      });
    }
  };

  updateFollowing = async (username: string, following: boolean) => {};
}
