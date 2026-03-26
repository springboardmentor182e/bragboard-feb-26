import { BrowserRouter, Routes, Route } from "react-router-dom";

/*
LAYOUT COMPONENTS
*/
import Sidebar from "./features/employeeDashboard/components/layout/Sidebar";
import TopNavbar from "./features/employeeDashboard/components/layout/TopNavbar";

/*
EMPLOYEE DASHBOARD PAGE
*/
import EmployeeDashboard from "./features/employeeDashboard/pages/EmployeeDashboard";

/*
EMPLOYEE PAGES
*/
import MyShoutouts from "./features/employeeDashboard/pages/MyShoutouts";
import CreateShoutout from "./features/employeeDashboard/pages/CreateShoutout";
import Leaderboard from "./features/employeeDashboard/pages/Leaderboard";
import Team from "./features/employeeDashboard/pages/Team"; // ✅ ADDED
import AllRecognitions from "./features/employeeDashboard/pages/AllRecognitions";

/*
ADMIN PAGES
*/
import AdminEmployees from "./pages/AdminEmployees";
import AdminReports from "./pages/AdminReports";

// admindashboard
import Admindashboard from "./features/admin-dash/pages/AdminDashboard";
/*
EMPLOYEE LAYOUT
*/
function EmployeeLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOP NAVBAR */}
        <TopNavbar />

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}


/*
APP ROUTES
*/
function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* DASHBOARD */}
        <Route
          path="/"
          element={
            <EmployeeLayout>
              <EmployeeDashboard />
            </EmployeeLayout>
          }
        />

        {/* CREATE SHOUTOUT */}
        <Route
          path="/create-shoutout"
          element={
            <EmployeeLayout>
              <CreateShoutout />
            </EmployeeLayout>
          }
        />

        {/* MY SHOUTOUTS */}
        <Route
          path="/my-shoutouts"
          element={
            <EmployeeLayout>
              <MyShoutouts />
            </EmployeeLayout>
          }
        />

        {/* LEADERBOARD */}
        <Route
          path="/leaderboard"
          element={
            <EmployeeLayout>
              <Leaderboard />
            </EmployeeLayout>
          }
        />

        {/* ✅ TEAM PAGE (IMPORTANT FIX) */}
        <Route
          path="/team"
          element={
            <EmployeeLayout>
              <Team />
            </EmployeeLayout>
          }
        />

        {/* ALL RECOGNITIONS */}
        <Route
          path="/recognitions"
          element={
            <EmployeeLayout>
              <AllRecognitions />
            </EmployeeLayout>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/employees"
          element={<AdminEmployees />}
        />

        <Route
          path="/admin/reports"
          element={<AdminReports />}
        />
        {/* ADMIN DASHBOARD */}
        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={<Admindashboard />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;