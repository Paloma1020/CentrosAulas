# AGENTS.md

## Architecture Overview
This is a Spring Boot 3.5.7 REST API for managing educational centers (centros) and classrooms (aulas), with JWT-based user authentication. The application uses a layered architecture:

- **Controllers**: Handle HTTP requests/responses (`AuthController`, `AulasController`, `CentrosController`)
- **Services**: Business logic (`JwtService`, `CustomUserDetailsService`)
- **Repositories**: Data access layer (JPA repositories for `Usuario`, `Aula`, `Centro`)
- **Entities**: JPA entities with relationships (`Centro` 1:N `Aula`, `Usuario` implements `UserDetails`)
- **DTOs**: Request/response objects (`LoginRequest`, `RegisterRequest`, `PerfilDatos` as records)
- **Config**: Security configuration with JWT validation and role-based access

Data flows from REST endpoints through controllers to repositories, with JWT tokens required for authenticated requests. Entities use JPA auditing for automatic timestamp management.

## Key Components
- **Entities**: `Usuario` (email-based auth, roles as comma-separated string), `Centro` (name/location), `Aula` (number, type, comments, audit dates)
- **Security**: Stateless JWT auth with roles extracted from token claims; public endpoints: `/auth/**`; BCrypt password encoding
- **Relationships**: `Centro` has many `Aulas`; deleting a `Centro` nullifies associated `Aulas`' centro reference
- **Validation**: Global exception handler for `@Valid` DTOs; returns field-level error maps

## Developer Workflows
- **Build**: `mvn clean compile` or `./mvnw clean compile`
- **Run**: `mvn spring-boot:run` or `./mvnw spring-boot:run` (starts on port 8080)
- **Test**: `mvn test` or `./mvnw test` (JUnit tests in `src/test/java`)
- **Debug**: Run with `--debug` flag or attach debugger to port 8080; SQL logging enabled via `spring.jpa.show-sql=true`
- **Database**: MySQL on localhost:3306, schema `aulascentros`; DDL auto-update enabled

## Project Conventions
- **Lombok**: Use `@Getter/@Setter/@AllArgsConstructor/@NoArgsConstructor/@Builder` on entities; configure annotation processor in `pom.xml`
- **JPA Auditing**: `@EnableJpaAuditing` in main class; `@CreatedDate/@LastModifiedDate` on `Aula` with `@EntityListeners(AuditingEntityListener.class)`
- **DTOs**: Use records for simple immutable DTOs with validation annotations (`@NotBlank`, `@Email`)
- **Repositories**: Extend `JpaRepository`; custom methods like `findByEmail` in `UsuarioRepository`
- **Controllers**: `@RestController` with `@RequestMapping`; use `ResponseEntity` for HTTP responses; `@CrossOrigin(origins = "*")` for CORS
- **Security**: Roles prefixed with "ROLE_" in DB; stored as comma-separated string in JWT claims; `@EnableMethodSecurity` for `@PreAuthorize`
- **Error Handling**: `@RestControllerAdvice` catches `MethodArgumentNotValidException` and general `Exception`, returning JSON error maps

## Integration Points
- **Database**: MySQL connector; config in `application.properties` (update credentials as needed)
- **JWT**: JJWT library for token generation/validation; secret key auto-generated per run (tokens don't persist across restarts)
- **External APIs**: None; all endpoints internal REST

## Examples
- **Entity Creation**: `Aula` auto-sets `fechaAlta`/`fechaModificacion` via auditing; example in `AulasController.createAula`
- **Auth Flow**: Login at `/auth/login` returns `{"token": "jwt_string"}`; use in `Authorization: Bearer <token>` header
- **CRUD Pattern**: Controllers follow REST conventions; e.g., `PUT /api/aulas/{id}` updates fields manually (see `AulasController.updateAula`)
- **Role Assignment**: Register with `"roles": "ROLE_ADMIN,ROLE_USER"`; defaults to `"ROLE_USER"` if omitted</content>
<parameter name="filePath">/Users/paloma/Documents/dev/02_Proyectos/web/apiaulasusuarios/AGENTS.md

## Personalized
Include in this file relevant changes after each implementation that it requests (new entities, new endpoints, etc.)