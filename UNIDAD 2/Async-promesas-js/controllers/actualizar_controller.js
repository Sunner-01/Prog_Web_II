/* import { clientService } from "../service/client-service.js";
const formulario = document.querySelector("[data-form]")
//
/*const obtenerInfo=()=>{
    const url = new URL(window.location);
    const id = (url.searchParams.get('id'));
    if(id==null){
        window.location.href="../screens/error.html"
    }
    const nombre =document.querySelector("[data-nombre]")
    const email = document.querySelector("[data-email]")

clientService.clientes(id).then((perfil)=>{
    nombre.value=perfil.nombre;
    email.value=perfil.email;
});
    
};

obtenerInfo();
*/
//obtener informacion con async
/*
//----------------- Nuevo Obtener Info ------------- con async
const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (!id) {
        window.location.href = "../screens/error.html";
        return;
    }

    const nombre = document.querySelector("[data-nombre]");
    const email = document.querySelector("[data-email]");

    try {
        const perfil = await clientService.clientes(id);
        if (!perfil || !perfil.nombre || !perfil.email) {
            throw new Error("Perfil no encontrado o datos incompletos");
        }
        nombre.value = perfil.nombre;
        email.value = perfil.email;
    } catch (error) {
        console.error("Error al cargar perfil:", error);
        window.location.href = "../screens/error.html";
    }
};
obtenerInfo();
//-----------------------------------------
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const nombre = document.querySelector('[data-nombre]').value;
    const email = document.querySelector('[data-email]').value;

    clientService.actualizarCliente(nombre, email, id)
        .then((respuesta) => {
            if (respuesta.error) {
                throw new Error(respuesta.error);
            }
            window.location.href = "../screens/edicion_concluida.html";
        })
        .catch((error) => {
            console.error("Error al actualizar:", error);
            window.location.href = "../screens/error.html";
        });
});
*/

import { clientService } from "../service/client-service.js";
const formulario = document.querySelector("[data-form]");

const obtenerInfo = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    if (!id) {
        console.error("ID no proporcionado en la URL");
        window.location.href = "../screens/error.html";
        return;
    }

    const nombre = document.querySelector("[data-nombre]");
    const email = document.querySelector("[data-email]");

    try {
        const perfil = await clientService.clientes(id);
        console.log("Perfil recibido:", perfil);
        if (!perfil || !perfil.Nombre || !perfil.Correo) {
            console.error("Perfil no encontrado o datos incompletos:", perfil);
            throw new Error("Perfil no encontrado o datos incompletos");
        }
        nombre.value = perfil.Nombre;
        email.value = perfil.Correo;
    } catch (error) {
        console.error("Error al cargar perfil:", error.message);
        window.location.href = "../screens/error.html";
    }
};
obtenerInfo();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const nombre = document.querySelector('[data-nombre]').value.trim();
    const correo = document.querySelector('[data-email]').value.trim();

    if (!nombre || !correo) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    clientService.actualizarCliente(nombre, correo, id)
        .then((respuesta) => {
            console.log("Respuesta de actualización:", respuesta);
            if (respuesta.error) {
                throw new Error(respuesta.error);
            }
            window.location.href = "../screens/edicion_concluida.html";
        })
        .catch((error) => {
            console.error("Error al actualizar:", error.message);
            window.location.href = "../screens/error.html";
        });
});
