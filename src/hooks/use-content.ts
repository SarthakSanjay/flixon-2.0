import api from "@/lib/api";
import { MovieResponse, MoviesResponse, ShowResponse } from "@/types/response";
import { useState } from "react";

export default function useContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMovieById = async (movieId: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/movie/${movieId}`);
      return res.data as MovieResponse;
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
      return res.data as MoviesResponse;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching movies");
      }
    } finally {
      setLoading(false);
    }
  };

  const getMovieByGenre = async (genre: string, limit: number) => {
    setLoading(true);
    try {
      const res = await api.get(
        `/api/movies/${genre.charAt(0).toUpperCase() + genre.slice(1)}`,
      );
      return res.data as MoviesResponse;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching movies");
      }
    } finally {
      setLoading(false);
    }
  };

  const getTrendingMovies = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/movies/trending");
      return res.data as MoviesResponse;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching movies");
      }
    } finally {
      setLoading(false);
    }
  };

  const getShowById = async (showId: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/show/${showId}`);
      return res.data as ShowResponse;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching movies");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    getMovieById,
    getAllMovies,
    getMovieByGenre,
    getTrendingMovies,
    getShowById,
    loading,
    error,
  };
}
