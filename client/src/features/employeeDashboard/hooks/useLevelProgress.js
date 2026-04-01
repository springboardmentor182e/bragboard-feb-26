import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getLevelProgress } from "../../../services/userStatsService";

export const useLevelProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetchProgress();
    }
  }, [user?.id]);

  const fetchProgress = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLevelProgress(user.id);
      setProgress(data);
    } catch (err) {
      console.error("Error fetching level progress:", err);
      setError(err.message || "Failed to load progress");
    } finally {
      setLoading(false);
    }
  };

  return { progress, loading, error, refetch: fetchProgress };
};
