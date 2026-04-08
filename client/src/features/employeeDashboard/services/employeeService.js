import api from "./api";

export const getEmployees = () => api.get("/employees");

// ✅ FIXED
export const getLeaderboard = () =>
  api.get("/api/v1/leaderboard/leaderboard/");