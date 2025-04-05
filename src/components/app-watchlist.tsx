"use client";
import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";
import ContentCard from "./app-content-card";
import { capatilizedFirstLetter } from "@/utils";
import { useWatchlist } from "@/hooks/use-watchlist";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Show } from "@/types/show";

export default function Watchlist() {
  const { getWatchlistMovies, getWatchlistShows, loading, error } =
    useWatchlist();
  const [movies, setMovies] = useState<Movie[] | []>([]);
  const [contentType, setContentType] = useState("movie");
  const [shows, setShows] = useState<Show[] | []>([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const profileId = localStorage.getItem("profileId");
      if (profileId && contentType === "movie") {
        const data = await getWatchlistMovies(profileId);
        if (data) {
          setMovies(data.watchlist);
        }
      } else {
        if (profileId) {
          const data = await getWatchlistShows(profileId);
          if (data) {
            setShows(data.watchlist);
          }
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
      <ContentMenu contentType={contentType} setContentType={setContentType} />
      {movies &&
        movies.map((movie: Movie) => {
          return (
            <ContentCard key={movie._id} content={movie} type={contentType} />
          );
        })}
      {shows &&
        shows.map((show: Show) => {
          return (
            <ContentCard key={show._id} content={show} type={contentType} />
          );
        })}
    </div>
  );
}

function ContentMenu({
  contentType,
  setContentType,
}: {
  contentType: string;
  setContentType: (v: string) => void;
}) {
  return (
    <div className="h-12 w-full flex gap-5">
      {["movie", "show"].map((s, i) => {
        return (
          <Button
            key={i}
            className={cn(
              "text-white text-lg bg-white/20",
              contentType === s ? "bg-orange-500/20" : "",
            )}
            onClick={() => setContentType(contentType)}
          >
            {capatilizedFirstLetter(s)}s
          </Button>
        );
      })}
    </div>
  );
}
