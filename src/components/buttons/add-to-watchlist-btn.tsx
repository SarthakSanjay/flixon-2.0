"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { useWatchlist } from "@/hooks/use-watchlist";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function AddToWatchList({
  contentId,
  contentType,
}: {
  contentId?: string;
  contentType: string;
}) {
  const {
    addToWatchlist,
    getWatchlistMovies,
    getWatchlistShows,
    removeFromWatchlist,
    loading,
    error,
  } = useWatchlist();
  const [isPresent, setIsPresent] = useState(false);

  const handleClick = async () => {
    const profileId = localStorage.getItem("profileId");

    if (profileId && contentId) {
      if (isPresent) {
        await removeFromWatchlist(profileId, contentId);
        setIsPresent(false);
      } else {
        await addToWatchlist(contentId, profileId);
        setIsPresent(true);
      }
    }
  };

  useEffect(() => {
    console.log("inside watchlist button");
    const fetchWatchlist = async () => {
      const profileId = localStorage.getItem("profileId");
      if (profileId) {
        if (contentType === "movie") {
          const res = await getWatchlistMovies(profileId);
          if (res) {
            setIsPresent(
              res?.watchlist.some((content) => content._id === contentId),
            );
          }
        } else {
          const res = await getWatchlistShows(profileId);
          if (res) {
            setIsPresent(
              res?.watchlist.some((content) => content._id === contentId),
            );
          }
        }
      }
    };
    fetchWatchlist();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {isPresent ? (
            <Button
              className="h-12 rounded-lg bg-black/50 text-white"
              onClick={handleClick}
            >
              Remove from watchlist
            </Button>
          ) : (
            <Button
              className="h-12 w-12 text-3xl rounded-lg bg-black/50 text-white"
              onClick={handleClick}
            >
              +
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent>
          {isPresent ? "Remove form watchlist" : "Add to watchlist"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
