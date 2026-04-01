import { useState, useEffect } from "react";
import { MessageCircle, ChevronDown } from "lucide-react";
import { getComments, addComment, deleteComment } from "../services/shoutoutService";
import useToast from "../features/employeeDashboard/hooks/useToast";

const CommentsViewer = ({ shoutoutId, initialCommentCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [totalCommentCount, setTotalCommentCount] = useState(initialCommentCount);
  const { showToast } = useToast();

  const COMMENTS_PER_PAGE = 5;

  // Fetch comments from API
  const fetchComments = async (offset = 0, isLoadMore = false) => {
    try {
      setIsLoading(true);
      const data = await getComments(shoutoutId, COMMENTS_PER_PAGE, offset);
      
      if (isLoadMore) {
        // Append new comments to existing ones
        setComments((prev) => [...prev, ...data]);
      } else {
        // Replace comments (initial load)
        setComments(data);
      }

      // Check if there are more comments to load
      // If returned comments count equals limit, there might be more
      if (data.length === COMMENTS_PER_PAGE) {
        setHasMoreComments(true);
      } else {
        setHasMoreComments(false);
      }

      setCurrentOffset(offset + COMMENTS_PER_PAGE);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      showToast("Failed to load comments", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Load comments when viewer is opened
  useEffect(() => {
    if (isOpen && comments.length === 0) {
      fetchComments(0, false);
    }
  }, [isOpen]); // Only re-fetch when opening

  const handleLoadMore = async () => {
    await fetchComments(currentOffset, true);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    try {
      setIsAddingComment(true);
      const newComment = await addComment(shoutoutId, newCommentText);
      
      // Add the new comment to the top of the list
      setComments((prev) => [newComment, ...prev]);
      setNewCommentText("");
      setTotalCommentCount((prev) => prev + 1);
      showToast("Comment added!", "success");
    } catch (error) {
      console.error("Failed to add comment:", error);
      showToast(error.message || "Failed to add comment", "error");
    } finally {
      setIsAddingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setTotalCommentCount((prev) => Math.max(0, prev - 1));
      showToast("Comment deleted", "success");
    } catch (error) {
      console.error("Failed to delete comment:", error);
      showToast(error.message || "Failed to delete comment", "error");
    }
  };

  // Format time for display
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

  return (
    <div className="space-y-3">
      {/* COMMENT BUTTON - Toggle Comments Section */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-sm text-slate-600 hover:bg-slate-200 transition"
      >
        <MessageCircle size={14} />
        <span>{totalCommentCount}</span>
        <ChevronDown 
          size={14} 
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* COMMENTS SECTION - Expandable */}
      {isOpen && (
        <div className="mt-4 space-y-3 border-t border-slate-200 pt-3">
          
          {/* ADD COMMENT INPUT - Always Visible */}
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              disabled={isAddingComment}
              className="flex-1 text-xs px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={isAddingComment || !newCommentText.trim()}
              className="px-3 py-1.5 bg-indigo-500 text-white text-xs rounded-lg hover:bg-indigo-600 disabled:opacity-50 transition"
            >
              {isAddingComment ? "..." : "Post"}
            </button>
          </form>

          {/* LOADING STATE */}
          {isLoading && comments.length === 0 && (
            <div className="text-center py-4">
              <p className="text-xs text-slate-500">Loading comments...</p>
            </div>
          )}

          {/* COMMENTS LIST */}
          {comments.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {comments.map((comment) => (
                <div 
                  key={comment.id} 
                  className="bg-slate-50 p-3 rounded-lg text-xs"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">
                        {comment.user_name}
                      </p>
                      <p className="text-slate-700 mt-1">{comment.text}</p>
                      <p className="text-slate-400 mt-2">
                        {formatTime(comment.created_at)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-slate-400 hover:text-red-500 transition flex-shrink-0"
                      title="Delete comment"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* NO COMMENTS STATE */}
          {comments.length === 0 && !isLoading && (
            <div className="text-center py-4">
              <p className="text-xs text-slate-500">No comments yet</p>
            </div>
          )}

          {/* LOAD MORE BUTTON */}
          {hasMoreComments && (
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="w-full py-2 text-xs text-indigo-600 hover:text-indigo-700 font-medium transition disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "Load More Comments"}
            </button>
          )}

        </div>
      )}
    </div>
  );
};

export default CommentsViewer;
