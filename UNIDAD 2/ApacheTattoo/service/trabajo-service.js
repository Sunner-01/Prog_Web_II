const listaTrabajos = () => fetch("http://localhost:3000/trabajos").then((res) => res.json());

const crearTrabajo = (titulo, descripcion) => {
    return fetch("http://localhost:3000/trabajos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descripcion, id: uuid.v4() }),
    });
};

const eliminarTrabajo = (id) => {
    return fetch(`http://localhost:3000/trabajos/${id}`, {
        method: "DELETE",
    });
};

const detalleTrabajo = (id) => {
    return fetch(`http://localhost:3000/trabajos/${id}`).then((respuesta) => respuesta.json());
};

const actualizarTrabajo = (titulo, descripcion, id) => {
    return fetch(`http://localhost:3000/trabajos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descripcion }),
    });
};

export const trabajoService = {
    listaTrabajos,
    crearTrabajo,
    eliminarTrabajo,
    detalleTrabajo,
    actualizarTrabajo,
};