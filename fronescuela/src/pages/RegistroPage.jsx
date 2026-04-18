import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { registrar } from "../services/authService.js";
import { setToken, isLoggedIn } from "../utils/auth.js";

export default function RegistroPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const navigate = useNavigate();

  if (isLoggedIn()) {
    return <Navigate to="/centros" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const user = {
        email,
        password,
        nombre,
        apellidos,
        fechaRegistro: new Date().toISOString().slice(0, 10),
        roles: "ROLE_ADMIN",
      };

      const response = await registrar(user);

      if (response?.token) {
        setToken(response.token);
        toast.success("Registro completado");
        navigate("/centros");
        return;
      }

      toast.success("Registro completado. Por favor inicia sesión.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Error al registrar usuario");
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
          Registro
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellidos
            </label>
            <input
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Registrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
