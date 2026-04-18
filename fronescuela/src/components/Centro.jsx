import { useState } from "react";
import ListaAulas from "./ListaAulas";
import { Button } from "./ui/Button";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";

export default function Centro({
  centro,
  borrarCentro,
  borrarAula,
  onSelectCentro,
  isSelected,
}) {
  const [mostrarAulas, setMostrarAulas] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteConfirm = async () => {
    await borrarCentro(centro.id);
  };

  return (
    <>
      {/* Fila principal del centro:
          hover:bg-blue-50 = fondo azul muy claro al pasar mouse
          transition duration-200 = animación suave en 200ms
          border-b border-gray-200 = borde inferior gris claro
      */}
      <tr
        className={`hover:bg-blue-50 transition duration-200 border-b border-gray-200 ${
          isSelected ? "bg-blue-100" : "bg-white"
        }`}
      >
        {/* Celda de checkbox:
            px-4 = padding horizontal 16px
            py-3 = padding vertical 12px
            text-center = alineación centrada
        */}
        <td className="px-4 py-3 text-center">
          {/* Checkbox estilizado:
              w-4 h-4 = tamaño 16x16px
              accent-blue-600 = color de selección azul
              rounded = esquinas redondeadas
              cursor-pointer = cursor cambia a mano
          */}
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelectCentro(centro)}
            className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
          />
        </td>
        {/* Celda de nombre del centro:
            px-4 = padding horizontal 16px
            py-3 = padding vertical 12px
            text-left = alineación a la izquierda
            font-medium = peso de fuente medio
            text-gray-900 = color gris muy oscuro
        */}
        <td className="px-4 py-3 text-left font-medium text-gray-900">
          {centro.nombre}
        </td>
        {/* Celda de localidad:
            px-4 = padding horizontal 16px
            py-3 = padding vertical 12px
            text-left = alineación a la izquierda
            text-gray-600 = color gris medio
        */}
        <td className="px-4 py-3 text-left text-gray-600">
          {centro.localidad}
        </td>
        {/* Celda de botón expandir/contraer aulas:
            px-4 = padding horizontal 16px
            py-3 = padding vertical 12px
            text-center = alineación centrada
        */}
        <td className="px-4 py-3 text-center">
          {/* Botón expandir/contraer:
              bg-blue-50 = fondo azul muy claro
              text-blue-600 = texto azul
              px-3 py-2 = padding pequeño
              rounded = esquinas redondeadas
              hover:bg-blue-100 = fondo más oscuro al hover
              transition duration-200 = animación suave
              font-semibold = peso de fuente semibold
              cursor-pointer = cursor de mano
          */}
          <button
            onClick={() => setMostrarAulas(!mostrarAulas)}
            className="bg-blue-50 text-blue-600 px-3 py-2 rounded hover:bg-blue-100 transition duration-200 font-semibold cursor-pointer"
          >
            Aulas {mostrarAulas ? "▲" : "▼"}
          </button>
        </td>
        {/* Celda de acciones (eliminar):
            px-4 = padding horizontal 16px
            py-3 = padding vertical 12px
            text-center = alineación centrada
        */}
        <td className="px-4 py-3 text-center">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
            title="Eliminar centro"
          >
            🗑️ Eliminar
          </Button>
        </td>
      </tr>

      {/* Fila de expansión de aulas */}
      {mostrarAulas && (
        <tr>
          {/* Celda que abarca todas las columnas:
              colSpan="5" = abarca 5 columnas
              px-0 py-0 = sin padding para que la tabla ocupe todo el espacio
              bg-gray-50 = fondo gris muy claro
          */}
          <td colSpan="5" className="px-0 py-0 bg-gray-50">
            {/* Contenedor con padding interno:
                p-4 = padding interno 16px
            */}
            <div className="p-4">
              <ListaAulas aulas={centro.aulas || []} borrarAula={borrarAula} />
            </div>
          </td>
        </tr>
      )}

      {/* Diálogo de confirmación de eliminación */}
      <ConfirmDeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Centro"
        description={`¿Estás seguro de que deseas eliminar el centro "${centro.nombre}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </>
  );
}
