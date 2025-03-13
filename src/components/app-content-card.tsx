"use client";
import { Movie } from "@/types/movie";
import { useRouter } from "next/navigation";

export default function ContentCard({ content }: { content: Movie }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/movies/${content._id}`);
  };
  return (
    <div
      className="h-[11.5rem] w-[20rem] group shrink-0  rounded-lg relative hover:scale-110 transition-all duration-300 border border-white"
      onClick={handleClick}
    >
      <img
        src={content?.image.thumbnail}
        className="h-full w-full absolute top-0 left-0 z-10 object-center rounded-lg"
      />
      <div className="h-full w-full absolute top-0 left-0 z-0 group-hover:z-20 group-hover:bg-black/50 transition-all duration-300"></div>
      <div className="h-1/2 w-full flex justify-center absolute bottom-0 z-30  transition-all duration-300 group-hover:-translate-y-5 rounded-lg">
        <img
          src={content?.image.title}
          className="h-full w-1/2 group-hover:scale-110 transition-all duration-300"
        />
      </div>
    </div>
  );
}
