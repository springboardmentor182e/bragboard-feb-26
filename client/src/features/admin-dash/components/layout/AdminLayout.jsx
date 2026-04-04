import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">

      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Main Section */}
      <div className="ml-72">

        {/* Fixed Topbar */}
        <div className="fixed top-0 left-72 right-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 transition-colors">
          <AdminTopbar />
        </div>

        {/* Scrollable Content Area */}
        <div className="pt-24 p-8">
          <div className="bg-white dark:bg-slate-900 rounded-[28px] shadow-sm border border-slate-200 dark:border-slate-700 p-10 min-h-[calc(100vh-6rem)] transition-colors">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;