const TOKEN_KEY = "fronescuela_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;

  try {
    // Decodificar JWT (sin verificar firma, solo para obtener el payload)
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return {
      email: payload.email || payload.sub || null,
      nombre: payload.nombre || payload.name || null,
      roles: payload.roles || [],
    };
  } catch {
    return null;
  }
}
