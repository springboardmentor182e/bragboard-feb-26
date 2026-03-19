import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

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