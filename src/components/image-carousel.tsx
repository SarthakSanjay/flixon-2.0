"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

export default function ImageCarousel({
  items,
}: {
  items: string[] | undefined;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
                  className="border-0 border-yellow-500 h-screen w-screen flex justify-center items-center "
                >
                  <img
                    className="h-full w-full object-cover object-center"
                    src={item}
                  />
                </CarouselItem>
              );
            })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
