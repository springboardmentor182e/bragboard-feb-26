import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8000"
});

export const getLeaderboard = () => API.get("/leaderboard");
export const addPlayer = (player) => API.post("/player", player);