import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './features/admin-dash/pages/AdminDashboard';
import Sidebar from './layout/Sidebar';
import Navbar from './layout/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./features/employeeDashboard/components/Sidebar";
import TopNavbar from "./features/employeeDashboard/components/TopNavbar";
import SummaryCards from "./features/employeeDashboard/components/SummaryCards";
import AchievementTable from "./features/employeeDashboard/components/AchievementTable";
import Leaderboard from "./features/employeeDashboard/components/Leaderboard";
import AdminEmployees from "./pages/AdminEmployees";

function Layout({ children }) {
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

function EmployeeDashboard() {
  return (
    <>
      <SummaryCards />
      <AchievementTable />
      <Leaderboard />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* Main container - relative */}
      <div className="relative">
        {/* Sidebar - fixed left */}
        <Sidebar />
        
        {/* Main content - sidebar ke right me */}
        <div className="ml-64">
          {/* Navbar - top par */}
          <Navbar />
          
          {/* Dashboard content - navbar ke neeche */}
          <main className="min-h-screen bg-gray-100 p-6">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
        </div>
      </div>
      <Routes>
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