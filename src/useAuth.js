import { useContext } from "react";
import { AuthContext } from "./AuthContext";

/**
 * Custom hook to use authentication context
 * Usage: const { user, userData, login, logout } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
