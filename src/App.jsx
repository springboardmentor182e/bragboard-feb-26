import React from "react";
import "./App.css";

function App() {
  const employees = [
    { id: 1, name: "Rahul Sharma", role: "Frontend Developer", department: "IT" },
    { id: 2, name: "Priya Patel", role: "Data Analyst", department: "Analytics" },
    { id: 3, name: "Amit Singh", role: "Backend Developer", department: "IT" }
  ];

  return (
    <div className="container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>Dashboard</li>
          <li>Employees</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </div>

      {/* Main Section */}
      <div className="main">

        <div className="navbar">
          <h1>Employee Dashboard</h1>
          <div className="profile">Admin</div>
        </div>

        {/* Cards */}
        <div className="cards">

          <div className="card blue">
            <h3>Total Employees</h3>
            <p>{employees.length}</p>
          </div>

          <div className="card green">
            <h3>Departments</h3>
            <p>2</p>
          </div>

          <div className="card purple">
            <h3>Active Users</h3>
            <p>{employees.length}</p>
          </div>

        </div>

        {/* Table */}
        <div className="table-box">
          <h2>Employee List</h2>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.role}</td>
                  <td>{emp.department}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default App;