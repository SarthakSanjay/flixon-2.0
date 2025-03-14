import api from "@/lib/api";
import { User, UserProp } from "@/types/user";
import { useState } from "react";

export default function useUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const getUser = async (userId: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/user/${userId}`);
      return res.data as UserProp;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching user profiles");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    getUser,
    loading,
    error,
  };
}
