import { useState } from "react";
import ContentCard from "./app-content-card";
import { items } from "@/lib/utils";

export default function ContentCarousel({ genre }: { genre: string }) {
  const [content, setContent] = useState(items);
  return (
    <div className="h-[16rem] w-full flex flex-col">
      <h1 className="h-[2.6rem] px-10 text-2xl">{genre}</h1>
      <div className="h-[13.4rem] py-[1rem] w-full flex  items-center overflow-x-scroll gap-10 px-10 no-scrollbar ">
        {content &&
          content.map((cont, i) => {
            return <ContentCard key={i} content={cont} />;
          })}
      </div>
    </div>
  );
}
