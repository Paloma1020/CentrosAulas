import { useState } from "react";
import {
  getToken,
  setToken,
  removeToken,
  getUserFromToken,
} from "../utils/auth";
import { AuthContext } from "./AuthContextCreate";

// Provider component
export function AuthProvider({ children }) {
  // Inicializar desde localStorage sin usar effect
  const [user, setUser] = useState(() => {
    const token = getToken();
    return token ? getUserFromToken() : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!getToken();
  });

  const [loading] = useState(false);

  // Login - establece el usuario y el token
  const login = (token, userData) => {
    setToken(token);
    const extractedUser = userData || getUserFromToken();
    setUser(extractedUser);
    setIsAuthenticated(true);
  };

  // Logout - limpia el usuario y el token
  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
