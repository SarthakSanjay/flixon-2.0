import { capatilizedFirstLetter } from "@/utils";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { contentTypeAtom } from "@/atoms/atom";

export default function ContentMenu() {
  const [contentType, setContentType] = useAtom(contentTypeAtom);

  return (
    <div className="h-12 w-full flex gap-5">
      {["movie", "show"].map((s, i) => {
        return (
          <Button
            key={i}
            className={cn(
              "text-white text-lg bg-white/20",
              contentType === s ? "bg-orange-500/20" : "",
            )}
            onClick={() => {
              console.log("clicked");
              setContentType(s);
            }}
          >
            {capatilizedFirstLetter(s)}s
          </Button>
        );
      })}
    </div>
  );
}
