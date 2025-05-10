import { clientService } from "../service/client-service.js";

const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (id == null) {
        window.location.href = "../screens/error.html";
    }

    const nombre = document.querySelector("[data-nombre]");
    const email = document.querySelector("[data-email]");

    try {
        const cliente = await clientService.detalleCliente(id);
        if (cliente.nombre && cliente.email) {
            nombre.value = cliente.nombre;
            email.value = cliente.email;
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
    const email = document.querySelector("[data-email]").value;

    clientService.actualizarCliente(nombre, email, id)
        .then(() => {
            window.location.href = "../screens/edicion_concluida.html";
        });
});