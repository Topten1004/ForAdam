import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";

export default class RewardStore {
  lists: any[] = []

  constructor() {
    makeAutoObservable(this);
  }

  get rewardCount() {
    return this.lists.length;
  }

  cleanList = () => {
    this.lists = [];
  }

  loadLists = async () => {
    this.lists = await agent.Rewards.lists();
  };

  checkReward = async (id: string) => {
    this.lists = await agent.Rewards.checkReward(id);
  }
}
