// Rescata elemento contenedor general
const listaTarea = document.getElementById('listaTareas');

// Ejecución eventos
eventListeners();

function eventListeners() {
  //Cuando se envia el formulario
  document.getElementById('enviarTarea').addEventListener('click', agregarTarea);
  // Borrar tareas
  document.addEventListener('click', borrarTarea);
   // Editar tareas
   document.addEventListener('click', editarTarea);
  // Contenido cargado
  document.addEventListener('DOMContentLoaded', localStorageListo);
}

// Funciones

//Generar elementos del DOM
function generarDom(mensaje){
  // Crear elementos
  const itemTarea = document.createElement('div');
  const parrafo = document.createElement('p');
  const imagen = document.createElement("img"); 
  const textTarea = document.createTextNode(mensaje);
  const botonBorrar = document.createElement('button');
  const botonEditar = document.createElement('button');//creo boton editar
  const textBoton = document.createTextNode('x');
  const textBotonEditar = document.createTextNode('editar');
  const div = document.getElementById("capa"); 

  // añadir atributos a elementos
  itemTarea.setAttribute('class', 'col-12');
  parrafo.setAttribute('class', 'd-inline-block');
  imagen.setAttribute('class', 'd-inline-block');
  botonBorrar.setAttribute('class','btn btn-dark');
  botonEditar.setAttribute('class','editar btn btn-dark');//creo boton editar

  //Añade texto al boton
  botonBorrar.appendChild(textBoton);
  //añade texto a boton editar
  botonEditar.appendChild(textBotonEditar);
  // añade la tarea al parrafo
  parrafo.appendChild(textTarea);
  //añade imagen
  itemTarea.appendChild(imagen);
  // añade el tweet a la lista
  itemTarea.appendChild(parrafo);
  // añade el botón de borrar al tweet
  itemTarea.appendChild(botonBorrar);
  //añade boton de editar al tweet
  itemTarea.appendChild(botonEditar);
  // añade item con tarea y boton a contenedor padre
 listaTarea.appendChild(itemTarea);
 // agregamos la imagen
 div.appendChild(imagen); 
}

// Añadir tareas al documento
function agregarTarea() {
  // leer el valor del textarea
  const tareas = document.getElementById('crearTarea').value;
  //Crear elementos en el DOM
  generarDom(tareas);
  generarDom(imagen);
  // Añadir a Local Storage
  agregarTareasLocalStorage(tareas);
  agregarTareasLocalStorage(imagen);
}

// Elimina tarea del DOM
function borrarTarea(e) {
  if(e.target.className === 'btn btn-dark') {
     e.target.parentElement.remove();
      borrarTareasLocalStorage(e.target.parentElement.innerText);  
      confirm("¿seguro que quieres borrar el comentario?")//configurar si cancela o acepta
  }
  else{}
}

// Edita tarea del DOM
function editarTarea() {//definir que hace la funcion

         
  }


// Mostrar datos de localStorage en la página
function localStorageListo() {
  let tareas;
  tareas = obtenerTareasLocalStorage();
  tareas.forEach(function(mensaje) {
      generarDom(mensaje);      
  });
}

 //Agrega tarea a local storage
function agregarTareasLocalStorage(textoTarea) {
  let tareas = obtenerTareasLocalStorage();
  // Añadir la tarea al arreglo
  tareas.push(textoTarea);
  // Convertir de arreglo a string para añadir a local storage
  localStorage.setItem('tareas', JSON.stringify(tareas) );
}

// Comprobar que haya elementos en local storage, retorna un arreglo
function obtenerTareasLocalStorage() {
  let tareas;
  // Revisamos los valores de local storage
  if(localStorage.getItem('tareas') === null) {
      tareas = []; 
  } else {
      tareas = JSON.parse(localStorage.getItem('tareas'));
  }
  return tareas;
}

// Eliminar tareas de Local Storage
function borrarTareasLocalStorage(tarea) {
  // Elimina la X de la tarea
  //la función recibe todo el texto de la tarea más la X y procede a cortar el texto, dejando solo el texto de la tarea, para eliminarla del localStorage
  let borrarTarea = tarea.substring(0, tarea.length - 1); 
  let tareas = obtenerTareasLocalStorage();
  //en el forEach, compara la tarea recibida con lo existente en local storage y quita la tarea a eliminar
  tareas.forEach(function(textoArr, index) {
      if(borrarTarea === textoArr) {
            tareas.splice(index, 1);
      }
  })
  //convierte el arreglo nuevo (con la tarea eliminada) en string para volver a guardarlo en local storage
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

function init() {
  var inputFile = document.getElementById('inputFile1');
  inputFile.addEventListener('change', mostrarImagen, false);
}

function mostrarImagen(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    var img = document.getElementById('img1');
    img.src= event.target.result;
    
  }
  reader.readAsDataURL(file);
}

window.addEventListener('load', init, false);

/*window.addEventListener('load', init, false);
function imagendiv() {
  var imagen = document.createElement("img"); 
  // agregamos propiedades al elemento
  imagen.src = "botones_enc.jpg"; 
  imagen.id = "inputFile1";
  imagen.className = "logo";
  imagen.title = "titulo de la imagen";
  imagen.alt = "texto alternativo";
  imagen.onclick = function(){
 alert('el id de este elemento es: ' + this.id);
 };
  // definimos el elemento donde insertamos la imagen
  var div = document.getElementById("capa"); 
  // agregamos la imagen
  div.appendChild(imagen); 
}*/

