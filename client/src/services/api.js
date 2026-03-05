import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:8000/api', // Your FastAPI backend URL
  timeout: 10000, // 10 seconds timeout
});

// Admin API endpoints
export const adminAPI = {
  // Dashboard stats
  getDashboardStats: () => API.get('/admin/dashboard/stats'),
  
  // User management
  getAllUsers: () => API.get('/admin/users'),
  getUserById: (id) => API.get(`/admin/users/${id}`),
  createUser: (userData) => API.post('/admin/users', userData),
  updateUser: (id, userData) => API.put(`/admin/users/${id}`, userData),
  deleteUser: (id) => API.delete(`/admin/users/${id}`),
  
  // Activity logs
  getActivityLogs: () => API.get('/admin/activities'),
  
  // Reports
  getReports: () => API.get('/admin/reports'),
  createReport: (reportData) => API.post('/admin/reports', reportData),
};

export default API;