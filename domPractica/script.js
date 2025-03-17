import checkComplete from './componentes/checkComplete.js';
import deleteIcon from './componentes/deleteIcon.js';
import sendIcon from './componentes/sendIcon.js';
(()=>{
    const btn = document.querySelector('[data-form-btn]');
    
    console.log(btn);
    
    const createTask=(evento)=>{
        evento.preventDefault();
        const input =document.querySelector('[data-form-input]');
        console.log(input.value);
        const value =input.value;
        const list= document.querySelector('[data-list]')
        const task=document.createElement('li')
        task.classList.add('card');
        input.value='';
        /*const contenido=`<div>
                <i class="far fa-check-square icon"></i>
                <span class="task">${value}</span>
                </div>
                <i class="fas fa-trash-alt trashIcon icon"></i>
        `
        */
        const contTask=document.createElement('div');
    ///////////////
       
        /////////////
        const titleTask=document.createElement('span');
        titleTask.classList.add('task');
        titleTask.innerText=value;
        contTask.appendChild(checkComplete());// agrego el check al div
        contTask.appendChild(titleTask);
       // const content =<i class="fas fa-trash-alt trashIcon icon"></i>
    
        task.appendChild(contTask)
        task.appendChild(deleteIcon());
        task.appendChild(sendIcon(task));
        list.appendChild(task);
        //console.log(contenido);
    }
    
    btn.addEventListener('click',createTask);
    
    /*
    const checkComplete=()=>{
        const i =document.createElement('i')// creacion de un icono 
        i.classList.add("far","fa-check-square","icon")//dando estilos al icono
        i.addEventListener("click",color)
        return i;
    }
    
    const color =(evento)=>{
        const element= evento.target
        element.classList.add('fas');
        element.classList.add('completeIcon');
        element.classList.remove('far');
    };
    */
    
    /*
    const deleteIcon=()=>{
        const i =document.createElement('i');
        i.classList.add('fas','fa-trash-alt','trashIcon','icon');
        i.addEventListener('click', eliminarTarea);
        return i;
    }
    const eliminarTarea=(evento)=>{
        const parent =evento.target.parentElement;
        parent.remove();

    }
        */

    })();