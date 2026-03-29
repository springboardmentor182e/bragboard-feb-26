import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../../layout/AdminSidebar';
import AdminTopbar from '../../../layout/AdminTopbar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;