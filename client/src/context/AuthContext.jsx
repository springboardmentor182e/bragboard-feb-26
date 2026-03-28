import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, getMe } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 LOAD USER ON REFRESH
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

  // 🔐 LOGIN FUNCTION
  const login = async (form) => {
    const res = await loginUser(form);

    const token = res.access_token; // ✅ FIXED

    localStorage.setItem("token", token);

    const userData = await getMe(token);

    setUser(userData);
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);