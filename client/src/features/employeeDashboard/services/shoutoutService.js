import api from "./api";

/** Fetch all shoutouts */
export const getShoutouts = () => api.get("/shoutouts/");

/** Fetch shoutouts received by a specific employee */
export const getShoutoutsByEmployee = (employeeId) =>
  api.get(`/shoutouts/employee/${employeeId}`);

/** Create a new shoutout */
export const createShoutout = (data) => api.post("/shoutouts/", data);

/** React to a shoutout (likes / claps / stars) */
export const reactToShoutout = (id, reaction) =>
  api.patch(`/shoutouts/${id}/react`, { reaction });

/** Delete a shoutout */
export const deleteShoutout = (id) => api.delete(`/shoutouts/${id}`);
