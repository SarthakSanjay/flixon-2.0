import { Movie } from "./movie";

export interface MoviesResponse {
  message: string;
  total: number;
  movies: Movie[];
}

export interface MovieResponse {
  message: string;
  movie: Movie;
}
