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
import { lazy, Suspense } from "react";

// Your working employee dashboard pages
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

// Teammate's admin pages (lazy loaded so missing files don't crash the app)
const AdminEmployees = lazy(() =>
  import("./pages/AdminEmployees").catch(() => ({ default: () => <div>Admin Employees - Coming Soon</div> }))
);
const AdminReports = lazy(() =>
  import("./pages/AdminReports").catch(() => ({ default: () => <div>Admin Reports - Coming Soon</div> }))
);

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="text-indigo-500 text-sm animate-pulse">Loading...</div>
  </div>
);

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <p className="text-6xl font-bold text-indigo-500 mb-4">404</p>
    <p>Page not found.</p>
    <a href="/" className="mt-4 text-sm text-indigo-500 hover:underline">
      Go back to Dashboard
    </a>
  </div>
);

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
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Employee Dashboard routes */}
          <Route path="/"             element={<EmployeeDashboard />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/profile"      element={<ProfilePage />} />
          <Route path="/settings"     element={<SettingsPage />} />

          {/* Admin routes */}
          <Route path="/admin/employees" element={<AdminEmployees />} />
          <Route path="/admin/reports"   element={<AdminReports />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;