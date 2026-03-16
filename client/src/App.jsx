import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './features/admin-dash/pages/AdminDashboard';
import Sidebar_admin from './layout/Sidebar';
import Navbar from './layout/Navbar';
import Sidebar from "./features/employeeDashboard/components/Sidebar";
import TopNavbar from "./features/employeeDashboard/components/TopNavbar";
import SummaryCards from "./features/employeeDashboard/components/SummaryCards";
import AchievementTable from "./features/employeeDashboard/components/AchievementTable";
import Leaderboard from "./features/employeeDashboard/components/Leaderboard";
import AdminEmployees from "./pages/AdminEmployees";

function Layout({ children }) {
// Employee Dashboard Layout Component
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

// Employee Dashboard Main Component
function EmployeeDashboard() {
  return (
    <>
      <SummaryCards />
      <AchievementTable />
      <Leaderboard />
    </>
  );
}

// Admin Layout Component
function AdminLayout({ children }) {
  return (
    <div className="relative">
      <Sidebar_admin />
      <div className="ml-64">
        <Navbar />
        <main className="min-h-screen bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <AdminLayout>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="employees" element={<AdminEmployees />} />
            </Routes>
          </AdminLayout>
        } />
        
        {/* Employee Routes - Default route */}
        <Route path="/*" element={
          <EmployeeLayout>
            <Routes>
              <Route path="/" element={<EmployeeDashboard />} />
              <Route path="feed" element={<EmployeeDashboard />} />
              <Route path="leaderboard" element={<div>Leaderboard Page</div>} />
              <Route path="team" element={<div>Team Page</div>} />
              <Route path="badges" element={<div>Badges Page</div>} />
              <Route path="analytics" element={<div>Analytics Page</div>} />
            </Routes>
          </EmployeeLayout>
        } />

        {/* Employee Area */}
        <Route
          path="/"
          element={
            <Layout>
              <EmployeeDashboard />
            </Layout>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <Layout>
              <AdminEmployees />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;