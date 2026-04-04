import { Heart, ThumbsUp, Flag, Edit2, Trash2 } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useReactions } from "../../hooks/useReactions";
import useToast from "../../hooks/useToast";
import CommentsViewer from "../../../../components/CommentsViewer";
import ReportShoutoutModal from "../../../../components/ReportShoutoutModal";
import AdminEditBadge from "../../../../components/ui/AdminEditBadge";
import { updateShoutout, deleteShoutout } from "../../../../services/shoutoutService";

const FeedCard = ({ item, onShoutoutDelete }) => {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
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

  const handleReactionClick = useCallback(
    async (reactionType) => {
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
    },
    [toggleReaction, optimisticReactions.user_reaction, showToast]
  );

  const reactionCounts = item.reactions_count || { like: 0, clap: 0, star: 0 };
  const totalReactions = Object.values(reactionCounts).reduce((a, b) => a + b, 0);
  const commentCount = item.comments_count || 0;

  const handleCloseReportModal = useCallback(() => {
    setShowReportModal(false);
  }, []);

  const handleReportSuccess = useCallback(() => {
    showToast("Thank you for helping keep our community safe!", "success");
  }, [showToast]);

  // Check if user can edit/delete (within 5 minutes and is creator)
  useEffect(() => {
    const checkEditWindow = () => {
      if (!user || item.sender_id !== user.id) {
        setCanEdit(false);
        return;
      }

      const created = new Date(item.created_at);
      const now = new Date();
      const diffMs = now - created;
      const diffSeconds = Math.floor(diffMs / 1000);
      const remaining = Math.max(0, 300 - diffSeconds); // 300 seconds = 5 minutes

      setTimeRemaining(remaining);
      setCanEdit(remaining > 0);
    };

    checkEditWindow();
    const timer = setInterval(checkEditWindow, 1000); // Update every second

    return () => clearInterval(timer);
  }, [item.sender_id, item.created_at, user]);

  // Handle edit shoutout
  const handleEditShoutout = async () => {
    if (!editingMessage?.trim()) {
      showToast("Message cannot be empty", "error");
      return;
    }

    try {
      await updateShoutout(item.id, editingMessage, editingCategory || item.category);
      showToast("Shoutout updated successfully!", "success");
      setIsEditModalOpen(false);
      setEditingMessage(null);
      setEditingCategory(null);
      // Refresh would happen through parent component or real-time updates
    } catch (error) {
      showToast(error.response?.data?.detail || "Failed to update shoutout", "error");
    }
  };

  // Handle delete shoutout
  const handleDeleteShoutout = async () => {
    if (!window.confirm("Are you sure you want to delete this shoutout? This action cannot be undone.")) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteShoutout(item.id);
      showToast("Shoutout deleted successfully!", "success");
      if (onShoutoutDelete) {
        onShoutoutDelete(item.id);
      }
    } catch (error) {
      showToast(error.response?.data?.detail || "Failed to delete shoutout", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatTimeRemaining = (seconds) => {
    if (seconds <= 0) return "Time's up";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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
              recognized{" "}
              <span className="font-semibold text-slate-900">
                {item.recipients && item.recipients.length > 0
                  ? item.recipients.map((r) => r.name).join(", ")
                  : item.receiver_name || "someone"}
              </span>
            </p>
          </div>

        </div>

        <p className="text-xs text-slate-400">
          {formatTime(item.created_at)}
        </p>

      </div>

      {/* CATEGORY BADGE */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        {item.category && (
          <div className="inline-block text-xs px-3 py-1 rounded-lg border bg-indigo-100 text-indigo-600 border-indigo-200 font-medium">
            {item.category}
          </div>
        )}
        {item.is_edited && item.edited_at && (
          <AdminEditBadge editedAt={item.edited_at} />
        )}
      </div>

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

      {/* EDIT/DELETE BUTTONS - Only show if user is creator and within 5 min window */}
      {canEdit && (
        <div className="flex gap-2 mt-3 pb-2 border-b border-slate-100">
          <button
            onClick={() => {
              setEditingMessage(item.message);
              setEditingCategory(item.category);
              setIsEditModalOpen(true);
            }}
            className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition"
            title="Edit shoutout"
          >
            <Edit2 size={14} /> Edit
          </button>
          <button
            onClick={handleDeleteShoutout}
            disabled={isDeleting}
            className="flex items-center gap-1 px-3 py-1 text-xs bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 rounded-lg transition"
            title="Delete shoutout"
          >
            <Trash2 size={14} /> Delete
          </button>
          <div className="ml-auto text-xs text-amber-600 font-semibold flex items-center">
            ⏱️ {formatTimeRemaining(timeRemaining)}
          </div>
        </div>
      )}

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

          {/* REPORT BUTTON */}
          <button
            onClick={() => setShowReportModal(true)}
            className="
              flex items-center gap-2 px-3 py-1.5 rounded-full text-sm 
              transition-all duration-200
              bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600
              hover:border hover:border-red-200
            "
            title="Report this shoutout"
          >
            <Flag size={14} />
            Report
          </button>

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

      {/* REPORT MODAL */}
      {/* EDIT MODAL */}
      {isEditModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Edit Shout-Out</h3>
            
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">Message</label>
              <textarea
                value={editingMessage}
                onChange={(e) => setEditingMessage(e.target.value)}
                placeholder="Enter your message..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                rows="4"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">Category</label>
              <select
                value={editingCategory || ""}
                onChange={(e) => setEditingCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                <option value="">Select category</option>
                <option value="Achievement">Achievement</option>
                <option value="Teamwork">Teamwork</option>
                <option value="Innovation">Innovation</option>
                <option value="Support">Support</option>
                <option value="Leadership">Leadership</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleEditShoutout}
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg font-medium hover:bg-slate-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      <ReportShoutoutModal
        isOpen={showReportModal}
        shoutoutId={item.id}
        onClose={handleCloseReportModal}
        onSuccess={handleReportSuccess}
      />

    </div>
  );
};

export default FeedCard;