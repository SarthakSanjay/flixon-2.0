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
// import { items } from "@/lib/utils";
import { SiImdb } from "react-icons/si";
import useContent from "@/hooks/use-content";
import { Movie } from "@/types/movie";
import Loading from "./loading";

export default function HeroContent({ type }: { type: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [movies, setMovies] = useState<Movie[]>([]);

  // const text =
  //   "Sam finds himself in the middle of an international incident after meeting with President Thaddeus Ross. He must soon discover the reason behind a nefarious global plot before the true mastermind has the entire world seeing red.";

  const { getTrendingMovies, loading, error } = useContent();

  useEffect(() => {
    async function fetchMovies() {
      const res = await getTrendingMovies();
      if (res) setMovies(res?.movies);
    }
    fetchMovies();
  }, []);

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

  if (loading) <Loading />;

  console.log(movies);
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
          {movies &&
            movies.map((movie: Movie, index: number) => {
              return (
                <CarouselItem
                  key={index}
                  className="border-0 border-yellow-500 h-screen w-full flex justify-center items-center relative"
                >
                  <img src={movie.image.thumbnail} className="absolute z-0" />
                  <div className="h-full w-[40%] bg-gradient-to-r from-black via-black/60 to-black/0 absolute left-0 z-10 flex items-center">
                    <div className="h-1/2 w-full border-0 mb-10 border-white px-10">
                      {!movie.image.title ? (
                        <h1 className="h-24 w-full text-3xl border-0 border-red-600 grid place-content-center">
                          {movie.name}
                        </h1>
                      ) : (
                        <div className="h-1/3 w-full border-0 border-red-600">
                          <img
                            src={movie.image.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <p className="h-1/3 w-full px-5 text-justify grid place-content-center border-0  border-green-500">
                        {movie.description}
                      </p>
                      <div className="h-1/3 w-full border-0 border-yellow-300 px-5 flex flex-col gap-5">
                        <div className="flex gap-2 items-center">
                          <span className="text-2xl">
                            <SiImdb />
                          </span>
                          <span>{movie.rating}</span>
                        </div>
                        <div className="h-14 flex gap-3">
                          <WatchBtn />
                          <AddToWatchList contentType={type} />
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
        <ContentCarousel genre="Trending" type={type} />
      </div>
    </div>
  );
}
