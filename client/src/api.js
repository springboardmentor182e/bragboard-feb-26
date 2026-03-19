import axios from "axios";

const API_URL = "https://bragboard-feb-26.onrender.com/";

export const getShoutouts = () => {
  return axios.get(API_URL);
};

export const deleteShoutout = (id) => {
  return axios.delete(`${API_URL}/${id}`);
}; 