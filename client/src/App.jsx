import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import EmployeeManagement from "./pages/Admin/EmployeeManagement";
import Login from "./pages/Login/Login";

const isAuthenticated = () => localStorage.getItem("access_token") !== null;

const ProtectedRoute = ({ children }) =>
  isAuthenticated() ? children : <Navigate to="/login" replace />;

const Navbar = () => (
  <nav style={navStyles.nav}>
    <div style={navStyles.inner}>
      <span style={navStyles.logo}>BragBoard</span>
      <button
        onClick={() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
        style={navStyles.logoutBtn}
        onMouseEnter={e => e.currentTarget.style.color = "#111827"}
        onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}
      >
        Logout
      </button>
    </div>
  </nav>
);

const navStyles = {
  nav: {
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#4f46e5",
  },
  logoutBtn: {
    background: "none",
    border: "none",
    color: "#6b7280",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    padding: 0,
  },
};

function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/admin/employees" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <EmployeeManagement />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
