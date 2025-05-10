const listaclientes = () => fetch("http://localhost:3000/clientes").then((res) => res.json());

const crearCliente = (nombre, email) => {
    return fetch("http://localhost:3000/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, id: uuid.v4() }),
    });
};

const eliminarCliente = (id) => {
    return fetch(`http://localhost:3000/clientes/${id}`, {
        method: "DELETE",
    });
};

const detalleCliente = (id) => {
    return fetch(`http://localhost:3000/clientes/${id}`).then((respuesta) => respuesta.json());
};

const actualizarCliente = (nombre, email, id) => {
    return fetch(`http://localhost:3000/clientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email }),
    });
};

export const clientService = {
    listaclientes,
    crearCliente,
    eliminarCliente,
    detalleCliente,
    actualizarCliente,
};