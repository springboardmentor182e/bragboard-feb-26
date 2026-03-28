import { createContext, useState, useMemo } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Init auth from localStorage without effect
  if (loading) {
    const savedToken = localStorage.getItem('auth_token');
    const savedRole = localStorage.getItem('user_role');
    const savedEmail = localStorage.getItem('user_email');
    
    if (savedToken && savedRole && savedEmail) {
      setToken(savedToken);
      setUser({ role: savedRole, email: savedEmail });
    }
    setLoading(false);
  }

  const login = (newToken, userData) => {
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('user_role', userData.role);
    localStorage.setItem('user_email', userData.email);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_email');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({
    user, 
    token, 
    login, 
    logout, 
    loading 
  }), [user, token, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

