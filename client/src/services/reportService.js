import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response || error.message);
    return Promise.reject(error);
  }
);

export const fetchReports = async () => {
  const res = await API.get("/reports/");
  return res.data;
};

export const deleteReport = async (reportId) => {
  const res = await API.delete(`/reports/${reportId}`);
  return res.data;
};

export const updateReportStatus = async (reportId, status) => {
  const res = await API.put(`/reports/${reportId}/status`, null, {
    params: { status },
  });
  return res.data;
};

// ✅ NEW API CALL
export const fetchAvgResponseTime = async () => {
  const res = await API.get("/reports/stats/avg-response-time");
  return res.data.avg_response_time;
};