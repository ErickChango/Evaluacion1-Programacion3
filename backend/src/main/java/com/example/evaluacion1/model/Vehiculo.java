package com.example.evaluacion1.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "vehiculos")
public class Vehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El modelo es obligatorio")
    @Size(min = 3, max = 100, message = "El modelo debe tener entre 3 y 100 caracteres")
    @Column(nullable = false)
    private String modelo;

    @NotBlank(message = "La categoría es obligatoria")
    @Column(nullable = false)
    private String categoria;

    @Size(max = 255, message = "La descripción no puede superar los 255 caracteres")
    private String descripcion;

    @NotNull(message = "El precio por día es obligatorio")
    @Positive(message = "El precio por día debe ser mayor a 0")
    @Column(nullable = false)
    private Double precioPorDia;

    @NotNull(message = "Las unidades disponibles son obligatorias")
    @PositiveOrZero(message = "Las unidades disponibles deben ser mayor o igual a 0")
    @Column(nullable = false)
    private Integer unidadesDisponibles;

    public Vehiculo() {}

    public Vehiculo(String modelo, String categoria, String descripcion,
                    Double precioPorDia, Integer unidadesDisponibles) {
        this.modelo = modelo;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.precioPorDia = precioPorDia;
        this.unidadesDisponibles = unidadesDisponibles;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Double getPrecioPorDia() { return precioPorDia; }
    public void setPrecioPorDia(Double precioPorDia) { this.precioPorDia = precioPorDia; }

    public Integer getUnidadesDisponibles() { return unidadesDisponibles; }
    public void setUnidadesDisponibles(Integer unidadesDisponibles) {
        this.unidadesDisponibles = unidadesDisponibles;
    }
}
