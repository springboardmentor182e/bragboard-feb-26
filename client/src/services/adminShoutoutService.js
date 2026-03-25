import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getShoutouts = async () => {
  return await axios.get(`${API_BASE_URL}/admin/shoutouts`);
};

export const deleteShoutout = async (id) => {
  return await axios.delete(`${API_BASE_URL}/admin/shoutouts/${id}`);
};