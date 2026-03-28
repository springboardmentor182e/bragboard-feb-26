import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

/* LOGIN */
export const loginUser = async (data) => {
  const res = await axios.post(`${API}/auth/login`, data);
  return res.data; // ✅ returns { access_token }
};

/* SIGNUP */
export const signupUser = async (data) => {
  const res = await axios.post(`${API}/auth/signup`, data);
  return res.data;
};

/* GET CURRENT USER */
export const getMe = async (token) => {
  const res = await axios.get(`${API}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; // ✅ returns user directly
};