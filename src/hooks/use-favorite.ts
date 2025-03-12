import api from "@/lib/api";
import { FavoriteResponse } from "@/types/response";
import { useState } from "react";

export default function useFavorite() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addContentToFavorite = async (profileId: string, contentId: string) => {
    setLoading(true);
    try {
      const res = await api.post(`/api/favorite`, {
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

  const getAllUserFavorite = async (profileId: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/favorites/${profileId}`);
      return res.data as FavoriteResponse;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching movie");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    addContentToFavorite,
    removeContentFromFavorite,
    getAllUserFavorite,
    loading,
    error,
  };
}
