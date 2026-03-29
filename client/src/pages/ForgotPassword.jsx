import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Clock, ChevronLeft } from "lucide-react";
import { forgotPassword, verifyOTP, resetPassword } from "../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // 📋 State Management
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter OTP & Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ⏱️ Timer state
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes = 900 seconds
  const [otpSent, setOtpSent] = useState(false);

  // ⏱️ Timer effect (only when OTP is sent)
  useEffect(() => {
    if (!otpSent || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setOtpSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [otpSent, timeLeft]);

  // 📊 Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // 📧 Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const response = await forgotPassword(email);
      setSuccess("OTP sent to your email!");
      setOtpSent(true);
      setTimeLeft(response.otp_expires || 900);
      setStep(2);
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Step 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }

    if (!newPassword) {
      setError("Please enter a new password");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email, otp, newPassword);
      setSuccess("Password reset successfully! Redirecting to login...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Resend OTP
  const handleResendOTP = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await forgotPassword(email);
      setSuccess("OTP resent to your email!");
      setTimeLeft(response.otp_expires || 900);
      setOtp("");
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔙 Go back to login
  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT - Hero Section */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-10">
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold">
            Reset Your <br /> Password 🔐
          </h1>
          <p className="text-white/80">
            Enter your email to receive a one-time password (OTP) to reset your account access.
          </p>
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur space-y-2">
            <p className="text-sm text-white/90">✅ Secure password reset</p>
            <p className="text-sm text-white/90">✅ 15-minute OTP validity</p>
            <p className="text-sm text-white/90">✅ Works for both admin & employee</p>
          </div>
        </div>
      </div>

      {/* RIGHT - Form Section */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={handleBackToLogin}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
              type="button"
            >
              <ChevronLeft size={20} className="text-slate-600" />
            </button>
            <h2 className="text-2xl font-bold text-slate-900">
              {step === 1 ? "Forgot Password?" : "Reset Password"}
            </h2>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
              {success}
            </div>
          )}

          {/* STEP 1: Enter Email & Send OTP */}
          {step === 1 ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>

              <div className="text-center text-sm text-slate-600">
                <p>
                  Remember your password?{" "}
                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="text-indigo-600 hover:underline font-semibold"
                  >
                    Login here
                  </button>
                </p>
              </div>
            </form>
          ) : (
            // STEP 2: Enter OTP & New Password
            <form onSubmit={handleResetPassword} className="space-y-4">
              
              {/* Timer Display */}
              {otpSent && timeLeft > 0 ? (
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Clock size={16} className="text-blue-600" />
                  <span className="text-sm text-blue-600 font-semibold">
                    OTP expires in: {formatTime(timeLeft)}
                  </span>
                </div>
              ) : otpSent && timeLeft <= 0 ? (
                <div className="p-3 bg-yellow-50 rounded-lg text-sm text-yellow-600 border border-yellow-200">
                  ⚠️ OTP expired. Please request a new one.
                </div>
              ) : null}

              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-center text-2xl tracking-widest font-mono focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !otpSent || timeLeft <= 0}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              {/* Resend OTP */}
              {otpSent && timeLeft > 0 && (
                <p className="text-center text-sm text-slate-600">
                  Didn't receive the OTP?{" "}
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-indigo-600 hover:underline font-semibold disabled:opacity-50"
                  >
                    Resend
                  </button>
                </p>
              )}

              {/* Back Button */}
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setOtp("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setError("");
                }}
                className="w-full text-slate-600 hover:text-slate-900 font-medium py-2 rounded-lg border border-slate-200 hover:border-slate-300 transition"
              >
                Back to Email
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
