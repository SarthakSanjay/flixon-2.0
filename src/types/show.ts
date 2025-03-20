import { Casts } from "./movie";

export interface ShowImage {
  thumbnail: string;
  screenshots: string[];
  poster: string;
  title: string;
}

export interface Show {
  _id: string;
  name: string;
  description: string;
  image: ShowImage;
  genre: string[];
  releasedOn: number;
  duration: number;
  rating: number;
  cast: Casts[];
  seasons: Season[];
  director: string;
  isFeatured: boolean;
  tags: string[];
  availability: string[];
  ageRating: string;
  views: number;
  audioLanguages: string[];
  subtitleLanguages: string[];
  addedOn: string;
}

interface Season {
  _id: string;
  number: number;
  episodes: Episode[];
}

interface Episode {
  _id: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number;
}
