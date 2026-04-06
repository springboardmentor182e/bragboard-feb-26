import { useState, useEffect } from "react";
import { RotateCw } from "lucide-react";
import FeedCard from "../components/cards/FeedCard.jsx";
import { getUserFeed } from "../../../services/shoutoutService";
import useToast from "../hooks/useToast";
import { useShoutoutDeletion } from "../context/ShoutoutDeletionContext";

const AllRecognitions = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showToast } = useToast();
  const { deletionCounter, lastDeletedId } = useShoutoutDeletion();

  const LIMIT = 20;

  // Refetch when a shoutout is deleted elsewhere in the app
  useEffect(() => {
    if (deletionCounter > 0 && lastDeletedId) {
      // Immediately remove from UI for instant feedback
      setShoutouts((prev) => prev.filter((item) => item.id !== lastDeletedId));
      
      // Refetch to ensure backend consistency
      const refetchAfterDelete = async () => {
        try {
          const data = await getUserFeed(LIMIT, 0);
          setShoutouts(data);
          setOffset(LIMIT);
          setHasMore(data.length >= LIMIT);
        } catch (err) {
          console.error("Error refetching after delete:", err);
        }
      };
      refetchAfterDelete();
    }
  }, [deletionCounter, lastDeletedId]);

  // Handle shoutout deletion
  const handleShoutoutDelete = async (deletedId) => {
    // Remove the deleted shoutout from the current list
    setShoutouts((prev) => prev.filter((item) => item.id !== deletedId));
    
    // Refetch the feed to ensure consistency
    try {
      const data = await getUserFeed(LIMIT, 0);
      setShoutouts(data);
      setOffset(LIMIT);
      setHasMore(data.length >= LIMIT);
    } catch (err) {
      console.error("Error refetching after delete:", err);
    }
  };

  // Fetch initial list
  useEffect(() => {
    fetchInitialFeed();
  }, []);

  const fetchInitialFeed = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserFeed(LIMIT, 0);
      setShoutouts(data);
      setOffset(LIMIT);
      setHasMore(data.length >= LIMIT);
    } catch (err) {
      setError(err.message || "Failed to fetch recognitions");
      console.error("Error fetching feed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Refresh function
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      setError(null);
      const data = await getUserFeed(LIMIT, 0);
      setShoutouts(data);
      setOffset(LIMIT);
      setHasMore(data.length >= LIMIT);
    } catch (err) {
      setError(err.message || "Failed to refresh feed");
      console.error("Error refreshing feed:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Load more items (infinite scroll)
  const loadMore = async () => {
    if (isLoadingMore || !hasMore || loading) return;

    try {
      setIsLoadingMore(true);
      const data = await getUserFeed(LIMIT, offset);
      if (data.length > 0) {
        setShoutouts((prev) => [...prev, ...data]);
        setOffset((prev) => prev + LIMIT);
        setHasMore(data.length >= LIMIT);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading more:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Handle scroll to bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.scrollHeight - 500
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, hasMore, isLoadingMore, loading]);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            All Recognitions
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Complete history of team recognitions and activities
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing || loading}
          className="
            p-2 rounded-lg
            bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          title="Refresh feed"
        >
          <RotateCw
            size={16}
            className={`text-slate-600 dark:text-slate-400 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-700 dark:text-red-400">{error}</p>
          <button
            onClick={handleRefresh}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && shoutouts.length === 0 && !error && (
        <div className="text-center py-10">
          <p className="text-slate-500 dark:text-slate-400">No recognitions yet. Be the first to give one!</p>
        </div>
      )}

      {/* LIST */}
      {shoutouts.length > 0 && (
        <div className="space-y-6">
          {shoutouts.map((item) => (
            <FeedCard key={item.id} item={item} onShoutoutDelete={handleShoutoutDelete} />
          ))}
        </div>
      )}

      {/* LOADING MORE STATE */}
      {isLoadingMore && (
        <div className="flex justify-center py-6">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ delay: "0.2s" }} />
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ delay: "0.4s" }} />
          </div>
        </div>
      )}

      {/* NO MORE ITEMS */}
      {!hasMore && shoutouts.length > 0 && (
        <div className="text-center py-6">
          <p className="text-slate-500 text-sm">No more recognitions to load</p>
        </div>
      )}

    </div>
  );
};

export default AllRecognitions;