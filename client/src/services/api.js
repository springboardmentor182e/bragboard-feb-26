import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});


// 🔐 Attach access token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// 🔄 Auto refresh token if expired
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refresh_token");

        const res = await axios.post("http://localhost:8000/refresh", {
          token: refreshToken,
        });

        localStorage.setItem("access_token", res.data.access_token);

        error.config.headers.Authorization = `Bearer ${res.data.access_token}`;
        return axios(error.config);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);


// ✅ Your existing APIs (keep them)
export const loginUser = (data) => API.post("/login", data);
export const registerUser = (data) => API.post("/register", data);

// ➕ Add more APIs
export const getShoutouts = () => API.get("/shoutouts");
export const createShoutout = (data) => API.post("/shoutout", data);

export default API;