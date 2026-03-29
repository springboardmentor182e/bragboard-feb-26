import { useEffect, useState } from "react";
import api from "../services/api"; // adjust path if needed

const useLeaderboard = (refreshKey) => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);

        const res = await api.get("/employees/leaderboard");

        // ✅ IMPORTANT FIX
        setLeaders(res.data);

      } catch (err) {
        console.error("Leaderboard error:", err);
        setLeaders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [refreshKey]);

  return { leaders, loading };
};

export default useLeaderboard;