import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const getAchievements = () =>
  API.get("/achievements/");

export const addAchievement = (data) =>
  API.post("/achievements/", data);

export const deleteAchievement = (id) =>
  API.delete(`/achievements/${id}`);