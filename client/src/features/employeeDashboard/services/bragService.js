import axios from "axios";

const API = "http://localhost:8000/brags";

export const getBrags = () => axios.get(API);
export const createBrag = (data) => axios.post(API, data);