import { useState } from "react";
import Centro from "./centro";

export default function ListaCentros({
  centros,
  borrarCentro,
  borrarAula,
  onSelectCentro,
}) {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (centro) => {
    if (selectedId === centro.id) {
      // 👇 si ya está seleccionado → deselecciona
      setSelectedId(null);
      onSelectCentro(null);
    } else {
      // 👇 si no → selecciona
      setSelectedId(centro.id);
      onSelectCentro(centro);
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
            {/* Encabezados de datos:
                px-4 = padding horizontal 16px
                py-3 = padding vertical 12px
                text-left = alineación a la izquierda
                font-semibold = peso de fuente semibold
            */}
            <th className="px-4 py-3 text-left font-semibold"> </th>
            <th className="px-4 py-3 text-left font-semibold">Nombre</th>
            <th className="px-4 py-3 text-left font-semibold">Localidad</th>
            <th className="px-4 py-3 text-left font-semibold">Aulas</th>
            {/* Encabezado de acciones centrado */}
            <th className="px-4 py-3 text-center font-semibold">Acciones</th>
          </tr>
        </thead>

        {/* Cuerpo de tabla */}
        <tbody>
          {centros.map((centro) => (
            <Centro
              key={centro.id}
              centro={centro}
              borrarCentro={borrarCentro}
              borrarAula={borrarAula}
              onSelectCentro={handleSelect}
              isSelected={selectedId === centro.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
