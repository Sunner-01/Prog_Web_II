import { citaService } from "../service/cita-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const cliente = document.querySelector("[data-cliente]").value;
    const fecha = document.querySelector("[data-fecha]").value;
    const hora = document.querySelector("[data-hora]").value;

    citaService.crearCita(cliente, fecha, hora)
        .then(() => {
            window.location.href = "../screens/registro_completado.html";
        })
        .catch((error) => console.log(error));
});