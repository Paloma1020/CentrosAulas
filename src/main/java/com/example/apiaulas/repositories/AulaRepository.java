package com.example.apiaulas.repositories;

import com.example.apiaulas.entities.Aula;
import com.example.apiaulas.entities.Centro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AulaRepository extends JpaRepository<Aula, Long> {

}
