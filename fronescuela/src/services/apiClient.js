import { getToken } from "../utils/auth.js";

const API_BASE = import.meta.env.VITE_API_URL;

function headersWithAuth(headers = {}) {
  const token = getToken();
  return token ? { ...headers, Authorization: `Bearer ${token}` } : headers;
}

async function handleResponse(res) {
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("No autorizado");
    }

    const text = await res.text();
    throw new Error(text || res.statusText || "Error en la solicitud");
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export async function apiFetch(path, options = {}) {
  const isJson = options.body && typeof options.body === "string";

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": isJson ? "application/json" : undefined,
      ...headersWithAuth(options.headers || {}),
    },
  });

  return handleResponse(response);
}
