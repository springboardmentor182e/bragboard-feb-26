import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../../layout/AdminSidebar';
import AdminTopbar from '../../../layout/AdminTopbar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-950 transition-colors duration-300">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className="flex-1 overflow-auto p-6 bg-gray-100 dark:bg-slate-950 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;