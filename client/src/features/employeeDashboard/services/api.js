import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Global error interceptor — logs all failed requests in one place
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      `[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
      error.response?.data ?? error.message
    );
    return Promise.reject(error);
  }
);

export default api;
