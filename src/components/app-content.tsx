import { useEffect, useState } from "react";
import HeroContent from "./app-hero-content";
import { ScrollArea } from "./ui/scroll-area";
import api from "@/lib/api";
import ContentCard from "./app-content-card";
import ContentCarousel from "./app-content-carousel";

export default function Content({ pathname }: { pathname: string }) {
  const [contents, setContents] = useState([])
  useEffect(() => {
    const fetchContent = async () => {
      const res = await api.get(`/api${pathname}`, { withCredentials: true })
      console.log(res.data)
      setContents(res.data?.movies)
    }
    fetchContent()
  }, [])

  return (
    <div className="h-[calc(100vh-64px)] w-full">
      <ScrollArea className="h-full rounded-md">
        <HeroContent />

        <ContentCarousel />

        {/* {contents.map((content) => { */}
        {/*   return <ContentCard content={content} /> */}
        {/* })} */}
      </ScrollArea>
    </div>
  );
}
