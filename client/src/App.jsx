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
import MyShoutouts from "./pages/MyShoutouts"; // your page

// Employee Layout
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

// Employee Dashboard
function EmployeeDashboard() {
  return (
    <>
      <SummaryCards />
      <AchievementTable />
      <Leaderboard />
    </>
  );
}

// Admin Layout
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
        <Route
          path="/admin/*"
          element={
            <AdminLayout>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="employees" element={<AdminEmployees />} />
              </Routes>
            </AdminLayout>
          }
        />

        {/* Employee Routes */}
        <Route
          path="/*"
          element={
            <EmployeeLayout>
              <Routes>
                <Route path="/" element={<EmployeeDashboard />} />
                <Route path="feed" element={<EmployeeDashboard />} />
                <Route path="leaderboard" element={<div>Leaderboard Page</div>} />
                <Route path="team" element={<div>Team Page</div>} />
                <Route path="badges" element={<div>Badges Page</div>} />
                <Route path="analytics" element={<div>Analytics Page</div>} />
                <Route path="my-shoutouts" element={<MyShoutouts />} /> 
              </Routes>
            </EmployeeLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;