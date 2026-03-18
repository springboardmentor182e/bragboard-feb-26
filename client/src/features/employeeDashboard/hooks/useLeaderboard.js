import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/employeeService";

const useLeaderboard = (refreshKey = 0) => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getLeaderboard();
        setLeaders(res.data);
      } catch (err) {
        console.error("Leaderboard fetch failed", err);
        setError("Failed to load leaderboard.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [refreshKey]);

  return { leaders, loading, error };
};

export default useLeaderboard;