import api from "@/lib/api";
import { FavoriteResponse } from "@/types/response";
import { useState } from "react";

export default function useFavorite() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMovieToFavorite = async (profileId: string, contentId: string) => {
    setLoading(true);
    try {
      const res = await api.post(`/api/favorite/movie`, {
        profileId: profileId,
        contentId: contentId,
      });
      return res.data;
    } catch (error: any) {
      if (error.response) {
        setError("Error adding movie to favorite");
      }
    } finally {
      setLoading(false);
    }
  };

  const addShowToFavorite = async (profileId: string, contentId: string) => {
    setLoading(true);
    try {
      const res = await api.post(`/api/favorite/show`, {
        profileId: profileId,
        contentId: contentId,
      });
      return res.data;
    } catch (error: any) {
      if (error.response) {
        setError("Error adding show to favorite");
      }
    } finally {
      setLoading(false);
    }
  };

  const removeContentFromFavorite = async (
    profileId: string,
    contentId: string,
  ) => {
    setLoading(true);
    try {
      const res = await api.delete(`/api/favorite/${profileId}/${contentId}`);
      return res.data;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching movie");
      }
    } finally {
      setLoading(false);
    }
  };

  const getAllFavoriteMovies = async (profileId: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/favorites/movie/${profileId}`);
      return res.data as FavoriteResponse;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching movie");
      }
    } finally {
      setLoading(false);
    }
  };

  const getAllFavoriteShows = async (profileId: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/favorites/show/${profileId}`);
      return res.data as FavoriteResponse;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching shows");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    addMovieToFavorite,
    addShowToFavorite,
    removeContentFromFavorite,
    getAllFavoriteMovies,
    getAllFavoriteShows,
    loading,
    error,
  };
}
