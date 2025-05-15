/*

const API_BASE_URL = 'http://localhost/Api3/conex_mascotas.php';

// Obtener lista de mascotas
const listarMascotas = () => {
    return fetch(API_BASE_URL)
        .then(response => {
            if (!response.ok) throw new Error(`Error al obtener mascotas: ${response.status}`);
            return response.json();
        })
        .catch(err => {
            console.error("Error en listarMascotas:", err);
            throw err;
        });
};

// Crear una nueva mascota
const crearMascota = (nombre, especie, sexo, fecha_nacimiento, id_duenio) => {
    console.log("Enviando POST con:", { nombre, especie, sexo, fecha_nacimiento, id_duenio });
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            nombre,
            especie,
            sexo,
            fecha_nacimiento,
            id_duenio
        })
    }).then(response => {
        console.log("Respuesta de POST:", response.status);
        if (!response.ok) throw new Error(`Error al crear la mascota: ${response.status}`);
        return response.json();
    }).catch(err => {
        console.error("Error en crearMascota:", err);
        throw err;
    });
};

// Eliminar mascota
const eliminarMascota = (id_mascota) => {
    console.log("Enviando DELETE para id_mascota:", id_mascota);
    return fetch(`${API_BASE_URL}?id=${id_mascota}`, {
        method: "DELETE"
    }).then(response => {
        console.log("Respuesta de DELETE:", response.status);
        if (!response.ok) throw new Error(`Error al eliminar la mascota: ${response.status}`);
        return response.json();
    }).catch(err => {
        console.error("Error en eliminarMascota:", err);
        throw err;
    });
};

// Obtener una mascota por ID
const obtenerMascota = (id_mascota) => {
    console.log("Enviando GET para id_mascota:", id_mascota);
    return fetch(`${API_BASE_URL}?id=${id_mascota}`)
        .then(respuesta => {
            console.log("Respuesta de GET:", respuesta.status);
            if (!respuesta.ok) {
                throw new Error(`Error en la solicitud: ${respuesta.status}`);
            }
            return respuesta.json();
        })
        .catch(err => {
            console.error("Error en obtenerMascota:", err);
            throw err;
        });
};

// Actualizar mascota
const actualizarMascota = (nombre, especie, sexo, fecha_nacimiento, id_duenio, id_mascota) => { 
    const payload = {
        id_mascota,
        nombre,
        especie,
        sexo,
        fecha_nacimiento,
        id_duenio
    };
    console.log("Enviando PUT con:", payload);
    return fetch(`${API_BASE_URL}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).then(respuesta => {
        console.log("Respuesta de PUT:", respuesta.status);
        return respuesta.json().then(data => {
            console.log("Datos de la API:", data);
            if (!respuesta.ok) {
                throw new Error(`Error en la solicitud: ${respuesta.status}`);
            }
            return data;
        });
    }).catch(err => {
        console.error("Error en actualizarMascota:", err);
        throw err;
    });
};

// Exportar funciones
export const mascotaService = {
    listarMascotas,
    crearMascota,
    eliminarMascota,
    obtenerMascota,
    actualizarMascota
};

*/

//////////////////////Conexion Supabase Mascotas /////////////////////////////////

const SUPABASE_URL = "https://rkkaeohwmcpdaitjoymf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJra2Flb2h3bWNwZGFpdGpveW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY5MDcsImV4cCI6MjA2MjQ1MjkwN30.UkJFdUtOVrfmjATmamThZ0kMs0NF4PpzSv2r0ZBb2DU";
const TABLE = 'mascotas';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;
const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

// Listar todas las mascotas
const listarMascotas = () => {
    return fetch(`${API_URL}?select=*`, { headers })
        .then(async res => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Error al listar mascotas');
            }
            return res.json();
        });
};

// Crear una nueva mascota
const crearMascota = (nombre, especie, sexo, fecha_nacimiento, id_duenio) => {
    const mascota = {
        id: uuid.v4(), 
        nombre,
        especie,
        sexo,
        fecha_nacimiento,
        id_duenio
    };
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            ...headers,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify(mascota)
    })
    .then(async res => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al crear mascota');
        }
        return res.json();
    })
    .catch(error => {
        console.error("Error al crear mascota:", error);
        throw error;
    });
};

// Eliminar una mascota
const eliminarMascota = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers
    })
    .then(async res => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al eliminar mascota');
        }
        return res.text();
    })
    .catch(error => {
        console.error("Error al eliminar mascota:", error);
        throw error;
    });
};

// Obtener una mascota por ID
const obtenerMascota = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        headers
    })
    .then(async res => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al obtener mascota');
        }
        return res.json();
    })
    .catch(error => {
        console.error("Error al obtener mascota:", error);
        throw error;
    });
};

// Actualizar mascota
const actualizarMascota = (nombre, especie, sexo, fecha_nacimiento, id_duenio, id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
            ...headers,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({ nombre, especie, sexo, fecha_nacimiento, id_duenio })
    })
    .then(async res => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al actualizar mascota');
        }
        return res.json();
    })
    .catch(error => {
        console.error("Error al actualizar mascota:", error);
        throw error;
    });
};

// Exportar funciones
export const mascotaService = {
    listarMascotas,
    crearMascota,
    eliminarMascota,
    obtenerMascota,
    actualizarMascota
};