import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getShoutouts = async () => {
  return await axios.get(`${API_BASE_URL}/admin/shoutouts`);
};

export const deleteShoutout = async (id) => {
  return await axios.delete(`${API_BASE_URL}/admin/shoutouts/${id}`);
};

export const archiveShoutout = async (id) => {
  return await axios.post(`${API_BASE_URL}/admin/shoutouts/${id}/archive`);
};

export const editShoutout = async (id, message, category) => {
  return await axios.put(`${API_BASE_URL}/admin/shoutouts/${id}`, {
    message,
    category
  });
};