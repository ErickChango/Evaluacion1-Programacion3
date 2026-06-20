const API_URL = 'http://localhost:8080/api/vehiculos';

function mostrar(data, error = false) {
    const pre = document.getElementById('respuesta');
    pre.textContent = JSON.stringify(data, null, 2);
    pre.style.borderLeft = error ? '4px solid red' : '4px solid green';
}

async function peticion(url, opciones = {}) {
    try {
        const res = await fetch(url, opciones);
        if (res.status === 204) { mostrar({ mensaje: 'Eliminado correctamente' }); return; }
        const data = await res.json();
        mostrar(data, !res.ok);
    } catch (e) {
        mostrar({ error: 'No se pudo conectar con el servidor' }, true);
    }
}

async function guardar() {
    const id = document.getElementById('vehiculoId').value;
    const vehiculo = {
        modelo:              document.getElementById('modelo').value,
        categoria:           document.getElementById('categoria').value,
        descripcion:         document.getElementById('descripcion').value || null,
        precioPorDia:        parseFloat(document.getElementById('precioPorDia').value),
        unidadesDisponibles: parseInt(document.getElementById('unidadesDisponibles').value),
    };
    if (id) {
        await peticion(`${API_URL}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(vehiculo) });
    } else {
        await peticion(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(vehiculo) });
    }
    limpiar();
}

async function buscarPorId() {
    const id = document.getElementById('buscarId').value;
    if (!id) { alert('Ingresa un ID'); return; }
    await peticion(`${API_URL}/${id}`);
}

async function listarTodos() {
    await peticion(API_URL);
}

async function eliminar() {
    const id = document.getElementById('eliminarId').value;
    if (!id) { alert('Ingresa un ID'); return; }
    if (!confirm(`¿Eliminar vehículo ${id}?`)) return;
    await peticion(`${API_URL}/${id}`, { method: 'DELETE' });
}

async function buscarPorCategoria() {
    const categoria = document.getElementById('qCategoria').value;
    const min = document.getElementById('qMinUnidades').value || 0;
    if (!categoria) { alert('Ingresa una categoría'); return; }
    await peticion(`${API_URL}/por-categoria?categoria=${encodeURIComponent(categoria)}&minUnidades=${min}`);
}

async function buscarPorPrecio() {
    const min = document.getElementById('qPrecioMin').value;
    const max = document.getElementById('qPrecioMax').value;
    if (!min || !max) { alert('Ingresa precio mínimo y máximo'); return; }
    await peticion(`${API_URL}/por-precio?precioMin=${min}&precioMax=${max}`);
}

async function buscarPorModelo() {
    const modelo = document.getElementById('qModelo').value;
    if (!modelo) { alert('Ingresa un modelo'); return; }
    await peticion(`${API_URL}/buscar?modelo=${encodeURIComponent(modelo)}`);
}

function limpiar() {
    ['vehiculoId','modelo','categoria','descripcion','precioPorDia','unidadesDisponibles'].forEach(id => {
        document.getElementById(id).value = '';
    });
}
