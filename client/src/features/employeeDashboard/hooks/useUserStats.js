import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getUserStats } from "../../../services/userStatsService";

/**
 * useUserStats Hook - Auto-fetches user stats on mount
 * @returns {Object} { stats, loading, error, refetch }
 */
export const useUserStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getUserStats(user.id);
      setStats(data);
    } catch (err) {
      setError(err.message || "Failed to fetch stats");
      console.error("Stats fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [user?.id]);

  return {
    stats: stats || {
      user_id: user?.id,
      shoutouts_received: 0,
      shoutouts_sent: 0,
      total_points: 0,
      current_level: 1,
      points_to_next_level: 500,
      rank: 0,
    },
    loading,
    error,
    refetch: fetchStats,
  };
};

export default useUserStats;
