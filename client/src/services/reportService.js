import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Optional: response error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response || error.message);
    return Promise.reject(error);
  }
);

/*
GET ALL REPORTS
*/
export const fetchReports = async () => {
  const res = await API.get("/reports/");
  return res.data;
};

/*
DELETE REPORT
*/
export const deleteReport = async (reportId) => {
  const res = await API.delete(`/reports/${reportId}`);
  return res.data;
};

/*
UPDATE REPORT STATUS
*/
export const updateReportStatus = async (reportId, status) => {
  const res = await API.put(`/reports/${reportId}/status`, null, {
    params: { status },
  });
  return res.data;
};