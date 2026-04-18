import { useContext } from "react";
import { AuthContext } from "../context/AuthContextCreate";

/**
 * Hook personalizado para acceder al contexto de autenticación
 * @returns {Object} Objeto con user, isAuthenticated, loading, login, logout
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
