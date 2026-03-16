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

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"             element={<EmployeeDashboard />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/profile"      element={<ProfilePage />} />
          <Route path="/settings"     element={<SettingsPage />} />
          <Route path="*"             element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;