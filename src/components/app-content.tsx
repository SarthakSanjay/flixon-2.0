import HeroContent from "./app-hero-content";
import ContentCarousel from "./app-content-carousel";
import { Navbar } from "./app-navbar";
import { Menubar } from "./app-menubar";

export default function Content({
  pathname,
  type,
}: {
  pathname: string;
  type: string;
}) {
  const genres = ["Action", "Romance", "Horror"];
  return (
    <div className="h-[100vh] border-0 border-green-500 w-full bg-black overflow-y-scroll">
      <div className="h-full w-full border-0 border-blue-500 ">
        <Navbar />
        <HeroContent type={type} />

        {genres.map((genre, index) => {
          return <ContentCarousel key={index} genre={genre} type={type} />;
        })}
      </div>
      <Menubar />
    </div>
  );
}
