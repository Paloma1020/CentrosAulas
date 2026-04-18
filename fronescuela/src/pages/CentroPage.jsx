import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ListaCentros from "../components/ListaCentros";
import {
  getCentros,
  crearCentro,
  modificarCentro,
  eliminarCentro,
} from "../services/centrosService";
import { removeToken } from "../utils/auth.js";
import FormularioCentro from "../components/FormularioCentro";
import { Button } from "../components/ui/Button";

export default function CentroPage() {
  const [listaCentros, setListaCentros] = useState([]);
  const [nuevoCentro, setNuevoCentro] = useState({
    nombre: "",
    localidad: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [selectedCentro, setSelectedCentro] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modo, setModo] = useState(null); // "crear" | "editar"

  // Para cambiar el estado del servidor antes y después de cada operación
  // Crear centro

  async function newCentro(e) {
    e.preventDefault();

    try {
      const nuevo = {
        nombre: nuevoCentro.nombre,
        localidad: nuevoCentro.localidad,
      };

      await crearCentro(nuevo);

      setListaCentros((prev) => [...prev, nuevo]);

      setNuevoCentro({ nombre: "", localidad: "" });
    } catch {
      toast.error("Error al crear centro");
    }
  }

  // Modificar Centro
  async function editarCentro(e) {
    e.preventDefault();

    try {
      const actualizado = await modificarCentro(
        selectedCentro.id,
        selectedCentro,
      );

      setListaCentros((prev) =>
        prev.map((c) => (c.id === actualizado.id ? actualizado : c)),
      );

      setShowModal(false);
      toast.success("Centro actualizado");
    } catch {
      toast.error("Error al actualizar");
    }
  }
  async function borrarCentro(id) {
    await eliminarCentro(id); // Llama a la API para eliminar la tarea y esperar a que termine
    setListaCentros((prev) => prev.filter((centro) => centro.id !== id)); // Actualiza el estado local eliminando la tarea, react renderizará de nuevo el componente con la lista actualizada
  }

  // A la hora de modificar, dentro de la pagina modificarCentro, Habrá un formulario ¿Quieres agregar aula?

  useEffect(() => {
    getCentros()
      .then((centros) => setListaCentros(centros))
      .catch((err) => {
        if (err.message === "No autorizado") {
          removeToken();
          navigate("/login");
        } else {
          setError("No se pudo conectar con el servidor");
          toast.error("No se ha podido cargar el listado", {
            description: "Intentalo de nuevo en unos segundos.",
          });
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <p className="text-center text-gray-600">Cargando...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    /* 
      Estilos aplicados con Tailwind CSS para un aspecto profesional con tonos azules y blancos:
      - main: min-h-screen bg-blue-50 py-8 (fondo azul claro, altura mínima pantalla, padding vertical)
      - div: container mx-auto px-4 (contenedor centrado, padding horizontal)
      - h1: text-3xl font-bold text-center text-blue-600 mb-8 (título grande, centrado, azul, margen inferior)
      - div: flex flex-wrap gap-4 mb-8 justify-center (flexbox con wrap, gap, centrado, margen inferior)
      - button: bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors (botones azules con hover, foco, transición)
    */
    <main className="min-h-screen bg-blue-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Gestión de Centros
        </h1>
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button
            onClick={() => {
              setNuevoCentro({ nombre: "", localidad: "" }); // limpio
              setModo("crear");
              setShowModal(true);
            }}
            size="md"
          >
            ➕ Nuevo Centro
          </Button>
          <Button
            onClick={() => {
              if (!selectedCentro) {
                toast.error("Selecciona un centro primero");
                return;
              }

              setModo("editar");
              setShowModal(true);
            }}
            size="md"
            variant="secondary"
          >
            ✏️ Modificar
          </Button>
        </div>
        <ListaCentros
          centros={listaCentros}
          borrarCentro={borrarCentro}
          onSelectCentro={setSelectedCentro}
          selectedCentro={selectedCentro}
        />
        {showModal && (
          <FormularioCentro
            modo={modo}
            centro={modo === "crear" ? nuevoCentro : selectedCentro}
            setCentro={modo === "crear" ? setNuevoCentro : setSelectedCentro}
            onSubmit={modo === "crear" ? newCentro : editarCentro}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </main>
  );
}
