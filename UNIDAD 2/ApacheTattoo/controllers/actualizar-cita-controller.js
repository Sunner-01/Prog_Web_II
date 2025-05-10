import { citaService } from "../service/cita-service.js";

const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (id == null) {
        window.location.href = "../screens/error.html";
    }

    const cliente = document.querySelector("[data-cliente]");
    const fecha = document.querySelector("[data-fecha]");
    const hora = document.querySelector("[data-hora]");

    try {
        const cita = await citaService.detalleCita(id);
        if (cita.cliente && cita.fecha && cita.hora) {
            cliente.value = cita.cliente;
            fecha.value = cita.fecha;
            hora.value = cita.hora;
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log("Catch error", error);
        window.location.href = "../screens/error.html";
    }
};

obtenerInfo();

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const cliente = document.querySelector("[data-cliente]").value;
    const fecha = document.querySelector("[data-fecha]").value;
    const hora = document.querySelector("[data-hora]").value;

    citaService.actualizarCita(cliente, fecha, hora, id)
        .then(() => {
            window.location.href = "../screens/edicion_concluida.html";
        });
});