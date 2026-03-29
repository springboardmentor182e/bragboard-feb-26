import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ from .env
  timeout: 10000,
});

// 🔥 Debug (important)
console.log("🔥 API BASE URL:", import.meta.env.VITE_API_URL);

// =========================
// EMPLOYEE APIs
// =========================
export const employeeAPI = {
  getLeaderboard: () => API.get("/employees/leaderboard"),
  getEmployees: () => API.get("/employees"),
};

// =========================
// ADMIN APIs
// =========================
export const adminAPI = {
  getDashboardStats: () => API.get("/admin/dashboard/stats"),
  getAllUsers: () => API.get("/admin/users"),
  getActivityLogs: () => API.get("/admin/activities"),

  getReports: (status = null) => {
    const url = status
      ? `/admin/reports?status=${status}`
      : "/admin/reports";
    return API.get(url);
  },

  getTopContributors: () => API.get("/admin/contributors/top"),

  resolveReport: (reportId) =>
    API.post(`/admin/reports/${reportId}/resolve`),

  deletePost: (postId) =>
    API.delete(`/admin/posts/${postId}`),
};

export default API;