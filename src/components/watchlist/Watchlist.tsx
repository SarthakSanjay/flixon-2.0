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

type Content = Movie[] | Show[];

export default function Watchlist() {
  const { getWatchlistMovies, getWatchlistShows, loading } = useWatchlist();
  const contentType = useAtomValue(contentTypeAtom);
  const [content, setContent] = useState<Content>([]);

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
        console.log(contentType, "from movie");

        const data = await getWatchlistShows(profileId);
        if (data) {
          setContent(data.watchlist);
        }
      }
    };
    fetchWatchlist();
  }, [contentType]);

  console.log("content type ", contentType);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="h-screen w-screen text-white bg-black border border-white py-16 px-12 pt-36 flex flex-wrap gap-5 relative">
      <h1 className="h-14 text-2xl text-white absolute left-12 top-20">
        {capatilizedFirstLetter("watchlist")}
      </h1>
      <ContentMenu />
      {content.length > 0
        ? content.map((cont: Show | Movie) => {
            return (
              <ContentCard key={cont._id} content={cont} type={contentType} />
            );
          })
        : ""}
    </div>
  );
}
