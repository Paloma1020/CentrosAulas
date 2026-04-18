import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "./Button";

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {isAuthenticated ? (
          <h1 className="text-xl font-bold">Escuela</h1>
        ) : (
          <Link to="/">
            <Button>
              <h1 className="text-xl font-bold">Escuela</h1>
            </Button>
          </Link>
        )}
        <div className="flex space-x-4 items-center">
          {isAuthenticated ? (
            <>
              <Link
                to="/centros"
                className="text-white hover:text-blue-200 px-3 py-2 rounded-md transition-colors"
              >
                Centros
              </Link>
              <Link
                to="/aulas"
                className="text-white hover:text-blue-200 px-3 py-2 rounded-md transition-colors"
              >
                Aulas
              </Link>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-blue-100">
                  {user?.nombre || user?.email || "Usuario"}
                </span>
                <Link to="/logout">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-blue-700"
                  >
                    Cerrar sesión
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-black hover:text-white border-white hover:bg-blue-700"
                >
                  Login
                </Button>
              </Link>
              <Link to="/registro">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-blue-700"
                >
                  Registro
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
