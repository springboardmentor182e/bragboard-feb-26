import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    setUser(res.data);
  };

  const register = async (name, email, password) => {
    await axios.post("http://localhost:5000/register", {
      name,
      email,
      password,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);