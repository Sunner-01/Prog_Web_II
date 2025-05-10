import { productService } from "../service/product-service.js";

const formulario = document.querySelector("[data-form]");

const obtenerInfoProducto = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (!id) {
        console.error("ID no proporcionado en la URL");
        window.location.href = "../screens/error.html";
        return;
    }

    try {
      const producto = await productService.producto(id);
        if (!producto || !producto.nombre || !producto.precio || !producto.descripcion) {
            throw new Error("Producto no encontrado o datos incompletos");
        }

        document.querySelector("[data-nombre]").value = producto.nombre;
        document.querySelector("[data-precio]").value = producto.precio;
        document.querySelector("[data-descripcion]").value = producto.descripcion;
    } catch (error) {
        console.error("Error al cargar producto:", error.message);
        window.location.href = "../screens/error.html";
    }
};

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const nombre = document.querySelector('[data-nombre]').value.trim();
    const precio = document.querySelector('[data-precio]').value.trim();
    const descripcion = document.querySelector('[data-descripcion]').value.trim();

    if (!nombre || !precio || !descripcion) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const precioRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!precioRegex.test(precio)) {
        alert("Por favor, ingresa un precio válido.");
        return;
    }

    productService.actualizarProducto(nombre, precio, descripcion, id)
        .then((respuesta) => {
            if (respuesta.error) {
                throw new Error(respuesta.error);
            }
            window.location.href = "../screens/edicion_concluida.html";
        })
        .catch((error) => {
            console.error("Error al actualizar producto:", error.message);
            window.location.href = "../screens/error.html";
        });
});

obtenerInfoProducto();
