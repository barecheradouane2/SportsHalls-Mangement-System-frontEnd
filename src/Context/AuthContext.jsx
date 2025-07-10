// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";

// 1. Create the context
const AuthContext = createContext();

// 2. Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

// 3. Auth provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login: just save user in memory
  const login = (userData) => {
    setUser(userData);
  };

  // Logout: clear the user
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
