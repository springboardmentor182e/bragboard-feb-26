import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

export const getLeaderboard = () => API.get("/leaderboard");
export const addPlayer = (player) => API.post("/leaderboard", player);
