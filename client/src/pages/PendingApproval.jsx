import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

export default function PendingApproval() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md text-center space-y-8">
        
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center">
            <Clock className="w-12 h-12 text-amber-600 animate-pulse" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Waiting for Approval
          </h1>
          <p className="text-slate-600 text-base">
            Your account is under review by the admin team.
          </p>
        </div>

        {/* Additional info */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-left space-y-2">
          <p className="text-sm font-semibold text-blue-900">What happens next?</p>
          <p className="text-xs text-blue-800">
            An admin will verify your registration and approve your account shortly. You'll be able to access the dashboard once approved.
          </p>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="w-full px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all active:scale-95"
        >
          Logout
        </button>

      </div>
    </div>
  );
}
