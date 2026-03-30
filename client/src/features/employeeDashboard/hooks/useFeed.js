import { useState, useEffect, useCallback } from "react";
import { getShoutoutFeed } from "../../../services/shoutoutService";

/**
 * useFeed Hook - Manages feed state and fetching
 * @returns {Object} { shoutouts, loading, error, fetchFeed, refetch }
 */
export const useFeed = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  const fetchFeed = useCallback(async (newOffset = 0, newLimit = 20) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getShoutoutFeed(newLimit, newOffset);
      setShoutouts(data);
      setLimit(newLimit);
      setOffset(newOffset);
    } catch (err) {
      setError(err.message || "Failed to fetch feed");
      console.error("Feed fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchFeed(0, 20);
  }, []);

  const refetch = useCallback(() => {
    fetchFeed(offset, limit);
  }, [offset, limit]);

  const loadMore = useCallback(() => {
    fetchFeed(offset + limit, limit);
  }, [offset, limit]);

  return {
    shoutouts,
    loading,
    error,
    fetchFeed,
    refetch,
    loadMore,
    hasMore: shoutouts.length >= limit,
  };
};

export default useFeed;
