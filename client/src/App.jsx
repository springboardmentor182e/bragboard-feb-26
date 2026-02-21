import { Routes, Route } from "react-router-dom";
import ShoutoutManagementPage from "./features/employee-shoutout-management/pages/ShoutoutManagementPage";

function App() {
  return (
    <Routes>
      {/* Main Page */}
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-blue-500">
              Dashboard Home 🚀
            </h1>
          </div>
        }
      />

      {/* Shoutout Page */}
      <Route
        path="/shoutout-management"
        element={<ShoutoutManagementPage />}
      />
    </Routes>
  );
}

export default App;