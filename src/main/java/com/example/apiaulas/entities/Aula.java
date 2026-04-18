package com.example.apiaulas.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "aulas")
@EntityListeners(AuditingEntityListener.class)
public class Aula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer numeroAula;
    private boolean esAulaOrdenadores;
    private String comentarios;

    // No hace falta añadir nada más, ya las fechas las controla Spring

    @CreatedDate
    // No puede haber valor nulo y que no se puede actualizar
    @Column(nullable = false, updatable = false)
    private LocalDate fechaAlta;

    @LastModifiedDate
    // No puede haber valor nulo
    @Column(nullable = false)
    private LocalDate fechaModificacion;


    @ManyToOne()
    @JoinColumn(name = "centroId")
    @JsonIgnoreProperties("aulas")
    private Centro centro;
}
