"use client";

import { useParams } from "next/navigation";
import Seasons from "./Seasons";
import Episodes from "./Episodes";

export default function EpisodesContainer() {
  const { slug } = useParams();
  if (!slug) return;
  return (
    <div className="h-max w-full px-10 py-5">
      <h1 className="h-[50px] w-screen text-2xl flex items-center ">
        Episodes
      </h1>
      <Seasons showId={slug?.toString()} />
      <Episodes />
    </div>
  );
}
