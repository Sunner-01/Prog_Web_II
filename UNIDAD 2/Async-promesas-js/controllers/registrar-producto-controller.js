// controllers/registrar-producto-controller.js
import { productService } from "../service/product-service.js";

const formulario = document.querySelector("form[data-form]");

formulario.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.querySelector("[data-nombre]").value;
  const precio = document.querySelector("[data-precio]").value;
  const descripcion = document.querySelector("[data-descripcion]").value;

  productService.crearProducto(nombre, precio, descripcion)
    .then(() => window.location.href = "./producto_agregado.html")
    .catch(err => console.error("Error al crear producto", err));
});
