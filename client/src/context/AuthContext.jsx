import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, signupUser, getMe } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Auto login on refresh
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getMe(token);
        setUser(userData);
      } catch {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // 🔐 LOGIN
  const login = async (formData) => {
    const res = await loginUser(formData);

    localStorage.setItem("token", res.access_token);

    const userData = await getMe(res.access_token);

    setUser(userData);
  };

  // 🆕 SIGNUP
  const signup = async (formData) => {
    const res = await signupUser(formData);

    localStorage.setItem("token", res.access_token);

    const userData = await getMe(res.access_token);

    setUser(userData);
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);