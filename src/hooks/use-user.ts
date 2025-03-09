import api from "@/lib/api";
import { useState } from "react";

export default function useUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserProfiles = async (userId: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/profile/${userId}`);
      return res.data;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching user profiles");
      }
    } finally {
      setLoading(false);
    }
  };

  const createUserProfile = async (userId: string) => {
    setLoading(true);
    try {
      const res = await api.post(`/api/profile/${userId}`);
      return res.data;
    } catch (error: any) {
      if (error.response) {
        setError("Error creating user profile ");
      }
    } finally {
      setLoading(false);
    }
  };
  return { getUserProfiles, createUserProfile, loading, error };
}
