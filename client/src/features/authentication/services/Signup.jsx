import { useState } from "react";
import { signupUser } from "./signupApi";

const authStyles = `
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

export default function Signup({ onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const validateForm = () => {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return false;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!password.trim()) {
      setError("Please enter a password.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (!confirmPassword.trim()) {
      setError("Please confirm your password.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    setError("");
    setInfo("");
    if (!validateForm()) return;

    // Call the signup API
    const result = await signupUser(email, password, "employee");
    
    if (result.success) {
      setInfo("Account created successfully! You can now sign in.");
      setTimeout(() => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        onBack();
      }, 2000);
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
          <div className="icon-wrap employee">
            <UserIcon />
          </div>
          <div className="card-title">Create Account</div>
          <div className="card-subtitle">
            Sign up for a new employee account
          </div>

          {error && <div className="error-msg">{error}</div>}
          {info && <div className="info-msg">{info}</div>}

          {/* Email Field */}
          <div className="field-group">
            <label className="field-label">Email Address</label>
            <div className="input-wrap">
              <span className="input-icon">
                <MailIcon />
              </span>
              <input
                className="input-field"
                type="email"
                placeholder="your.email@company.com"
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
            <label className="field-label">Password</label>
            <div className="input-wrap">
              <span className="input-icon">
                <LockIcon />
              </span>
              <input
                className="input-field"
                type={showPw ? "text" : "password"}
                placeholder="Enter a strong password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
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

          {/* Confirm Password Field */}
          <div className="field-group">
            <label className="field-label">Confirm Password</label>
            <div className="input-wrap">
              <span className="input-icon">
                <LockIcon />
              </span>
              <input
                className="input-field"
                type={showConfirmPw ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSignUp()}
              />
              <button
                className="toggle-pw"
                onClick={() => setShowConfirmPw((v) => !v)}
                type="button"
                aria-label="Toggle confirm password visibility"
              >
                <EyeIcon open={showConfirmPw} />
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            className="btn-primary employee"
            onClick={handleSignUp}
          >
            Sign Up
          </button>

          {/* Back Button */}
          <button
            type="button"
            className="btn-secondary"
            onClick={onBack}
          >
            Back to login
          </button>
        </div>
      </div>
    </>
  );
}
