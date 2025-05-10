import { productService } from "../service/product-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value.trim();
    const precio = document.querySelector("[data-precio]").value.trim();
    const descripcion = document.querySelector("[data-descripcion]").value.trim();

    if (!nombre || !precio || !descripcion) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const precioRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!precioRegex.test(precio)) {
        alert("Por favor, ingresa un precio válido.");
        return;
    }

    productService.crearProducto(nombre, precio, descripcion)
        .then((respuesta) => {
            console.log("Redirigiendo a registro_completado.html");
            window.location.href = "../screens/registro_completado.html";
        })
        .catch(error => {
            console.error("Error al crear producto:", error);
            window.location.href = "../screens/error.html";
        });
});
