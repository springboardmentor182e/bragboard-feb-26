import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminSidebar from "./layout/AdminSidebar.jsx";
import AdminTopbar from "./layout/AdminTopbar.jsx";
import AdminDashboard from "./features/admin-dash/pages/AdminDashboard.jsx";

// Admin Layout
function AdminLayout({ children }) {
  return (
    <div className="bg-[#EEF2F7] min-h-screen">
      <div className="fixed top-0 left-0 h-full w-72 z-50">
        <AdminSidebar />
      </div>
      <div className="ml-72 min-h-screen">
        <AdminTopbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter  basename="/">
      <Routes>

        {/* Admin Routes - Flat */}
        <Route path="/admin" element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        } />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;