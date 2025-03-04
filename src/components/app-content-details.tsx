"use client";
import useMovie from "@/hooks/use-movie";
import { Movie } from "@/types/movie";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContentDetails() {
  const path = usePathname();
  const movieId = path.split("/")[2];
  const { getMovieById, loading, error } = useMovie();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getMovieById(movieId);
      //@ts-ignore
      setMovie(data);
    };
    fetch();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="h-screen w-screen bg-black relative">
      <img
        src={movie?.image.screenshots[1]}
        className="h-screen w-screen absolute object-contain"
      />
      <div className="h-screen w-1/2 border-white border absolute right-0 bg-gradient-to-l from-black via-black/70 to-black/0"></div>
    </div>
  );
}
