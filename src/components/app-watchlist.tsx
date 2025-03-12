"use client";
import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";
import ContentCard from "./app-content-card";
import { capatilizedFirstLetter } from "@/utils";
import { useWatchlist } from "@/hooks/use-watchlist";

export default function Watchlist() {
  const { getWatchlist, loading, error } = useWatchlist();
  const [movies, setMovies] = useState<Movie[] | []>([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const profileId = localStorage.getItem("profileId");
      if (profileId) {
        const data = await getWatchlist(profileId);
        if (data) {
          setMovies(data.watchlist);
        }
      }
    };
    fetchWatchlist();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="h-screen w-screen text-white bg-black border border-white py-16 px-12 pt-36 flex flex-wrap gap-5 relative">
      <h1 className="h-14 text-2xl text-white absolute left-12 top-20">
        {capatilizedFirstLetter("watchlist")}
      </h1>
      {movies &&
        movies.map((movie: Movie) => {
          return <ContentCard key={movie._id} content={movie} />;
        })}
    </div>
  );
}
