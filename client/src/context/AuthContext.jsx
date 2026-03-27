import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await getMe(token);
        setUser(res.data);
      } catch {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);
    const res = await getMe(token);
    setUser(res.data);
  };

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