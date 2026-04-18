import { Link } from "react-router-dom";

export default function PrincipalPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Bienvenido a la Escuela
        </h1>
        <p className="text-gray-600 mb-6">
          Accede a tu cuenta o regístrate para continuar.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/registro"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}
