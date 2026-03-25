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
import Team from "./features/employeeDashboard/pages/Team";
import AllRecognitions from "./features/employeeDashboard/pages/AllRecognitions";
import UserProfile from "./features/employeeDashboard/pages/UserProfile"; // ✅ NEW

/*
ADMIN PAGES
*/
import AdminEmployees from "./pages/AdminEmployees";
import AdminReports from "./pages/AdminReports";


/*
EMPLOYEE LAYOUT
*/
function EmployeeLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <TopNavbar />

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

        <Route
          path="/"
          element={
            <EmployeeLayout>
              <EmployeeDashboard />
            </EmployeeLayout>
          }
        />

        <Route
          path="/create-shoutout"
          element={
            <EmployeeLayout>
              <CreateShoutout />
            </EmployeeLayout>
          }
        />

        <Route
          path="/my-shoutouts"
          element={
            <EmployeeLayout>
              <MyShoutouts />
            </EmployeeLayout>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <EmployeeLayout>
              <Leaderboard />
            </EmployeeLayout>
          }
        />

        <Route
          path="/team"
          element={
            <EmployeeLayout>
              <Team />
            </EmployeeLayout>
          }
        />

        <Route
          path="/recognitions"
          element={
            <EmployeeLayout>
              <AllRecognitions />
            </EmployeeLayout>
          }
        />

        {/* ✅ PROFILE PAGE */}
        <Route
          path="/profile/:id"
          element={
            <EmployeeLayout>
              <UserProfile />
            </EmployeeLayout>
          }
        />

        {/* ADMIN */}
        <Route path="/admin/employees" element={<AdminEmployees />} />
        <Route path="/admin/reports" element={<AdminReports />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;