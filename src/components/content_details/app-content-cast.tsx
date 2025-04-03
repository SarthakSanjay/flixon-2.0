import { Casts } from "@/types/movie";
import { Fragment } from "react";
export default function Cast({ cast }: { cast: Casts[] | undefined }) {
  return (
    <Fragment>
      <h1 className="h-[50px] w-screen px-10 text-2xl flex items-center ">
        Casts
      </h1>
      <div className="h-[250px] w-screen flex items-center gap-10 px-10 overflow-y-hidden overflow-x-scroll">
        {cast &&
          cast.map((actor, index) => {
            return (
              <div
                key={index}
                className="h-max w-max flex items-center flex-col gap-3"
              >
                <div className="h-[150px] w-[150px] rounded-full border-2 border-white">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={actor.image}
                  />
                </div>
                <div className="italic">{actor.name}</div>
              </div>
            );
          })}
      </div>
    </Fragment>
  );
}
