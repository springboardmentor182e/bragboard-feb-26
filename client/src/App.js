import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeDashboard from "./features/employeeDashboard/EmployeeDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/employee/*" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;