import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './features/admin-dash/pages/AdminDashboard';
import AdminSidebar from './layout/AdminSidebar';
import AdminTopbar from './layout/AdminTopbar';
import Navbar from './layout/Navbar';
import Sidebar from "./layout/Sidebar";
import SummaryCards from "./features/employeeDashboard/components/SummaryCards";
import AchievementTable from "./features/employeeDashboard/components/AchievementTable";
import Leaderboard from "./features/employeeDashboard/components/Leaderboard";
import AdminEmployees from "./pages/AdminEmployees";
import MyShoutouts from "./pages/MyShoutouts";

// Employee Layout 
function EmployeeLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
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
    <div className="bg-[#EEF2F7] min-h-screen">
      <div className="fixed top-0 left-0 h-full w-72 z-50">
        <AdminSidebar />
      </div>
      <div className="ml-72 min-h-screen">
        <AdminTopbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* Admin Routes - Flat */}
        <Route path="/" element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        } />
        <Route path="/admin/employees" element={
          <AdminLayout>
            <AdminEmployees />
          </AdminLayout>
        } />

        {/* Employee Routes - Flat */}
        <Route path="/employee" element={
          <EmployeeLayout>
            <EmployeeDashboard />
          </EmployeeLayout>
        } />
        <Route path="/feed" element={
          <EmployeeLayout>
            <EmployeeDashboard />
          </EmployeeLayout>
        } />
        <Route path="/leaderboard" element={
          <EmployeeLayout>
            <div>Leaderboard Page</div>
          </EmployeeLayout>
        } />
        <Route path="/team" element={
          <EmployeeLayout>
            <div>Team Page</div>
          </EmployeeLayout>
        } />
        <Route path="/badges" element={
          <EmployeeLayout>
            <div>Badges Page</div>
          </EmployeeLayout>
        } />
        <Route path="/analytics" element={
          <EmployeeLayout>
            <div>Analytics Page</div>
          </EmployeeLayout>
        } />
        <Route path="/my-shoutouts" element={
          <EmployeeLayout>
            <MyShoutouts />
          </EmployeeLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;