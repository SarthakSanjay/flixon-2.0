import { Movie } from "@/types/movie";
import { Fragment, useState } from "react";
import WatchBtn from "../buttons/watchbtn";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import AddToWatchList from "../buttons/add-to-watchlist-btn";
import ContentMoreDetails from "./app-content-more-details";
import ImageCarousel from "../image-carousel";
import FavoriteBtn from "../buttons/favorite-btn";
import { SiImdb } from "react-icons/si";

export default function Hero({ content }: { content: Movie | null }) {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <div className="h-screen w-screen bg-black relative ">
      <div className="h-1/2 w-screen absolute bottom-0 left-0 bg-gradient-to-t from-black to-black/0 z-10"></div>

      <div className="h-screen w-screen absolute object-contain z-0">
        <ImageCarousel items={content?.image.screenshots} />
      </div>

      <div className="h-screen w-1/2 px-10 flex justify-center items-start flex-col  absolute z-10 bg-gradient-to-r from-black to-black/0 ">
        <div className="h-36 w-full ">
          <img
            className="h-full w-full object-contain"
            src={content?.image.title}
          />
        </div>
        <div className="text-xl text-blue-500 font-semibold">
          {content?.tags[1]}
        </div>

        <div className="h-16 w-full  flex items-center gap-2 text-white font-semibold text-lg">
          <div>{content?.releasedOn}</div>
          <Dot />
          <div className="h-max w-max px-2 py-[2px] bg-white/30  rounded-sm">
            {content?.ageRating}
          </div>
          <Dot />
          <div>{content?.audioLanguages.length} Languages</div>
          <Dot />
          <div className="flex gap-2 items-center">
            <span className="text-2xl">
              <SiImdb />
            </span>
            <span>{content?.rating}</span>
          </div>
        </div>

        <div className="h-28 w-full">{content?.description}</div>
        <div className="h-12 w-full text-[18px] flex gap-2 items-center ">
          {content?.tags.map((t, i) => {
            return (
              <Fragment key={`${i}+i`}>
                <div className="h-12 w-max px-2 flex items-center font-semibold">
                  {t}
                </div>
                {i < content.tags.length - 1 && <Pipe />}
              </Fragment>
            );
          })}
        </div>

        <div className="h-12 w-full  flex gap-2 items-center">
          {content?.audioLanguages.map((lang, index) => {
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
          <AddToWatchList contentId={content?._id} />
          <ContentMoreDetails content={content} />
        </div>
      </div>

      <div className="absolute right-10 top-1/2 z-30">
        <FavoriteBtn contentId={content?._id} />
      </div>
      <Screenshots content={content} />
    </div>
  );
}

function Screenshots({ content }: { content: Movie | null }) {
  return (
    <div className="screenshots h-44 w-1/2 absolute bottom-20 right-0 z-20 flex items-center justify-center gap-3 p-4">
      {content?.image.screenshots.map((screenshot, index) => {
        return (
          <div key={index} className={cn(["h-full w-1/3 rounded-lg "])}>
            <img
              className="h-full w-full rounded-lg object-center object-cover"
              src={screenshot}
            />
          </div>
        );
      })}
    </div>
  );
}

function Dot() {
  return <div className="h-[5px] w-[5px] rounded-full bg-gray-300"></div>;
}

function Pipe() {
  return <div className="h-[15px] w-[2px] bg-gray-300 rounded-lg"></div>;
}
