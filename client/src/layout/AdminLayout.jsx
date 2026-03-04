import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="bg-[#EEF2F7] min-h-screen">

      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Main Section */}
      <div className="ml-72">

        {/* Fixed Topbar */}
        <div className="fixed top-0 left-72 right-0 z-30 bg-white border-b border-slate-200">
          <AdminTopbar />
        </div>

        {/* Scrollable Content Area */}
        <div className="pt-24 p-8">
          <div className="bg-white rounded-[28px] shadow-sm border border-slate-200 p-10 min-h-[calc(100vh-6rem)]">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;