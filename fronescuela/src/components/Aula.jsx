import { useState } from "react";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";

export default function Aula({ aula, borrarAula, onSelectAula, isSelected }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const handleDeleteConfirm = async () => {
    await borrarAula(aula.id);
  };
  return (
    <>
      {/* Fila de tabla con fondo dinámico según selección: // hover:bg-blue-50 =
      fondo azul muy claro al pasar mouse // transition duration-200 = animación
      suave en 200ms // border-b border-gray-200 = borde inferior gris claro*/}
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
            onChange={() => onSelectAula(aula)}
            className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
          />
        </td>
        {/* Celda de número de aula:
          px-4 = padding horizontal 16px
          py-3 = padding vertical 12px
          text-left = alineación a la izquierda
          font-medium = peso de fuente medio
          text-gray-900 = color gris muy oscuro
      */}
        <td className="px-4 py-3 text-left font-medium text-gray-900">
          {aula.numeroAula}
        </td>
        {/* Celda de ordenadores:
          px-4 = padding horizontal 16px
          py-3 = padding vertical 12px
          text-center = alineación centrada
          text-lg = tamaño de fuente 18px para emojis
      */}
        <td className="px-4 py-3 text-center text-lg">
          {aula.esAulaOrdenadores ? "💻" : "—"}
        </td>
        {/* Celda de comentarios:
          px-4 = padding horizontal 16px
          py-3 = padding vertical 12px
          text-left = alineación a la izquierda
          text-gray-600 = color gris medio
          max-w-xs = ancho máximo 320px
          truncate = corta texto con elipsis si es muy largo
      */}
        <td className="px-4 py-3 text-left text-gray-600 max-w-xs truncate">
          {aula.comentarios}
        </td>
        {/* Celda de fecha de alta:
          px-4 = padding horizontal 16px
          py-3 = padding vertical 12px
          text-left = alineación a la izquierda
          text-sm = tamaño pequeño 14px
          text-gray-500 = color gris oscuro
      */}
        <td className="px-4 py-3 text-left text-sm text-gray-500">
          {aula.fechaAlta}
        </td>
        {/* Celda de fecha de modificación:
          px-4 = padding horizontal 16px
          py-3 = padding vertical 12px
          text-left = alineación a la izquierda
          text-sm = tamaño pequeño 14px
          text-gray-500 = color gris oscuro
      */}
        <td className="px-4 py-3 text-left text-sm text-gray-500">
          {aula.fechaModificacion}
        </td>
        {/* Celda de acciones:
          px-4 = padding horizontal 16px
          py-3 = padding vertical 12px
          text-center = alineación centrada
      */}
        <td className="px-4 py-3 text-center">
          {/* Botón eliminar:
            bg-red-50 = fondo rojo muy claro
            text-red-600 = texto rojo
            px-3 py-1 = padding pequeño
            rounded = esquinas redondeadas
            hover:bg-red-100 = fondo rojo más claro al hover
            transition duration-200 = animación suave
            text-lg = tamaño 18px para emoji
            cursor-pointer = cursor de mano
        */}
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100 transition duration-200 text-lg cursor-pointer"
            title="Eliminar aula"
          >
            ❌
          </button>
        </td>
      </tr>
      {/* Diálogo de confirmación de eliminación */}
      <ConfirmDeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Aula"
        description={`¿Estás seguro de que deseas eliminar el aula "${aula.numeroAula}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </>
  );
}
