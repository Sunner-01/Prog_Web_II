import { trabajoService } from "../service/trabajo-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const titulo = document.querySelector("[data-titulo]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;

    trabajoService.crearTrabajo(titulo, descripcion)
        .then(() => {
            window.location.href = "../screens/registro_completado.html";
        })
        .catch((error) => console.log(error));
});