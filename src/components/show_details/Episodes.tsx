import { currentSeasonAtom } from "@/atoms/atom";
import useContent from "@/hooks/use-content";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { Episode } from "@/types/show";

export default function Episodes() {
  const { getEpisodes, loading } = useContent();
  const currentSeason = useAtomValue(currentSeasonAtom);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  useEffect(() => {
    async function fetchEpisodes() {
      if (!currentSeason) return;
      const res = await getEpisodes(currentSeason.showId, currentSeason._id);
      if (res) {
        setEpisodes(res.data);
      }
    }
    fetchEpisodes();
  }, [currentSeason]);

  if (loading) <Loading />;

  return (
    <div className="h-max w-full">
      {episodes &&
        episodes.map((episode, index) => {
          return (
            <div
              key={episode._id}
              className="h-52 w-full flex hover:bg-white/10 hover:scale-[101%]
      transition-all duration-300 ease-in-out rounded-xl items-center"
            >
              <div className="h-[11.5rem] w-[20rem] border border-white rounded-xl">
                <img
                  className="h-full w-full rounded-xl object-cover"
                  src={episode.thumbnail}
                />
              </div>

              <div className="h-full w-[calc(100%-20rem)] px-10 py-5">
                <h1 className="h-1/6 w-full text-xl font-extrabold">
                  {episode.title}
                </h1>
                <h1 className="h-1/6 text-lg text-orange-500 font-bold">
                  S{currentSeason.number} E{index + 1}
                </h1>
                <p className="h-4/6 w-full text-lg text-gray-500">
                  {episode.description}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
