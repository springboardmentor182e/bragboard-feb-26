import Sidebar from "../Sidebar";
import TopNavbar from "./TopNavbar";

const DashboardLayout = ({ children, selectedEmployee, dark, onToggleDark }) => {
  return (
    <div className={`flex min-h-screen bg-gray-100 ${dark ? "dark" : ""}`}>

      {/* Sidebar */}
      <Sidebar selectedEmployee={selectedEmployee} />

      {/* FIXED MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 ml-64">

        {/* Top Navbar */}
        <TopNavbar
          selectedEmployee={selectedEmployee}
          dark={dark}
          onToggleDark={onToggleDark}
        />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;