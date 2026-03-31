import { useState, useCallback } from "react";
import {
  addReaction,
  removeReaction,
  addComment,
  deleteComment,
} from "../../../services/shoutoutService";

/**
 * useReactions Hook - Manages reactions and comments with optimistic updates
 * @param {number} shoutoutId - ID of the shoutout
 * @returns {Object} Reaction and comment state + handlers
 */
export const useReactions = (shoutoutId) => {
  const [optimisticReactions, setOptimisticReactions] = useState({});
  const [optimisticComments, setOptimisticComments] = useState([]);
  const [reactingLoading, setReactingLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState(null);

  // Toggle reaction (optimistic)
  const toggleReaction = useCallback(
    async (reactionType, currentReactionType = null) => {
      try {
        setReactingLoading(true);
        setError(null);

        // If same reaction type, remove it; otherwise add new
        if (currentReactionType === reactionType) {
          // Optimistically remove
          setOptimisticReactions((prev) => {
            const updated = { ...prev };
            delete updated.user_reaction;
            return updated;
          });

          // Call API to remove
          await removeReaction(shoutoutId);
        } else {
          // Optimistically add
          setOptimisticReactions((prev) => ({
            ...prev,
            user_reaction: reactionType,
          }));

          // Call API to add
          await addReaction(shoutoutId, reactionType);
        }
      } catch (err) {
        setError(err.message || "Failed to update reaction");
        // Revert optimistic update
        setOptimisticReactions({});
        console.error("Reaction error:", err);
        throw err;
      } finally {
        setReactingLoading(false);
      }
    },
    [shoutoutId]
  );

  // Add comment (optimistic)
  const addCommentOptimistic = useCallback(
    async (text, userName = "You") => {
      try {
        setCommentLoading(true);
        setError(null);

        const tempId = `temp-${Date.now()}`;

        // Optimistically add comment
        setOptimisticComments((prev) => [
          {
            id: tempId,
            text,
            user_name: userName,
            created_at: new Date().toISOString(),
            isOptimistic: true,
          },
          ...prev,
        ]);

        // Call API
        const response = await addComment(shoutoutId, text);

        // Replace optimistic with real comment
        setOptimisticComments((prev) =>
          prev.map((c) => (c.id === tempId ? response : c))
        );

        return response;
      } catch (err) {
        setError(err.message || "Failed to add comment");
        // Revert optimistic update
        setOptimisticComments((prev) =>
          prev.filter((c) => !c.isOptimistic)
        );
        console.error("Comment error:", err);
        throw err;
      } finally {
        setCommentLoading(false);
      }
    },
    [shoutoutId]
  );

  // Delete comment (optimistic)
  const deleteCommentOptimistic = useCallback(
    async (commentId) => {
      try {
        setCommentLoading(true);
        setError(null);

        // Optimistically remove
        setOptimisticComments((prev) =>
          prev.filter((c) => c.id !== commentId)
        );

        // Call API
        await deleteComment(commentId);
      } catch (err) {
        setError(err.message || "Failed to delete comment");
        // Note: Don't re-add on error - just show error toast
        console.error("Delete comment error:", err);
        throw err;
      } finally {
        setCommentLoading(false);
      }
    },
    []
  );

  return {
    optimisticReactions,
    optimisticComments,
    reactingLoading,
    commentLoading,
    error,
    toggleReaction,
    addCommentOptimistic,
    deleteCommentOptimistic,
  };
};

export default useReactions;
