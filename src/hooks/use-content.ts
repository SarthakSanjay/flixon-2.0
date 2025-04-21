import api from "@/lib/api";
import {
  EpisodesResponse,
  MovieResponse,
  MoviesResponse,
  SeasonResponse,
  ShowResponse,
  ShowsResponse,
} from "@/types/response";
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
      const res = await api.get("/api/trending/movies");
      console.log(res.data);
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

  const getShowByGenre = async (genre: string, limit: number) => {
    setLoading(true);
    try {
      const res = await api.get(
        `/api/shows/${genre.charAt(0).toUpperCase() + genre.slice(1)}`,
      );
      return res.data as ShowsResponse;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching movies");
      }
    } finally {
      setLoading(false);
    }
  };

  const getTrendingShows = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/trending/shows");
      return res.data as ShowsResponse;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching shows");
      }
    } finally {
      setLoading(false);
    }
  };

  const getShowsSeason = async (showId: string) => {
    if (!showId) return;
    setLoading(true);
    try {
      const res = await api.get(`/api/show/season/${showId}`);
      return res.data as SeasonResponse;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching shows season");
      }
    } finally {
      setLoading(false);
    }
  };

  const getEpisodes = async (showId: string, seasonId: string) => {
    if (!showId || !seasonId) return;
    setLoading(true);
    try {
      const res = await api.get(`/api/show/${showId}/${seasonId}`);
      return res.data as EpisodesResponse;
    } catch (error: any) {
      if (error.response) {
        setError("Error fetching shows season episode");
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
    getShowByGenre,
    getTrendingShows,
    getShowsSeason,
    getEpisodes,
    loading,
    error,
  };
}
