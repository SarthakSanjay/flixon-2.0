import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function Episodes() {
  const [currentSeason, setCurrentSeason] = useState(1);
  return (
    <div className="h-max w-full px-10 py-5">
      <h1 className="h-[50px] w-screen text-2xl flex items-center ">
        Episodes
      </h1>
      <Seasons season={currentSeason} setSeason={setCurrentSeason} />

      {[
        "avengersendgame",
        "avengersinfinitywar",
        "birdsofprey",
        "bladerunner",
        "f1",
        "interstellar",
        "johnwick",
        "spidermanintothespiderverse",
        "theamazingspiderman",
        "thebatman",
        "thunderbolts",
      ].map((ep, index) => {
        return <Episode key={index} ep={ep} season={currentSeason} />;
      })}
    </div>
  );
}

function Seasons({
  season,
  setSeason,
}: {
  season: number;
  setSeason: (value: number) => void;
}) {
  return (
    <div className="h-12 w-full flex gap-5">
      {["1", "2"].map((s) => {
        return (
          <Button
            className={cn(
              "text-white text-lg bg-white/20",
              season === parseInt(s) ? "bg-orange-500/20" : "",
            )}
            onClick={() => setSeason(parseInt(s))}
          >
            Season {s}
          </Button>
        );
      })}
    </div>
  );
}

function Episode({ ep, season }: { ep: string; season: number }) {
  return (
    <div
      className="h-52 w-full flex hover:bg-white/10 hover:scale-[101%]
      transition-all duration-300 ease-in-out rounded-xl items-center"
    >
      <div className="h-[11.5rem] w-[20rem] border border-white rounded-xl">
        <img
          className="h-full w-full rounded-xl object-cover"
          src={`/thumbnail/${ep}.jpg`}
        />
      </div>

      <div className="h-full w-[calc(100%-20rem)] px-10 py-5">
        <h1 className="h-1/6 w-full text-xl font-extrabold">
          Avengers Endgame The Final Showdown Begins
        </h1>
        <h1 className="h-1/6 text-lg text-orange-500 font-bold">
          S{season} E1
        </h1>
        <p className="h-4/6 w-full text-lg text-gray-500">
          After Thanos, an intergalactic warlord, disintegrates half of the
          universe, the Avengers must reunite and assemble again to reinvigorate
          their trounced allies and restore balance.
        </p>
      </div>
    </div>
  );
}
