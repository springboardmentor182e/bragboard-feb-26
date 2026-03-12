const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api/v1/auth";

export const signupUser = async (email, password, role = "employee") => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        confirm_password: password,
        role,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.detail || "Signup failed",
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
};
