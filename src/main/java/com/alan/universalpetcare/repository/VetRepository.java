package com.alan.universalpetcare.repository;

import com.alan.universalpetcare.model.Vet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface VetRepository extends JpaRepository<Vet, Long> {
    List<Vet> findBySpecialization(String specialization);

    boolean existsBySpecialization(String specialization);

    @Query("SELECT DISTINCT v.specialization FROM Vet v")
    List<String> getSpecializations();

    @Query("SELECT v.specialization as specialization, COUNT(v) as count FROM Vet v GROUP BY v.specialization")
    List<Object[]> countVetsBySpecialization();
}
