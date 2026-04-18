# Gestor de centros (Backend + Frontend)

Proyecto para gestionar centros educativos y sus aulas, con autenticacion de usuarios.

## Descripcion
Sistema completo de gestión de tareas con:
- Api REST en Java/Spring Boot.
- Frontend en React.
- Base de datos MySQL.
- Modelo de datos: Usuarios, Centros, Aulas.
- Auntenticacion JWT. 

## Ejecución
### Backend

```bash
cd tarea06
.\mvnw.cmd spring-boot:run
```
Backend en http://localhost:8080

### Frontend

```bash
cd tarea06/fronescuala
npm run dev
```
Frontend en http://localhost:5173

## Estructura del proyecto

```
demo/
├── src/                      # Backend (Java/Spring Boot)
│   ├── main/
│   │   ├── java/com/example/apicentrosaulas/
│   │   │   ├── controlador/  # REST Controllers
│   │   │   ├── servicio/     # Lógica de negocio
│   │   │   ├── modelo/       # Entidades y repositorios
│   │   │   └── dto/          # DTOs de entrada/salida
│   │   └── resources/
│   └── test/
├── frontend/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── context/         # Contextos de React
│   │   ├── hooks/           # Hooks personalizados
│   │   ├── lib/             # Librerís y utilidades
│   │   ├── pages/           # Páginas React
│   │   ├── services/        # Servicios de API
│   │   ├── utils/           # Funciones utilitarias
│   │   ├── App.jsx          # Componente principal
│   │   └── main.jsx
│   ├── .env                 # Configuración
│   ├── package.json
│   └── vite.config.js
├── docs/                     # Documentación
├── pom.xml                   # Dependencias Maven
└── openapi.yaml             # Documentación API
```

## Backend - Entidades

### Usuario
- id, email, password, nombre, apellidos, fechaRegistro, roles, enabled.
- Relación: Un usuario puede tener múltiples roles.
### Centro
- id, nombre, localidad.
- Relación: Un centro puede tener múltiples aulas.

### Aula
- id, numeroAula, comentarios, fechaAlta, fechaModificacion. 
- Relación: Una aula pertenece a un centro. Al eliminar un centro, las aulas asociadas no se eliminan pero su referencia al centro se establece a null. 
- Auditoría: fechaAlta y fechaModificacion se gestionan automáticamente con JPA Auditing.

## Frontend - Funcionalidades 
- Listar todos los centros y aulas.
- Crear, editar y eliminar centros y aulas.
- Registro e inicio de sesión de usuarios.
- Gestión de sesiones con JWT.
- Interfaz de usuario intuitiva y responsive.
- Estilos con Tailwind CSS.

## API Endpoints

### Centros
- `GET /api/centros`: Listar todos los centros.
- `GET /api/centros/{id}`: Obtener un centro por ID.
- `POST /api/centros`: Crear un nuevo centro.
- `PUT /api/centros/{id}`: Actualizar un centro existente.
- `DELETE /api/centros/{id}`: Eliminar un centro.
- `POSt /api/centros/{id}/aulas/{aulasId}`: Asignar un aula a un centro.
- `DELETE /api/centros/{id}/aulas/{aulasId}`: Eliminar una aula de un centro.

### Aulas
- `GET /api/aulas`: Listar todas las aulas.
- `GET /api/aulas/{id}`: Obtener un aulas por ID.
- `POST /api/aulas`: Crear un nuevo aula.
- `PUT /api/aulas/{id}`: Actualizar un aula existente.
- `DELETE /api/aulas/{id}`: Eliminar un aula.

### Usuarios 
- `GET /api/auth/perfil`: Obtener el perfil del usuario autenticado.
- `POST /api/auth/register`: Registrar un nuevo usuario.
- `POST /api/auth/login`: Autentificar un usuario y obtener un token JWT.

## Tecnologías

### Backend
- **Java 21**
- **Spring Boot 4.0.5**
- **Spring Data JPA**
- **H2 Database**
- **Lombok**
- **Maven**

### Frontend
- **React 19**
- **Vite 8**
- **JavaScript ES6+**
- **Fetch API**

## Documentación
- `API_DOCUMENTATION.md`- Documentación detallada de la API REST
- `docs/API_ROUTES.md` - Rutas de la API
- `AGENTS.md` - Guía para desarrolladores
- `fronescuelas/README.md` - Documentación del frontend
- `fronescuelas/PROMPTS.md`- Prompts más importantes.
