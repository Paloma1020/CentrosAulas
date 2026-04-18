import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrincipalPage from "./pages/PrincipalPage";
import CentroPage from "./pages/CentroPage";
import AulasPage from "./pages/AulasPage";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import LogoutPage from "./pages/LogoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./components/ui/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/" element={<PrincipalPage />} />
        <Route
          path="/centros"
          element={
            // ProtectedRoute = componente que verifica si el usuario está autenticado antes de mostrar la página
            <ProtectedRoute>
              <CentroPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aulas"
          element={
            <ProtectedRoute>
              <AulasPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
