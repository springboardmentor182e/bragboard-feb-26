import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import PendingApproval from "./pages/PendingApproval";

/* EMPLOYEE LAYOUT */
import Sidebar from "./features/employeeDashboard/components/layout/Sidebar";
import TopNavbar from "./features/employeeDashboard/components/layout/TopNavbar";
import { ToastProvider } from "./features/employeeDashboard/context/ToastContext";

/* EMPLOYEE PAGES */
import EmployeeDashboard from "./features/employeeDashboard/pages/EmployeeDashboard";
import MyShoutouts from "./features/employeeDashboard/pages/MyShoutouts";
import Leaderboard from "./features/employeeDashboard/pages/Leaderboard";
import Team from "./features/employeeDashboard/pages/Team";
import AllRecognitions from "./features/employeeDashboard/pages/RecognitionsPage";
import Badges from "./features/employeeDashboard/pages/Badges";
import Analytics from "./features/employeeDashboard/pages/Analytics";
import EmployeeSettings from "./features/employeeDashboard/pages/EmployeeSettings";

/* ADMIN */
import AdminLayout from "./features/admin-dash/components/layout/AdminLayout";
import AdminDashboard from "./features/admin-dash/pages/AdminDashboard";
import AdminEmployees from "./features/admin-dash/pages/AdminEmployees";
import AdminReports from "./features/admin-dash/pages/AdminReports";
import AdminShoutouts from "./features/admin-dash/pages/AdminShoutouts";
import AdminSettings from "./features/admin-dash/pages/AdminSettings";

/*
EMPLOYEE LAYOUT
*/
function EmployeeLayout({ children }) {
  return (
    <ToastProvider>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <TopNavbar />

          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}

/*
APP ROUTES
*/
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />        <Route path="/pending-approval" element={<PendingApproval />} />
        {/* 🔐 EMPLOYEE ROUTES */}
        <Route
          path="/"
          element={
            <ProtectedRoute role="employee">
              <EmployeeLayout>
                <EmployeeDashboard />
              </EmployeeLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-shoutouts"
          element={
            <ProtectedRoute role="employee">
              <EmployeeLayout>
                <MyShoutouts />
              </EmployeeLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute role="employee">
              <EmployeeLayout>
                <Leaderboard />
              </EmployeeLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/team"
          element={
            <ProtectedRoute role="employee">
              <EmployeeLayout>
                <Team />
              </EmployeeLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/recognitions"
          element={
            <ProtectedRoute role="employee">
              <EmployeeLayout>
                <AllRecognitions />
              </EmployeeLayout>
            </ProtectedRoute>
          }
        />

        {/* ✅ EMPLOYEE PLACEHOLDERS */}
        <Route
          path="/badges"
          element={
            <ProtectedRoute role="employee">
              <EmployeeLayout>
                <Badges />
              </EmployeeLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute role="employee">
              <EmployeeLayout>
                <Analytics />
              </EmployeeLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute role="employee">
              <EmployeeLayout>
                <EmployeeSettings />
              </EmployeeLayout>
            </ProtectedRoute>
          }
        />

        {/* 🔐 ADMIN ROUTES */}
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

        {/* 🆕 ADMIN PLACEHOLDERS */}
        <Route
          path="/admin/shoutouts"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminShoutouts />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminSettings />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* 🚫 FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;