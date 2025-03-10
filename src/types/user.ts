import { History, Watchlist } from "./movie";

export interface ProfileProps {
  id: string;
  name: string;
  avatar: string;
  watchlist: Watchlist[];
  history: History[];
}
