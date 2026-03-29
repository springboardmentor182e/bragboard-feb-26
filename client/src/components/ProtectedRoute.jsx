import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // ⏳ LOADING
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-600 text-sm animate-pulse">
          Checking authentication...
        </div>
      </div>
    );
  }

  // ❌ NOT LOGGED IN
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🔐 ROLE CHECK (SAFE LOWERCASE)
  if (role && user.role?.toLowerCase() !== role.toLowerCase()) {

    // 🔥 SMART REDIRECT
    if (user.role?.toLowerCase() === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // ✅ ALLOWED
  return children;
};

export default ProtectedRoute;