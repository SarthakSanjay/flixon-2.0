import { Movie } from "./movie";
import { Show } from "./show";
import { ProfileProps } from "./user";

export interface MoviesResponse {
  message: string;
  total: number;
  movies: Movie[];
}

export interface MovieResponse {
  message: string;
  movie: Movie;
}

export interface ShowsResponse {
  message: string;
  total: number;
  shows: Show[];
}

export interface ShowResponse {
  message: string;
  show: Show;
}

export interface ProfileResponse {
  message: string;
  profiles: ProfileProps[];
}

export interface SingleProfileRes {
  message: string;
  profile: ProfileProps;
}

export interface WatchlistResponse {
  message: string;
  watchlist: Movie[];
}

export interface FavoriteResponse {
  message: string;
  data: Movie[];
}
