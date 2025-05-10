import { clientService } from "../service/client-service.js";

const crearFilaCliente = (nombre, email, id) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td class="td" data-td>${nombre}</td>
        <td>${email}</td>
    `;
    return fila;
};

const tableClientes = document.querySelector("[data-table-clientes]");

clientService.listaclientes()
    .then((data) => {
        data.forEach(({ nombre, email, id }) => {
            const nuevaLinea = crearFilaCliente(nombre, email, id);
            tableClientes.appendChild(nuevaLinea);
        });
    })
    .catch(() => alert("Error al cargar clientes"));