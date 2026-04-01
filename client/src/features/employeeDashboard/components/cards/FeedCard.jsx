import { Heart, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useReactions } from "../../hooks/useReactions";
import useToast from "../../hooks/useToast";
import CommentsViewer from "../../../../components/CommentsViewer";

const FeedCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const { showToast } = useToast();

  const { 
    toggleReaction, 
    optimisticReactions,
    reactingLoading,
    error
  } = useReactions(item.id);

  // Get sender initials
  const senderInitials = (item.sender_name || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Parse created_at for display
  const formatTime = (dateString) => {
    if (!dateString) return "now";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return "now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${diffDays}d ago`;
    } catch {
      return "recently";
    }
  };

  const handleReactionClick = async (reactionType) => {
    try {
      await toggleReaction(reactionType, optimisticReactions.user_reaction);
      setShowReactionPicker(false);
      showToast(
        optimisticReactions.user_reaction === reactionType
          ? "Reaction removed"
          : `You reacted with ${reactionType === "like" ? "❤️" : reactionType === "clap" ? "👏" : "⭐"}`,
        "success"
      );
    } catch (err) {
      showToast(err.message || "Failed to update reaction", "error");
    }
  };

  const reactionCounts = item.reactions_count || { like: 0, clap: 0, star: 0 };
  const totalReactions = Object.values(reactionCounts).reduce((a, b) => a + b, 0);
  const commentCount = item.comments_count || 0;

  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl p-6
        bg-gradient-to-br from-white to-slate-50
        border border-slate-200/70
        shadow-sm
        hover:shadow-xl hover:-translate-y-1
        hover:border-indigo-200
        transition-all duration-300
      "
    >

      {/* Subtle glow */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-400/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />

      {/* TOP */}
      <div className="flex justify-between items-start">

        <div className="flex items-center gap-4">

          {/* AVATAR */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white flex items-center justify-center font-semibold shadow group-hover:scale-105 transition">
            {senderInitials}
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              {item.sender_name || "Unknown"}
            </p>
            <p className="text-sm text-slate-500">
              recognized {item.receiver_name || "someone"}
            </p>
          </div>

        </div>

        <p className="text-xs text-slate-400">
          {formatTime(item.created_at)}
        </p>

      </div>

      {/* CATEGORY BADGE */}
      {item.category && (
        <div className="inline-block mt-4 text-xs px-3 py-1 rounded-lg border bg-indigo-100 text-indigo-600 border-indigo-200 font-medium">
          {item.category}
        </div>
      )}

      {/* MESSAGE */}
      <p className="text-sm text-slate-700 mt-4 leading-relaxed">
        {expanded ? item.message : item.message?.slice(0, 120) + "..."}
        {item.message?.length > 120 && (
          <span
            onClick={() => setExpanded(!expanded)}
            className="ml-2 text-indigo-600 cursor-pointer text-xs font-medium hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </span>
        )}
      </p>

      {/* REACTIONS & COMMENTS SECTION */}
      <div className="mt-5 space-y-3">

        {/* REACTION BUTTONS */}
        <div className="flex items-center gap-3 relative">

          {/* REACTION PICKER BUTTON */}
          <div className="relative">
            <button
              onClick={() => setShowReactionPicker(!showReactionPicker)}
              disabled={reactingLoading}
              className="
                flex items-center gap-2 px-3 py-1.5 rounded-full text-sm 
                transition-all duration-200
                bg-slate-100 text-slate-600 hover:bg-slate-200
              "
            >
              {optimisticReactions.user_reaction ? (
                <span className="text-lg">
                  {optimisticReactions.user_reaction === "like" && "❤️"}
                  {optimisticReactions.user_reaction === "clap" && "👏"}
                  {optimisticReactions.user_reaction === "star" && "⭐"}
                </span>
              ) : (
                <Heart size={14} />
              )}
              {totalReactions || "React"}
            </button>

            {/* REACTION PICKER */}
            {showReactionPicker && (
              <div className="absolute bottom-12 left-0 bg-white rounded-lg border border-slate-200 shadow-lg p-2 flex gap-2 z-50">
                <button
                  onClick={() => handleReactionClick("like")}
                  className="text-2xl hover:scale-125 transition p-1"
                  title="Like"
                >
                  ❤️
                </button>
                <button
                  onClick={() => handleReactionClick("clap")}
                  className="text-2xl hover:scale-125 transition p-1"
                  title="Clap"
                >
                  👏
                </button>
                <button
                  onClick={() => handleReactionClick("star")}
                  className="text-2xl hover:scale-125 transition p-1"
                  title="Star"
                >
                  ⭐
                </button>
              </div>
            )}
          </div>

          {/* REACTION COUNTS */}
          <div className="flex gap-2 text-xs text-slate-600">
            {reactionCounts.like > 0 && (
              <span className="flex items-center gap-1">❤️ {reactionCounts.like}</span>
            )}
            {reactionCounts.clap > 0 && (
              <span className="flex items-center gap-1">👏 {reactionCounts.clap}</span>
            )}
            {reactionCounts.star > 0 && (
              <span className="flex items-center gap-1">⭐ {reactionCounts.star}</span>
            )}
          </div>

          {/* COMMENTS VIEWER - Integrated Component */}
          <CommentsViewer 
            shoutoutId={item.id}
            initialCommentCount={commentCount}
          />

        </div>

        {error && (
          <p className="text-xs text-red-500 mt-2">{error}</p>
        )}

      </div>

    </div>
  );
};

export default FeedCard;