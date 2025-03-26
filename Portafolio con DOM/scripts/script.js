import SeccionProyectos from './componentes/seccionProyectos.js';
import TarjetasProyectos from './componentes/tarjetasProyectos.js';
import AgregarProyecto from './componentes/agregarProyecto.js';

const proyectos = [
    { nombre: "URUS Music", descripcion: "Reproductor de musica para escritorio", imagen: "assets/UrusMusic.png" },
    { nombre: "Agencia Digital", descripcion: "Pagina web de no se que pero hace algo", imagen: "assets/Pagina1.jpg" },
];

SeccionProyectos.iniciar(proyectos, TarjetasProyectos.renderizarTarjetas, AgregarProyecto.mostrarModal);