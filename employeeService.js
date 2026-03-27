// services/EmployeeService.js

const STORAGE_KEY = "employees";

/* Get All Employees */
export const getEmployees = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/* Save Employees */
const saveEmployees = (employees) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
};

/* Add Employee */
export const addEmployee = (employee) => {
  const employees = getEmployees();

  const newEmployee = {
    id: Date.now(),
    recognition: 0,
    ...employee
  };

  const updated = [...employees, newEmployee];

  saveEmployees(updated);

  return updated;
};

/* Delete Employee */
export const deleteEmployee = (id) => {
  const employees = getEmployees();

  const updated = employees.filter((emp) => emp.id !== id);

  saveEmployees(updated);

  return updated;
};

/* Update Employee */
export const updateEmployee = (updatedEmployee) => {
  const employees = getEmployees();

  const updated = employees.map((emp) =>
    emp.id === updatedEmployee.id ? updatedEmployee : emp
  );

  saveEmployees(updated);

  return updated;
};

/* Give Recognition */
export const giveRecognition = (id) => {
  const employees = getEmployees();

  const updated = employees.map((emp) =>
    emp.id === id
      ? { ...emp, recognition: emp.recognition + 1 }
      : emp
  );

  saveEmployees(updated);

  return updated;
};