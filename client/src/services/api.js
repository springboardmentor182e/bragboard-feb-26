import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add Authorization header to all requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const adminAPI = {
  // Existing functions
  getDashboardStats: () => API.get('/api/admin/dashboard/stats'),
  getAllUsers: () => API.get('/api/admin/users'),
  getActivityLogs: () => API.get('/api/admin/activities'),
  getReports: (status = null) => {
    const url = status ? `/api/admin/reports?status=${status}` : '/api/admin/reports';
    return API.get(url);
  },
  getTopContributors: () => {
    return API.get('/api/admin/contributors/top');
  },
  // NEW: Get comprehensive engagement analytics
  getEngagementAnalytics: () => {
    return API.get('/api/admin/engagement/analytics');
  },
  // Report/Post functions
  resolveReport: (reportId) => API.post(`/api/admin/reports/${reportId}/resolve`),
  
  // FIXED: Use backticks ` ` for template literals, not single quotes ' '
  deletePost: (postId) => {
    const url = `/api/admin/posts/${postId}`;  // ✅ Fixed: backticks with variable
    console.log('Calling delete URL:', 'https://bragboard-feb-26.onrender.com/api' + url);
    return API.delete(url);
  }
};

export default API;