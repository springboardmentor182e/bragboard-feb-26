import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../../layout/Navbar';
import Sidebar from '../../../layout/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;