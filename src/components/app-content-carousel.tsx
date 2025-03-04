import { useEffect, useState } from "react";
import ContentCard from "./app-content-card";
import { Button } from "./ui/button";
import useMovie from "@/hooks/use-movie";
import { Movie } from "@/types/movie";

export default function ContentCarousel({ genre }: { genre: string }) {
  const [movies, setMovies] = useState<Movie[] | []>([]);
  const { getAllMovies } = useMovie();
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getAllMovies();
      setMovies(res);
    };
    fetchMovies();
  }, []);

  return (
    <div className="h-[16rem] w-full flex flex-col group">
      <div className="h-[2.6rem] px-10 text-2xl flex justify-between">
        <h1>{genre}</h1>
        <Button
          variant={"ghost"}
          className="opacity-0 text-lg rounded-full bg-[#EB5B00]/50 hover:text-white hover:bg-[#EB5B00] group-hover:opacity-100"
        >
          See All
        </Button>
      </div>
      <div className="h-[13.4rem] py-[1rem] w-full flex  items-center overflow-x-scroll gap-10 px-10 no-scrollbar ">
        {movies &&
          movies.map((movie) => {
            return <ContentCard key={movie._id} content={movie} />;
          })}
      </div>
    </div>
  );
}
