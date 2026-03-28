import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* EMPLOYEE LAYOUT */
import Sidebar from "./features/employeeDashboard/components/layout/Sidebar";
import TopNavbar from "./features/employeeDashboard/components/layout/TopNavbar";

/* EMPLOYEE PAGES */
import EmployeeDashboard from "./features/employeeDashboard/pages/EmployeeDashboard";
import MyShoutouts from "./features/employeeDashboard/pages/MyShoutouts";
import Leaderboard from "./features/employeeDashboard/pages/Leaderboard";
import Team from "./features/employeeDashboard/pages/Team";
import AllRecognitions from "./features/employeeDashboard/pages/RecognitionsPage";

/* ADMIN */
import AdminLayout from "./features/admin-dash/components/layout/AdminLayout";
import AdminDashboard from "./features/admin-dash/pages/AdminDashboard";
import AdminEmployees from "./features/admin-dash/pages/AdminEmployees";
import AdminReports from "./features/admin-dash/pages/AdminReports";

/*
EMPLOYEE LAYOUT
*/
function EmployeeLayout({ children }) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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

/*
APP ROUTES
*/
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔐 EMPLOYEE */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <EmployeeLayout>
                <EmployeeDashboard />
              </EmployeeLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-shoutouts"
          element={
            <ProtectedRoute>
              <EmployeeLayout>
                <MyShoutouts />
              </EmployeeLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <EmployeeLayout>
                <Leaderboard />
              </EmployeeLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <EmployeeLayout>
                <Team />
              </EmployeeLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/recognitions"
          element={
            <ProtectedRoute>
              <EmployeeLayout>
                <AllRecognitions />
              </EmployeeLayout>
            </ProtectedRoute>
          }
        />

        {/* 🔐 ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminEmployees />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminReports />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;