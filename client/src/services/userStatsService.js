import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * User Stats Service - Fetch user statistics and leaderboard
 */

export const getUserStats = async (userId) => {
  try {
    const response = await api.get(`/api/shoutouts/stats/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user stats:", error);
    throw error;
  }
};

export const getLeaderboard = async (limit = 10, offset = 0) => {
  try {
    const response = await api.get("/api/users/leaderboard", {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
};

export default api;
