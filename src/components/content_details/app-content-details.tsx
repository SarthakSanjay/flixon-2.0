"use client";
import useMovie from "@/hooks/use-movie";
import { Movie } from "@/types/movie";
import { Fragment, useEffect, useState } from "react";
import WatchBtn from "../buttons/watchbtn";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import AddToWatchList from "../buttons/add-to-watchlist-btn";
import ContentMoreDetails from "./app-content-more-details";

export default function ContentDetails({ movieId }: { movieId: string }) {
  const { getMovieById, loading, error } = useMovie();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  useEffect(() => {
    const fetch = async () => {
      const data = await getMovieById(movieId);
      if (data) {
        setMovie(data.movie);
      }
    };
    fetch();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="h-screen w-screen bg-black relative">
      <div className="h-1/2 w-screen absolute bottom-0 left-0 bg-gradient-to-t from-black to-black/0 z-10"></div>
      <img
        src={movie?.image.thumbnail}
        className="h-screen w-screen absolute object-contain z-0"
      />

      <div className="h-screen w-1/2 px-24 flex justify-center items-start flex-col  absolute z-10 bg-gradient-to-r from-black to-black/0">
        <div className="h-36 w-full ">
          <img
            className="h-full w-full object-contain"
            src={movie?.image.title}
          />
        </div>
        <div className="text-xl text-blue-500 font-semibold">
          {movie?.tags[1]}
        </div>

        <div className="h-16 w-full  flex items-center gap-2 text-white font-semibold text-lg">
          <div>{movie?.releasedOn}</div>
          <Dot />
          <div className="h-max w-max px-2 py-[2px] bg-white/30  rounded-sm">
            {movie?.ageRating}
          </div>
          <Dot />
          <div>{movie?.audioLanguages.length} Languages</div>
        </div>

        <div className="h-28 w-full">{movie?.description}</div>
        <div className="h-12 w-full text-[18px] flex gap-2 items-center ">
          {movie?.tags.map((t, i) => {
            return (
              <Fragment key={`${i}+i`}>
                <div className="h-12 w-max px-2 flex items-center font-semibold">
                  {t}
                </div>
                {i < movie.tags.length - 1 && <Pipe />}
              </Fragment>
            );
          })}
        </div>

        <div className="h-12 w-full  flex gap-2 items-center">
          {movie?.audioLanguages.map((lang, index) => {
            return (
              <Button
                key={index}
                variant={"outline"}
                className={cn([
                  "h-10 w-max px-3 text-[15px] font-semibold rounded-full border-none hover:bg-black hover:text-white",
                  selectedLanguage === lang ? "bg-black/40" : "bg-transparent",
                ])}
                onClick={() => setSelectedLanguage(lang)}
              >
                {lang}
              </Button>
            );
          })}
        </div>

        <div className="h-max w-full flex gap-5">
          <WatchBtn />
          <AddToWatchList />
          <ContentMoreDetails content={movie} />
        </div>
      </div>
    </div>
  );
}

function Dot() {
  return <div className="h-[5px] w-[5px] rounded-full bg-gray-300"></div>;
}

function Pipe() {
  return <div className="h-[15px] w-[2px] bg-gray-300 rounded-lg"></div>;
}
