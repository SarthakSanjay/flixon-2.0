import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Movie } from "@/types/movie";
import { Info } from "lucide-react";

export default function ContentMoreDetails({
  content,
}: {
  content: Movie | null;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="h-12 w-max text-lg ml-auto rounded-lg bg-black/50 text-white">
          <Info />
          more
        </Button>
      </SheetTrigger>
      <SheetContent className=" bg-black">
        <SheetHeader>More Info</SheetHeader>
        <div className="h-max w-full flex flex-col gap-1 mt-5">
          <h1 className="text-xl">Audio Languages</h1>
          <div className="h-max w-full flex flex-wrap gap-x-1 gap-y-0">
            {content?.audioLanguages.map((lang, index) => {
              return (
                <span key={index} className="text-gray-500">
                  {lang}
                  {index < content.audioLanguages.length - 1 && " ,"}
                </span>
              );
            })}
          </div>
        </div>
        <div className="h-max w-full flex flex-col gap-1 mt-5">
          <h1 className="text-xl">Subtitles</h1>
          <div className="h-max w-full flex flex-wrap gap-x-1 gap-y-0">
            {content?.subtitleLanguages.map((lang, index) => {
              return (
                <span key={index} className="text-gray-500">
                  {lang}
                  {index < content.subtitleLanguages.length - 1 && " ,"}
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex gap-2 mt-5 items-center">
          <h1 className="text-lg">Directed By:</h1>
          <span className="text-orange-500">{content?.director}</span>
        </div>
      </SheetContent>
    </Sheet>
  );
}
