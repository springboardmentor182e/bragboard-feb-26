import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const API = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// ─── AUTH TOKEN ATTACH ───────────────────────────────────────
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── DASHBOARD ───────────────────────────────────────────────
export const getDashboardStats   = ()          => API.get("/api/admin/dashboard/stats");
export const getTopContributors  = (limit = 5) => API.get(`/api/admin/contributors/top?limit=${limit}`);
export const getDepartmentStats  = ()          => API.get("/api/admin/stats/departments");

// ─── SHOUTOUTS ───────────────────────────────────────────────
export const getAdminShoutouts   = (params = {}) => API.get("/api/admin/shoutouts", { params });
export const getShoutoutStats    = ()             => API.get("/api/admin/shoutouts/stats");
export const deleteAdminShoutout = (id)           => API.delete(`/api/admin/shoutouts/${id}`);
export const approveShoutout     = (id)           => API.put(`/api/admin/shoutouts/${id}/approve`);
export const rejectShoutout      = (id)           => API.put(`/api/admin/shoutouts/${id}/reject`);

// ─── USERS / EMPLOYEES ───────────────────────────────────────
export const getAdminUsers       = ()             => API.get("/api/admin/users");
export const createAdminUser     = (data)         => API.post("/api/admin/users", data);
export const toggleUserStatus    = (id)           => API.put(`/api/admin/users/${id}/toggle-status`);
export const updateUserRole      = (id, role)     => API.put(`/api/admin/users/${id}/role`, null, { params: { role } });
export const deleteAdminUser     = (id)           => API.delete(`/api/admin/users/${id}`);

// ─── REPORTS ─────────────────────────────────────────────────
export const getAdminReports     = (params = {}) => API.get("/api/admin/reports", { params });
export const getReportStats      = ()            => API.get("/api/admin/reports/stats");
export const resolveReport       = (id)          => API.post(`/api/admin/reports/${id}/resolve`);
export const setReportStatus     = (id, status)  => API.put(`/api/admin/reports/${id}/status`, null, { params: { status } });
export const deleteAdminReport   = (id)          => API.delete(`/api/admin/reports/${id}`);

export default API;
