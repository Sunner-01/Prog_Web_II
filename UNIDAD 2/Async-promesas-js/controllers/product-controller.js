import { productService } from "../service/product-service.js";

// Función para crear una nueva fila con los datos del producto
const crear_nueva_fila = (nombre, descripcion, precio, id) => {
    const fila = document.createElement('tr');
    const contenido = `
        <td class="td" data-td>
            ${nombre}
        </td>
        <td>${descripcion}</td>
        <td>${precio}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a
                        href="../screens/editar_producto.html?id=${id}"
                        class="simple-button simple-button--edit"
                    >
                        Editar
                    </a>
                </li>
                <li>
                    <button
                        class="simple-button simple-button--delete"
                        type="button"
                        id="${id}"
                    >
                        Eliminar
                    </button>
                </li>
            </ul>
        </td>
    `;
    fila.innerHTML = contenido;
    const btn = fila.querySelector("button");
    
    // Añadir el evento para eliminar el producto
    btn.addEventListener("click", () => {
        const id = btn.id;
        productService.eliminarProducto(id)
            .then(respuesta => {
                if (respuesta.error) {
                    throw new Error(respuesta.error);
                }
                alert("Producto eliminado correctamente");
                location.reload(); // Recarga la página para actualizar la lista
            })
            .catch(error => alert(`Error al eliminar: ${error.message}`));
    });

    return fila;
};

// ------------ INICIAL -------------
// const table = document.querySelector("[data-table]");
// productService.listarProductos()
//     .then((data) => {
//         data.forEach((producto) => {
//             const nuevafila = crear_nueva_fila(producto.nombre, producto.descripcion, producto.precio, producto.id);
//             table.appendChild(nuevafila);
//         });
//     })
//     .catch((error) => alert("Ocurrió un error"));

// ------------ MEJORADO -------------
// Seleccionamos la tabla para insertar las filas
const table = document.querySelector("[data-table]");
productService
    .listarProductos() // Obtener la lista de productos desde el servicio
    .then((data) => {
        data.forEach(({ nombre, descripcion, precio, id }) => {  // <-- CORREGIDO aquí
            const nuevaLinea = crear_nueva_fila(nombre, descripcion, precio, id); // <-- CORREGIDO aquí
            table.appendChild(nuevaLinea);
        });

        console.log(data); // Verifico los datos
    })
    .catch((error) => alert("Ocurrió un error"));
