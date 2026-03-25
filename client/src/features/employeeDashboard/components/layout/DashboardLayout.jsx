import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOP NAVBAR */}
        <TopNavbar />

        {/* CONTENT */}
        <main className="flex-1 px-8 py-6 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto space-y-8">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;