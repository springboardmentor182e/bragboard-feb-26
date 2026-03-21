import { useState, useEffect } from "react";

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/leaderboard/leaderboard/"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard");
        }

        const result = await response.json();

        // Handle API response structure
        setLeaderboard(result.data || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return { leaderboard, loading, error };
}