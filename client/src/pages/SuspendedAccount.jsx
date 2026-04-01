import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

export default function SuspendedAccount() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md text-center space-y-8">
        
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
            <Lock className="w-12 h-12 text-red-600" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Account Suspended
          </h1>
          <p className="text-slate-600 text-base">
            Your account has been suspended by the admin team.
          </p>
        </div>

        {/* Additional info */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-left space-y-2">
          <p className="text-sm font-semibold text-red-900">What does this mean?</p>
          <p className="text-xs text-red-800">
            Your access to BragBoard has been temporarily restricted. Please contact your administrator if you believe this is a mistake.
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
