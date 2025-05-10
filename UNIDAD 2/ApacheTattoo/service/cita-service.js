const listaCitas = () => fetch("http://localhost:3000/citas").then((res) => res.json());

const crearCita = (cliente, fecha, hora) => {
    return fetch("http://localhost:3000/citas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente, fecha, hora, id: uuid.v4() }),
    });
};

const eliminarCita = (id) => {
    return fetch(`http://localhost:3000/citas/${id}`, {
        method: "DELETE",
    });
};

const detalleCita = (id) => {
    return fetch(`http://localhost:3000/citas/${id}`).then((respuesta) => respuesta.json());
};

const actualizarCita = (cliente, fecha, hora, id) => {
    return fetch(`http://localhost:3000/citas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente, fecha, hora }),
    });
};

export const citaService = {
    listaCitas,
    crearCita,
    eliminarCita,
    detalleCita,
    actualizarCita,
};