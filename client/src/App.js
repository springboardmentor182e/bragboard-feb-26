import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeDashboard from "./features/employeeDashboard/EmployeeDashboard";
import AdminShoutouts from "./features/adminDashboard/pages/AdminShoutouts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/employee/*" element={<EmployeeDashboard />} />
        <Route path="/admin" element ={<AdminShoutouts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;