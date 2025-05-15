import { mascotaService } from "../service/mascota-service.js";
import { clientService } from "../service/client-service.js";

const crear_nueva_fila = (nombre, especie, sexo, fecha_nacimiento, nombre_duenio, id) => {
    const fila = document.createElement('tr');
    const contenido = `
        <td class="td" data-td>
            ${nombre}
        </td>
        <td>${especie}</td>
        <td>${sexo}</td>
        <td>${fecha_nacimiento}</td>
        <td>${nombre_duenio}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a
                        href="../screens/editar_mascota.html?id=${id}"
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
        mascotaService.eliminarMascota(id)
            .then(respuesta => {
                if (respuesta.error) {
                    throw new Error(respuesta.error);
                }
                alert("Mascota eliminada correctamente");
                location.reload(); // Recarga la página para actualizar la lista
            })
            .catch(error => alert(`Error al eliminar: ${error.message}`));
    });

    return fila;
};

const table = document.querySelector("[data-table]");
mascotaService.listarMascotas()
    .then(async (data) => {
        for (const mascot of data) {
            // Obtener el nombre del dueño desde la tabla perfil
            let nombreDuenio = 'Desconocido';
            try {
                const duenioData = await clientService.obtenerCliente(mascot.id_duenio);
                nombreDuenio = duenioData.length > 0 ? duenioData[0].nombre : 'Desconocido';
            } catch (error) {
                console.error(`Error al obtener dueño ${mascot.id_duenio}:`, error);
            }
            const nuevaLinea = crear_nueva_fila(
                mascot.nombre,
                mascot.especie,
                mascot.sexo,
                mascot.fecha_nacimiento,
                nombreDuenio,
                mascot.id
            );
            table.appendChild(nuevaLinea);
        }
        console.log(data); // Verifico los datos
    })
    .catch((error) => alert("Ocurrió un error"));