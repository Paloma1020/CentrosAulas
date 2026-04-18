# API REST de Getión de Centros

API REST desarrollada con Sprin Boot para la gestion de centros educativos.

## Entidades
### Centro
```json
{
  "id": 1,
  "nombre": "IES Marañon",
  "localidad": "Madrid",
  "aulas": []
}
```
### Aula

```json
{
  "id": 1,
  "numeroAula": 12,
  "comentarios": "Aula informatica",
  "fechaAlta": "2024-06-01",
  "fechaModificacion": "2026-01-02",
  "centro": null
}
```

### Usuario

```json
{
  "id": 1,
  "email": "gomez@gmail.com",
  "password": "123456",
  "nombre": "Marta",
  "apellidos": "Gomez",
  "fechaRegistro": "2024-05-24",
  "roles": "ROLE_ADMIN"
}
```

## Endpoints disponibles

### Centro
#### 1. Obtener todos los centros.
- GET /api/centros
Respuesta: 200 OK
```json
{
  "id": 1,
  "nombre": "IES Marañon",
  "localidad": "Madrid",
  "aulas": []
}
```
#### 2. Obtener un centro por su ID.
- Get /api/centros/{id}
  Respuesta: 200 OK o 404 Not Found
```json
{
  "id": 1,
  "nombre": "IES Marañon",
  "localidad": "Madrid",
  "aulas": []
}
```
#### 3. Crear un nuevo centro.
- Post /api/centros: 
Body:
```json
{
  "nombre": "IES Marañon",
  "localidad": "Madrid"
}
```
Respuesta: 201 Created
```json
{
  "id": 1,
  "nombre": "IES Marañon",
  "localidad": "Madrid",
  "aulas": []
}
```
#### 4. Actualizar un centro existente.
- Put /api/centros/{id}
  Body:
```json
{
  "nombre": "IES Marañon",
  "localidad": "Madrid"
}
```
Respuesta: 200 OK o 404 Not Found
#### 5. Eliminar un centro por su ID.
- Delete /api/centros/{id}

Respuesta: 204 No Content o 404 Not Found
#### 6. Asignar un aula a un centro.
- Post /api/centros/{id}/aulas/{id}

Respuesta: 200 OK o 404 Not Found
#### 7. Eliminar un aula de un centro.
- Delete /api/centros/{id}/aulas/{id} 

Respuesta: 204 No Content o 404 Not Found
### Aula
#### 1. Obtener todas las aulas.
- Get /api/aulas
Respuesta: 200 OK
```json
{
  "id": 1,
  "numeroAula": 12,
  "comentarios": "Aula informatica",
  "fechaAlta": "2024-06-01",
  "fechaModificacion": "2026-01-02",
  "centro": null
}
```
#### 2. Obtener un aula por su ID.
- Get /api/aulas/{id}
  Respuesta: 200 OK o 404 Not Found
```json
{
  "id": 1,
  "numeroAula": 12,
  "comentarios": "Aula informatica",
  "fechaAlta": "2024-06-01",
  "fechaModificacion": "2026-01-02",
  "centro": null
}
```
#### 3. Crear un nueva aula.
- Post /api/aulas.
Body:
```json
{
  "numeroAula": 12,
  "comentarios": "Aula informatica"
}
```
Respuesta: 201 Created
```json
{
  "id": 1,
  "numeroAula": 12,
  "comentarios": "Aula informatica",
  "fechaAlta": "2024-06-01",
  "fechaModificacion": "2026-01-02",
  "centro": null
}
```
#### 4. Actualizar un aula existente.
- Put /api/aulas/{id}: Actualizar un aula existente.
Body:
```json
{
  "numeroAula": 12,
  "comentarios": "Aula audiovisual"
}
```
Respuesta: 200 Ok o 404 Not Found
```json
{
  "id": 1,
  "numeroAula": 12,
  "comentarios": "Aula audiovisual",
  "fechaAlta": "2024-06-01",
  "fechaModificacion": "2026-01-02",
  "centro": null
}
```
#### 5. Eliminar un aula por su ID.
- Delete /api/aulas/{id}

Respuesta: 200 Ok o 404 Not Found


### Usuario
#### 1. Autentificar un usuario y obtener un token JWT.
- Post /api/auth/login
Body:
```json
{
  "email": "gomez@gmail.com",
  "password": "123456"
}
```
Repuesta: 200 OK
token JWT: 
#### 2. Registrar un nuevo usuario.
- Post /api/auth/register
Body: 
```json
{
  "email": "gomez@gmail.com",
  "password": "123456",
  "nombre": "Marta",
  "apellidos": "Gomez",
  "fechaRegistro": "2024-05-24",
  "roles": "ROLE_ADMIN"
}
```
Respuesta: 201 Created
```json
{
  "id": 1,
  "email": "gomez@gmail.com",
  "password": "123456",
  "nombre": "Marta",
  "apellidos": "Gomez",
  "fechaRegistro": "2024-05-24",
  "roles": "ROLE_ADMIN"
}
```
#### 3. Obtener el perfil del usuario autenticado.
- Get /api/auth/perfil: Obtener el perfil del usuario autenticado.

Respuesta: 200 Ok
```json
{
  "id": 1,
  "email": "gomez@gmail.com",
  "password": "123456",
  "nombre": "Marta",
  "apellidos": "Gomez",
  "fechaRegistro": "2024-05-24",
  "roles": "ROLE_ADMIN"
}
```
## Configuración

La aplicación se ejecuta en el puerto **8080** y se conecta a MySQL en el puerto **3306**.

Base de datos: `aulascentros`


