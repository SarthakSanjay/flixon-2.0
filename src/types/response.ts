import { Movie } from "./movie";
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

export interface ProfileResponse {
  message: string;
  profiles: ProfileProps[];
}
