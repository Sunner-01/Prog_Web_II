(() => {
    const botonAgregar = document.querySelector('[data-btn-add]');
    const listaTareas = document.querySelector('[data-list]');
    const entradaTarea = document.querySelector('[data-input]');
    const botonTachar = document.querySelector('[data-btn-tachar]');
    const botonContar = document.querySelector('[data-btn-contar]');
    const salidaConteo = document.querySelector('[data-ouput]');

    // Agregar nueva tarea
    const crearTarea = (evento) => {
        evento.preventDefault();
        const valor = entradaTarea.value.trim();
        if (valor === "") {
            alert("Por favor, ingresa una tarea.");
            return;
        }
        const tarea = document.createElement('li');
        tarea.classList.add('item');
        tarea.textContent = valor;
        
        // Alternar clase relleno al hacer clic
        tarea.addEventListener('click', alternarRelleno);
        
        // Eliminar tarea con doble clic
        tarea.addEventListener('dblclick', () => {
            tarea.remove();
        });
        
        listaTareas.appendChild(tarea);
        entradaTarea.value = "";
    };
    
    // Función para alternar la clase relleno
    const alternarRelleno = (evento) => {
        evento.target.classList.toggle('relleno');
    };

    // Tachar última tarea
    const tacharUltima = () => {
        const tareas = document.querySelectorAll('.item');
        if (tareas.length > 0) {
            tareas[tareas.length - 1].classList.add('tachado');
        }
    };

    // Contar elementos en la lista
    const contarTareas = () => {
        const total = document.querySelectorAll('.item').length;
        salidaConteo.textContent = `Total de tareas: ${total}`;
    };

    botonAgregar.addEventListener('click', crearTarea);
    botonTachar.addEventListener('click', tacharUltima);
    botonContar.addEventListener('click', contarTareas);
})();
