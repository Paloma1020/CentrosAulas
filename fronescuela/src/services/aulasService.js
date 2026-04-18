import { apiFetch } from "./apiClient";

export function getAulas() {
  return apiFetch("/aulas");
}

export function getAulaById(id) {
  return apiFetch(`/aulas/${id}`);
}

export function crearAula(aula) {
  return apiFetch("/aulas", {
    method: "POST",
    body: JSON.stringify(aula),
  });
}

export function modificarAula(id, aula) {
  return apiFetch(`/aulas/${id}`, {
    method: "PUT",
    body: JSON.stringify(aula),
  });
}

export function eliminarAula(id) {
  return apiFetch(`/aulas/${id}`, {
    method: "DELETE",
  });
}
