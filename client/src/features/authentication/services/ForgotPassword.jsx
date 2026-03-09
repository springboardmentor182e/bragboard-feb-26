import { useState } from "react";
import { authStyles, MailIcon } from "./PrackBoardAuth";
import { forgotPassword, verifyCode } from "./forgotPasswordApi";

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const validateEmail = () => {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return false;
    }
    return true;
  };

  const validateCode = () => {
    if (!verificationCode.trim()) {
      setError("Please enter the verification code.");
      return false;
    }
    if (verificationCode.length !== 6) {
      setError("Verification code must be 6 digits.");
      return false;
    }
    return true;
  };

  const handleSendCode = async () => {
    setError("");
    setInfo("");
    if (!validateEmail()) return;

    const result = await forgotPassword(email);

    if (result.success) {
      setCodeSent(true);
      setInfo("Verification code has been sent to your email. Check the server console.");
    } else {
      setError(result.error || "Failed to send verification code.");
    }
  };

  const handleVerifyCode = async () => {
    setError("");
    setInfo("");
    if (!validateCode()) return;

    const result = await verifyCode(email, verificationCode);

    if (result.success) {
      setInfo("Code verified successfully!");
      setTimeout(() => {
        onBack();
      }, 2000);
    } else {
      setError(result.error || "Invalid or expired verification code.");
    }
  };

  return (
    <>
      <style>{authStyles}</style>
      <div className="auth-bg" />
      <div className="auth-wrapper">
        <div className="card">
          <div className="icon-wrap">
            <MailIcon />
          </div>
          <div className="card-title">Forgot Password</div>
          <div className="card-subtitle">
            Enter your email and we'll send instructions.
          </div>

          {error && <div className="error-msg">{error}</div>}
          {info && <div className="info-msg">{info}</div>}

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
                  setInfo("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
                disabled={codeSent}
              />
            </div>
          </div>

          {/* Verification Code Field (shown after code is sent) */}
          {codeSent && (
            <div className="field-group">
              <label className="field-label">Verification Code</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter code (e.g., 1234)"
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleVerifyCode()}
                  maxLength="6"
                />
              </div>
            </div>
          )}

          <button
            className="btn-primary employee"
            onClick={codeSent ? handleVerifyCode : handleSendCode}
          >
            {codeSent ? "Verify Code" : "Send Verification Code"}
          </button>

          {codeSent && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setCodeSent(false);
                setVerificationCode("");
                setError("");
                setInfo("");
              }}
              style={{ marginBottom: 12 }}
            >
              Change Email
            </button>
          )}

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
