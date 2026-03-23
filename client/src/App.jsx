import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./features/employeeDashboard/components/Sidebar";
import TopNavbar from "./features/employeeDashboard/components/TopNavbar";
import SummaryCards from "./features/employeeDashboard/components/SummaryCards";
import AchievementTable from "./features/employeeDashboard/components/AchievementTable";
import Leaderboard from "./features/employeeDashboard/components/Leaderboard";
import AdminDashboard from "./features/admin-dash/pages/AdminDashboard.jsx";

import AdminEmployees from "./pages/AdminEmployees";
import AdminReports from "./pages/AdminReports";
import AdminSidebar from "./layout/AdminSidebar.jsx";
import AdminTopbar from "./layout/AdminTopbar.jsx";

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

function EmployeeDashboard() {
  return (
    <>
      <SummaryCards />
      <AchievementTable />
      <Leaderboard />
    </>
  );
}
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
    <BrowserRouter>
      <Routes>

        {/* Employee Dashboard */}
        <Route
          path="/"
          element={
            <EmployeeLayout>
              <EmployeeDashboard />
            </EmployeeLayout>
          }
        />
{/* Admin Routes - Flat */}
          <Route path="/admin" element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          } />
        {/* Admin Employee Management */}
        <Route
          path="/admin/employees"
          element={<AdminEmployees />}
        />

        {/* Admin Reports */}
        <Route
          path="/admin/reports"
          element={<AdminReports />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;