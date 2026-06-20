# RentaFácil – Sistema de Gestión de Flota

**Autor:** Erick Chango

## Descripción

Backend desarrollado con Spring Boot para la empresa RentaFácil, que se dedica al alquiler de vehículos. Permite gestionar la flota mediante una API REST con operaciones CRUD completas y consultas personalizadas. Incluye una interfaz web sencilla que consume la API con fetch.

## Tecnologías

- Java 21 + Spring Boot 3.3
- Spring Data JPA + PostgreSQL
- Jakarta Validation
- HTML, CSS y JavaScript (Fetch API)

## Estructura

```
├── backend/    → Proyecto Spring Boot
├── frontend/   → Interfaz web (HTML, CSS, JS)
└── README.md
```

## Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/vehiculos | Crear vehículo |
| GET | /api/vehiculos | Listar todos |
| GET | /api/vehiculos/{id} | Buscar por ID |
| PUT | /api/vehiculos/{id} | Actualizar |
| DELETE | /api/vehiculos/{id} | Eliminar |
| GET | /api/vehiculos/por-categoria | Por categoría y unidades |
| GET | /api/vehiculos/por-precio | Por rango de precio |
| GET | /api/vehiculos/buscar | Búsqueda por modelo |

## Cómo ejecutar

1. Crear la base de datos `examen_parcial1` en PostgreSQL
2. Ajustar usuario/contraseña en `backend/src/main/resources/application.properties`
3. Correr el backend: `./gradlew bootRun` desde la carpeta `backend/`
4. Abrir `frontend/index.html` en el navegador
