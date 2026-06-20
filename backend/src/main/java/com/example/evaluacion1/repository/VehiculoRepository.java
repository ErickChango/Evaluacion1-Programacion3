package com.example.evaluacion1.repository;

import com.example.evaluacion1.model.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, Long> {

    List<Vehiculo> findByCategoriaAndUnidadesDisponiblesGreaterThan(String categoria, Integer unidades);

    List<Vehiculo> findByPrecioPorDiaBetweenOrderByPrecioPorDiaAsc(Double precioMin, Double precioMax);

    List<Vehiculo> findByModeloContainingIgnoreCase(String modelo);
}
