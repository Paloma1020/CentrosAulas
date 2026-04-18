// Formulario reutilizable para crear o editar centros
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/Dialog";

export default function FormularioCentro({
  onSubmit,
  centro,
  setCentro,
  onClose,
  modo = "crear",
}) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {modo === "editar" ? "Modificar Centro" : "Nuevo Centro"}
          </DialogTitle>
          <DialogDescription>
            {modo === "editar"
              ? "Modifica los datos del centro"
              : "Crea un nuevo centro educativo"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Nombre
            </label>
            <Input
              type="text"
              placeholder="Nombre del centro"
              value={centro.nombre}
              onChange={(e) => setCentro({ ...centro, nombre: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Localidad
            </label>
            <Input
              type="text"
              placeholder="Localidad"
              value={centro.localidad}
              onChange={(e) =>
                setCentro({ ...centro, localidad: e.target.value })
              }
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {modo === "editar" ? "Guardar" : "Agregar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
