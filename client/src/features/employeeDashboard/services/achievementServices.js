import api from "./api";

/** Fetch all achievements for an employee */
export const getAchievementsByEmployee = (employeeId) =>
  api.get(`/achievements/employee/${employeeId}`);

/** Create a new achievement */
export const createAchievement = (data) => api.post("/achievements/", data);

/** Update an existing achievement */
export const updateAchievement = (id, data) => api.put(`/achievements/${id}`, data);

/** Delete an achievement */
export const deleteAchievement = (id) => api.delete(`/achievements/${id}`);