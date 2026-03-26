import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const loginUser = (data) => API.post("/login", data);
export const registerUser = (data) => API.post("/register", data);
export const getShoutouts = () => API.get("/shoutouts");
export const createShoutout = (data) => API.post("/shoutout", data);

export default API;