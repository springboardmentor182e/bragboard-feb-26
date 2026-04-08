import axios from "axios";

// ✅ Create API instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // from .env
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ✅ DEBUG (remove later)
console.log("🔥 API BASE URL:", import.meta.env.VITE_API_URL);

// ✅ Request interceptor (optional but useful)
api.interceptors.request.use(
  (config) => {
    console.log("🚀 Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error(
      `❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default api;