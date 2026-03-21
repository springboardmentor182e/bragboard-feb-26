import api from "./api";

export const getEmployees   = () => api.get("/employees");

// ADDED: was missing — useLeaderboard.js imports this and crashed without it
export const getLeaderboard = () => api.get("/employees/leaderboard");
