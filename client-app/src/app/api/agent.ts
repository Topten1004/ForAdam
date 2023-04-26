import { Profile, UserVenue } from "./../models/Profile";
import { router } from "./../router/Routes";
import { store } from "./../stores/store";
import { Venue, Stamp, VenueFormValues, Reward } from "./../models/venue";
import { toast } from "react-toastify";
import {
  MemberData,
  User,
  UserLoginValues,
  UserRegisterValues,
} from "../models/user";
import axios, { AxiosError, AxiosResponse } from "axios";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === "DEVELOPMENT") await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config }: any = error.response!;
    if (data.errors) {
      const modalStateErrors = [];
      for (const key in data.errors) {
        if (data.errors[key]) {
          modalStateErrors.push(data.errors[key]);
        }
      }
      throw modalStateErrors.flat();
    } else {
      toast.error(data);
    }
    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          router.navigate("/not-found");
        }
        toast.error("bad request");
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        router.navigate("not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Venues = {
  list: () => axios.get<Venue[]>("/venues").then(responseBody),
  details: (id: string) => requests.get<Venue>(`/venues/${id}`),
  attend: (id: string) => requests.post<void>(`/venues/${id}/attend`, {}),
  create: (venue: VenueFormValues) => requests.post<void>("/venues/", venue),
  update: (venue: VenueFormValues) =>
    requests.put<void>(`/venues/${venue.id}`, venue),
  delete: (id: string) => requests.del<void>(`/venues/${id}`),
};

const Stamps = {
  stamp: (id: string, code: string) => requests.post<string>(`/stamp/${id}/${code}`, {}),
  lists: (id: string) => requests.get<Stamp[]>(`/stamp/${id}`),
  checkStamps : (id: string | undefined) => requests.put<void>(`/stamp/${id}`, {})
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserLoginValues) => requests.post<User>("/account/login", user),
  register: (user: UserRegisterValues) =>
    requests.post<User>("/account/register", user),
  fbLogin: (accessToken: string) =>
    requests.post<User>(`/account/fbLogin?accessToken=${accessToken}`, {}),
};

const Member = {
  current: () => requests.get<MemberData>("/member"),
  updateMember: () => requests.post<MemberData>("/member/update", {}),
};

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profile/${username}`),
  listVenues: (username: string, predicate: string) =>
    requests.get<UserVenue[]>(
      `/profile/${username}/venues?predicate=${predicate}`
    ),
};

const Rewards = {
  lists: () => requests.get<Reward[]>("/reward"),
  checkReward: (id: string) => requests.post<Reward[]>(`/reward/${id}`, {})
};

const agent = {
  Account,
  Venues,
  Profiles,
  Stamps,
  Member,
  Rewards,
};

export default agent;
