import { mascotaService } from "../service/mascota-service.js";
import { clientService } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");
const selectDuenio = document.querySelector("[data-id_duenio]");
const inputIdMascota = document.querySelector("[data-id_mascota]");
const inputNombre = document.querySelector("[data-nombre]");
const inputEspecie = document.querySelector("[data-especie]");
const inputSexo = document.querySelector("[data-sexo]");
const inputFechaNacimiento = document.querySelector("[data-fecha_nacimiento]");

const cargarDuenios = async () => {
    try {
        console.log("Iniciando carga de dueños");
        const duenios = await clientService.listaclientes();
        console.log("Dueños recibidos:", duenios);
        selectDuenio.innerHTML = '<option value="" disabled selected>Selecciona un dueño</option>';
        if (!Array.isArray(duenios) || duenios.length === 0) {
            console.warn("No se encontraron dueños o datos inválidos");
            alert("No hay dueños registrados. Por favor, registra un perfil primero.");
            return;
        }
        duenios.forEach(duenio => {
            console.log("Procesando dueño:", duenio);
            const option = document.createElement('option');
            option.value = duenio.id;
            option.textContent = duenio.nombre;
            selectDuenio.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar dueños:", error.message);
        alert("Error al cargar la lista de dueños: " + error.message);
    }
};

const cargarDatosMascota = async () => {
    try {
        console.log("URL actual:", window.location.href);
        const urlParams = new URLSearchParams(window.location.search);
        const id_mascota = urlParams.get('id');
        console.log("ID de mascota extraído:", id_mascota);
        if (!id_mascota || id_mascota === "undefined" || id_mascota.trim() === "") {
            console.error("ID de mascota no proporcionado o inválido en la URL");
            alert("ID de mascota no válido. Redirigiendo a la lista de mascotas.");
            setTimeout(() => {
                window.location.replace("http://127.0.0.1:5502/UNIDAD%202/Async-promesas-js/screens/lista_mascota.html");
            }, 300);
            return;
        }
        console.log("Cargando datos de la mascota con id:", id_mascota);
        const mascotas = await mascotaService.obtenerMascota(id_mascota);
        console.log("Datos de la mascota:", mascotas);
        if (!mascotas || mascotas.length === 0) {
            throw new Error("Mascota no encontrada para el ID: " + id_mascota);
        }
        const mascota = mascotas[0]; 
        console.log("Mascota seleccionada:", mascota);
        inputIdMascota.value = mascota.id;
        inputNombre.value = mascota.nombre || "";
        inputEspecie.value = mascota.especie || "";
        inputSexo.value = mascota.sexo || "";
        inputFechaNacimiento.value = mascota.fecha_nacimiento || "";
        selectDuenio.value = mascota.id_duenio || "";

        // Seleccionar el dueño correspondiente en el select
        const options = selectDuenio.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === mascota.id_duenio) {
                options[i].selected = true;
                break;
            }
        }
    } catch (error) {
        console.error("Error al cargar datos de la mascota:", error.message);
        alert("Error al cargar los datos de la mascota: " + error.message);
        setTimeout(() => {
            window.location.replace("http://127.0.0.1:5502/UNIDAD%202/Async-promesas-js/screens/lista_mascota.html");
        }, 300); 
    }
};

// Cargar dueños y datos de la mascota al iniciar
cargarDuenios();
cargarDatosMascota();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const id_mascota = inputIdMascota.value;
    const nombre = inputNombre.value.trim();
    const especie = inputEspecie.value.trim();
    const sexo = inputSexo.value.trim();
    const fecha_nacimiento = inputFechaNacimiento.value;
    const id_duenio = selectDuenio.value;

    console.log("Formulario enviado con:", { id_mascota, nombre, especie, sexo, fecha_nacimiento, id_duenio });

    if (!nombre || !especie || !sexo || !fecha_nacimiento || !id_duenio || !id_mascota) {
        alert("Por favor, completa todos los campos.");
        console.log("Validación fallida: campos incompletos");
        return;
    }

    mascotaService.actualizarMascota(nombre, especie, sexo, fecha_nacimiento, id_duenio, id_mascota)
        .then((respuesta) => {
            console.log("Respuesta de actualización:", respuesta);
            if (respuesta.error) {
                throw new Error(respuesta.error);
            }
            window.location.replace("http://127.0.0.1:5502/UNIDAD%202/Async-promesas-js/screens/registro_completado.html");
        })
        .catch((error) => {
            console.error("Error al actualizar:", error.message);
            window.location.replace("http://127.0.0.1:5502/UNIDAD%202/Async-promesas-js/screens/error.html");
        });
});