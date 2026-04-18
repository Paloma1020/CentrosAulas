package com.example.apiaulas.dto;


import com.example.apiaulas.entities.Usuario;

import java.time.LocalDate;


public record PerfilDatos(
        Long id,
        String email,
        String nombre,
        String apellidos,
        String roles,
        LocalDate fechaRegistro
) {
    public PerfilDatos(Usuario usuario) {
        this(
                usuario.getId(),
                usuario.getEmail(),
                usuario.getNombre(),
                usuario.getApellidos(),
                usuario.getRoles(),
                usuario.getFechaRegistro()
        );
    }

}
