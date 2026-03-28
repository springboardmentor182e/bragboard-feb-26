import { BrowserRouter, Routes, Route } from "react-router-dom";

/* LAYOUT */
import Sidebar from "./features/employeeDashboard/components/layout/Sidebar";
import TopNavbar from "./features/employeeDashboard/components/layout/TopNavbar";

/* AUTH */
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* EMPLOYEE */
import EmployeeDashboard from "./features/employeeDashboard/pages/EmployeeDashboard";
import MyShoutouts from "./features/employeeDashboard/pages/MyShoutouts";
import Leaderboard from "./features/employeeDashboard/pages/Leaderboard";
import Team from "./features/employeeDashboard/pages/Team";
import AllRecognitions from "./features/employeeDashboard/pages/RecognitionsPage";

/* ADMIN */
import AdminEmployees from "./pages/AdminEmployees";
import AdminReports from "./pages/AdminReports";
import AdminDashboard from "./features/admin-dash/pages/AdminDashboard";

/* LAYOUT */
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

/* APP */
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* EMPLOYEE */}
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

        {/* ADMIN 🔥 */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute role="admin">
              <AdminEmployees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute role="admin">
              <AdminReports />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;