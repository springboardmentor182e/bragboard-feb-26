import React, { createContext, useState } from "react";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {

  const [employees, setEmployees] = useState([
    { id: 1, name: "Rahul Sharma", role: "Frontend Developer", department: "IT", recognition: 5 },
    { id: 2, name: "Priya Patel", role: "Data Analyst", department: "Analytics", recognition: 3 },
    { id: 3, name: "Amit Singh", role: "Backend Developer", department: "IT", recognition: 7 },
    { id: 4, name: "Sneha Gupta", role: "Business Analyst", department: "Analytics", recognition: 4 },
    { id: 5, name: "Neha Gupta", role: "UI Designer", department: "Design", recognition: 2 },
    { id: 6, name: "Rohan Mehta", role: "Project Manager", department: "Management", recognition: 6 },
    { id: 7, name: "Anjali Verma", role: "QA Engineer", department: "Testing", recognition: 1 },
    { id: 8, name: "Karan Kapoor", role: "DevOps Engineer", department: "IT", recognition: 3 },
    { id: 9, name: "Sneha Reddy", role: "HR Executive", department: "HR", recognition: 2 },
    { id: 10, name: "Vikram Nair", role: "System Administrator", department: "IT", recognition: 4 },
    { id: 11, name: "Pooja Iyer", role: "Business Analyst", department: "Analytics", recognition: 3 },
    { id: 12, name: "Aditya Joshi", role: "Full Stack Developer", department: "IT", recognition: 5 },
    { id: 13, name: "Meera Nanda", role: "Product Manager", department: "Management", recognition: 6 },
    { id: 14, name: "Arjun Desai", role: "Mobile Developer", department: "IT", recognition: 4 },
    { id: 15, name: "Kavita Rao", role: "Content Writer", department: "Marketing", recognition: 2 },
    { id: 16, name: "Suresh Kumar", role: "Support Engineer", department: "Support", recognition: 1 },
    { id: 17, name: "Divya Shah", role: "SEO Specialist", department: "Marketing", recognition: 3 },
    { id: 18, name: "Manish Yadav", role: "Network Engineer", department: "IT", recognition: 2 },
    { id: 19, name: "Aisha Khan", role: "Graphic Designer", department: "Design", recognition: 5 },
    { id: 20, name: "Ravi Verma", role: "Security Analyst", department: "IT", recognition: 3 }
  ]);

  /* -------------------- CRUD OPERATIONS -------------------- */

  const addEmployee = (emp) => {
    const newEmployee = {
      id: Date.now(),
      ...emp,
      recognition: 0
    };
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter(emp => emp.id !== id));
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees((prev) =>
      prev.map(emp =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  /* -------------------- BRAGBOARD FEATURE -------------------- */

  const giveRecognition = (id) => {
    setEmployees((prev) =>
      prev.map(emp =>
        emp.id === id
          ? { ...emp, recognition: emp.recognition + 1 }
          : emp
      )
    );
  };

  /* -------------------- DASHBOARD STATS -------------------- */

  const totalEmployees = employees.length;

  const departments = [...new Set(employees.map(e => e.department))];

  const totalDepartments = departments.length;

  const topEmployees = [...employees]
    .sort((a, b) => b.recognition - a.recognition)
    .slice(0, 5);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        deleteEmployee,
        updateEmployee,
        giveRecognition,
        totalEmployees,
        totalDepartments,
        topEmployees
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};