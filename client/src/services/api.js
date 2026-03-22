import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

// attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// refresh token
API.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const refresh = localStorage.getItem("refresh_token");

      const res = await axios.post("http://localhost:8000/refresh", {
        token: refresh,
      });

      localStorage.setItem("access_token", res.data.access_token);

      err.config.headers.Authorization = `Bearer ${res.data.access_token}`;
      return API(err.config);
    }
  }
);

// APIs
export const loginUser = (data) => API.post("/login", data);
export const createShoutout = (data) => API.post("/shoutout", data);
export const getShoutouts = () => API.get("/shoutouts");

export default API;