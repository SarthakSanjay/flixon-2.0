"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import WatchBtn from "./buttons/watchbtn";
import AddToWatchList from "./buttons/add-to-watchlist-btn";
import ContentCarousel from "./app-content-carousel";
import { items } from "@/lib/utils";

export default function HeroContent() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const text =
    "Sam finds himself in the middle of an international incident after meeting with President Thaddeus Ross. He must soon discover the reason behind a nefarious global plot before the true mastermind has the entire world seeing red.";

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="h-max w-full border-0 border-white relative">
      <Carousel
        setApi={setApi}
        className="border-green-500 border-0 h-full w-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {items &&
            items.map((item: any, index: number) => {
              return (
                <CarouselItem
                  key={index}
                  className="border-0 border-yellow-500 h-screen w-full flex justify-center items-center relative"
                >
                  <img src={item.url} className="absolute z-0" />
                  <div className="h-full w-[40%] bg-gradient-to-r from-black via-black/60 to-black/0 absolute left-0 z-10 flex items-center">
                    <div className="h-1/2 w-full border-0 mb-10 border-white px-10">
                      {!item.textImg ? (
                        <h1 className="h-24 w-full text-3xl border-0 border-red-600 grid place-content-center">
                          {item.name}
                        </h1>
                      ) : (
                        <div className="h-1/3 w-full border-0 border-red-600">
                          <img
                            src={item.textImg}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <p className="h-1/3 w-full px-5 text-justify grid place-content-center border-0  border-green-500">
                        {text}
                      </p>
                      <div className="h-1/3 w-full border-0 border-yellow-300 px-5">
                        <div className="flex gap-2 h-10 w-max items-center">
                          <img src="/logo/imdb.png" className="w-[4rem]" />
                          <p>5</p>
                        </div>

                        <div className="h-14 flex gap-3">
                          <WatchBtn />
                          <AddToWatchList />
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-0 z-10 h-max w-full bg-gradient-to-t from-black via-black/60 to-black/0">
        <ContentCarousel genre="Trending" />
      </div>
    </div>
  );
}
