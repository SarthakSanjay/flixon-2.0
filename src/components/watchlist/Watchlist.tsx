"use client";

import { useWatchlist } from "@/hooks/use-watchlist";
import { Movie } from "@/types/movie";
import { Show } from "@/types/show";
import { capatilizedFirstLetter } from "@/utils";
import { useEffect, useState } from "react";
import ContentCard from "../app-content-card";
import ContentMenu from "./ContentMenu";
import { useAtomValue } from "jotai";
import { contentTypeAtom } from "@/atoms/atom";
import { Contents } from "@/types/content";
import Loading from "../loading";

export default function Watchlist() {
  const { getWatchlistMovies, getWatchlistShows, loading } = useWatchlist();
  const contentType = useAtomValue(contentTypeAtom);
  const [content, setContent] = useState<Contents>([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const profileId = localStorage.getItem("profileId");
      if (!profileId) return;
      if (contentType === "movie") {
        console.log(contentType, "from movie", profileId);
        const data = await getWatchlistMovies(profileId);
        if (data) {
          setContent(data.watchlist);
        }
      }
      if (contentType === "show") {
        console.log(contentType, "from show");

        const data = await getWatchlistShows(profileId);
        if (data) {
          setContent(data.watchlist);
        }
      }
    };
    fetchWatchlist();
  }, [contentType]);

  if (loading) <Loading />;

  return (
    <div className="h-screen w-screen text-white bg-black py-16 px-12 pt-20 flex flex-col relative">
      <h1 className="h-14 text-2xl text-white">
        {capatilizedFirstLetter("watchlist")}
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
