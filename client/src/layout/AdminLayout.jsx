import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

const AdminLayout = ({ children }) => {
  const [sidebarWidth, setSidebarWidth] = useState(256); // default 256px

  useEffect(() => {
    // Get sidebar width dynamically
    const sidebar = document.querySelector('.sidebar-wrapper');
    if (sidebar) {
      setSidebarWidth(sidebar.offsetWidth);
    }
  }, []);

  return (
    <div className="bg-[#EEF2F7] min-h-screen relative">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-screen bg-white shadow-lg z-40 sidebar-wrapper">
        <Sidebar />
      </div>

      {/* Main Section */}
      <div 
        className="min-h-screen flex flex-col transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        {/* Fixed Navbar */}
        <div 
          className="fixed top-0 z-30 bg-white border-b border-slate-200 px-6 py-4 transition-all duration-300"
          style={{ left: `${sidebarWidth}px`, right: 0 }}
        >
          <Navbar />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 mt-20 p-8 overflow-auto">
          <div className="bg-white rounded-[28px] shadow-sm border border-slate-200 p-10 min-h-[calc(100vh-8rem)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;