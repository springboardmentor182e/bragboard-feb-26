import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
});

export const fetchUsers = async () => {
  const res = await API.get("/users/");
  return res.data;
};

export const fetchLeaderboard = async () => {
  const res = await API.get("/users/leaderboard");
  return res.data;
};