import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, signupUser, getMe } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
  🔁 LOAD USER ON REFRESH
  */
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getMe(token); // ✅ already data

        setUser(userData);

        localStorage.setItem("role", userData.role?.toLowerCase());

      } catch (err) {
        console.error("Auth init error:", err);

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  /*
  🔐 LOGIN
  */
  const login = async (form) => {
    try {
      const res = await loginUser(form);

      const token = res.access_token; // ✅ FIX

      if (!token) throw new Error("No token received");

      localStorage.setItem("token", token);

      const userData = await getMe(token); // ✅ already data

      setUser(userData);

      localStorage.setItem("role", userData.role?.toLowerCase());

      return userData;

    } catch (err) {
      console.error("Login error:", err);

      localStorage.removeItem("token");
      localStorage.removeItem("role");

      throw err;
    }
  };

  /*
  🆕 SIGNUP
  */
  const signup = async (form) => {
    try {
      const res = await signupUser(form);

      const token = res.access_token;

      localStorage.setItem("token", token);

      const userData = await getMe(token);

      setUser(userData);

      localStorage.setItem("role", userData.role?.toLowerCase());

      return userData;

    } catch (err) {
      console.error("Signup error:", err);
      throw err;
    }
  };

  /*
  🚪 LOGOUT
  */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);