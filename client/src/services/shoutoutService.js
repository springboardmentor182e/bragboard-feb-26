import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
});

/*
CREATE SHOUTOUT
*/
export const createShoutout = async (data) => {
  const res = await API.post("/shoutouts/", null, {
    params: data,
  });
  return res.data;
};

/*
GET ALL SHOUTOUTS (FEED)
*/
export const fetchShoutouts = async () => {
  const res = await API.get("/shoutouts/");
  return res.data;
};

/*
GET USER SHOUTOUTS
*/
export const fetchUserShoutouts = async (userId) => {
  const res = await API.get(`/shoutouts/user/${userId}`);
  return res.data;
};