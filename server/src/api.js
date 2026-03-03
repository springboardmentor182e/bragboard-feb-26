import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getShoutouts = () => API.get("/shoutouts");

export const approveShoutout = (id) =>
  API.patch(`/shoutouts/${id}/approve`);

export const rejectShoutout = (id) =>
  API.patch(`/shoutouts/${id}/reject`);

export const deleteShoutout = (id) =>
  API.delete(`/shoutouts/${id}`);