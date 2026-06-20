# RentaFácil

Autor: Erick Chango

Proyecto de la evaluación parcial de Programación 3.

Este sistema fue desarrollado para una empresa ficticia de alquiler de vehículos 
llamada RentaFácil. La idea es que el personal de la empresa pueda gestionar su 
flota de vehículos de forma sencilla desde una interfaz web.

El backend está hecho con Spring Boot y Java, conectado a una base de datos 
PostgreSQL. Implementé una API REST completa con las operaciones de crear, listar, 
buscar por ID, actualizar y eliminar vehículos. Cada campo del vehículo tiene sus 
validaciones correspondientes para asegurar que los datos ingresados sean correctos.

Además incluí tres consultas personalizadas: una para filtrar vehículos por categoría 
y disponibilidad, otra para buscar dentro de un rango de precio ordenado de menor a 
mayor, y una última para hacer búsqueda parcial por nombre del modelo.

El frontend es una página web desarrollada con HTML, CSS y JavaScript puro. Se 
conecta a la API usando fetch y permite realizar todas las operaciones del CRUD 
directamente desde el navegador, mostrando la respuesta del servidor en pantalla.
