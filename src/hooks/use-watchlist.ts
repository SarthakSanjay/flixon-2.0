import api from "@/lib/api";
import {
  WatchlistMovieResponse,
  WatchlistShowResponse,
} from "@/types/response";
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

  const getWatchlistMovies = async (profileId: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/watchlist/movie/${profileId}`);
      return res.data as WatchlistMovieResponse;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching movie");
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = async (profileId: string, contentId: string) => {
    setLoading(true);
    try {
      const res = await api.delete(`/api/watchlist/${profileId}/${contentId}`);
      return res.data;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching movie");
      }
    } finally {
      setLoading(false);
    }
  };

  const getWatchlistShows = async (profileId: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/watchlist/show/${profileId}`);
      return res.data as WatchlistShowResponse;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching shows");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    addToWatchlist,
    getWatchlistMovies,
    removeFromWatchlist,
    getWatchlistShows,
    loading,
    error,
  };
}
