import { History, Watchlist } from "./movie";

export interface ProfileProps {
  _id: string;
  name: string;
  avatar: string;
  watchlist: Watchlist[];
  history: History[];
}
export interface UserProp {
  message: string;
  user: User;
}
export interface User {
  _id: string;
  email: string;
  password: string;
  phone: string;
  createdAt: string;
}
