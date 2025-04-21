import { productService } from "../service/product-service.js";

const formulario = document.querySelector("form[data-form]");

const cargarDatos = async () => {
  const url = new URL(window.location);
  const id = url.searchParams.get("id");
  if (!id) return window.location.href = "./error.html";

  try {
    const prod = await productService.obtenerProducto(id);
    document.querySelector("[data-nombre]").value = prod.nombre;
    document.querySelector("[data-precio]").value = prod.precio;
    document.querySelector("[data-descripcion]").value = prod.descripcion;
  } catch {
    window.location.href = "./error.html";
  }
};

cargarDatos();

formulario.addEventListener("submit", evento => {
  evento.preventDefault();
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  const nombre = document.querySelector("[data-nombre]").value;
  const precio = document.querySelector("[data-precio]").value;
  const descripcion = document.querySelector("[data-descripcion]").value;

  productService.actualizarProducto(nombre, precio, descripcion, id)
    .then(() => window.location.href = "./producto_editado.html")
    .catch(err => console.error("Error al actualizar producto", err));
});
