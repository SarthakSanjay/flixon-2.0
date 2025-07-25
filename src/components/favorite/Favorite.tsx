"use client";

import { Movie } from "@/types/movie";
import { Show } from "@/types/show";
import { capatilizedFirstLetter } from "@/utils";
import { useEffect, useState } from "react";
import ContentCard from "../app-content-card";
import { useAtomValue } from "jotai";
import { contentTypeAtom } from "@/atoms/atom";
import { Contents } from "@/types/content";
import useFavorite from "@/hooks/use-favorite";
import ContentMenu from "../watchlist/ContentMenu";
import Loading from "../loading";

export default function Favorite() {
  const { getAllFavoriteMovies, getAllFavoriteShows, loading } = useFavorite();
  const contentType = useAtomValue(contentTypeAtom);
  const [content, setContent] = useState<Contents>([]);

  useEffect(() => {
    const fetchFavorite = async () => {
      const profileId = localStorage.getItem("profileId");
      if (!profileId) return;
      if (contentType === "movie") {
        const res = await getAllFavoriteMovies(profileId);
        if (res) {
          setContent(res.data);
        }
      }
      if (contentType === "show") {
        const res = await getAllFavoriteShows(profileId);
        if (res) {
          setContent(res.data);
        }
      }
    };
    fetchFavorite();
  }, [contentType]);

  if (loading) <Loading />;

  return (
    <div className="h-screen w-screen text-white bg-black py-16 px-12 pt-20 flex flex-col relative">
      <h1 className="h-14 text-2xl text-white">
        {capatilizedFirstLetter("favorites")}
      </h1>
      <ContentMenu />
      <div className="h-max w-full flex flex-wrap gap-5">
        {content.length > 0 ? (
          content.map((cont: Show | Movie) => {
            return (
              <ContentCard key={cont._id} content={cont} type={contentType} />
            );
          })
        ) : (
          <h1>No {contentType} in favorites</h1>
        )}
      </div>
    </div>
  );
}
