import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Shoutout Service - Frontend API calls for feed, reactions, and comments
 */

// ==================== FEED ====================

export const getShoutoutFeed = async (limit = 20, offset = 0) => {
  try {
    const response = await api.get("/api/shoutouts/feed", {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching feed:", error);
    throw error;
  }
};

// ==================== REACTIONS ====================

export const addReaction = async (shoutoutId, reactionType) => {
  try {
    const response = await api.post(
      `/api/shoutouts/${shoutoutId}/reactions`,
      {},
      {
        params: { reaction_type: reactionType },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding reaction:", error);
    throw error;
  }
};

export const removeReaction = async (shoutoutId) => {
  try {
    const response = await api.delete(
      `/api/shoutouts/${shoutoutId}/reactions`
    );
    return response.data;
  } catch (error) {
    console.error("Error removing reaction:", error);
    throw error;
  }
};

export const getReactions = async (shoutoutId) => {
  try {
    const response = await api.get(
      `/api/shoutouts/${shoutoutId}/reactions`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reactions:", error);
    throw error;
  }
};

// ==================== COMMENTS ====================

export const addComment = async (shoutoutId, text) => {
  try {
    const response = await api.post(
      `/api/shoutouts/${shoutoutId}/comments`,
      {},
      {
        params: { text },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const getComments = async (shoutoutId, limit = 5, offset = 0) => {
  try {
    const response = await api.get(
      `/api/shoutouts/${shoutoutId}/comments`,
      {
        params: { limit, offset },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await api.delete(
      `/api/shoutouts/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export default api;
