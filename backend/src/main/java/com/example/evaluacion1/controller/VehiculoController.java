package com.example.evaluacion1.controller;

import com.example.evaluacion1.model.Vehiculo;
import com.example.evaluacion1.repository.VehiculoRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vehiculos")
@CrossOrigin(origins = "*")
public class VehiculoController {

    private final VehiculoRepository vehiculoRepository;

    public VehiculoController(VehiculoRepository vehiculoRepository) {
        this.vehiculoRepository = vehiculoRepository;
    }

    @PostMapping
    public ResponseEntity<Vehiculo> crear(@Valid @RequestBody Vehiculo vehiculo) {
        Vehiculo guardado = vehiculoRepository.save(vehiculo);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }

    @GetMapping
    public ResponseEntity<List<Vehiculo>> listarTodos() {
        return ResponseEntity.ok(vehiculoRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehiculo> obtenerPorId(@PathVariable Long id) {
        Optional<Vehiculo> vehiculo = vehiculoRepository.findById(id);
        return vehiculo.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehiculo> actualizar(@PathVariable Long id,
                                               @Valid @RequestBody Vehiculo datosNuevos) {
        return vehiculoRepository.findById(id).map(vehiculo -> {
            vehiculo.setModelo(datosNuevos.getModelo());
            vehiculo.setCategoria(datosNuevos.getCategoria());
            vehiculo.setDescripcion(datosNuevos.getDescripcion());
            vehiculo.setPrecioPorDia(datosNuevos.getPrecioPorDia());
            vehiculo.setUnidadesDisponibles(datosNuevos.getUnidadesDisponibles());
            return ResponseEntity.ok(vehiculoRepository.save(vehiculo));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!vehiculoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        vehiculoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/por-categoria")
    public ResponseEntity<List<Vehiculo>> porCategoriaConUnidades(
            @RequestParam String categoria,
            @RequestParam(defaultValue = "0") Integer minUnidades) {
        List<Vehiculo> resultado = vehiculoRepository
                .findByCategoriaAndUnidadesDisponiblesGreaterThan(categoria, minUnidades);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/por-precio")
    public ResponseEntity<List<Vehiculo>> porRangoDePrecio(
            @RequestParam Double precioMin,
            @RequestParam Double precioMax) {
        List<Vehiculo> resultado = vehiculoRepository
                .findByPrecioPorDiaBetweenOrderByPrecioPorDiaAsc(precioMin, precioMax);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Vehiculo>> buscarPorModelo(@RequestParam String modelo) {
        List<Vehiculo> resultado = vehiculoRepository
                .findByModeloContainingIgnoreCase(modelo);
        return ResponseEntity.ok(resultado);
    }
}
