<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// ✅ ./ not ../
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
=======
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './features/admin-dash/pages/AdminDashboard';
import Sidebar_admin from './layout/Sidebar';
import Navbar from './layout/Navbar';
import Sidebar from "./features/employeeDashboard/components/Sidebar";
import TopNavbar from "./features/employeeDashboard/components/TopNavbar";
import SummaryCards from "./features/employeeDashboard/components/SummaryCards";
import AchievementTable from "./features/employeeDashboard/components/AchievementTable";
import Leaderboard from "./features/employeeDashboard/components/Leaderboard";
import AdminEmployees from "./pages/AdminEmployees";
import MyShoutouts from "./pages/MyShoutouts"; // your page

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
>>>>>>> origin/main-group-B

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"             element={<EmployeeDashboard />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/profile"      element={<ProfilePage />} />
          <Route path="/settings"     element={<SettingsPage />} />
          <Route path="*"             element={<NotFound />} />
        </Routes>
      </Suspense>
=======
      <Routes>

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <AdminLayout>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="employees" element={<AdminEmployees />} />
              </Routes>
            </AdminLayout>
          }
        />

        {/* Employee Routes */}
        <Route
          path="/*"
          element={
            <EmployeeLayout>
              <Routes>
                <Route path="/" element={<EmployeeDashboard />} />
                <Route path="feed" element={<EmployeeDashboard />} />
                <Route path="leaderboard" element={<div>Leaderboard Page</div>} />
                <Route path="team" element={<div>Team Page</div>} />
                <Route path="badges" element={<div>Badges Page</div>} />
                <Route path="analytics" element={<div>Analytics Page</div>} />
                <Route path="my-shoutouts" element={<MyShoutouts />} /> 
              </Routes>
            </EmployeeLayout>
          }
        />

      </Routes>
>>>>>>> origin/main-group-B
    </BrowserRouter>
  );
}

export default App;