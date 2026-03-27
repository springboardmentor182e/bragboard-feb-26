import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

/* LOGIN */
export const loginUser = (data) =>
  axios.post(`${API}/api/v1/auth/login`, data);

/* SIGNUP */
export const signupUser = (data) =>
  axios.post(`${API}/api/v1/auth/signup`, data);

/* GET CURRENT USER */
export const getMe = (token) =>
  axios.get(`${API}/api/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });