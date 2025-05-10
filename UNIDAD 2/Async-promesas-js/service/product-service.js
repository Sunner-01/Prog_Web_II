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

