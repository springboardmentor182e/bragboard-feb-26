import { Routes, Route } from "react-router-dom";
import AdminEmployees from "./pages/AdminEmployees";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Dashboard</div>} />
      <Route path="/admin/employees" element={<AdminEmployees />} />
    </Routes>
  );
}

export default App;