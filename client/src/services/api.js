import axios from 'axios';

// Use localhost for development, Render URL for production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const adminAPI = {
  // Dashboard Stats
  getDashboardStats: () => API.get('/api/admin/dashboard/stats'),
  
  // User Management
  getAllUsers: () => API.get('/api/admin/users'),
  
  // Activity Logs
  getActivityLogs: () => API.get('/api/admin/activities'),
  
  // Reports (with optional status filter)
  getReports: (status = null) => {
    const url = status ? `/api/admin/reports?status=${status}` : '/api/admin/reports';
    return API.get(url);
  },
  
  // Top Contributors
  getTopContributors: () => API.get('/api/admin/contributors/top'),
  
  // Resolve Report
  resolveReport: (reportId) => API.post(`/api/admin/reports/${reportId}/resolve`),
  
  // Delete Post - Fixed URL
  deletePost: (postId) => {
    const url = `/api/admin/posts/${postId}`;
    console.log('Deleting post:', API_BASE_URL + url);
    return API.delete(url);
  }
};

export default API;