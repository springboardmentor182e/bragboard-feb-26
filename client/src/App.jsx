import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./features/employeeDashboard/components/Sidebar";
import TopNavbar from "./features/employeeDashboard/components/TopNavbar";
import SummaryCards from "./features/employeeDashboard/components/SummaryCards";
import AchievementTable from "./features/employeeDashboard/components/AchievementTable";
import Leaderboard from "./features/employeeDashboard/components/Leaderboard";
import AdminEmployees from "./pages/AdminEmployees";
import AdminDashboard from "./features/Adminshoutout/AdminDashboard";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <EmployeeLayout>
              <EmployeeDashboard />
            </EmployeeLayout>
          }
        />

        <Route
          path="/admin/employees"
          element={<AdminEmployees />}
        />

        <Route
          path="/admin-dashboard"
          element={
            <EmployeeLayout>
              <AdminDashboard />
            </EmployeeLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;