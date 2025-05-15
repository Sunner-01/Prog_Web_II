/*

const API_BASE_URL = 'http://localhost/Api2/api_productos.php'; // URL de tu API de productos


// Obtener lista de productos
const listarProductos = () => {
    return fetch(API_BASE_URL)
        .then(response => {
            if (!response.ok) throw new Error(`Error al obtener productos: ${response.status}`);
            return response.json();
        })
        .catch(err => {
            console.error("Error en listarProductos:", err);
            throw err;
        });
};

// Crear un nuevo producto
const crearProducto = (Nombre, Precio, Descripcion) => {
    const Id = uuid.v4();
    console.log("Enviando POST con:", { Id, Nombre, Precio, Descripcion });
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Id,
            Nombre,
            Precio,
            Descripcion,
            id: Id,
            nombre: Nombre,
            precio: Precio,
            descripcion: Descripcion
        })
    }).then(response => {
        console.log("Respuesta de POST:", response.status);
        if (!response.ok) throw new Error(`Error al crear el producto: ${response.status}`);
        return response.json();
    }).catch(err => {
        console.error("Error en crearProducto:", err);
        throw err;
    });
};

// Eliminar producto
const eliminarProducto = (Id) => {
    console.log("Enviando DELETE para Id:", Id);
    return fetch(`${API_BASE_URL}?id=${Id}`, {
        method: "DELETE"
    }).then(response => {
        console.log("Respuesta de DELETE:", response.status);
        if (!response.ok) throw new Error(`Error al eliminar el producto: ${response.status}`);
        return response.json();
    }).catch(err => {
        console.error("Error en eliminarProducto:", err);
        throw err;
    });
};

// Obtener un producto por ID
const producto = (Id) => {
    console.log("Enviando GET para Id:", Id);
    return fetch(`${API_BASE_URL}?id=${Id}`)
        .then(respuesta => {
            console.log("Respuesta de GET:", respuesta.status);
            if (!respuesta.ok) {
                throw new Error(`Error en la solicitud: ${respuesta.status}`);
            }
            return respuesta.json();
        })
        .catch(err => {
            console.error("Error en producto:", err);
            throw err;
        });
};

// Actualizar producto
const actualizarProducto = (Nombre, Precio, Descripcion, Id) => {
    const payload = {
        Id,
        Nombre,
        Precio,
        Descripcion,
        id: Id,
        nombre: Nombre,
        precio: Precio,
        descripcion: Descripcion
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
        console.error("Error en actualizarProducto:", err);
        throw err;
    });
};

// Exportar funciones
export const productService = {
    listarProductos,
    crearProducto,
    eliminarProducto,
    producto,
    actualizarProducto
};
*/

//////////////////////Conexion Supabase /////////////////////////////////

const SUPABASE_URL = "https://rkkaeohwmcpdaitjoymf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJra2Flb2h3bWNwZGFpdGpveW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4NzY5MDcsImV4cCI6MjA2MjQ1MjkwN30.UkJFdUtOVrfmjATmamThZ0kMs0NF4PpzSv2r0ZBb2DU";
const TABLE = 'productos';
const API_URL = `${SUPABASE_URL}/rest/v1/${TABLE}`;
const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

const listarProductos = () => {
    return fetch(`${API_URL}?select=*`, { headers })
        .then(async res => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Error al listar productos');
            }
            return res.json();
        });
};

const crearProducto = (nombre, precio, descripcion) => {
    const producto = {
        id: uuid.v4(),
        nombre,
        precio,
        descripcion
    };
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            ...headers,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify(producto)
    })
    .then(async res => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al crear producto');
        }
        return res.json();
    })
    .catch(error => {
        console.error("Error al crear producto:", error);
        throw error;
    });
};

const eliminarProducto = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers
    })
    .then(async res => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al eliminar producto');
        }
        return res.text();
    })
    .catch(error => {
        console.error("Error al eliminar producto:", error);
        throw error;
    });
};

const obtenerProducto = (id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        headers
    })
    .then(async res => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al obtener producto');
        }
        return res.json();
    })
    .catch(error => {
        console.error("Error al obtener producto:", error);
        throw error;
    });
};

const actualizarProducto = (nombre, precio, descripcion, id) => {
    return fetch(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
            ...headers,
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({ nombre, precio, descripcion })
    })
    .then(async res => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'Error al actualizar producto');
        }
        return res.json();
    })
    .catch(error => {
        console.error("Error al actualizar producto:", error);
        throw error;
    });
};

export const productService = {
    listarProductos,
    crearProducto,
    eliminarProducto,
    obtenerProducto,
    actualizarProducto
};
