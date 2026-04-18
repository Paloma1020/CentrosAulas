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

export default function FormularioAula({
  modo, // "crear" | "editar"
  aula,
  setAula,
  onSubmit,
  onClose,
}) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {modo === "crear" ? "Agregar Aula" : "Editar Aula"}
          </DialogTitle>
          <DialogDescription>
            {modo === "crear"
              ? "Crea un nuevo aula"
              : "Modifica los datos del aula"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Número de aula
            </label>
            <Input
              type="number"
              placeholder="Número de aula"
              value={aula.numeroAula}
              onChange={(e) => setAula({ ...aula, numeroAula: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Comentarios
            </label>
            <Input
              type="text"
              placeholder="Comentarios"
              value={aula.comentarios}
              onChange={(e) =>
                setAula({ ...aula, comentarios: e.target.value })
              }
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="esAulaOrdenadores"
              checked={aula.esAulaOrdenadores}
              onChange={(e) =>
                setAula({
                  ...aula,
                  esAulaOrdenadores: e.target.checked,
                })
              }
              className="w-4 h-4 accent-blue-600 rounded"
            />
            <label
              htmlFor="esAulaOrdenadores"
              className="text-sm font-medium text-gray-700"
            >
              Aula con ordenadores
            </label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {modo === "crear" ? "Agregar" : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
