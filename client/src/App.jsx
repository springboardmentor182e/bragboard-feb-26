import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import AdminDashboard from './features/admin-dash/pages/AdminDashboard';
import Sidebar_admin from './layout/Sidebar';
import Navbar from './layout/Navbar';
import Sidebar from "./features/employeeDashboard/components/Sidebar";
import TopNavbar from "./features/employeeDashboard/components/TopNavbar";
import SummaryCards from "./features/employeeDashboard/components/SummaryCards";
import AchievementTable from "./features/employeeDashboard/components/AchievementTable";
import Leaderboard from "./features/employeeDashboard/components/Leaderboard";
import AdminEmployees from "./pages/AdminEmployees";
import MyShoutouts from "./pages/MyShoutouts";

// Your working employee dashboard pages
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

// Employee Layout
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
    <div className="relative">
      <Sidebar_admin />
      <div className="ml-64">
        <Navbar />
        <main className="min-h-screen bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* Employee Routes — WITH EmployeeLayout */}
          <Route path="/" element={<EmployeeLayout><EmployeeDashboard /></EmployeeLayout>} />
          <Route path="/feed" element={<EmployeeLayout><EmployeeDashboard /></EmployeeLayout>} />
          <Route path="/leaderboard" element={<EmployeeLayout><div>Leaderboard Page</div></EmployeeLayout>} />
          <Route path="/team" element={<EmployeeLayout><div>Team Page</div></EmployeeLayout>} />
          <Route path="/badges" element={<EmployeeLayout><div>Badges Page</div></EmployeeLayout>} />
          <Route path="/analytics" element={<EmployeeLayout><div>Analytics Page</div></EmployeeLayout>} />
          <Route path="/my-shoutouts" element={<EmployeeLayout><MyShoutouts /></EmployeeLayout>} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <AdminLayout>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="employees" element={<AdminEmployees />} />
                <Route path="reports" element={<AdminReports />} />
              </Routes>
            </AdminLayout>
          } />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;