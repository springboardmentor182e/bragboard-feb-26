import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminDashboard from "./features/admin-dash/pages/AdminDashboard";
import AdminEmployees from "./pages/AdminEmployees";

import SidebarAdmin from "./layout/Sidebar";
import Navbar from "./layout/Navbar";

import Sidebar from "./features/employeeDashboard/components/Sidebar";
import TopNavbar from "./features/employeeDashboard/components/TopNavbar";
import SummaryCards from "./features/employeeDashboard/components/SummaryCards";
import AchievementTable from "./features/employeeDashboard/components/AchievementTable";
import Leaderboard from "./features/employeeDashboard/components/Leaderboard";


/* ---------------- Employee Layout ---------------- */
function EmployeeLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNavbar />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}


/* ---------------- Employee Dashboard ---------------- */
function EmployeeDashboard() {
  return (
    <>
      <SummaryCards />
      <AchievementTable />
      <Leaderboard />
    </>
  );
}


/* ---------------- Admin Layout ---------------- */
function AdminLayout({ children }) {
  return (
    <div className="relative">
      <SidebarAdmin />
      <div className="ml-64">
        <Navbar />
        <main className="min-h-screen bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}


/* ---------------- Main App ---------------- */
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/employees"
          element={
            <AdminLayout>
              <AdminEmployees />
            </AdminLayout>
          }
        />


        {/* Employee Routes */}
        <Route
          path="/"
          element={
            <EmployeeLayout>
              <EmployeeDashboard />
            </EmployeeLayout>
          }
        />

        <Route
          path="/feed"
          element={
            <EmployeeLayout>
              <EmployeeDashboard />
            </EmployeeLayout>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <EmployeeLayout>
              <Leaderboard />
            </EmployeeLayout>
          }
        />

        <Route
          path="/team"
          element={
            <EmployeeLayout>
              <div>Team Page</div>
            </EmployeeLayout>
          }
        />

        <Route
          path="/badges"
          element={
            <EmployeeLayout>
              <div>Badges Page</div>
            </EmployeeLayout>
          }
        />

        <Route
          path="/analytics"
          element={
            <EmployeeLayout>
              <div>Analytics Page</div>
            </EmployeeLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;