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
import { Content } from "@/types/content";

export default function FavoriteBtn({
  contentId,
  contentType,
}: {
  contentId?: string;
  contentType: string;
}) {
  const {
    addMovieToFavorite,
    addShowToFavorite,
    getAllFavoriteShows,
    getAllFavoriteMovies,
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
        if (contentType === "movie") {
          await addMovieToFavorite(profileId, contentId);
        } else {
          await addShowToFavorite(profileId, contentId);
        }
        setIsPresent(true);
      }
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const profileId = localStorage.getItem("profileId");
      if (profileId) {
        if (contentType === "movie") {
          const res = await getAllFavoriteMovies(profileId);
          if (res) {
            setIsPresent(
              res?.data.some((content: Content) => content._id === contentId),
            );
          }
        } else {
          const res = await getAllFavoriteShows(profileId);
          if (res) {
            setIsPresent(
              res?.data.some((content: Content) => content._id === contentId),
            );
          }
        }
      }
    };
    fetchFavorites();
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
