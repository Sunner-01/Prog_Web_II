const TarjetasProyectos = (() => {
    const renderizarTarjetas = (contenedor, proyectos) => {
        contenedor.innerHTML = '';
        proyectos.forEach((proyecto, indice) => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'proyectos__card';

            const imagen = document.createElement('img');
            imagen.src = proyecto.imagen;
            imagen.alt = proyecto.nombre;
            tarjeta.appendChild(imagen);

            const titulo = document.createElement('h3');
            titulo.textContent = proyecto.nombre;
            tarjeta.appendChild(titulo);

            const descripcion = document.createElement('p');
            descripcion.textContent = proyecto.descripcion;
            tarjeta.appendChild(descripcion);

            const botonEliminar = document.createElement('button');
            botonEliminar.className = 'delete-btn';
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => {
                proyectos.splice(indice, 1);
                renderizarTarjetas(contenedor, proyectos);
            });
            tarjeta.appendChild(botonEliminar);

            const botonCompartir = document.createElement('button');
            botonCompartir.className = 'share-btn';
            botonCompartir.textContent = 'Compartir';
            botonCompartir.addEventListener('click', () => {
                const textoCompartir = `${proyecto.nombre}: ${proyecto.descripcion}`;
                navigator.clipboard.writeText(textoCompartir).then(() => {
                    alert('Detalles del proyecto copiados al portapapeles');
                }).catch(err => {
                    console.error('Error al copiar al portapapeles: ', err);
                });
            });
            tarjeta.appendChild(botonCompartir);

            contenedor.appendChild(tarjeta);
        });
    };

    return {
        renderizarTarjetas
    };
})();

export default TarjetasProyectos;