"use client";
import Hero from "./app-content-details-hero";
import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";
import Cast from "./app-content-cast";
import ContentCarousel from "../app-content-carousel";
import useContent from "@/hooks/use-content";
import { Show } from "@/types/show";
import Loading from "../loading";
import Episodes from "./show-episodes";

export default function ContentDetails({
  contentId,
  type,
}: {
  contentId: string;
  type: string;
}) {
  const { getMovieById, getShowById, loading, error } = useContent();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [show, setShow] = useState<Show | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (type === "movie") {
        const data = await getMovieById(contentId);
        if (data) {
          setMovie(data.movie);
        }
      } else {
        const data = await getShowById(contentId);
        if (data) {
          setShow(data.show);
        }
      }
    };
    fetch();
  }, [contentId]);

  const content = movie || show;

  if (loading || !content) {
    return <Loading />;
  }
  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-scroll">
      <Hero content={content} />
      <Cast cast={content?.cast} />
      {type === "show" && show?._id ? <Episodes showId={show?._id} /> : ""}
      <ContentCarousel genre="Action" type={type} />
    </div>
  );
}
