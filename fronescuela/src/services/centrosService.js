import { apiFetch } from "./apiClient";

export function getCentros() {
  return apiFetch("/centros");
}

export function getCentroById(id) {
  return apiFetch(`/centros/${id}`);
}

export function crearCentro(centro) {
  return apiFetch("/centros", {
    method: "POST",
    body: JSON.stringify(centro),
  });
}

export function modificarCentro(id, centro) {
  return apiFetch(`/centros/${id}`, {
    method: "PUT",
    body: JSON.stringify(centro),
  });
}

export function eliminarCentro(id) {
  return apiFetch(`/centros/${id}`, {
    method: "DELETE",
  });
}
