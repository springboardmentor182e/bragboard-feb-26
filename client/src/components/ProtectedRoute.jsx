import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // ⏳ LOADING STATE (better UI)
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

  // 🔐 ROLE-BASED ACCESS
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // ✅ ALLOWED
  return children;
};

export default ProtectedRoute;