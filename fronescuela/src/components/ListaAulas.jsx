import Aula from "./Aula";
import { useState } from "react";

export default function ListaAulas({ aulas, borrarAula, onSelectAula }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (aula) => {
    if (selectedId === aula.id) {
      // 👇 si ya está seleccionado → deselecciona
      setSelectedId(null);
      onSelectAula(null);
    } else {
      // 👇 si no → selecciona
      setSelectedId(aula.id);
      onSelectAula(aula);
    }
  };
  return (
    // Contenedor responsivo:
    // w-full = ancho 100% del contenedor padre
    // overflow-x-auto = permite scroll horizontal en pantallas pequeñas
    <div className="w-full overflow-x-auto">
      {/* Tabla profesional:
          w-full = ancho 100%
          border-collapse = colapsa bordes adyacentes
          bg-white = fondo blanco
          rounded-lg = esquinas redondeadas
          shadow-md = sombra media para profundidad
          overflow-hidden = recorta contenido dentro de bordes redondeados
      */}
      <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
        {/* Encabezado de tabla */}
        <thead>
          {/* Fila de encabezado:
              bg-blue-600 = fondo azul profesional
              text-white = texto blanco para contraste
          */}
          <tr className="bg-blue-600 text-white">
            {/* Celda vacía para checkbox:
                px-4 = padding horizontal 16px
                py-3 = padding vertical 12px
                text-left = alineación a la izquierda
                font-semibold = peso de fuente semibold
            */}
            <th className="px-4 py-3 text-left font-semibold"></th>
            {/* Encabezados de datos */}
            <th className="px-4 py-3 text-left font-semibold">Número Aula</th>
            <th className="px-4 py-3 text-left font-semibold">Ordenadores</th>
            <th className="px-4 py-3 text-left font-semibold">Comentarios</th>
            <th className="px-4 py-3 text-left font-semibold">Fecha Alta</th>
            <th className="px-4 py-3 text-left font-semibold">
              Fecha Modificación
            </th>
            {/* Encabezado de acciones centrado */}
            <th className="px-4 py-3 text-center font-semibold">Acciones</th>
          </tr>
        </thead>
        {/* Cuerpo de tabla */}
        <tbody>
          {aulas.map((aula) => (
            <Aula
              key={aula.id}
              aula={aula}
              borrarAula={borrarAula}
              onSelectAula={handleSelect}
              isSelected={selectedId === aula.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
