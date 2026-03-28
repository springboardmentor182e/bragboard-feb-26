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

/* 🔐 PASSWORD RESET */

export const forgotPassword = async (email) => {
  const res = await axios.post(`${API}/auth/forgot-password`, { email });
  return res.data; // ✅ returns { message, otp_expires }
};

export const verifyOTP = async (email, otp) => {
  const res = await axios.post(`${API}/auth/verify-otp`, { email, otp });
  return res.data; // ✅ returns { message }
};

export const resetPassword = async (email, otp, newPassword) => {
  const res = await axios.post(`${API}/auth/reset-password`, {
    email,
    otp,
    new_password: newPassword,
  });
  return res.data; // ✅ returns { message }
};