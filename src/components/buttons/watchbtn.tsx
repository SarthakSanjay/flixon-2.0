"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Play } from "lucide-react";
export default function WatchBtn() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="h-12 text-lg rounded-lg bg-red-600 text-white">
            <Play />
            Watch Now
          </Button>
        </TooltipTrigger>
        <TooltipContent>Play movie</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
