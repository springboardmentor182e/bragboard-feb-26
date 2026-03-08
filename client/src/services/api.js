import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
});

export const adminAPI = {
  // Existing functions
  getDashboardStats: () => API.get('/admin/dashboard/stats'),
  getAllUsers: () => API.get('/admin/users'),
  getActivityLogs: () => API.get('/admin/activities'),
  getReports: () => API.get('/admin/reports'),
  
  // Report/Post functions
  resolveReport: (reportId) => API.post(`/admin/reports/${reportId}/resolve`),
  deletePost: (postId) => {
  const url = `/admin/posts/${postId}`;  // Sirf yeh change
  console.log('Calling delete URL:', 'http://localhost:8000/api' + url);
  return API.delete(url);
}
};

export default API;