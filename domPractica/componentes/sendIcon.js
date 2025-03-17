
const sendIcon = (task) => {
    const i = document.createElement('i');
    i.classList.add('fas', 'fa-paper-plane', 'sendIcon', 'icon'); // Clases para el ícono
    i.addEventListener('click', () => {
        task.classList.add('sent'); // Cambia el color del contenedor
        i.classList.add('disabled'); // Desactiva el ícono visualmente
        alert('¡Tarea enviada!'); // Muestra un mensaje al usuario
    });
    return i;
};
export default sendIcon;
