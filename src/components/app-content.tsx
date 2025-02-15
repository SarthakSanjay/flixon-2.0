import { useEffect, useState } from "react";
import HeroContent from "./app-hero-content";
import { ScrollArea } from "./ui/scroll-area";
import api from "@/lib/api";
import ContentCard from "./app-content-card";
import ContentCarousel from "./app-content-carousel";
import { Navbar } from "./app-navbar";

export default function Content({ pathname }: { pathname: string }) {
  const [contents, setContents] = useState([])
  useEffect(() => {
    const fetchContent = async () => {
      const res = await api.get(`/api${pathname}`, { withCredentials: true })
      console.log(res.data)
      setContents(res.data?.movies)
    }
    // fetchContent()
  }, [])

  const genres = [
    "Trending",
    "Action",
    "Romance",
    "Horror"
  ]

  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <ScrollArea className="h-full rounded-md mt-14">
        <Navbar />
        <HeroContent />
        {
          genres.map((genre, index) => {
            return <ContentCarousel key={index} genre={genre} />
          })
        }

      </ScrollArea>
    </div>
  );
}
