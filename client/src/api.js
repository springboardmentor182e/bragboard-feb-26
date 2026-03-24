import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ✅ GET all reports
export const fetchReports = () => API.get("/");

// ✅ DELETE
export const deleteReport = (id) => API.delete(`/${id}`);

// ✅ CREATE
export const createReport = (data) => API.post("/", data);

// ✅ UPDATE
export const updateReport = (id, data) => API.put(`/${id}`, data);