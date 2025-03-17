const checkComplete = () => {
    const i = document.createElement('i'); // Crear el ícono
    i.classList.add('far', 'fa-check-square', 'icon'); // Clases iniciales
    i.addEventListener('click', (evento) => {
        const element = evento.target;
        // Alternar las clases para activar o desactivar el check
        element.classList.toggle('fas'); // Cambia a ícono sólido
        element.classList.toggle('completeIcon'); // Clase para estilos completados
        element.classList.toggle('far'); // Cambia a ícono de contorno
    });
    return i;


};
export default checkComplete;