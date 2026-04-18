import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth.js";
import ListaAulas from "../components/ListaAulas";
import FormularioAula from "../components/FormularioAula";
import {
  getAulas,
  crearAula,
  eliminarAula,
  modificarAula,
} from "../services/aulasService";
import { toast } from "sonner";
import { Button } from "../components/ui/Button";

export default function AulasPage() {
  const [listaAulas, setListaAulas] = useState([]);

  const [nuevaAula, setNuevaAula] = useState({
    numeroAula: "",
    comentarios: "",
    esAulaOrdenadores: false,
  });

  const [selectedAula, setSelectedAula] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modo, setModo] = useState(null); // "crear" | "editar"

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getAulas()
      .then((aulas) => setListaAulas(aulas))
      .catch((err) => {
        if (err.message === "No autorizado") {
          removeToken();
          navigate("/login");
        } else {
          setError("No se pudo conectar con el servidor");
          toast.error("No se ha podido cargar el listado", {
            description: "Inténtalo de nuevo en unos segundos.",
          });
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // 🟢 CREAR
  async function newAula(e) {
    e.preventDefault();

    try {
      const nuevo = {
        numeroAula: nuevaAula.numeroAula,
        comentarios: nuevaAula.comentarios,
        esAulaOrdenadores: nuevaAula.esAulaOrdenadores,
      };

      const creada = await crearAula(nuevo);

      setListaAulas((prev) => [...prev, creada]);

      setNuevaAula({
        numeroAula: "",
        comentarios: "",
        esAulaOrdenadores: false,
      });

      setShowModal(false);
    } catch {
      toast.error("Error al crear aula");
    }
  }

  // 🟡 EDITAR
  async function editarAulaSubmit(e) {
    e.preventDefault();

    try {
      const actualizado = await modificarAula(selectedAula.id, selectedAula);

      setListaAulas((prev) =>
        prev.map((a) => (a.id === actualizado.id ? actualizado : a)),
      );

      setShowModal(false);
      setSelectedAula(null);

      toast.success("Aula actualizada");
    } catch {
      toast.error("Error al actualizar aula");
    }
  }

  // 🔴 BORRAR
  async function borrarAula(id) {
    try {
      await eliminarAula(id);

      setListaAulas((prev) => prev.filter((aula) => aula.id !== id));
    } catch {
      toast.error("Error al eliminar aula");
    }
  }

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
          Gestión de Aulas
        </h1>
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button
            onClick={() => {
              setNuevaAula({
                numeroAula: "",
                comentarios: "",
                esAulaOrdenadores: false,
              });
              setModo("crear");
              setShowModal(true);
            }}
            size="md"
          >
            ➕ Nueva Aula
          </Button>

          <Button
            onClick={() => {
              if (!selectedAula) {
                toast.error("Selecciona un aula primero");
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

        <ListaAulas
          aulas={listaAulas}
          borrarAula={borrarAula}
          onSelectAula={setSelectedAula}
          selectedAula={selectedAula}
        />

        {showModal && (
          <FormularioAula
            modo={modo}
            aula={modo === "crear" ? nuevaAula : selectedAula}
            setAula={modo === "crear" ? setNuevaAula : setSelectedAula}
            onSubmit={modo === "crear" ? newAula : editarAulaSubmit}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </main>
  );
}
