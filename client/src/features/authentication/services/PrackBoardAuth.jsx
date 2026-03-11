import { useState } from "react";
import ForgotPassword from "./ForgotPassword"; // new component for resetting password
import Signup from "./Signup"; // new component for user signup
import { loginUser } from "./login";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', sans-serif;
    background: #0d1117;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .auth-bg {
    position: fixed;
    inset: 0;
    background: radial-gradient(ellipse at 75% 50%, rgba(88,28,220,0.18) 0%, transparent 60%),
                radial-gradient(ellipse at 25% 80%, rgba(20,10,60,0.5) 0%, transparent 50%),
                #0d1117;
    z-index: 0;
  }

  .auth-wrapper {
    position: relative;
    z-index: 1;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .card {
    background: #161b27;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 40px 36px;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.5);
    animation: fadeUp 0.45s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .icon-wrap {
    width: 68px;
    height: 68px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    font-size: 30px;
    transition: background 0.4s ease;
  }
  .icon-wrap.employee { background: #7c3aed; }
  .icon-wrap.admin    { background: #ea580c; }

  .card-title {
    text-align: center;
    color: #fff;
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 8px;
    letter-spacing: -0.5px;
  }

  .card-subtitle {
    text-align: center;
    color: #6b7280;
    font-size: 14px;
    margin-bottom: 28px;
  }

  .secure-banner {
    background: rgba(120,53,15,0.35);
    border: 1px solid rgba(234,88,12,0.3);
    border-radius: 12px;
    padding: 14px 16px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 24px;
    animation: slideDown 0.4s ease;
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .secure-banner svg { flex-shrink: 0; margin-top: 2px; }
  .secure-banner .banner-title { color: #f97316; font-size: 14px; font-weight: 700; }
  .secure-banner .banner-sub   { color: #f97316; font-size: 12px; opacity: 0.8; margin-top: 2px; }

  .field-group { margin-bottom: 18px; }
  .field-label {
    display: block;
    color: #e5e7eb;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .error-msg {
    background: rgba(220,38,38,0.15);
    border: 1px solid rgba(220,38,38,0.4);
    border-radius: 12px;
    padding: 12px 16px;
    color: #ef4444;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
    animation: shake 0.3s ease;
  }

  .info-msg {
    background: rgba(34,197,94,0.15);
    border: 1px solid rgba(34,197,94,0.4);
    border-radius: 12px;
    padding: 12px 16px;
    color: #22c55e;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
    animation: fadeUp 0.3s ease;
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-icon {
    position: absolute;
    left: 14px;
    color: #4b5563;
    pointer-events: none;
    display: flex;
  }

  .input-field {
    width: 100%;
    background: #1f2533;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px;
    padding: 14px 44px;
    color: #e5e7eb;
    font-size: 15px;
    font-family: 'Inter', sans-serif;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .input-field::placeholder { color: #4b5563; }
  .input-field:focus {
    border-color: rgba(124,58,237,0.5);
    box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
  }
  .admin-mode .input-field:focus {
    border-color: rgba(234,88,12,0.5);
    box-shadow: 0 0 0 3px rgba(234,88,12,0.12);
  }

  .toggle-pw {
    position: absolute;
    right: 14px;
    background: none;
    border: none;
    cursor: pointer;
    color: #4b5563;
    display: flex;
    padding: 0;
    transition: color 0.2s;
  }
  .toggle-pw:hover { color: #9ca3af; }

  .row-utils {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;
    gap: 12px;
  }

  .remember-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
  }
  .remember-wrap input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #7c3aed;
    cursor: pointer;
    border-radius: 4px;
  }
  .admin-mode .remember-wrap input[type="checkbox"] { accent-color: #ea580c; }
  .remember-wrap span { color: #9ca3af; font-size: 14px; }

  .forgot-link {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    transition: opacity 0.2s;
    white-space: nowrap;
  }
  .forgot-link:hover { opacity: 0.8; }
  .forgot-link.employee { color: #7c3aed; }
  .forgot-link.admin    { color: #f97316; }

  .btn-primary {
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    color: #fff;
    transition: opacity 0.2s, transform 0.1s;
    margin-bottom: 20px;
  }
  .btn-primary:hover { opacity: 0.9; }
  .btn-primary:active { transform: scale(0.98); }
  .btn-primary.employee { background: linear-gradient(135deg, #7c3aed, #6d28d9); }
  .btn-primary.admin    { background: linear-gradient(135deg, #ea580c, #c2410c); }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
  }
  .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
  .divider-text {
    background: #1f2533;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    padding: 3px 10px;
    color: #6b7280;
    font-size: 12px;
    font-weight: 500;
  }

  .btn-secondary {
    width: 100%;
    padding: 15px;
    background: #1f2533;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    font-size: 15px;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    color: #e5e7eb;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s, border-color 0.2s;
  }
  .btn-secondary:hover {
    background: #252d3d;
    border-color: rgba(255,255,255,0.12);
  }
  .btn-secondary:active { transform: scale(0.98); }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }
`;

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const EyeIcon = ({ open }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const UserIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const ShieldIcon = ({ size = 32, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

// Demo credentials - kept for reference, now using backend API
// eslint-disable-next-line no-unused-vars
const _EMPLOYEE_CREDENTIALS = { email: "john.doe@company.com", password: "employee123" };
// eslint-disable-next-line no-unused-vars
const _ADMIN_CREDENTIALS = { email: "admin@prackboard.com", password: "admin123" };

export { MailIcon };
export const authStyles = styles;
export default function PrackBoardAuth() {
  const [mode, setMode] = useState("employee"); // "employee" | "admin"
  const [isSignUp, setIsSignUp] = useState(false); // toggle between login and signup
  const [forgot, setForgot] = useState(false); // show forgot password screen
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInAs, setLoggedInAs] = useState("");

  const isAdmin = mode === "admin";

  const handleSwitch = (next) => {
    setMode(next);
    setIsSignUp(false);
    setForgot(false);
    setEmail("");
    setPassword("");
    setError("");
    setInfo("");
    setShowPw(false);
  };

  const validateCredentials = () => {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return false;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError("");
    setInfo("");
    if (!validateCredentials()) return;

    const role = isAdmin ? "admin" : "employee";
    const result = await loginUser(email, password, role);

    if (result.success) {
      setLoggedIn(true);
      setLoggedInAs(isAdmin ? "Admin" : "Employee");
      if (remember && result.data?.access_token) {
        localStorage.setItem("auth_token", result.data.access_token);
        localStorage.setItem("user_email", email);
        localStorage.setItem("user_role", role);
      }
    } else {
      setError(result.error || "Invalid email or password. Please try again.");
    }
  };



  if (isSignUp) {
    return <Signup onBack={() => setIsSignUp(false)} />;
  }

  if (loggedIn) {
    return (
      <>
        <style>{styles}</style>
        <div className="auth-bg" />
        <div className="auth-wrapper">
          <div className="card" style={{ textAlign: "center" }}>
            <div className={`icon-wrap ${loggedInAs === "Admin" ? "admin" : "employee"}`}>
              {loggedInAs === "Admin" ? <ShieldIcon /> : <UserIcon />}
            </div>
            <div className="card-title">Welcome back!</div>
            <p style={{ color: "#6b7280", fontSize: 15, marginTop: 8, marginBottom: 24 }}>
              You're signed in as <strong style={{ color: "#e5e7eb" }}>{loggedInAs}</strong>.
            </p>
            <button
              className={`btn-primary ${loggedInAs === "Admin" ? "admin" : "employee"}`}
              onClick={() => {
                setLoggedIn(false);
                setEmail("");
                setPassword("");
                setError("");
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </>
    );
  }

  if (forgot) {
    return <ForgotPassword onBack={() => setForgot(false)} />;
  }

  return (
    <>
      <style>{styles}</style>
      <div className="auth-bg" />
      <div className="auth-wrapper">
        <div className={`card ${isAdmin ? "admin-mode" : ""}`}>
          {/* Icon */}
          <div className={`icon-wrap ${isAdmin ? "admin" : "employee"}`}>
            {isAdmin ? <ShieldIcon /> : <UserIcon />}
          </div>

          {/* Title */}
          <div className="card-title">
            {isAdmin ? "Admin Portal" : "Welcome to PrackBoard"}
          </div>
          <div className="card-subtitle">
            {isAdmin ? "Sign in to manage PrackBoard" : "Sign in to your employee account"}
          </div>

          {/* Secure Access Banner (admin only) */}
          {isAdmin && (
            <div className="secure-banner">
              <ShieldIcon size={18} color="#f97316" />
              <div>
                <div className="banner-title">Secure Access</div>
                <div className="banner-sub">
                  Administrative access is restricted and monitored
                </div>
              </div>
            </div>
          )}

          {/* Error / Info Message */}
          {error && <div className="error-msg">{error}</div>}
          {info && <div className="info-msg">{info}</div>}

          {/* Email Field */}
          <div className="field-group">
            <label className="field-label">
              {isAdmin ? "Admin Email" : "Email Address"}
            </label>
            <div className="input-wrap">
              <span className="input-icon">
                <MailIcon />
              </span>
              <input
                className="input-field"
                type="email"
                placeholder={isAdmin ? "admin@prackboard.com" : "john.doe@company.com"}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="field-group">
            <label className="field-label">
              {isAdmin ? "Admin Password" : "Password"}
            </label>
            <div className="input-wrap">
              <span className="input-icon">
                <LockIcon />
              </span>
              <input
                className="input-field"
                type={showPw ? "text" : "password"}
                placeholder={isAdmin ? "Enter admin password" : "Enter your password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button
                className="toggle-pw"
                onClick={() => setShowPw((v) => !v)}
                type="button"
                aria-label="Toggle password visibility"
              >
                <EyeIcon open={showPw} />
              </button>
            </div>
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="row-utils">
            <label className="remember-wrap">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <button
              className={`forgot-link ${isAdmin ? "admin" : "employee"}`}
              type="button"
              onClick={() => setForgot(true)}
            >
              Forgot Password?
            </button>
          </div>

          {/* Primary Sign In Button */}
          <button
            className={`btn-primary ${isAdmin ? "admin" : "employee"}`}
            onClick={handleSubmit}
          >
            {isAdmin ? "Sign In as Admin" : "Sign In"}
          </button>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">or</span>
            <div className="divider-line" />
          </div>

          {/* Mode Toggle Button */}
          <button
            className="btn-secondary"
            onClick={() => handleSwitch(isAdmin ? "employee" : "admin")}
          >
            {isAdmin ? "Employee Login →" : "Admin Login →"}
          </button>

          {/* Sign Up Link */}
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                className="forgot-link employee"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
