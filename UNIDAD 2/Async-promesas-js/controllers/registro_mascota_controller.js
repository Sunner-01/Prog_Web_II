import { mascotaService } from "../service/mascota-service.js";
import { clientService } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");
const selectDuenio = document.querySelector("[data-id_duenio]");

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
            option.value = duenio.Id; // Usamos Id con mayúscula para coincidir con tu backend
            option.textContent = duenio.Nombre; // Usamos Nombre con mayúscula
            selectDuenio.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar dueños:", error.message);
        alert("Error al cargar la lista de dueños: " + error.message);
    }
};

cargarDuenios();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = document.querySelector('[data-nombre]').value.trim();
    const especie = document.querySelector('[data-especie]').value.trim();
    const sexo = document.querySelector('[data-sexo]').value.trim();
    const fecha_nacimiento = document.querySelector('[data-fecha_nacimiento]').value;
    const id_duenio = document.querySelector('[data-id_duenio]').value;

    console.log("Formulario enviado con:", { nombre, especie, sexo, fecha_nacimiento, id_duenio });

    if (!nombre || !especie || !sexo || !fecha_nacimiento || !id_duenio) {
        alert("Por favor, completa todos los campos.");
        console.log("Validación fallida: campos incompletos");
        return;
    }

    mascotaService.crearMascota(nombre, especie, sexo, fecha_nacimiento, id_duenio)
        .then((respuesta) => {
            console.log("Respuesta de creación:", respuesta);
            if (respuesta.error) {
                throw new Error(respuesta.error);
            }
            window.location.href = "../screens/registro_completado.html";
        })
        .catch((error) => {
            console.error("Error al registrar:", error.message);
            window.location.href = "../screens/error.html";
        });
});