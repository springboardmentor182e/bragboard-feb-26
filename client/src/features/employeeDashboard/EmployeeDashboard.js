import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import Home from "./pages/Home";
import Recognition from "./pages/Recognition";
import Badges from "./pages/Badges";
import Profile from "./pages/Profile";

const EmployeeDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="recognition" element={<Recognition />} />
        <Route path="badges" element={<Badges />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;