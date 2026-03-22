import api from "./api";

export const getAchievementsByEmployee = (employeeId) =>
  api.get(`/achievements/employee/${employeeId}`);

export const createAchievement = (data) => api.post("/achievements/", data);

export const updateAchievement = (id, data) => api.put(`/achievements/${id}`, data);

export const deleteAchievement = (id) => api.delete(`/achievements/${id}`);
