import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getDashboard = async (token) => {
  return axios.get(`${API}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getUsers = async (token) => {
  return axios.get(`${API}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateUserRole = async (id, role, token) => {
  return axios.put(`${API}/users/${id}/role?role=${role}`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
