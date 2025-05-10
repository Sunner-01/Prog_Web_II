import { artistaService } from "../service/artista-service.js";

const crearFilaArtista = (nombre, especialidad, experiencia, id) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td class="td" data-td>${nombre}</td>
        <td>${especialidad}</td>
        <td>${experiencia}</td>
    `;
    return fila;
};

const tableArtistas = document.querySelector("[data-table-artistas]");

artistaService.listaArtistas()
    .then((data) => {
        data.forEach(({ nombre, especialidad, experiencia, id }) => {
            const nuevaLinea = crearFilaArtista(nombre, especialidad, experiencia, id);
            tableArtistas.appendChild(nuevaLinea);
        });
    })
    .catch(() => alert("Error al cargar artistas"));