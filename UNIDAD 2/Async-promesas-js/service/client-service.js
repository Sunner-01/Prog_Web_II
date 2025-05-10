const API_BASE_URL = 'http://localhost/Api1/conexion.php';

// Obtener lista de clientes
const listaclientes = () => {
    return fetch(API_BASE_URL)
        .then(response => {
            if (!response.ok) throw new Error(`Error al obtener perfiles: ${response.status}`);
            return response.json();
        })
        .catch(err => {
            console.error("Error en listaclientes:", err);
            throw err;
        });
};

// Crear un nuevo cliente
const crearCliente = (Nombre, Correo) => {
    const Id = uuid.v4();
    console.log("Enviando POST con:", { Id, Nombre, Correo });
    return fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            Id,
            Nombre,
            Correo,
            id: Id,
            nombre: Nombre,
            correo: Correo
        })
    }).then(response => {
        console.log("Respuesta de POST:", response.status);
        if (!response.ok) throw new Error(`Error al crear el cliente: ${response.status}`);
        return response.json();
    }).catch(err => {
        console.error("Error en crearCliente:", err);
        throw err;
    });
};

// Eliminar cliente
const eliminarCliente = (Id) => {
    console.log("Enviando DELETE para Id:", Id);
    return fetch(`${API_BASE_URL}?id=${Id}`, {
        method: "DELETE"
    }).then(response => {
        console.log("Respuesta de DELETE:", response.status);
        if (!response.ok) throw new Error(`Error al eliminar el cliente: ${response.status}`);
        return response.json();
    }).catch(err => {
        console.error("Error en eliminarCliente:", err);
        throw err;
    });
};

// Obtener un cliente por ID
const clientes = (Id) => {
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
            console.error("Error en clientes:", err);
            throw err;
        });
};

// Actualizar cliente
const actualizarCliente = (Nombre, Correo, Id) => { 
    const payload = {
        Id,
        Nombre,
        Correo,
        id: Id,
        nombre: Nombre,
        correo: Correo
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
        console.error("Error en actualizarCliente:", err);
        throw err;
    });
};

// Exportar funciones
export const clientService = {
    listaclientes,
    crearCliente,
    eliminarCliente,
    clientes,
    actualizarCliente
};