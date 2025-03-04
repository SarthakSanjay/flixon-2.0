import api from "@/lib/api";
import { useState } from "react";

export default function useMovie() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMovieById = async (movieId: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/movie/${movieId}`);
      return res.data;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching movie");
      }
    } finally {
      setLoading(false);
    }
  };

  const getAllMovies = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/movies");
      //@ts-ignore
      return res.data.movies;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching movies");
      }
    } finally {
      setLoading(false);
    }
  };

  return { getMovieById, getAllMovies, loading, error };
}
