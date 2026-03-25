import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// ✅ IMPORT LAYOUT
import Sidebar from "./features/employeeDashboard/components/Sidebar";
import TopNavbar from "./components/ui/Navbar";
import Leaderboard from "./pages/Leaderboard";

// ✅ Layout wrapper
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

// ✅ Lazy pages
const EmployeeDashboard = lazy(() =>
  import("./features/employeeDashboard/pages/EmployeeDashboard")
);
const AchievementsPage = lazy(() =>
  import("./features/employeeDashboard/pages/AchievementsPage")
);
const ProfilePage = lazy(() =>
  import("./features/employeeDashboard/pages/ProfilePage")
);
const SettingsPage = lazy(() =>
  import("./features/employeeDashboard/pages/SettingsPage")
);

// ✅ Admin pages
const AdminEmployees = lazy(() =>
  import("./pages/AdminEmployees").catch(() => ({
    default: () => <div>Admin Employees - Coming Soon</div>,
  }))
);

const AdminReports = lazy(() =>
  import("./pages/AdminReports").catch(() => ({
    default: () => <div>Admin Reports - Coming Soon</div>,
  }))
);

// ✅ Loader
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="text-indigo-500 text-sm animate-pulse">
      Loading...
    </div>
  </div>
);

// ✅ 404
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <p className="text-6xl font-bold text-indigo-500 mb-4">404</p>
    <p>Page not found.</p>
  </div>
);

// ✅ App
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* ✅ Employee routes WITH sidebar */}
          <Route
            path="/"
            element={
              <EmployeeLayout>
                <EmployeeDashboard />
              </EmployeeLayout>
            }
          />

          <Route
            path="/achievements"
            element={
              <EmployeeLayout>
                <AchievementsPage />
              </EmployeeLayout>
            }
          />

          <Route
            path="/profile"
            element={
              <EmployeeLayout>
                <ProfilePage />
              </EmployeeLayout>
            }
          />

          <Route
            path="/settings"
            element={
              <EmployeeLayout>
                <SettingsPage />
              </EmployeeLayout>
            }
          />

          {/* ✅ Leaderboard */}
          <Route
            path="/leaderboard"
            element={
              <EmployeeLayout>
                <Leaderboard />
              </EmployeeLayout>
            }
          />

          {/* Admin (no layout needed) */}
          <Route path="/admin/employees" element={<AdminEmployees />} />
          <Route path="/admin/reports" element={<AdminReports />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;