import { BrowserRouter, Routes, Route } from "react-router-dom";

/*
LAYOUT COMPONENTS
*/
import Sidebar from "./features/employeeDashboard/components/layout/Sidebar";
import TopNavbar from "./features/employeeDashboard/components/layout/TopNavbar";

/*
AUTH
*/
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/*
EMPLOYEE DASHBOARD PAGE
*/
import EmployeeDashboard from "./features/employeeDashboard/pages/EmployeeDashboard";

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
import AdminEmployees from "./pages/AdminEmployees";
import AdminReports from "./pages/AdminReports";
import AdminDashboard from "./features/admin-dash/pages/AdminDashboard.jsx";

/*
EMPLOYEE LAYOUT
*/
function EmployeeLayout({ children }) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOP NAVBAR */}
        <TopNavbar />

        {/* PAGE CONTENT */}
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

        {/* 🔓 PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔐 PROTECTED EMPLOYEE ROUTES */}

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

        {/* 🔐 ADMIN ROUTES (can add protection later if needed) */}
        <Route path="/admin/employees" element={<AdminEmployees />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;