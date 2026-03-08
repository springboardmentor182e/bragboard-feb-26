import axios from "axios";

const API_URL = "http://127.0.0.1:8000/shoutouts";

export const getShoutouts = () => {
  return axios.get(API_URL);
};

export const approveShoutout = (id) => {
  return axios.put(`${API_URL}/approve/${id}`);
};

export const rejectShoutout = (id) => {
  return axios.put(`${API_URL}/reject/${id}`);
};

export const deleteShoutout = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};