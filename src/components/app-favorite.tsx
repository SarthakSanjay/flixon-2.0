"use client";
import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";
import ContentCard from "./app-content-card";
import { capatilizedFirstLetter } from "@/utils";
import useFavorite from "@/hooks/use-favorite";
import Loading from "./loading";

export default function Favorite() {
  const { getAllUserFavorite, loading, error } = useFavorite();
  const [movies, setMovies] = useState<Movie[] | []>([]);

  useEffect(() => {
    const fetchFavorite = async () => {
      const profileId = localStorage.getItem("profileId");
      if (profileId) {
        const favorite = await getAllUserFavorite(profileId);
        if (favorite) {
          setMovies(favorite.data);
        }
      }
    };
    fetchFavorite();
  }, []);

  console.log(movies);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="h-screen w-screen text-white bg-black border border-white py-16 px-12 pt-36 flex flex-wrap gap-5 relative">
      <h1 className="h-14 text-2xl text-white absolute left-12 top-20">
        {capatilizedFirstLetter("favorites")}
      </h1>
      {movies &&
        movies.map((movie: Movie) => {
          return <ContentCard key={movie._id} content={movie} />;
        })}
    </div>
  );
}
