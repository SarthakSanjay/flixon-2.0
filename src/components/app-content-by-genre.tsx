"use client";
import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";
import ContentCard from "./app-content-card";
import { capatilizedFirstLetter } from "@/utils";
import useContent from "@/hooks/use-content";

export default function ContentByGenre({
  genre,
  type,
}: {
  genre: string;
  type: string;
}) {
  const { getMovieByGenre, loading, error } = useContent();
  const [movies, setMovies] = useState<Movie[] | []>([]);
  console.log("hello genre", genre);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovieByGenre(genre, 40);
      if (data) {
        setMovies(data.movies);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="h-screen w-screen text-white bg-black border border-white py-16 px-12">
      <h1 className="h-14 text-2xl text-white">
        {capatilizedFirstLetter(genre)}
      </h1>
      <div className="h-max w-full flex gap-10">
        {movies &&
          movies.map((movie: Movie) => {
            return <ContentCard key={movie._id} content={movie} type={type} />;
          })}
      </div>
    </div>
  );
}
