package com.example.apiaulas.controllers;

import com.example.apiaulas.entities.Aula;
import com.example.apiaulas.repositories.AulaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * Obtener
 * Listar
 * Insertar
 * Borrar
 * Modificar
 */

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AulasController {

    // Para inicializar de forma automatica, quiero que se encargue de gestionar el objeto aulaRepository
    @Autowired //Autoinyecte
    AulaRepository aulaRepository;


    // Listar Aulas
    @GetMapping("/aulas")
    public ResponseEntity<List<Aula>> findAllAulas(){
        return ResponseEntity.ok(aulaRepository.findAll());
    }

    // Optener Aulas
    @GetMapping("/aulas/{id}")
    public ResponseEntity<Aula> findAula(@PathVariable Long id){
        return aulaRepository.findById(id)
                // Si encuentra el aula
                .map(aula -> ResponseEntity.ok(aula))
                // Si no encuentra el aula
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Insertar
    // Automaticamente se creará la fecha de alta y modificación
    @PostMapping("/aulas")
    public ResponseEntity<Aula> createAula(@RequestBody Aula aula) {
        Aula nueva = aulaRepository.save(aula);
        return ResponseEntity.status(201).body(nueva);
    }

    // Eliminar
    @DeleteMapping("/aulas/{id}")
    public ResponseEntity<Object> deleteAula(@PathVariable Long id){
        Optional<Aula> aulaOptional = aulaRepository.findById(id);
        if (aulaOptional.isPresent()){
            aulaRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    // Modificar
    @PutMapping("/aulas/{id}")
    public ResponseEntity<Aula> updateAula(@RequestBody Aula aulaNueva, @PathVariable Long id){
        Optional<Aula> aula = aulaRepository.findById(id);
        if(aula.isPresent()){
            aula.get().setNumeroAula(aulaNueva.getNumeroAula());
            aula.get().setEsAulaOrdenadores(aulaNueva.isEsAulaOrdenadores());
            aula.get().setComentarios(aulaNueva.getComentarios());
            aula.get().setCentro(aulaNueva.getCentro());

            return ResponseEntity.ok(aulaRepository.save(aula.get()));

        }else{
            return ResponseEntity.notFound().build();
        }
    }

}
