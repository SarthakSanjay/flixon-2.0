import api from "@/lib/api";
import { useState } from "react";

export function useWatchlist() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToWatchlist = async (contentId: string, profileId: string) => {
    setLoading(true);
    try {
      const res = await api.post(`/api/watchlist`, {
        profileId: profileId,
        contentId: contentId,
      });
      return res.data;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching movie");
      }
    } finally {
      setLoading(false);
    }
  };

  return { addToWatchlist, loading, error };
}
