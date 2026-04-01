import axios from "axios";

/*
Base Axios Instance
*/
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
GET ALL EMPLOYEES
*/
export const fetchEmployees = async () => {
  try {
    const res = await API.get("/users/");
    return res.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

/*
ADD NEW EMPLOYEE
*/
export const createEmployee = async (employee) => {
  try {
    const res = await API.post("/users/", employee);
    return res.data;
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
};

/*
TOGGLE USER STATUS
Active <-> Suspended
*/
export const toggleEmployeeStatus = async (id) => {
  try {
    const res = await API.put(`/users/${id}/toggle-status`);
    return res.data;
  } catch (error) {
    console.error("Error toggling employee status:", error);
    throw error;
  }
};

/*
UPDATE EMPLOYEE ROLE
*/
export const updateEmployeeRole = async (id, role) => {
  try {
    const res = await API.put(`/users/${id}/role`, null, {
      params: { role },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating employee role:", error);
    throw error;
  }
};

/*
UPDATE EMPLOYEE DEPARTMENT
*/
export const updateEmployeeDepartment = async (id, department) => {
  try {
    const res = await API.put(`/users/${id}/department`, null, {
      params: { department },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating employee department:", error);
    throw error;
  }
};

/*
DELETE EMPLOYEE
*/
export const deleteEmployee = async (id) => {
  try {
    const res = await API.delete(`/users/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};