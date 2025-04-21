const SeccionProyectos = (() => {
    const seccionProyectos = document.getElementById('projects-section');
    if (!seccionProyectos) {
        console.error('No se encontró #projects-section');
        return {};
    }

    const seccion = document.createElement('section');
    seccion.className = 'proyectos';

    const botonAgregar = document.createElement('button');
    botonAgregar.className = 'proyectos__btn';
    botonAgregar.textContent = 'Agregar Proyecto';
    seccion.appendChild(botonAgregar);

    const contenedorTarjetas = document.createElement('div');
    contenedorTarjetas.className = 'proyectos__contenedor';
    seccion.appendChild(contenedorTarjetas);

    seccionProyectos.appendChild(seccion);

    const iniciar = (proyectos, renderizarTarjetas, mostrarModal) => {
        renderizarTarjetas(contenedorTarjetas, proyectos);
        botonAgregar.addEventListener('click', () => {
            mostrarModal(proyectos, contenedorTarjetas, renderizarTarjetas);
        });
    };

    return {
        iniciar
    };
})();

export default SeccionProyectos;