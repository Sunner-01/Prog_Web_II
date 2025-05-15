import { productService } from "../service/product-service.js";

const formulario = document.querySelector("[data-form]");

const obtenerInfoProducto = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    console.log("URL actual:", window.location.href);
    console.log("ID de producto extraído:", id);

    if (!id) {
        console.error("ID no proporcionado en la URL");
        alert("ID de producto no válido. Redirigiendo a la página de error.");
        window.location.replace("http://127.0.0.1:5502/UNIDAD%202/Async-promesas-js/screens/error.html");
        return;
    }

    try {
        const productos = await productService.obtenerProducto(id);
        console.log("Datos del producto:", productos);

        if (!productos || productos.length === 0) {
            throw new Error("Producto no encontrado para el ID: " + id);
        }

        const producto = productos[0];
        console.log("Producto seleccionado:", producto);

        if (!producto.nombre || !producto.precio || !producto.descripcion) {
            throw new Error("Datos del producto incompletos");
        }

        document.querySelector("[data-nombre]").value = producto.nombre;
        document.querySelector("[data-precio]").value = producto.precio;
        document.querySelector("[data-descripcion]").value = producto.descripcion;
    } catch (error) {
        console.error("Error al cargar producto:", error.message);
        alert("Error al cargar el producto: " + error.message);
        window.location.replace("http://127.0.0.1:5502/UNIDAD%202/Async-promesas-js/screens/error.html");
    }
};

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const nombre = document.querySelector('[data-nombre]').value.trim();
    const precio = document.querySelector('[data-precio]').value.trim();
    const descripcion = document.querySelector('[data-descripcion]').value.trim();

    console.log("Formulario enviado con:", { id, nombre, precio, descripcion });

    if (!nombre || !precio || !descripcion) {
        alert("Por favor, completa todos los campos.");
        console.log("Validación fallida: campos incompletos");
        return;
    }

    const precioRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!precioRegex.test(precio)) {
        alert("Por favor, ingresa un precio válido (por ejemplo, 10.99).");
        console.log("Validación fallida: precio inválido");
        return;
    }

    productService.actualizarProducto(nombre, precio, descripcion, id)
        .then((respuesta) => {
            console.log("Respuesta de actualización:", respuesta);
            if (respuesta.error) {
                throw new Error(respuesta.error);
            }
            window.location.replace("http://127.0.0.1:5502/UNIDAD%202/Async-promesas-js/screens/edicion_concluida.html");
        })
        .catch((error) => {
            console.error("Error al actualizar producto:", error.message);
            alert("Error al actualizar el producto: " + error.message);
            window.location.replace("http://127.0.0.1:5502/UNIDAD%202/Async-promesas-js/screens/error.html");
        });
});

obtenerInfoProducto();