// controllers/product-controller.js
import { productService } from "../service/product-service.js";

const contenedor = document.querySelector("[data-cards-container]");

const crearCardProducto = ({ nombre, precio, descripcion, id }) => {
  const card = document.createElement("div");
  card.className = "producto-card";

  card.innerHTML = `
    <h2 class="producto-card__title">${nombre}</h2>
    <p class="producto-card__precio">Precio: $${precio}</p>
    <p class="producto-card__descripcion">${descripcion}</p>
    <div class="producto-card__actions">
      <a href="../screens/editar_producto.html?id=${id}" class="button">Editar</a>
      <button class="button" data-eliminar-id="${id}">Eliminar</button>
    </div>
  `;

  // eliminar sin recargar
  const btnEliminar = card.querySelector("[data-eliminar-id]");
  btnEliminar.addEventListener("click", () => {
    productService.eliminarProducto(id)
      .then(() => card.remove())
      .catch(() => alert("Error al eliminar producto"));
  });

  return card;
};

productService.listaProductos()
  .then(productos => {
    productos.forEach(prod => {
      const card = crearCardProducto(prod);
      contenedor.appendChild(card);
    });
  })
  .catch(() => alert("No se pudieron cargar los productos"));
