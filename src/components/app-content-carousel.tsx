"use client";
import { useEffect, useState } from "react";
import ContentCard from "./app-content-card";
import useMovie from "@/hooks/use-movie";
import { Movie } from "@/types/movie";
import { useRouter } from "next/navigation";

export default function ContentCarousel({ genre }: { genre: string }) {
  const [movies, setMovies] = useState<Movie[] | []>([]);
  const { getMovieByGenre, loading, error } = useMovie();
  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovieByGenre(genre, 10);
      if (data) {
        setMovies(data?.movies);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movies) {
    return "";
  }

  return (
    <div className="h-[16rem] w-full flex flex-col">
      <div className="h-[2.6rem] px-10 text-2xl flex justify-between items-center">
        <h1>{genre}</h1>
      </div>
      <div className="h-[13.4rem] py-[1rem] w-full flex  items-center overflow-x-scroll gap-10 px-10 no-scrollbar ">
        {movies &&
          movies.map((movie: Movie) => {
            return <ContentCard key={movie._id} content={movie} />;
          })}
        <SeeAllCard genre={genre} />
      </div>
    </div>
  );
}

function SeeAllCard({ genre }: { genre: string }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/movies/genre-${genre.toLowerCase()}`);
  };
  return (
    <div
      className="h-[11.5rem] w-[20rem] rounded-lg hover:scale-110 transition-all duration-300 border border-white text-white text-2xl flex justify-center items-center hover:bg-[#EB5B00]/50"
      onClick={handleClick}
    >
      See All
    </div>
  );
}
