import { citaService } from "../service/cita-service.js";

const crearFilaCita = (cliente, fecha, hora, id) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td class="td" data-td>${cliente}</td>
        <td>${fecha} ${hora}</td>
    `;
    return fila;
};

const tableCitas = document.querySelector("[data-table-citas]");

citaService.listaCitas()
    .then((data) => {
        data.forEach(({ cliente, fecha, hora, id }) => {
            const nuevaLinea = crearFilaCita(cliente, fecha, hora, id);
            tableCitas.appendChild(nuevaLinea);
        });
    })
    .catch(() => alert("Error al cargar citas"));