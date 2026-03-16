import axios from "axios";

const API = "http://127.0.0.1:8000/employees";

export const getEmployees = () => axios.get(API);