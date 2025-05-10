const listaArtistas = () => fetch("http://localhost:3000/artistas").then((res) => res.json());

const crearArtista = (nombre, especialidad, experiencia) => {
    return fetch("http://localhost:3000/artistas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, especialidad, experiencia, id: uuid.v4() }),
    });
};

const eliminarArtista = (id) => {
    return fetch(`http://localhost:3000/artistas/${id}`, {
        method: "DELETE",
    });
};

const detalleArtista = (id) => {
    return fetch(`http://localhost:3000/artistas/${id}`).then((respuesta) => respuesta.json());
};

const actualizarArtista = (nombre, especialidad, experiencia, id) => {
    return fetch(`http://localhost:3000/artistas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, especialidad, experiencia }),
    });
};

export const artistaService = {
    listaArtistas,
    crearArtista,
    eliminarArtista,
    detalleArtista,
    actualizarArtista,
};