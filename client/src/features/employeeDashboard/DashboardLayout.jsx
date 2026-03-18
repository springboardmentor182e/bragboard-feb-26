import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-beige">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;