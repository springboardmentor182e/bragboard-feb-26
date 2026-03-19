import axios from "axios";
const API = axios.create({
  baseURL: "http://127.0.0.1:8000"
});
export const getLeaderboard = () => API.get("/leaderboard");
export const addPlayer = (player) => API.post("/leaderboard", player);