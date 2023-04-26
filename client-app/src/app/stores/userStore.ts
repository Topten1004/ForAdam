import { UserRegisterValues } from "./../models/user";
import { router } from "./../router/Routes";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import agent from "../api/agent";
import { User, UserLoginValues } from "../models/user";

export default class UserStore {
  user: User | null = null;
  fbLogin = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  get isVenueOwner() {
    return true;
  }

  login = async (credentials: UserLoginValues) => {
    try {
      const user = await agent.Account.login(credentials);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      router.navigate("/venue-list");
    } catch (error) {
      throw error;
    }
  };

  register = async (credentials: UserRegisterValues) => {
    try {
      console.log("credentials", credentials);
      const user = await agent.Account.register(credentials);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      router.navigate("/venue-list");
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  facebookLogin = async (accessToken: string) => {
    try {
      this.fbLogin = true;
      const user = await agent.Account.fbLogin(accessToken);
      store.commonStore.setToken(user.token);
      runInAction(() => {
        this.user = user;
        this.fbLogin = false;
      });
      router.navigate("/venue-list");
    } catch (error) {
      console.log(error);
      runInAction(() => (this.fbLogin = false));
    }
  };
}
