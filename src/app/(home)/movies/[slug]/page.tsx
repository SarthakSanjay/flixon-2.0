import ContentByGenre from "@/components/app-content-by-genre";
import ContentDetails from "@/components/app-content-details";

type MovieDetailsPageProp = {
  params: {
    slug: string;
  };
};

export default function page({ params }: MovieDetailsPageProp) {
  const genre = params.slug.split("-");
  if (genre[0] === "genre") {
    return <ContentByGenre genre={genre[1]} />;
  }
  return <ContentDetails movieId={params.slug} />;
}
