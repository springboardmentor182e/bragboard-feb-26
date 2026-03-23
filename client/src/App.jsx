import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminSidebar from "./layout/AdminSidebar";
import AdminTopbar from "./layout/AdminTopbar";
import SummaryCards from "./features/employeeDashboard/components/SummaryCards";
import AchievementTable from "./features/employeeDashboard/components/AchievementTable";
import Leaderboard from "./features/employeeDashboard/components/Leaderboard";
import MyShoutouts from "./features/employeeDashboard/components/MyShoutouts";

import AdminEmployees from "./pages/AdminEmployees";
import AdminReports from "./pages/AdminReports";

function MainLayout({ children }) {
  return (
    <div className="bg-[#EEF2F7] min-h-screen">
      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Main Section */}
      <div className="ml-72 flex flex-col min-h-screen">
        {/* Fixed Topbar */}
        <div className="fixed top-0 left-72 right-0 z-30 bg-white border-b border-slate-200">
          <AdminTopbar />
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 pt-24 p-8">
          <div className="bg-white rounded-[28px] shadow-sm border border-slate-200 p-10 min-h-[calc(100vh-8rem)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function EmployeeDashboard() {
  return (
    <div className="space-y-8">
      <SummaryCards />
      <AchievementTable />
    </div>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
        <div className="text-4xl">🏗️</div>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-slate-500 max-w-md">
        We're currently building this page. Check back soon for exciting new features!
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Employee Dashboard */}
        <Route
          path="/"
          element={
            <MainLayout>
              <EmployeeDashboard />
            </MainLayout>
          }
        />

        {/* Leaderboard */}
        <Route
          path="/leaderboard"
          element={
            <MainLayout>
              <Leaderboard />
            </MainLayout>
          }
        />

        {/* Team */}
        <Route
          path="/team"
          element={
            <MainLayout>
              <PlaceholderPage title="Team" />
            </MainLayout>
          }
        />

        {/* Badges */}
        <Route
          path="/badges"
          element={
            <MainLayout>
              <PlaceholderPage title="Badges" />
            </MainLayout>
          }
        />

        {/* Analytics */}
        <Route
          path="/analytics"
          element={
            <MainLayout>
              <PlaceholderPage title="Analytics" />
            </MainLayout>
          }
        />

        {/* Dashboard Placeholder */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <PlaceholderPage title="Dashboard" />
            </MainLayout>
          }
        />

        {/* My Shout-Outs */}
        <Route
          path="/my-shoutouts"
          element={
            <MainLayout>
              <MyShoutouts />
            </MainLayout>
          }
        />

        {/* Admin Dashboard Placeholder */}
        <Route
          path="/admin/dashboard"
          element={
            <MainLayout>
              <PlaceholderPage title="Admin Dashboard" />
            </MainLayout>
          }
        />

        {/* Admin Shoutouts Placeholder */}
        <Route
          path="/admin/shoutouts"
          element={
            <MainLayout>
              <PlaceholderPage title="Shout-Outs" />
            </MainLayout>
          }
        />

        {/* Admin Settings Placeholder */}
        <Route
          path="/admin/settings"
          element={
            <MainLayout>
              <PlaceholderPage title="Settings" />
            </MainLayout>
          }
        />

        {/* Admin Employee Management */}
        <Route
          path="/admin/employees"
          element={
            <MainLayout>
              <AdminEmployees />
            </MainLayout>
          }
        />

        {/* Admin Reports */}
        <Route
          path="/admin/reports"
          element={
            <MainLayout>
              <AdminReports />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;