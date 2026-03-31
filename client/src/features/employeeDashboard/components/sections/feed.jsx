import { useNavigate } from "react-router-dom";
import { RotateCw } from "lucide-react";
import { useState } from "react";
import FeedCard from "../cards/FeedCard";
import { useFeed } from "../../hooks/useFeed";

const Feed = () => {
  const navigate = useNavigate();
  const { shoutouts, loading, error, refetch } = useFeed();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Limit feed to 2 items on dashboard
  const limitedShoutouts = shoutouts.slice(0, 2);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">Error loading feed: {error}</p>
        <button
          onClick={refetch}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER (IMPROVED) */}
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Latest Activity
          </h2>
          <p className="text-sm text-slate-500">
            Recent shoutouts and recognitions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
            className="
              p-2 rounded-lg
              bg-slate-100 hover:bg-slate-200 transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            title="Refresh feed"
          >
            <RotateCw
              size={16}
              className={`text-slate-600 ${isRefreshing ? "animate-spin" : ""}`}
            />
          </button>

          <button
            onClick={() => navigate("/recognitions")}
            className="
              text-sm px-4 py-2 rounded-xl
              bg-gradient-to-r from-indigo-500 to-purple-500 text-white
              shadow hover:opacity-90 transition
            "
          >
            View All →
          </button>
        </div>

      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-40 bg-slate-200 rounded-lg animate-pulse" />
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && shoutouts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-slate-500">No shoutouts yet. Be the first to recognize someone!</p>
        </div>
      )}

      {/* LIST - LIMITED TO 2 ITEMS */}
      {!loading && limitedShoutouts.length > 0 && (
        <div className="space-y-6">
          {limitedShoutouts.map((item) => (
            <FeedCard key={item.id} item={item} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Feed;