const API_BASE_URL = "http://localhost:8000/api/v1/auth";

export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.detail || "Failed to send verification code",
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Forgot password error:", error);
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
};

export const verifyCode = async (email, code) => {
  try {
    const response = await fetch(`${API_BASE_URL}/verify-reset-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        code,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.detail || "Invalid or expired verification code",
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Verify code error:", error);
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
};

export const resetPassword = async (email, newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        new_password: newPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.detail || "Failed to reset password",
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
};

