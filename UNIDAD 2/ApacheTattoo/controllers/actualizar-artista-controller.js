import { artistaService } from "../service/artista-service.js";

const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (id == null) {
        window.location.href = "../screens/error.html";
    }

    const nombre = document.querySelector("[data-nombre]");
    const especialidad = document.querySelector("[data-especialidad]");
    const experiencia = document.querySelector("[data-experiencia]");

    try {
        const artista = await artistaService.detalleArtista(id);
        if (artista.nombre && artista.especialidad && artista.experiencia) {
            nombre.value = artista.nombre;
            especialidad.value = artista.especialidad;
            experiencia.value = artista.experiencia;
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

    const nombre = document.querySelector("[data-nombre]").value;
    const especialidad = document.querySelector("[data-especialidad]").value;
    const experiencia = document.querySelector("[data-experiencia]").value;

    artistaService.actualizarArtista(nombre, especialidad, experiencia, id)
        .then(() => {
            window.location.href = "../screens/edicion_concluida.html";
        });
});