import { Routes, Route } from "react-router-dom";
import ShoutoutManagementPage from "./features/admin-shoutout-management/pages/ShoutoutManagementPage";
import MyShoutoutsPage from "./features/employee-shoutout/pages/MyShoutoutsPage";
import ShoutoutFeedPage from "./features/employee-shoutout/pages/ShoutoutFeedPage";

function App() {
  return (
    <Routes>
      {/* Main Page */}
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-purple-950 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-purple-400">
              Dashboard Home 🚀
            </h1>
          </div>
        }
      />

      {/* Shoutout Page */}
      <Route
        path="/admin/shoutouts"
        element={<ShoutoutManagementPage />}
      />

      {/* Employee My Shoutouts Page */}
      <Route path="/my-shoutouts" element={<MyShoutoutsPage />} />

      {/* Main Shoutout Feed */}
      <Route path="/shoutouts" element={<ShoutoutFeedPage />} />
    </Routes>
  );
}

export default App;