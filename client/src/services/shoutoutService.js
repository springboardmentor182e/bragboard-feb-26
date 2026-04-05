import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/**
 * Get all users for recipient search
 */
export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Create a shoutout with multiple recipients
 * @param {Object} data - Shoutout creation data
 * @param {string} data.message - Recognition message
 * @param {string} data.category - Category of recognition (Achievement, Teamwork, Innovation, Support, Leadership)
 * @param {number[]} data.recipient_ids - Array of user IDs to tag
 * @param {number} data.points - Points to award (default: 10)
 * @returns {Promise<Object>} Created shoutout with recipients
 */
export const createShoutout = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.post('/api/shoutouts', {
      message: data.message,
      category: data.category,
      recipient_ids: data.recipient_ids,
      points: data.points || 10,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating shoutout:', error);
    throw error;
  }
};

/**
 * Get user's shoutouts feed
 */
export const getUserFeed = async (limit = 20, offset = 0) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.get('/api/shoutouts/feed', {
      params: { limit, offset },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching feed:', error);
    throw error;
  }
};

/**
 * Get shoutouts given (sent) by current user
 */
export const getUserGivenShoutouts = async (limit = 20, offset = 0) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.get('/api/shoutouts/user/given', {
      params: { limit, offset },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching given shoutouts:', error);
    throw error;
  }
};

/**
 * Get shoutouts received by current user
 */
export const getUserReceivedShoutouts = async (limit = 20, offset = 0) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.get('/api/shoutouts/user/received', {
      params: { limit, offset },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching received shoutouts:', error);
    throw error;
  }
};

/**
 * Get user statistics
 */
export const getUserStats = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.get(`/api/shoutouts/stats/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};

/**
 * Get leaderboard of top users by points
 */
export const getLeaderboard = async (limit = 10, offset = 0) => {
  try {
    const response = await API.get('/api/shoutouts/leaderboard', {
      params: { limit, offset, include_pending: true },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

/**
 * Add reaction to a shoutout
 */
export const addReaction = async (shoutoutId, reactionType) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.post(
      `/api/shoutouts/${shoutoutId}/reactions`,
      {},
      {
        params: { reaction_type: reactionType },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding reaction:', error);
    throw error;
  }
};

/**
 * Remove reaction from a shoutout
 */
export const removeReaction = async (shoutoutId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.delete(
      `/api/shoutouts/${shoutoutId}/reactions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error removing reaction:', error);
    throw error;
  }
};

/**
 * Add comment to a shoutout
 */
export const addComment = async (shoutoutId, text) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.post(
      `/api/shoutouts/${shoutoutId}/comments`,
      {},
      {
        params: { text },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

/**
 * Get comments for a shoutout
 */
export const getComments = async (shoutoutId, limit = 5, offset = 0) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.get(
      `/api/shoutouts/${shoutoutId}/comments`,
      {
        params: { limit, offset },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

/**
 * Delete a comment
 */
export const deleteComment = async (commentId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.delete(
      `/api/shoutouts/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

/**
 * Edit user's own shoutout - only within 5 minutes of creation
 * @param {number} shoutoutId - ID of shoutout to edit
 * @param {string} message - Updated message
 * @param {string} category - Updated category
 * @returns {Promise<Object>} Updated shoutout data
 */
export const updateShoutout = async (shoutoutId, message, category) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.put(
      `/api/shoutouts/${shoutoutId}`,
      {
        message,
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating shoutout:', error);
    throw error;
  }
};

/**
 * Delete user's own shoutout - only within 5 minutes of creation
 * @param {number} shoutoutId - ID of shoutout to delete
 * @returns {Promise<Object>} Success message
 */
export const deleteShoutout = async (shoutoutId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.delete(
      `/api/shoutouts/${shoutoutId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting shoutout:', error);
    throw error;
  }
};

export default API;