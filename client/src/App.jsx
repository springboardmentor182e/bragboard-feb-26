import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './features/admin-dash/pages/AdminDashboard';
import Sidebar from './layout/Sidebar';
import Navbar from './layout/Navbar';

function App() {
  return (
    <BrowserRouter>
      {/* Main container - relative */}
      <div className="relative">
        {/* Sidebar - fixed left */}
        <Sidebar />
        
        {/* Main content - sidebar ke right me */}
        <div className="ml-64">
          {/* Navbar - top par */}
          <Navbar />
          
          {/* Dashboard content - navbar ke neeche */}
          <main className="min-h-screen bg-gray-100 p-6">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;