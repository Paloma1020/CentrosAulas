import { apiFetch } from "./apiClient";

export function login(email, password) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function registrar(user) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export function getPerfil() {
  return apiFetch("/auth/perfil");
}
