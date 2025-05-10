import { clientService } from "../service/client-service.js";

const crear_nueva_fila = (nombre, email, id) => {
    const fila = document.createElement('tr');
    const contenido = `
        <td class="td" data-td>
            ${nombre}
        </td>
        <td>${email}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a
                        href="../screens/editar_cliente.html?id=${id}"
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
    btn.addEventListener("click", () => {
        const id = btn.id;
        clientService.eliminarCliente(id)
            .then(respuesta => {
                if (respuesta.error) {
                    throw new Error(respuesta.error);
                }
                alert("Cliente eliminado correctamente");
                location.reload(); // Recarga la página para actualizar la lista
            })
            .catch(error => alert(`Error al eliminar: ${error.message}`));
    });

    return fila;
};

// ------------ INICIAL -------------
// const table = document.querySelector("[data-table]");
// clientService.listaclientes()
//     .then((data) => {
//         data.forEach((perfil) => {
//             const nuevafila = crear_nueva_fila(perfil.nombre, perfil.email, perfil.id);
//             table.appendChild(nuevafila);
//         });
//     })
//     .catch((error) => alert("error"));

// ------------ MEJORADO -------------
const table = document.querySelector("[data-table]");
clientService
    .listaclientes()
    .then((data) => {
        data.forEach(({ Nombre, Correo, Id }) => {  // <-- CORREGIDO aquí
            const nuevaLinea = crear_nueva_fila(Nombre, Correo, Id); // <-- CORREGIDO aquí
            table.appendChild(nuevaLinea);
        });

        console.log(data); // Verifico los datos
    })
    .catch((error) => alert("Ocurrió un error"));
