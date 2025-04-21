const agregarProyecto = (() => {
    const mostrarModal = (proyectos, contenedor, renderizarTarjetas) => {
        const modal = document.createElement('div');
        modal.className = 'proyectos__modal';

        const formulario = document.createElement('div');
        formulario.className = 'proyectos__form';

        const inputNombre = document.createElement('input');
        inputNombre.type = 'text';
        inputNombre.placeholder = 'Nombre del proyecto';
        formulario.appendChild(inputNombre);

        const inputImagen = document.createElement('input');
        inputImagen.type = 'file';
        inputImagen.accept = 'image/*';
        formulario.appendChild(inputImagen);

        const inputDescripcion = document.createElement('textarea');
        inputDescripcion.placeholder = 'Descripción';
        formulario.appendChild(inputDescripcion);

        const botonGuardar = document.createElement('button');
        botonGuardar.textContent = 'Guardar';
        formulario.appendChild(botonGuardar);

        modal.appendChild(formulario);
        document.body.appendChild(modal);

        botonGuardar.addEventListener('click', () => {
            const nombre = inputNombre.value.trim();
            const descripcion = inputDescripcion.value.trim();
            const archivo = inputImagen.files[0];

            if (nombre && descripcion && archivo) {
                const lector = new FileReader();
                lector.onload = (e) => {
                    proyectos.push({ nombre, descripcion, imagen: e.target.result });
                    renderizarTarjetas(contenedor, proyectos);
                    document.body.removeChild(modal);
                };
                lector.readAsDataURL(archivo);
            } else {
                alert('Completa todos los campos');
            }
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    };

    return {
        mostrarModal
    };
})();

export default agregarProyecto;