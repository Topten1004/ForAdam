import { User } from "./user";

export interface Profile {
  username: string;
  displayName: string;
  email: string;
  image?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  following: boolean;
  photos?: Photo[];
}

export class Profile implements Profile {
  constructor(user: User) {
    this.username = user.userName;
    this.email = user.email;
    this.image = user.image;
  }
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}

export interface UserVenue {
  id: string;
  title: string;
  category: string;
  date: Date;
}
