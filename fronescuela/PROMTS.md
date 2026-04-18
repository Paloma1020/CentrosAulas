# PROMTS

Este archivo almacena todos los prompts y peticiones realizadas en este chat para referencia futura.

## Prompts y peticiones del chat

1. Genera el archivo Agent
2. Quiero añadir autentication y rutas a este proyecto. Para ellos, haz las siguientes rutas y paginas:
   - /login para el formulario de login
   - /registro para el formulario de registro
   - /logout para hacer logout y volver al formulario de login.

   Implementa soporte para jwt según la siguiente especificación:
   - API REST de Gestión de Centros con entidades Centro, Aula y Usuario.
   - Endpoints disponibles para centros, aulas y usuario.
   - Autenticación con JWT en `/auth/login` y registro en `/auth/register`.
   - Obtener perfil con `/auth/perfil`.
   - Configuración del backend en puerto 8080 y MySQL en puerto 3306, base de datos `aulascentros`.

3. Analiza el proyecto y actualiza el archivo AGENT.md, además para las próximas modificaciones o peticiones, actualiza siempre este archivo como tengo indicado en el punto 10 de Guía para agentes IA.
4. En el NavBar en la pagina de Login y Register quiero que aparezca las opciones-enlaces a esas dos paginas. Y cuando ya hemos logueado, y estemos en la PrincipalPage.jsx quiero que aparezca en el NavBar Aulas y Centros, para poder moverme entre esas dos paginas.
5. Realiza un archivo PROMTS.md y almacena dentro de el todos los prompts y peticiones que te voy dando en este chat.
6. instala tailwindcss en el proyecto en vite.config.js, en index.css, main.jsx, y actualiza estos cambios a los archivos AGENT y PROMTS
7. Utilizando las clases de tailwind, aplica estilos basicos a la página de login y de register para que tenga un aspecto más profesional con tonos azules y blancos. Pon un comentario explicando que hace cada clase. Actualiza AGENT y PROMTS
8. Utilizando las clases de tailwind, aplica estilos basicos a la página de aulas y de centros para que tenga un aspecto más profesional con tonos azules y blancos. Tambien aplica estilo al NavBar para que tenga un aspecto más profesional con tonos azules y blancos. Pon un comentario explicando que hace cada clase. Actualiza AGENT y PROMTS
9. Utilizando las clases de tailwind, aplica estilos basicos a FormularioAula.jsx, FormularioCentro.jsx, ListaAulas.jsx y ListaCentros.jsx para que tenga un aspecto más profesional con tonos azules y blancos. Pon un comentario explicando que hace cada clase. Actualiza AGENT y PROMTS
10. Organiza y centra los elementos de FormularioAula.jsx y FormularioCentro.jsx. Pon un comentario explicando que hace cada clase. Actualiza AGENT y PROMTS
11. Organiza y centra los elementos de ListaAulas.jsx y ListaCentros.jsx, Aula.jsx, Centro.jsx. Pon un comentario explicando que hace cada clase. Actualiza AGENT y PROMTS
12. Utiliza shadcn/ui y sustituye los estilos del proyectos por componentes reutilizables. Además crea un dialogo de confirmación que aparecerá cuando se intente eliminar un curso o una aula.
13. Quiero implementar autenticación en mi proyecto React.

Actualmente uso localStorage con estas funciones:

- isLoggedIn()
- getUserFromToken()

Problema: el Navbar no se actualiza al hacer login/logout sin refrescar la página.

Quiero que lo refactorices usando Context API (AuthContext) para que:

- el usuario sea global
- el Navbar se actualice automáticamente
- haya login/logout reactivo
- se mantenga el token en localStorage

El Navbar actual está en: src/components/ui/NavBar.jsx

Necesito:

1. AuthContext completo
2. cambios en main.jsx o App.jsx
3. cómo modificar el login y logout
4. cómo queda el Navbar limpio
5. Guardar este prompt en PROMTS.md
