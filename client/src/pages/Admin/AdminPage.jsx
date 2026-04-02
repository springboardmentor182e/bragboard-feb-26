import React, { useState, useEffect } from "react";
import { getDashboard, getUsers } from "../../features/admin/services/adminService";
import DashboardCards from "./DashboardCards";
import { EmployeeTable } from "./EmployeeTable";
import ReportTable from "./ReportTable";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("employees");
  const [dashboardData, setDashboardData] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getDashboard(token).then(res => setDashboardData(res.data));
    getUsers(token).then(res => setUsers(res.data));
  }, []);

  return (
    <div className="admin-page">
      <DashboardCards data={dashboardData} />

      <div className="tabs">
        <button onClick={() => setActiveTab("employees")}>Employees</button>
        <button onClick={() => setActiveTab("reports")}>Reports</button>
      </div>

      {activeTab === "employees" && <EmployeeTable users={users} />}
      {activeTab === "reports" && <ReportTable />}
    </div>
  );
};

export default AdminPage;
