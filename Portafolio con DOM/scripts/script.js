// --- Modo Claro/Oscuro ---
const toggleTheme = document.getElementById('theme-toggle');
const body = document.body;

if (toggleTheme) { // Verifica que toggleTheme no sea null
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        toggleTheme.textContent = 'Modo Claro';
    } else {
        toggleTheme.textContent = 'Modo Oscuro';
    }

    toggleTheme.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            toggleTheme.textContent = 'Modo Claro'; // Corregido aquí
            localStorage.setItem('theme', 'dark');
        } else {
            toggleTheme.textContent = 'Modo Oscuro';
            localStorage.setItem('theme', 'light');
        }
    });
} else {
    console.error('No se encontró el elemento #theme-toggle');
}

// --- Sección de Proyectos con DOM ---
const projectsSection = document.getElementById('projects-section');
let projects = [
    { name: "Proyecto Web", desc: "Sitio responsivo", image: "assets/proyecto1.jpg" },
    { name: "Diseño 3D", desc: "Modelo en Blender", image: "assets/proyecto2.jpg" },
];

function createProjectsSection() {
    if (!projectsSection) {
        console.error('No se encontró #projects-section');
        return;
    }

    const section = document.createElement('section');
    section.className = 'proyectos';

    const title = document.createElement('h2');
    title.className = 'proyectos__titulo';
    title.textContent = 'Mis Proyectos';
    section.appendChild(title);

    const addBtn = document.createElement('button');
    addBtn.className = 'proyectos__btn';
    addBtn.textContent = 'Agregar Proyecto';
    section.appendChild(addBtn);

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'proyectos__contenedor';
    section.appendChild(cardsContainer);

    projectsSection.appendChild(section);

    renderCards(cardsContainer);

    addBtn.addEventListener('click', () => {
        showAddProjectModal(cardsContainer);
    });
}

function renderCards(container) {
    container.innerHTML = '';
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'proyectos__card';

        const img = document.createElement('img');
        img.src = project.image;
        img.alt = project.name;
        card.appendChild(img);

        const title = document.createElement('h3');
        title.textContent = project.name;
        card.appendChild(title);

        const desc = document.createElement('p');
        desc.textContent = project.desc;
        card.appendChild(desc);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', () => {
            projects.splice(index, 1);
            renderCards(container);
        });
        card.appendChild(deleteBtn);

        const shareBtn = document.createElement('button');
        shareBtn.className = 'share-btn';
        shareBtn.textContent = 'Compartir';
        shareBtn.addEventListener('click', () => {
            const shareText = `${project.name}: ${project.desc}`;
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Detalles del proyecto copiados al portapapeles');
            });
        });
        card.appendChild(shareBtn);

        container.appendChild(card);
    });
}

function showAddProjectModal(container) {
    const modal = document.createElement('div');
    modal.className = 'proyectos__modal';

    const form = document.createElement('div');
    form.className = 'proyectos__form';

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Nombre del proyecto:';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    form.appendChild(nameLabel);
    form.appendChild(nameInput);

    const imageLabel = document.createElement('label');
    imageLabel.textContent = 'Seleccionar imagen:';
    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.accept = 'image/*';
    form.appendChild(imageLabel);
    form.appendChild(imageInput);

    const descLabel = document.createElement('label');
    descLabel.textContent = 'Descripción:';
    const descInput = document.createElement('textarea');
    form.appendChild(descLabel);
    form.appendChild(descInput);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Guardar';
    form.appendChild(saveBtn);

    modal.appendChild(form);
    document.body.appendChild(modal);

    saveBtn.addEventListener('click', () => {
        const name = nameInput.value;
        const desc = descInput.value;
        const file = imageInput.files[0];

        if (name && desc && file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                projects.push({ name, desc, image: e.target.result });
                renderCards(container);
                document.body.removeChild(modal);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

createProjectsSection();