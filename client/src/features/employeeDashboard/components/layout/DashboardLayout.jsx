import Sidebar from "../Sidebar";
import TopNavbar from "./TopNavbar";

// FIXED: now passes selectedEmployee to Sidebar so employee info shows at bottom
const DashboardLayout = ({ children, selectedEmployee, dark, onToggleDark }) => {
  return (
    <div className={`flex min-h-screen bg-gray-100 ${dark ? "dark" : ""}`}>

      <Sidebar selectedEmployee={selectedEmployee} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar
          selectedEmployee={selectedEmployee}
          dark={dark}
          onToggleDark={onToggleDark}
        />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
