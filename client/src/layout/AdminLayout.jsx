import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminLayout = ({ children }) => {
  return (
    
    <div className="flex">
  <Sidebar />

  <div className="flex-1 bg-gray-100 min-h-screen p-6">

  {/* Top Header */}
  <div className="flex justify-end items-center mb-6">
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-sm font-semibold text-gray-700">
          Admin User
        </p>
        <p className="text-xs text-gray-500">
          Administrator
        </p>
      </div>

      <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-full font-bold">
        A
      </div>

      <button className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
        Logout
      </button>
    </div>
  </div>

  <div className="max-w-7xl mx-auto">
    {children}
  </div>

</div>
</div>
  );
};

export default AdminLayout;