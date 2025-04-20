"use client";
import { useEffect, useState } from "react";
import ContentCard from "./app-content-card";
import { Movie } from "@/types/movie";
import { useRouter } from "next/navigation";
import useContent from "@/hooks/use-content";
import { Show } from "@/types/show";

export default function ContentCarousel({
  genre,
  type,
}: {
  genre: string;
  type: string;
}) {
  const [movies, setMovies] = useState<Movie[] | []>([]);
  const [shows, setShows] = useState<Show[] | []>([]);
  const {
    getMovieByGenre,
    getTrendingMovies,
    getShowByGenre,
    getTrendingShows,
    loading,
    error,
  } = useContent();
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      if (genre === "Trending") {
        const data = await getTrendingMovies();
        if (data) setMovies(data.movies);
      } else {
        const data = await getMovieByGenre(genre, 10);
        if (data) {
          setMovies(data?.movies);
        }
      }
    };

    const fetchShows = async () => {
      if (genre === "Trending") {
        const data = await getTrendingShows();
        if (data) setShows(data.shows);
      } else {
        const data = await getShowByGenre(genre, 10);
        if (data) {
          setShows(data?.shows);
        }
      }
    };

    if (type === "show") {
      fetchShows();
    } else {
      fetchMovies();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movies || !shows) {
    return "";
  }

  return (
    <div className="h-[16rem] w-full flex flex-col group ">
      <div className="h-[2.6rem] px-10 text-2xl flex justify-between items-center">
        <h1>{genre}</h1>
        <button
          className="bg-none border-none text-zinc-300 hover:text-white text-lg hidden group-hover:block"
          onClick={() => router.push(`/movies/genre-${genre.toLowerCase()}`)}
        >
          More
        </button>
      </div>
      {type === "show" ? (
        <div className="h-[13.4rem] py-[1rem] w-full flex  items-center overflow-x-scroll gap-10 px-10 no-scrollbar ">
          {shows &&
            shows.map((show: Show) => {
              return <ContentCard key={show._id} content={show} type={type} />;
            })}
        </div>
      ) : (
        <div className="h-[13.4rem] py-[1rem] w-full flex  items-center overflow-x-scroll gap-10 px-10 no-scrollbar ">
          {movies &&
            movies.map((movie: Movie) => {
              return (
                <ContentCard key={movie._id} content={movie} type={type} />
              );
            })}
        </div>
      )}
    </div>
  );
}
