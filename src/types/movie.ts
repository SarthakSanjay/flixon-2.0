export interface MovieImage {
  thumbnail: string;
  screenshots: string[];
  poster: string;
  title: string;
}

export interface Movie {
  _id: string;
  name: string;
  description: string;
  image: MovieImage;
  genre: string[];
  releasedOn: number;
  duration: number;
  rating: number;
  cast: Casts[];
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

export interface Casts {
  name: string;
  image: string;
}

export interface Watchlist {
  profileId: string;
  contentId: string;
  addedOn: string;
}

export interface History {
  profileId: string;
  contentId: string;
  addedOn: string;
}
