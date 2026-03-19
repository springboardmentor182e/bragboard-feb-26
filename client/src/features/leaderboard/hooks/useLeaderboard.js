import { useState, useEffect } from "react";

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Base URL from .env
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/leaderboard/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }

        const data = await response.json();

        // ✅ Handle different API response formats safely
        setLeaderboard(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [BASE_URL]);

  return { leaderboard, loading, error };
}