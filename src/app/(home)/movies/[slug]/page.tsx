import ContentByGenre from "@/components/app-content-by-genre";
import ContentDetails from "@/components/content_details/app-content-details";

type MovieDetailsPageProp = {
  params: {
    slug: string;
  };
};

export default function page({ params }: MovieDetailsPageProp) {
  console.log("[arams", params);
  const genre = params.slug.split("-");
  if (genre[0] === "genre") {
    return <ContentByGenre genre={genre[1]} type="movie" />;
  }
  return <ContentDetails contentId={params.slug} type="movie" />;
}
