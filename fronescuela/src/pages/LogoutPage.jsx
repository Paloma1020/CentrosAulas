import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";

export default function LogoutPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    toast.success("Sesión cerrada");
    navigate("/", { replace: true });
  }, [navigate, logout]);

  return <p>Cerrando sesión...</p>;
}
