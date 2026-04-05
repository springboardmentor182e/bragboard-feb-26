import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getAchievements = () =>
  API.get("/achievements/");

export const addAchievement = (data) =>
  API.post("/achievements/", data);

export const deleteAchievement = (id) =>
  API.delete(`/achievements/${id}`);