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

// ✅ NEW: Submit a report for a shoutout
export const reportShoutout = async (shoutoutId, reason, description = "", priority = "LOW") => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("Not authenticated. Please log in to report a shoutout.");
  }

  // Decode token to get user ID (simple JWT decode without external lib)
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  const payload = JSON.parse(jsonPayload);
  const reportedBy = payload.user_id;

  const reportData = {
    shoutout_id: shoutoutId,
    reported_by: reportedBy,
    reason,
    description,
    priority,
  };

  const res = await API.post("/reports/", reportData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};