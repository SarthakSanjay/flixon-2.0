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
  cast: string[];
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
