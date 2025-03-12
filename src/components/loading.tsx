import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="animate-spin h-12 w-12 rounded-full flex justify-center items-center">
      <Loader2 />
    </div>
  );
}
