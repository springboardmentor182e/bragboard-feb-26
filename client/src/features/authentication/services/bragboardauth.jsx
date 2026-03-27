import { useState } from "react";
import { loginUser } from './login.js';
import { signupUser } from './signupApi.js';

// ─── Shared Styles ────────────────────────────────────────────────────────────
const authStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .auth-bg {
    position: fixed;
    inset: 0;
    background: linear-gradient(135deg, #f4f5f7 0%, #ede9fe 50%, #e0e7ff 100%);
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
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 40px 36px;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 4px 24px rgba(99,102,241,0.10), 0 1px 4px rgba(0,0,0,0.06);
    animation: fadeUp 0.45s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Icon wrap — single unified gradient for both modes */
  .icon-wrap {
    width: 68px;
    height: 68px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    font-size: 30px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    box-shadow: 0 8px 24px rgba(99,102,241,0.30);
    transition: all 0.4s ease;
  }

  .card-title {
    text-align: center;
    color: #111827;
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

  /* Secure Access banner — light purple, no dark bg */
  .secure-banner {
    background: #ede9fe;
    border: 1px solid #c4b5fd;
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
  .secure-banner .banner-title { color: #6366f1; font-size: 14px; font-weight: 700; }
  .secure-banner .banner-sub   { color: #7c3aed; font-size: 12px; opacity: 0.85; margin-top: 2px; }

  /* Error / Info messages */
  .error-msg {
    background: #fef2f2;
    border: 1px solid #fca5a5;
    border-radius: 12px;
    padding: 12px 16px;
    color: #dc2626;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
    animation: shake 0.3s ease;
  }

  .info-msg {
    background: #f0fdf4;
    border: 1px solid #86efac;
    border-radius: 12px;
    padding: 12px 16px;
    color: #16a34a;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
    animation: fadeUp 0.3s ease;
  }

  /* Fields */
  .field-group { margin-bottom: 18px; }

  .field-label {
    display: block;
    color: #374151;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-icon {
    position: absolute;
    left: 14px;
    color: #9ca3af;
    pointer-events: none;
    display: flex;
  }

  .input-field {
    width: 100%;
    background: #f9fafb;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 14px 44px;
    color: #111827;
    font-size: 15px;
    font-family: 'Inter', sans-serif;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }
  .input-field::placeholder { color: #9ca3af; }
  .input-field:focus {
    background: #ffffff;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
  }
  .input-field:disabled {
    background: #f3f4f6;
    color: #6b7280;
    cursor: not-allowed;
  }

  .toggle-pw {
    position: absolute;
    right: 14px;
    background: none;
    border: none;
    cursor: pointer;
    color: #9ca3af;
    display: flex;
    padding: 0;
    transition: color 0.2s;
  }
  .toggle-pw:hover { color: #6366f1; }

  /* Remember + utils row */
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
    accent-color: #6366f1;
    cursor: pointer;
    border-radius: 4px;
  }
  .remember-wrap span { color: #6b7280; font-size: 14px; }

  .forgot-link {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    color: #6366f1;
    transition: opacity 0.2s;
    white-space: nowrap;
  }
  .forgot-link:hover { opacity: 0.75; }

  /* Primary button — unified blue-purple gradient */
  .btn-primary {
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    color: #fff;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    box-shadow: 0 4px 14px rgba(99,102,241,0.35);
    transition: opacity 0.2s, transform 0.1s, box-shadow 0.2s;
    margin-bottom: 20px;
  }
  .btn-primary:hover {
    opacity: 0.92;
    box-shadow: 0 6px 20px rgba(99,102,241,0.45);
  }
  .btn-primary:active { transform: scale(0.98); }

  /* Divider */
  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
  }
  .divider-line { flex: 1; height: 1px; background: #e2e8f0; }
  .divider-text {
    background: #f9fafb;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 3px 10px;
    color: #9ca3af;
    font-size: 12px;
    font-weight: 500;
  }

  /* Secondary button — white with border */
  .btn-secondary {
    width: 100%;
    padding: 15px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    color: #374151;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, transform 0.1s;
    margin-bottom: 0;
  }
  .btn-secondary:hover {
    background: #f9fafb;
    border-color: #c7d2fe;
    color: #6366f1;
  }
  .btn-secondary:active { transform: scale(0.98); }

  /* Sign-up link row */
  .signup-row {
    margin-top: 18px;
    text-align: center;
    font-size: 14px;
    color: #6b7280;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25%       { transform: translateX(-4px); }
    75%       { transform: translateX(4px); }
  }
`;

// ─── Shared SVG Icons ─────────────────────────────────────────────────────────
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

// ─── Signup ───────────────────────────────────────────────────────────────────
function Signup({ onBack }) {
  const [email, setEmail]                   = useState("");
  const [password, setPassword]             = useState("");
  const [confirmPassword, setConfirmPw]     = useState("");
  const [showPw, setShowPw]                 = useState(false);
  const [showConfirmPw, setShowConfirmPw]   = useState(false);
  const [error, setError]                   = useState("");
  const [info, setInfo]                     = useState("");

  const validate = () => {
    if (!email.trim())           { setError("Please enter your email address."); return false; }
    if (!email.includes("@"))    { setError("Please enter a valid email address."); return false; }
    if (!password.trim())        { setError("Please enter a password."); return false; }
    if (password.length < 6)     { setError("Password must be at least 6 characters."); return false; }
    if (!confirmPassword.trim()) { setError("Please confirm your password."); return false; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return false; }
    return true;
  };

  const handleSignUp = async () => {
    setError(""); setInfo("");
    if (!validate()) return;
    const result = await signupUser(email, password, "employee");
    if (result.success) {
      setInfo("Account created! You can now sign in.");
      setTimeout(() => { setEmail(""); setPassword(""); setConfirmPw(""); onBack("employee"); }, 2000);
    } else {
      setError(result.error || "Signup failed. Please try again.");
    }
  };

  return (
    <>
      <style>{authStyles}</style>
      <div className="auth-bg" />
      <div className="auth-wrapper">
        <div className="card">
          <div className="icon-wrap"><UserIcon /></div>
          <div className="card-title">Create Account</div>
          <div className="card-subtitle">Sign up for a new employee account</div>
          <div style={{
            background: "#ede9fe",
            border: "1px solid #c4b5fd",
            borderRadius: 10,
            padding: "10px 14px",
            color: "#6366f1",
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 20,
            textAlign: "center"
          }}>
            🔒 Employee accounts only. Admin access is not available through signup.
          </div>

          {error && <div className="error-msg">{error}</div>}
          {info  && <div className="info-msg">{info}</div>}

          <div className="field-group">
            <label className="field-label">Email Address</label>
            <div className="input-wrap">
              <span className="input-icon"><MailIcon /></span>
              <input
                className="input-field" type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <div className="input-wrap">
              <span className="input-icon"><LockIcon /></span>
              <input
                className="input-field" type={showPw ? "text" : "password"}
                placeholder="Enter a strong password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
              />
              <button className="toggle-pw" onClick={() => setShowPw(v => !v)} type="button" aria-label="Toggle password">
                <EyeIcon open={showPw} />
              </button>
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Confirm Password</label>
            <div className="input-wrap">
              <span className="input-icon"><LockIcon /></span>
              <input
                className="input-field" type={showConfirmPw ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPw(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleSignUp()}
              />
              <button className="toggle-pw" onClick={() => setShowConfirmPw(v => !v)} type="button" aria-label="Toggle confirm password">
                <EyeIcon open={showConfirmPw} />
              </button>
            </div>
          </div>

          <button className="btn-primary" onClick={handleSignUp}>Sign Up</button>
          <button type="button" className="btn-secondary" onClick={onBack}>Back to Login</button>
        </div>
      </div>
    </>
  );
}

// ─── Main Auth Component ──────────────────────────────────────────────────────
export default function BragBoardAuth() {
  const [view, setView]           = useState("login");   // "login" | "signup"
  const [mode, setMode]           = useState("employee"); // "employee" | "admin"
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPw, setShowPw]       = useState(false);
  const [remember, setRemember]   = useState(false);
  const [error, setError]         = useState("");
  const [info, setInfo]           = useState("");
  const [loggedIn, setLoggedIn]   = useState(false);
  const [loggedInAs, setLoggedInAs] = useState("");

  const isAdmin = mode === "admin";

  const resetForm = () => { setEmail(""); setPassword(""); setError(""); setInfo(""); setShowPw(false); };

  const handleSwitch = (next) => { setMode(next); resetForm(); };

  const validate = () => {
    if (!email.trim())    { setError("Please enter your email address."); return false; }
    if (!password.trim()) { setError("Please enter your password."); return false; }
    return true;
  };

  const handleSubmit = async () => {
    setError(""); setInfo("");
    if (!validate()) return;
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

  // Sub-views
  if (view === "signup")  return <Signup onBack={(forcedMode) => { setView("login"); setMode(forcedMode || "employee"); resetForm(); }} />;

  // Logged-in success screen
  if (loggedIn) {
    return (
      <>
        <style>{authStyles}</style>
        <div className="auth-bg" />
        <div className="auth-wrapper">
          <div className="card" style={{ textAlign: "center" }}>
            <div className="icon-wrap">
              {loggedInAs === "Admin" ? <ShieldIcon /> : <UserIcon />}
            </div>
            <div className="card-title">Welcome back!</div>
            <p style={{ color: "#6b7280", fontSize: 15, marginTop: 8, marginBottom: 24 }}>
              You're signed in as <strong style={{ color: "#111827" }}>{loggedInAs}</strong>.
            </p>
            <button
              className="btn-primary"
              onClick={() => { setLoggedIn(false); resetForm(); }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </>
    );
  }

  // Login screen
  return (
    <>
      <style>{authStyles}</style>
      <div className="auth-bg" />
      <div className="auth-wrapper">
        <div className="card">

          {/* Icon */}
          <div className="icon-wrap">
            {isAdmin ? <ShieldIcon /> : <UserIcon />}
          </div>

          {/* Title */}
          <div className="card-title">
            {isAdmin ? "Admin Portal" : "Welcome to BragBoard"}
          </div>
          <div className="card-subtitle">
            {isAdmin ? "Sign in to manage BragBoard" : "Sign in to your BragBoard account"}
          </div>

          {/* Secure Access Banner (admin only) */}
          {isAdmin && (
            <div className="secure-banner">
              <ShieldIcon size={18} color="#6366f1" />
              <div>
                <div className="banner-title">Secure Access</div>
                <div className="banner-sub">Administrative access is restricted and monitored</div>
              </div>
            </div>
          )}

          {/* Alerts */}
          {error && <div className="error-msg">{error}</div>}
          {info  && <div className="info-msg">{info}</div>}

          {/* Email */}
          <div className="field-group">
            <label className="field-label">{isAdmin ? "Admin Email" : "Email Address"}</label>
            <div className="input-wrap">
              <span className="input-icon"><MailIcon /></span>
              <input
                className="input-field" type="email"
                placeholder={isAdmin ? "admin@bragboard.com" : "john.doe@company.com"}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="field-group">
            <label className="field-label">{isAdmin ? "Admin Password" : "Password"}</label>
            <div className="input-wrap">
              <span className="input-icon"><LockIcon /></span>
              <input
                className="input-field"
                type={showPw ? "text" : "password"}
                placeholder={isAdmin ? "Enter admin password" : "Enter your password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button className="toggle-pw" onClick={() => setShowPw(v => !v)} type="button" aria-label="Toggle password">
                <EyeIcon open={showPw} />
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="row-utils">
            <label className="remember-wrap">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span>Remember me</span>
            </label>
          </div>

          {/* Sign In */}
          <button className="btn-primary" onClick={handleSubmit}>
            {isAdmin ? "Sign In as Admin" : "Sign In"}
          </button>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">or</span>
            <div className="divider-line" />
          </div>

          {/* Mode Toggle */}
          <button className="btn-secondary" onClick={() => handleSwitch(isAdmin ? "employee" : "admin")}>
            {isAdmin ? "Employee Login →" : "Admin Login →"}
          </button>

          {/* Sign Up Link */}
          {!isAdmin && (
            <div className="signup-row">
              Don't have an account?{" "}
              <button type="button" className="forgot-link" onClick={() => setView("signup")}>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
