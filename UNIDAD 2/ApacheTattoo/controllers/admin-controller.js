import { clientService } from "../service/client-service.js";
import { productService } from "../service/product-service.js";
import { citaService } from "../service/cita-service.js";
import { trabajoService } from "../service/trabajo-service.js";
import { artistaService } from "../service/artista-service.js";

const crearFilaCliente = (nombre, email, id) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td class="td" data-td>${nombre}</td>
        <td>${email}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_cliente.html?id=${id}" class="simple-button simple-button--edit">Editar</a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete" type="button" id="${id}">Eliminar</button>
                </li>
            </ul>
        </td>
    `;
    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        clientService.eliminarCliente(id)
            .then(() => alert("Eliminado"))
            .catch(() => alert("Error"));
    });
    return fila;
};

const crearFilaProducto = (nombre, precio, id) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td class="td" data-td>${nombre}</td>
        <td>${precio}Bs</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_producto.html?id=${id}" class="simple-button simple-button--edit">Editar</a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete" type="button" id="${id}">Eliminar</button>
                </li>
            </ul>
        </td>
    `;
    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        productService.eliminarProducto(id)
            .then(() => alert("Eliminado"))
            .catch(() => alert("Error"));
    });
    return fila;
};

const crearFilaCita = (cliente, fecha, hora, id) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td class="td" data-td>${cliente}</td>
        <td>${fecha} ${hora}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_cita.html?id=${id}" class="simple-button simple-button--edit">Editar</a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete" type="button" id="${id}">Eliminar</button>
                </li>
            </ul>
        </td>
    `;
    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        citaService.eliminarCita(id)
            .then(() => alert("Eliminado"))
            .catch(() => alert("Error"));
    });
    return fila;
};

const crearFilaTrabajo = (titulo, descripcion, id) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td class="td" data-td>${titulo}</td>
        <td>${descripcion}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_trabajo.html?id=${id}" class="simple-button simple-button--edit">Editar</a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete" type="button" id="${id}">Eliminar</button>
                </li>
            </ul>
        </td>
    `;
    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        trabajoService.eliminarTrabajo(id)
            .then(() => alert("Eliminado"))
            .catch(() => alert("Error"));
    });
    return fila;
};

const crearFilaArtista = (nombre, especialidad, id) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td class="td" data-td>${nombre}</td>
        <td>${especialidad}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a href="../screens/editar_artista.html?id=${id}" class="simple-button simple-button--edit">Editar</a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete" type="button" id="${id}">Eliminar</button>
                </li>
            </ul>
        </td>
    `;
    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        artistaService.eliminarArtista(id)
            .then(() => alert("Eliminado"))
            .catch(() => alert("Error"));
    });
    return fila;
};

const tableClientes = document.querySelector("[data-table-clientes]");
const tableProductos = document.querySelector("[data-table-productos]");
const tableCitas = document.querySelector("[data-table-citas]");
const tableTrabajos = document.querySelector("[data-table-trabajos]");
const tableArtistas = document.querySelector("[data-table-artistas]");

clientService.listaclientes()
    .then((data) => {
        data.forEach(({ nombre, email, id }) => {
            const nuevaLinea = crearFilaCliente(nombre, email, id);
            tableClientes.appendChild(nuevaLinea);
        });
    })
    .catch(() => alert("Error al cargar clientes"));

productService.listaProductos()
    .then((data) => {
        data.forEach(({ nombre, precio, id }) => {
            const nuevaLinea = crearFilaProducto(nombre, precio, id);
            tableProductos.appendChild(nuevaLinea);
        });
    })
    .catch(() => alert("Error al cargar productos"));

citaService.listaCitas()
    .then((data) => {
        data.forEach(({ cliente, fecha, hora, id }) => {
            const nuevaLinea = crearFilaCita(cliente, fecha, hora, id);
            tableCitas.appendChild(nuevaLinea);
        });
    })
    .catch(() => alert("Error al cargar citas"));

trabajoService.listaTrabajos()
    .then((data) => {
        data.forEach(({ titulo, descripcion, id }) => {
            const nuevaLinea = crearFilaTrabajo(titulo, descripcion, id);
            tableTrabajos.appendChild(nuevaLinea);
        });
    })
    .catch(() => alert("Error al cargar trabajos"));

artistaService.listaArtistas()
    .then((data) => {
        data.forEach(({ nombre, especialidad, id }) => {
            const nuevaLinea = crearFilaArtista(nombre, especialidad, id);
            tableArtistas.appendChild(nuevaLinea);
        });
    })
    .catch(() => alert("Error al cargar artistas"));