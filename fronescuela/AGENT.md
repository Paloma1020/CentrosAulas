# AGENT

## Descripción del proyecto

`fronescuela` es una aplicación web React creada con Vite para gestionar centros educativos y aulas. Actualmente la app incluye:

- gestión de centros con creación, edición y eliminación (con confirmación)
- gestión de aulas con creación, edición y eliminación (con confirmación)
- autenticación JWT con login, registro y logout
- rutas protegidas para las páginas principales
- página de inicio pública con acceso a login y registro
- página 404 dedicada para rutas no encontradas
- componentes de UI reutilizables basados en shadcn/ui
- diálogos de confirmación para operaciones destructivas (DELETE)
- muestra del nombre de usuario autenticado en NavBar

## Stack tecnológico

- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS v4
- shadcn/ui (componentes personalizados)
  - Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-slot`, `@radix-ui/react-alert-dialog`)
  - `class-variance-authority` para variantes de componentes
  - `clsx` y `tailwind-merge` para gestión de clases
  - `lucide-react` para iconos
- Sonner para notificaciones (`toast`)
- Fetch API nativa para llamadas HTTP
- ESLint con `@eslint/js`, `eslint-plugin-react-hooks` y `eslint-plugin-react-refresh`
- ESM (`type: module` en `package.json`)
- `localStorage` para almacenar token JWT

## Estructura del proyecto

- `src/`
  - `components/`
    - `Aula.jsx` (fila de tabla con confirmación de eliminación)
    - `Centro.jsx` (fila de tabla con confirmación de eliminación)
    - `FormularioAula.jsx` (diálogo modal para crear/editar aulas)
    - `FormularioCentro.jsx` (diálogo modal para crear/editar centros)
    - `ListaAulas.jsx` (tabla de aulas)
    - `ListaCentros.jsx` (tabla de centros)
    - `ProtectedRoute.jsx` (enrutamiento protegido)
    - `ConfirmDeleteDialog.jsx` (diálogo de confirmación reutilizable)
    - `ui/`
      - `NavBar.jsx` (navegación con nombre de usuario)
      - `Button.jsx` (componente botón con variantes)
      - `Input.jsx` (componente input estilizado)
      - `Card.jsx` (componentes de tarjeta)
      - `Dialog.jsx` (componentes de diálogo modal)
      - `AlertDialog.jsx` (componentes de alerta modal)
  - `context/`
    - `AuthContextCreate.js` (definición del contexto de autenticación)
    - `AuthContext.jsx` (proveedor AuthProvider)
  - `hooks/`
    - `useAuth.js` (custom hook para acceder al contexto de autenticación)
  - `pages/`
    - `PrincipalPage.jsx` (página de inicio pública)
    - `CentroPage.jsx` (administración de centros, protegida)
    - `AulasPage.jsx` (administración de aulas, protegida)
    - `LoginPage.jsx` (página de login)
    - `RegistroPage.jsx` (página de registro)
    - `LogoutPage.jsx` (página de logout)
    - `NotFoundPage.jsx` (página 404)
  - `services/`
    - `aulasService.js` (CRUD de aulas)
    - `centrosService.js` (CRUD de centros)
    - `authService.js` (login y registro)
    - `apiClient.js` (configuración centralizada de API)
  - `utils/`
    - `auth.js` (gestión de tokens y datos de usuario)
  - `lib/`
    - `utils.js` (función `cn()` para merging de clases)
  - `App.jsx`
  - `main.jsx`
  - `index.css` / `App.css`

## Componentes de UI (shadcn/ui)

Los componentes de UI están diseñados para ser reutilizables y mantener consistencia visual en toda la aplicación.

### Button

- **Variantes**: `default`, `destructive`, `outline`, `ghost`, `secondary`
- **Tamaños**: `sm`, `md`, `lg`
- Propiedades: `className`, `disabled`, `onClick`, `type`, etc.
- **Uso**: En páginas, formularios y diálogos

### Input

- Campo de texto controlado
- Soporta todos los tipos de `<input>` HTML estándar
- Focus ring azul y bordes grises
- **Uso**: En formularios dentro de diálogos

### Card

- `Card`: contenedor principal
- `CardHeader`: encabezado con padding
- `CardTitle`: título dentro del header
- `CardDescription`: descripción dentro del header
- `CardContent`: contenido principal
- `CardFooter`: pie de tarjeta
- **Uso**: Para presentar contenido en tarjetas (actualmente no usado, reservado para futuras extensiones)

### Dialog

- `Dialog`: contenedor raíz
- `DialogPortal`: renderiza en portal de React
- `DialogOverlay`: fondo semitransparente
- `DialogContent`: contenido modal
- `DialogHeader`: encabezado del modal
- `DialogTitle`: título del modal
- `DialogDescription`: descripción
- `DialogFooter`: pie del modal
- `DialogTrigger`: botón para abrir
- `DialogClose`: botón para cerrar
- **Uso**: Modales para crear y editar centros/aulas

### AlertDialog

- Similar a `Dialog` pero para alertas destructivas
- `AlertDialogAction`: acción principal (rojo por defecto)
- `AlertDialogCancel`: cancelación
- **Uso**: Confirmación de eliminación de centros y aulas

### ConfirmDeleteDialog

Componente personalizado que envuelve `AlertDialog` para confirmación de eliminación:

```jsx
<ConfirmDeleteDialog
  isOpen={isOpen}
  onClose={onClose}
  onConfirm={handleDelete}
  title="Eliminar Centro"
  description="¿Estás seguro?"
  confirmText="Eliminar"
  cancelText="Cancelar"
/>
```

## Configuración de Tailwind CSS

- Plugin `@tailwindcss/vite` agregado en `vite.config.js`
- Import `@import "tailwindcss";` en `src/index.css`
- `main.jsx` importa `index.css` para aplicar estilos globales
- Función `cn()` en `src/lib/utils.js` permite merging inteligente de clases Tailwind

## Router

`src/App.jsx` usa `BrowserRouter` y define estas rutas:

- `/` → `PrincipalPage` (pública)
- `/login` → `LoginPage` (pública)
- `/registro` → `RegistroPage` (pública)
- `/logout` → `LogoutPage` (pública)
- `/centros` → `CentroPage` (protegida)
- `/aulas` → `AulasPage` (protegida)
- `*` → `NotFoundPage` (página 404)

Las rutas `/centros` y `/aulas` están protegidas mediante `ProtectedRoute`, que redirige a `/` si no hay token.

## API REST

La aplicación consume una API REST en `http://localhost:8080`.

### URL base

- `http://localhost:8080`

### Comportamiento de llamadas HTTP

- `src/services/apiClient.js` agrega `Authorization: Bearer <token>` cuando hay token disponible.
- Si el backend devuelve `401`, el agente debe tratarlo como sesión expirada y redirigir al login.
- `getUserFromToken()` en `src/utils/auth.js` decodifica el JWT para extraer email y nombre

### Endpoints de `aulasService`

- `GET /api/aulas` → `getAulas()`
- `GET /api/aulas/:id` → `getAulaById(id)`
- `POST /api/aulas` → `crearAula(aula)`
- `PUT /api/aulas/:id` → `modificarAula(id, aula)`
- `DELETE /api/aulas/:id` → `eliminarAula(id)`

### Endpoints de `centrosService`

- `GET /api/centros` → `getCentros()`
- `GET /api/centros/:id` → `getCentroById(id)`
- `POST /api/centros` → `crearCentro(centro)`
- `POST /api/centros/:centroId/aulas/:aulaId` → `asignarAulaACentro(centroId, aulaId)`
- `DELETE /api/centros/:centroId/aulas/:aulaId` → `eliminarAulaDeCentro(centroId, aulaId)`
- `PUT /api/centros/:id` → `modificarCentro(id, centro)`
- `DELETE /api/centros/:id` → `eliminarCentro(id)`

### Endpoints de `authService`

- `POST /auth/login` → `login(email, password)`
- `POST /auth/register` → `registrar(user)`
- `GET /auth/perfil` → `getPerfil()`

## Comandos esenciales

- `npm install` — instalar dependencias
- `npm run dev` — iniciar servidor de desarrollo Vite
- `npm run build` — generar build de producción
- `npm run preview` — previsualizar el build
- `npm run lint` — ejecutar ESLint

## Convenciones de código

### Componentes

- Archivos en PascalCase para componentes: `Aula.jsx`, `ListaCentros.jsx`, `FormularioAula.jsx`.
- Componentes pequeños deben ser reutilizables y recibir props claramente nombradas.
- Si un componente es específico de una lista, usar el patrón `ListaX` y subcomponentes fila (`Aula`, `Centro`).
- Páginas usan hooks y mantienen su propio estado local.
- Los componentes de UI en `src/components/ui/` son reutilizables y aceptan className para customización.

### Componentes de UI (shadcn/ui)

- Ubicación: `src/components/ui/`
- Cada componente es un archivo `.jsx` independiente
- Usan `forwardRef` para exponer referencias DOM cuando es necesario
- Aceptan `className` para permitir customización de Tailwind
- Utilizan la función `cn()` de `src/lib/utils.js` para merging inteligente de clases
- Mantienen la máxima compatibilidad con Radix UI

### Servicios

- `src/services/*Service.js` encapsula llamadas HTTP.
- `src/services/apiClient.js` centraliza la configuración de la API y el token JWT.
- Cada función debe lanzar un `Error` cuando la respuesta no es `ok`.
- Mantener las rutas y payloads alineados con la API descrita en el backend.
- Si se añaden nuevos endpoints, registrar la función correspondiente en el servicio correcto.

### Estado local y global

- No hay estado global con Redux ni Context actualmente.
- Cada página maneja su propio estado con `useState` y `useEffect`.
- Mantener la lógica de estado dentro de la página siempre que sea posible.
- Si se necesita estado compartido, agregar un contexto claro y bien delimitado.

### Manejo de errores de API

- Envolver llamadas a servicios en `try/catch`.
- Mostrar errores de forma visible con `toast.error(...)`.
- Si el backend responde `401`, limpiar el token y redirigir a `/login`.
- Mostrar mensajes claros al usuario para fallos de red o credenciales.

### Feedback al usuario

- Usar `sonner` para notificaciones de éxito y error.
- Los formularios deben mostrar estados de envío y resultados.
- Actualizar las listas locales tras operaciones exitosas: crear, editar o eliminar.
- Si el usuario intenta editar sin seleccionar, mostrar un error claro.
- Mostrar diálogos de confirmación para operaciones destructivas (DELETE) usando `ConfirmDeleteDialog`

### Estilos

- CSS global simple en `src/index.css` y `src/App.css`.
- Usar componentes de UI de `src/components/ui/` en lugar de crear botones/inputs nuevos.
- Mantener clases simples y descriptivas cuando se usan directamente.
- Usar la función `cn()` para combinar clases base con props personalizadas.
- Evitar introducir un framework CSS nuevo sin necesidad.

### Router

- Mantener navegación ligera con `Link` de `react-router-dom`.
- Usar `ProtectedRoute` para las páginas que requieren autenticación.
- Si se añaden nuevas rutas, documentar claramente la nueva navegación en este archivo.
- Rutas públicas: `/`, `/login`, `/registro`, `/logout`
- Rutas privadas: `/centros`, `/aulas`

## Guía para agentes IA

1. Trabaja sobre el código existente respetando la estructura actual.
2. No reinventes la arquitectura: sigue el patrón React + Vite y el uso actual de `useState`/`useEffect`.
3. Usa servicios en `src/services` para cualquier acceso a API. Si amplías endpoints, agrega funciones en el servicio correspondiente.
4. No asumas datos adornados del backend; usa sólo los campos ya visibles: `id`, `numeroAula`, `comentarios`, `esAulaOrdenadores`, `fechaAlta`, `fechaModificacion`, `nombre`, `localidad`, `aulas`, `email`, `password`, `nombre`, `apellidos`, `roles`, `fechaRegistro`.
5. Al modificar la UI, usa los componentes de UI existentes en `src/components/ui/` antes de crear nuevos estilos.
6. Los formularios deben ser controlados por estado.
7. Valida y muestra errores de forma explícita con `toast` y/o mensajes en el DOM.
8. Si agregas autenticación o rutas nuevas, documenta claramente la nueva navegación y los cambios en los servicios.
9. Ejecuta `npm run lint` después de modificar código para asegurar consistencia.
10. Ejecuta `npm run build` para verificar que la compilación sea exitosa.
11. Actualiza este archivo con cada nueva implementación de código que sea relevante.

## Prioridades al trabajar con el repositorio

- Mantener la experiencia de creación/edición/eliminación de centros y aulas.
- Actualizar las listas locales tras cambios exitosos en el backend.
- Manejar errores de red de forma amigable.
- No romper el flujo actual de selección y modales.
- Si se añaden campos, mantén la compatibilidad con los formularios existentes.
- Usar componentes de UI reutilizables en lugar de crear nuevos estilos ad-hoc.
- Mostrar confirmaciones antes de eliminar recursos.

## Cambios recientes: Context API para Autenticación

### Problema original

El Navbar no se actualizaba al hacer login/logout sin refrescar la página porque el estado de autenticación se guardaba en `localStorage` directamente, sin un mecanismo reactivo de React para notificar cambios.

### Solución implementada

Se refactorizó la autenticación para usar React Context API, permitiendo que todos los componentes se suscriban a cambios en el estado de autenticación y se re-rendericen automáticamente.

### Archivos modificados

1. **`src/context/AuthContextCreate.js` (NUEVO)**
   - Crea el contexto `AuthContext` con `createContext()`
   - Separado en archivo `.js` para cumplir regla ESLint de fast-refresh

2. **`src/context/AuthContext.jsx`**
   - Componente `AuthProvider` que proporciona el contexto
   - Estado: `user`, `isAuthenticated`, `loading`
   - Inicialización desde localStorage en el initializer del `useState` (sin `useEffect`)
   - Métodos: `login(token, userData)`, `logout()`

3. **`src/hooks/useAuth.js` (NUEVO)**
   - Custom hook `useAuth()` para acceder al contexto
   - Lanza error si se usa fuera de `AuthProvider`
   - Separado en archivo para que `AuthContext.jsx` solo exporte componentes

4. **`src/main.jsx`**
   - Envuelve `<App />` con `<AuthProvider>`

5. **`src/pages/LoginPage.jsx`**
   - Cambio: `const { login } = useAuth()` en lugar de `setToken()`
   - Cambio: `login(response.token)` en lugar de `setToken(response.token)`

6. **`src/pages/LogoutPage.jsx`**
   - Cambio: `const { logout } = useAuth()` en lugar de `removeToken()`
   - Cambio: `logout()` en useEffect

7. **`src/components/ProtectedRoute.jsx`**
   - Cambio: `const { isAuthenticated, loading } = useAuth()`
   - Añadido: manejo de estado `loading` con display "Cargando..."

8. **`src/components/ui/NavBar.jsx`**
   - Cambio: `const { isAuthenticated, user } = useAuth()`
   - Beneficio: Navbar se actualiza automáticamente al login/logout

### Beneficios

- ✅ Navbar se actualiza automáticamente sin refrescar la página
- ✅ Estado de autenticación global disponible en cualquier componente
- ✅ Token se mantiene en localStorage para persistencia
- ✅ Inicialización limpia sin cascading renders
- ✅ ESLint: 0 errores (cumple reglas de react-refresh y react-hooks)
- ✅ Compilación: exitosa sin advertencias

### Patrones de uso

```javascript
import { useAuth } from "../hooks/useAuth";

function MiComponente() {
  const { isAuthenticated, user, login, logout } = useAuth();

  // Componente se re-renderiza cuando auth cambia
}
```
