import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { login as loginService } from "../services/authService.js";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/centros" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await loginService(email, password);

      if (response?.token) {
        login(response.token);
        toast.success("Inicio de sesión correcto");
        navigate("/centros");
        return;
      }

      toast.error("No se recibió token de autenticación");
    } catch (error) {
      toast.error(error.message || "Error al iniciar sesión");
    }
  }

  /* 
    Estilos aplicados con Tailwind CSS para un aspecto profesional con tonos azules y blancos:
    - main: min-h-screen bg-blue-50 flex items-center justify-center (fondo azul claro, centrado)
    - div: bg-white p-8 rounded-lg shadow-md w-full max-w-md (tarjeta blanca con padding, bordes redondeados, sombra)
    - h1: text-2xl font-bold text-center text-blue-600 mb-6 (título grande, centrado, azul)
    - form: space-y-4 (espacio entre elementos)
    - label: block text-sm font-medium text-gray-700 (etiquetas en bloque, grises)
    - input: mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 (inputs estilizados con borde, foco azul)
    - button: w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 (botón azul con hover)
    - p: mt-4 text-center text-sm text-gray-600 (párrafo centrado, gris)
    - Link: text-blue-600 hover:text-blue-800 (enlace azul con hover)
  */
  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-blue-600 hover:text-blue-800">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
}
