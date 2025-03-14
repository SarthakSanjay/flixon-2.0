import api from "@/lib/api";
import { ProfileResponse, SingleProfileRes } from "@/types/response";
import { useState } from "react";

export default function useProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserProfiles = async (userId: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/user/profiles/${userId}`);
      return res.data as ProfileResponse;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching user profiles");
      }
    } finally {
      setLoading(false);
    }
  };

  const createUserProfile = async (
    userId: string,
    username: string,
    avatar: string,
  ) => {
    setLoading(true);
    try {
      const res = await api.post(`/api/profile/${userId}`, {
        name: username,
        avatar: avatar,
      });
      return res.data;
    } catch (error: any) {
      if (error.response) {
        setError("Error creating user profile ");
      }
    } finally {
      setLoading(false);
    }
  };

  const getProfileById = async (profileId: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/profile/${profileId}`);
      return res.data as SingleProfileRes;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching user profile ");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (
    profileId: string | undefined,
    updates: object,
  ) => {
    setLoading(true);
    if (!profileId) {
      setLoading(false);
      setError("Something went wrong");
      return;
    }
    try {
      const res = await api.put(`/api/profile/${profileId}`, updates);
      return res.data;
    } catch (error: any) {
      if (error.response) {
        setError("Error updating user profile ");
      }
    } finally {
      setLoading(false);
    }
  };
  return {
    getUserProfiles,
    createUserProfile,
    getProfileById,
    updateUserProfile,
    loading,
    error,
  };
}
