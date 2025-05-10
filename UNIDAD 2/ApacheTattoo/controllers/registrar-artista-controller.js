import { artistaService } from "../service/artista-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const especialidad = document.querySelector("[data-especialidad]").value;
    const experiencia = document.querySelector("[data-experiencia]").value;

    artistaService.crearArtista(nombre, especialidad, experiencia)
        .then(() => {
            window.location.href = "../screens/registro_completado.html";
        })
        .catch((error) => console.log(error));
});