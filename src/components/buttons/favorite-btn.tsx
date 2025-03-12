"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import Loading from "../loading";
import useFavorite from "@/hooks/use-favorite";
import { Star } from "lucide-react";

export default function FavoriteBtn({ contentId }: { contentId?: string }) {
  const {
    addContentToFavorite,
    getAllUserFavorite,
    removeContentFromFavorite,
    loading,
    error,
  } = useFavorite();
  const [isPresent, setIsPresent] = useState(false);

  const handleClick = async () => {
    const profileId = localStorage.getItem("profileId");

    if (profileId && contentId) {
      if (isPresent) {
        await removeContentFromFavorite(profileId, contentId);
        setIsPresent(false);
      } else {
        await addContentToFavorite(profileId, contentId);
        setIsPresent(true);
      }
    }
  };

  useEffect(() => {
    console.log("inside watchlist button");
    const fetchWatchlist = async () => {
      const profileId = localStorage.getItem("profileId");
      if (profileId) {
        const res = await getAllUserFavorite(profileId);
        if (res) {
          setIsPresent(res?.data.some((content) => content._id === contentId));
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
              className="h-12 rounded-lg bg-black/50 text-yellow-300"
              onClick={handleClick}
            >
              <Star />
            </Button>
          ) : (
            <Button
              className="h-12 w-12 text-[25px] rounded-lg bg-black/50 text-white hover:text-yellow-300"
              onClick={handleClick}
            >
              <Star />
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent>
          {isPresent ? "Remove form favorite" : "Add to favorite"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
