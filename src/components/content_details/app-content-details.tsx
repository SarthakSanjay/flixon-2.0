"use client";
import useMovie from "@/hooks/use-movie";
import Hero from "./app-content-details-hero";
import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";
import Cast from "./app-content-cast";
import ContentCarousel from "../app-content-carousel";

export default function ContentDetails({ movieId }: { movieId: string }) {
  const { getMovieById, loading, error } = useMovie();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getMovieById(movieId);
      if (data) {
        setMovie(data.movie);
      }
    };
    fetch();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-scroll">
      <Hero content={movie} />
      <Cast cast={movie?.cast} />
      <ContentCarousel genre="Action" />
    </div>
  );
}
