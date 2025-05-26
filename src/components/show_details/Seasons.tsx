import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import useContent from "@/hooks/use-content";
import { Season } from "@/types/show";
import Loading from "../loading";
import { useAtom } from "jotai";
import { currentSeasonAtom } from "@/atoms/atom";

export default function Seasons({ showId }: { showId: string }) {
  const { getShowsSeason, loading } = useContent();
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [currentSeason, setCurrentSeason] = useAtom(currentSeasonAtom);

  useEffect(() => {
    async function fetchSeason() {
      const res = await getShowsSeason(showId);
      if (res) {
        setSeasons(res.data);
        setCurrentSeason(res.data[0]);
      }
    }
    fetchSeason();
  }, []);

  if (loading) <Loading />;

  return (
    <div className="h-12 w-full flex gap-5">
      {seasons &&
        seasons.map((season) => {
          return (
            <Button
              key={season._id}
              className={cn(
                "text-white text-lg bg-white/20",
                season._id === currentSeason._id ? "bg-orange-500/20" : "",
              )}
              onClick={() => setCurrentSeason(season)}
            >
              Season {season.number}
            </Button>
          );
        })}
    </div>
  );
}
