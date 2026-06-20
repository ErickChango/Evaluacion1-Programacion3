const API_URL = 'http://localhost:8080/api/vehiculos';

function mostrarRespuesta(data, isError = false) {
    const box = document.getElementById('respuesta');
    box.textContent = JSON.stringify(data, null, 2);
    box.className = 'respuesta-box ' + (isError ? 'err' : 'ok');
    document.getElementById('respuestaSection').scrollIntoView({ behavior: 'smooth' });
}

async function peticion(url, opciones = {}) {
    try {
        const response = await fetch(url, opciones);

        if (response.status === 204) {
            mostrarRespuesta({ mensaje: 'Vehículo eliminado correctamente', status: 204 });
            return;
        }

        const data = await response.json();

        if (!response.ok) {
            mostrarRespuesta({ error: data, status: response.status }, true);
        } else {
            mostrarRespuesta(data);
        }
    } catch (err) {
        mostrarRespuesta({ error: 'No se pudo conectar con el servidor. ¿Está corriendo el backend?', detalle: err.message }, true);
    }
}

document.getElementById('formVehiculo').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('vehiculoId').value;

    const vehiculo = {
        modelo:              document.getElementById('modelo').value.trim(),
        categoria:           document.getElementById('categoria').value.trim(),
        descripcion:         document.getElementById('descripcion').value.trim() || null,
        precioPorDia:        parseFloat(document.getElementById('precioPorDia').value),
        unidadesDisponibles: parseInt(document.getElementById('unidadesDisponibles').value),
    };

    if (id) {
        await peticion(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehiculo),
        });
    } else {
        await peticion(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vehiculo),
        });
    }

    limpiarFormulario();
});

async function buscarPorId() {
    const id = document.getElementById('buscarId').value;
    if (!id) { alert('Ingresa un ID válido'); return; }
    await peticion(`${API_URL}/${id}`);
}

async function listarTodos() {
    await peticion(API_URL);
}

async function eliminar() {
    const id = document.getElementById('eliminarId').value;
    if (!id) { alert('Ingresa un ID válido'); return; }
    if (!confirm(`¿Eliminar el vehículo con ID ${id}?`)) return;
    await peticion(`${API_URL}/${id}`, { method: 'DELETE' });
}

async function buscarPorCategoria() {
    const categoria   = document.getElementById('qCategoria').value.trim();
    const minUnidades = document.getElementById('qMinUnidades').value || 0;
    if (!categoria) { alert('Ingresa una categoría'); return; }
    await peticion(`${API_URL}/por-categoria?categoria=${encodeURIComponent(categoria)}&minUnidades=${minUnidades}`);
}

async function buscarPorPrecio() {
    const min = document.getElementById('qPrecioMin').value;
    const max = document.getElementById('qPrecioMax').value;
    if (!min || !max) { alert('Ingresa precio mínimo y máximo'); return; }
    await peticion(`${API_URL}/por-precio?precioMin=${min}&precioMax=${max}`);
}

async function buscarPorModelo() {
    const modelo = document.getElementById('qModelo').value.trim();
    if (!modelo) { alert('Ingresa un texto para buscar'); return; }
    await peticion(`${API_URL}/buscar?modelo=${encodeURIComponent(modelo)}`);
}

function limpiarFormulario() {
    document.getElementById('vehiculoId').value          = '';
    document.getElementById('modelo').value              = '';
    document.getElementById('categoria').value           = '';
    document.getElementById('descripcion').value         = '';
    document.getElementById('precioPorDia').value        = '';
    document.getElementById('unidadesDisponibles').value = '';
    document.getElementById('btnGuardar').textContent    = '💾 Guardar';
}

document.getElementById('btnLimpiar').addEventListener('click', limpiarFormulario);
