import axios from "axios";

const API_BASE = "http://localhost:8000";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// Automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token"); // make sure login stores this
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get Employees
export const getEmployees = async (
  page = 1,
  pageSize = 10,
  department = null,
  search = null
) => {
  const params = {
    page,
    page_size: pageSize,
  };

  if (department) params.department = department;
  if (search) params.search = search;

  const response = await api.get("/admin/employees", { params });
  return response.data;
};

// Get single employee
export const getEmployeeById = async (id) => {
  const response = await api.get(`/admin/employees/${id}`);
  return response.data;
};

// Create employee
export const createEmployee = async (employeeData) => {
  const response = await api.post("/admin/employees", employeeData);
  return response.data;
};

// Update employee
export const updateEmployee = async (id, employeeData) => {
  const response = await api.put(`/admin/employees/${id}`, employeeData);
  return response.data;
};

// Delete employee
export const deleteEmployee = async (id) => {
  const response = await api.delete(`/admin/employees/${id}`);
  return response.data;
};