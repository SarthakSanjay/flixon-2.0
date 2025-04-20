"use client";

import Hero from "./app-content-details-hero";
import { useEffect, useState } from "react";
import Cast from "./app-content-cast";
import ContentCarousel from "../app-content-carousel";
import useContent from "@/hooks/use-content";
import Loading from "../loading";
import EpisodesContainer from "../show_details/EpisodesContainer";
import { Content } from "@/types/content";

export default function ContentDetails({
  contentId,
  type,
}: {
  contentId: string;
  type: string;
}) {
  const { getMovieById, getShowById, loading } = useContent();
  const [content, setContent] = useState<Content | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (type === "movie") {
        const data = await getMovieById(contentId);
        if (data) {
          setContent(data.movie);
        }
      } else {
        const data = await getShowById(contentId);
        if (data) {
          setContent(data.show);
        }
      }
    };
    fetch();
  }, [contentId]);

  if (loading || !content) {
    return <Loading />;
  }
  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-scroll">
      <Hero content={content} />
      <Cast cast={content?.cast} />
      {type === "show" ? <EpisodesContainer /> : ""}
      <ContentCarousel genre="Action" type={type} />
    </div>
  );
}
