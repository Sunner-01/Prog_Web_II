import { trabajoService } from "../service/trabajo-service.js";

const crearCardTrabajo = (titulo, descripcion, id) => {
    const card = document.createElement("div");
    card.classList.add("producto-card");
    card.innerHTML = `
        <h3 class="producto-card__title">${titulo}</h3>
        <p class="producto-card__descripcion">${descripcion}</p>
    `;
    return card;
};

const cardsContainer = document.querySelector("[data-cards-container]");

trabajoService.listaTrabajos()
    .then((data) => {
        data.forEach(({ titulo, descripcion, id }) => {
            const nuevaCard = crearCardTrabajo(titulo, descripcion, id);
            cardsContainer.appendChild(nuevaCard);
        });
    })
    .catch(() => alert("Error al cargar trabajos"));