import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/*
LAYOUT COMPONENTS
*/
import Sidebar from "./features/employeeDashboard/components/layout/Sidebar";
import TopNavbar from "./features/employeeDashboard/components/layout/TopNavbar";

/*
AUTH
*/
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/*
EMPLOYEE DASHBOARD PAGE
*/
import EmployeeDashboard from "./features/employeeDashboard/pages/EmployeeDashboard";
import Settings from "./features/employeeSettings/emp-settings.jsx";
/*
EMPLOYEE PAGES
*/
import MyShoutouts from "./features/employeeDashboard/pages/MyShoutouts";
import Leaderboard from "./features/employeeDashboard/pages/Leaderboard";
import Team from "./features/employeeDashboard/pages/Team";
import AllRecognitions from "./features/employeeDashboard/pages/RecognitionsPage";

/*
ADMIN PAGES
*/
import AdminEmployees from "./pages/AdminEmployees.jsx";
import AdminReports from "./pages/AdminReports";
import AdminDashboard from "./features/admin-dash/pages/AdminDashboard.jsx";
import ShoutOutManagement from "./features/Adminshoutout/Ad-shoutout.jsx";
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
ADMIN ROUTE (INLINE)
*/
function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-6">Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (user.role !== "admin") return <Navigate to="/" />;

  return children;
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

        {/* 🔐 EMPLOYEE ROUTES */}

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

        {/* 🔐 ADMIN ROUTES */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        {/* SETTINGS */}
        <Route
          path="/admin/settings"
          element={<Settings />}
        />


        <Route
          path="/admin/employees"
          element={
            <AdminRoute>
              <AdminEmployees />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <AdminRoute>
              <AdminReports />
            </AdminRoute>
          }
        />
        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
        <Route
          path="/admin/shoutouts"
          element={<ShoutOutManagement />}
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