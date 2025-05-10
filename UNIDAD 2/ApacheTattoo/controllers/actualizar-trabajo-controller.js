import { trabajoService } from "../service/trabajo-service.js";

const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (id == null) {
        window.location.href = "../screens/error.html";
    }

    const titulo = document.querySelector("[data-titulo]");
    const descripcion = document.querySelector("[data-descripcion]");

    try {
        const trabajo = await trabajoService.detalleTrabajo(id);
        if (trabajo.titulo && trabajo.descripcion) {
            titulo.value = trabajo.titulo;
            descripcion.value = trabajo.descripcion;
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

    const titulo = document.querySelector("[data-titulo]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;

    trabajoService.actualizarTrabajo(titulo, descripcion, id)
        .then(() => {
            window.location.href = "../screens/edicion_concluida.html";
        });
});