import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const getShoutouts = () => {
  return axios.get(API_URL);
};

export const deleteShoutout = (id) => {
  return axios.delete(`${API_URL}/${id}`);
}; 