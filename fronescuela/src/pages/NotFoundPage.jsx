import { Link } from "react-router-dom";
import { isLoggedIn } from "../utils/auth.js";

export default function NotFoundPage() {
  const authenticated = isLoggedIn();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Página no encontrada
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <div className="space-y-4">
          {authenticated ? (
            <>
              <p className="text-gray-600 mb-6">
                Puedes volver a la página principal o explorar otras secciones:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/centros"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                >
                  Ir a Centros
                </Link>
                <Link
                  to="/aulas"
                  className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-semibold"
                >
                  Ir a Aulas
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Inicia sesión para acceder al contenido:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                >
                  Inicio
                </Link>
                <Link
                  to="/login"
                  className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-semibold"
                >
                  Login
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-500">
            Si crees que esto es un error, por favor contacta con soporte.
          </p>
        </div>
      </div>
    </div>
  );
}
