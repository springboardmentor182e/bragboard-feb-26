import axios from 'axios';

const API = axios.create({
  baseURL: 'https://bragboard-feb-26.onrender.com/api',
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const adminAPI = {
  // Existing functions
  getDashboardStats: () => API.get('/admin/dashboard/stats'),
  getAllUsers: () => API.get('/admin/users'),
  getActivityLogs: () => API.get('/admin/activities'),
getReports: (status = null) => {
  const url = status ? `/admin/reports?status=${status}` : '/admin/reports';
  return API.get(url);
},  getTopContributors: () => {
    return API.get('/admin/contributors/top');
  },
  // Report/Post functions
  resolveReport: (reportId) => API.post(`/admin/reports/${reportId}/resolve`),
  
  // FIXED: Use backticks ` ` for template literals, not single quotes ' '
  deletePost: (postId) => {
    const url = `/admin/posts/${postId}`;  // ✅ Fixed: backticks with variable
    console.log('Calling delete URL:', 'https://bragboard-feb-26.onrender.com/api' + url);
    return API.delete(url);
  }
};

export default API;
