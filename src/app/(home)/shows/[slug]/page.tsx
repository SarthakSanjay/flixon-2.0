import ContentByGenre from "@/components/app-content-by-genre";
import ContentDetails from "@/components/content_details/app-content-details";
import * as React from "react";

type MovieDetailsPageProp = {
  params: {
    slug: string;
  };
};

export default async function page({ params }: MovieDetailsPageProp) {
  const { slug } = await params;
  const genre = slug.split("-");
  if (genre[0] === "genre") {
    return <ContentByGenre genre={genre[1]} type="show" />;
  }
  return <ContentDetails contentId={slug} type="show" />;
}
