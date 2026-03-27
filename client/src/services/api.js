import axios from 'axios';

<<<<<<< HEAD
const rawBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
const normalizedBaseURL = rawBaseURL.replace(/\/+$/, '');
const apiBaseURL = normalizedBaseURL.endsWith('/api')
  ? normalizedBaseURL
  : `${normalizedBaseURL}/api`;

const API = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json',
=======
const API = axios.create({
  baseURL: 'https://bragboard-feb-26.onrender.com/api',
  headers: {
    "Content-Type": "application/json",
>>>>>>> 9def645b3f2547c06c6666b8af8938b41243d563
  },
  timeout: 10000,
});

<<<<<<< HEAD
// Function-style exports follow the structure used in employeeService.js
export const fetchDashboardStats = async () => {
  try {
    const res = await API.get('/admin/dashboard/stats');
    return res.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

export const fetchAllUsers = async () => {
  try {
    const res = await API.get('/admin/users');
    return res.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchActivityLogs = async () => {
  try {
    const res = await API.get('/admin/activities');
    return res.data;
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    throw error;
  }
};

export const fetchReports = async (status = null) => {
  try {
    const url = status ? `/admin/reports?status=${status}` : '/admin/reports';
    const res = await API.get(url);
    return res.data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};

export const fetchTopContributors = async () => {
  try {
    const res = await API.get('/admin/contributors/top');
    return res.data;
  } catch (error) {
    console.error('Error fetching top contributors:', error);
    throw error;
  }
};

export const resolveReport = async (reportId) => {
  try {
    const res = await API.post(`/admin/reports/${reportId}/resolve`);
    return res.data;
  } catch (error) {
    console.error('Error resolving report:', error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const url = `/admin/posts/${postId}`; // keep the same logic
    console.log('Calling delete URL:', 'https://baseURL/api' + url);
    const res = await API.delete(url);
    return res.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// alias to keep naming from ReportedPosts
export const deleteReport = deletePost;

// Preserve the `adminAPI` object for backward compatibility with existing imports
export const adminAPI = {
  getDashboardStats: fetchDashboardStats,
  getAllUsers: fetchAllUsers,
  getActivityLogs: fetchActivityLogs,
  getReports: fetchReports,
  getTopContributors: fetchTopContributors,
  resolveReport: resolveReport,
  deletePost: deletePost,
};

// export default API;
=======
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
>>>>>>> 9def645b3f2547c06c6666b8af8938b41243d563
