import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const getBrags = () => {
  return axios.get(`${API}/brags`);
};

export const createBrag = (data) => {
  return axios.post(`${API}/brags`, data);
};

export const likeBrag = (id) => {
  return axios.post(`${API}/brags/${id}/like`);
};