import { useState, useEffect, useRef } from "react";
import { getLeaderboard } from "../services/leaderboardService";

export function useLeaderboard() {

  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Prevent double fetch in React StrictMode
  const fetchedRef = useRef(false);

  useEffect(() => {

    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchLeaderboard = async () => {
      try {

        const users = await getLeaderboard();

        setLeaderboard(users);

      } catch (err) {

        setError(err.message || "Unable to load leaderboard");

      } finally {

        setLoading(false);

      }
    };

    fetchLeaderboard();

  }, []);

  return { leaderboard, loading, error };
}