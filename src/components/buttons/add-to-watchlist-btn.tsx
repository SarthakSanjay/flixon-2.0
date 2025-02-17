"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "../ui/button"


export default function AddToWatchList() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="h-12 w-12 text-3xl rounded-lg bg-black/50 text-white">
            +
          </Button>
        </TooltipTrigger>
        <TooltipContent>Add to watchlist</TooltipContent>
      </Tooltip>
    </TooltipProvider>

  )
}
