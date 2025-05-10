import { productService } from "../service/product-service.js";

const crearFilaProducto = (nombre, precio, descripcion, id) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td class="td" data-td>${nombre}</td>
        <td>${precio}Bs</td>
        <td>${descripcion}</td>
    `;
    return fila;
};

const tableProductos = document.querySelector("[data-table-productos]");

productService.listaProductos()
    .then((data) => {
        data.forEach(({ nombre, precio, descripcion, id }) => {
            const nuevaLinea = crearFilaProducto(nombre, precio, descripcion, id);
            tableProductos.appendChild(nuevaLinea);
        });
    })
    .catch(() => alert("Error al cargar productos"));