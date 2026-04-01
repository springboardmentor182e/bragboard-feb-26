import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

/**
 * Fetch user statistics
 * @param {number} userId - The user ID
 * @returns {Promise<Object>} User stats including shoutouts sent/received, points, level, badges
 */
export const getUserStats = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/shoutouts/stats/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user stats:", error);
    throw error;
  }
};

/**
 * Fetch user's level progress with badges
 * @param {number} userId - The user ID
 * @returns {Promise<Object>} User progress including badges with unlock status
 */
export const getLevelProgress = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/shoutouts/progress/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching level progress:", error);
    throw error;
  }
};
