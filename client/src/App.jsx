import { BrowserRouter, Routes, Route } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";

// ✅ Add these imports (IMPORTANT)
import Sidebar_admin from "./components/ui/Sidebar_admin";
import Navbar from "./components/ui/Navbar";


// ✅ Admin Layout
function AdminLayout({ children }) {
  return (
    <div className="flex">
      
      {/* Sidebar */}
      <Sidebar_admin />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <Navbar />

        <main className="min-h-screen bg-gray-100 p-6">
          {children}
        </main>
      </div>

    </div>
  );
}


// ✅ App Routes
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={
            <AdminLayout>
              <Leaderboard />
            </AdminLayout>
          }
        />

        {/* Leaderboard */}
        <Route
          path="/leaderboard"
          element={
            <AdminLayout>
              <Leaderboard />
            </AdminLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;