package com.example.apiaulas.controllers;


import com.example.apiaulas.entities.Aula;
import com.example.apiaulas.entities.Centro;
import com.example.apiaulas.repositories.AulaRepository;
import com.example.apiaulas.repositories.CentroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
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
public class CentrosController {

    @Autowired
    private CentroRepository centroRepository;

    @Autowired
    private AulaRepository aulaRepository;

    // LISTAR TODOS LOS CENTROS
    @GetMapping("/centros")
    public ResponseEntity<List<Centro>> findAllCentros(){return ResponseEntity.ok(centroRepository.findAll());}

    // OBTENER UN CENTRO
    @GetMapping("/centros/{id}")
    public ResponseEntity<Centro> findCentro(@PathVariable Long id){
        return centroRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    // INSERTAR CENTRO
    @PostMapping("/centros")
    public ResponseEntity<Centro> createCentro(@RequestBody Centro centro){
        return ResponseEntity.status(201).body(centroRepository.save(centro));
    }

    // MODIFICAR CENTRO
    @PutMapping("/centros/{id}")
    public ResponseEntity<Centro> updateCentro(@RequestBody Centro centroNuevo, @PathVariable Long id){
        return centroRepository.findById(id)
                .map(centro -> {
                    centro.setNombre(centroNuevo.getNombre());
                    centro.setLocalidad(centroNuevo.getLocalidad());
                    return ResponseEntity.ok(centroRepository.save(centro));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // BORRAR CENTRO SIN BORRAR AULAS
    @DeleteMapping("/centros/{id}")
    public ResponseEntity<Object> deleteCentro(@PathVariable Long id){
        return centroRepository.findById(id)
                .map(centro -> {
                    centro.getAulas().forEach(aula -> aula.setCentro(null));
                    aulaRepository.saveAll(centro.getAulas());

                    centroRepository.delete(centro);

                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // AGREGAR AULA A CENTRO
    @PostMapping("/centros/{centroId}/aulas/{aulasId}")
    public ResponseEntity<Centro> addAulaToCentro(@PathVariable Long centroId, @PathVariable Long aulasId){
        Optional<Centro> centroOptional = centroRepository.findById(centroId);
        Optional<Aula> aulaOptional = aulaRepository.findById(aulasId);

        if (centroOptional.isPresent() && aulaOptional.isPresent()){
            Centro centro = centroOptional.get();
            Aula aula = aulaOptional.get();

            aula.setCentro(centro);
            centro.getAulas().add(aula);

            centroRepository.save(centro);
            aulaRepository.save(aula);

            return ResponseEntity.ok(centro);

        }
        return ResponseEntity.notFound().build();
    }

    // ELIMINAR AULA
    @DeleteMapping("/centros/{centroId}/aulas/{aulaId}")
    public ResponseEntity<Centro> deleteAulaToCentro(@PathVariable Long centroId, @PathVariable Long aulaId){
        Optional<Centro> centroOptional = centroRepository.findById(centroId);
        Optional<Aula> aulaOptional = aulaRepository.findById(aulaId);

        if (centroOptional.isPresent() && aulaOptional.isPresent()){
            Centro centro = centroOptional.get();
            Aula aula = aulaOptional.get();

            if(aula.getCentro() != null && aula.getCentro().getId().equals(centroId)){
                aula.setCentro(null);
                centro.getAulas().remove(aula);

                aulaRepository.save(aula);
                centroRepository.save(centro);
                return ResponseEntity.ok(centro);
            }

        }
        return ResponseEntity.notFound().build();
    }
}
