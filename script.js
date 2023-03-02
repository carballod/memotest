const imagen1 = document.querySelector('#imagen1');
const imagen2 = document.querySelector('#imagen2');
const imagen3 = document.querySelector('#imagen3');
const imagen4 = document.querySelector('#imagen4');
const imagen5 = document.querySelector('#imagen5');
const imagen6 = document.querySelector('#imagen6');
const imagen7 = document.querySelector('#imagen7');
const imagen8 = document.querySelector('#imagen8');
const imagen9 = document.querySelector('#imagen9');
const imagen10 = document.querySelector('#imagen10');

const IMAGENES = [imagen1, imagen2, imagen3, imagen4, imagen5, imagen6, imagen7, imagen8, imagen9, imagen10]

const mezclarImagenes = function(){
    const imagenesMezcladas = IMAGENES
        .flatMap((imagen) => [imagen, imagen])
        .sort(() => Math.random() - 0.5);
        
    imagenesMezcladas.forEach((imagen, index) => {
        imagen.style.order = index;
    });

    return imagenesMezcladas;
};

const duplicarImagenes = function(){
    IMAGENES.forEach((imagen, index) => {
        const imagenDuplicada = imagen.cloneNode(true);
        imagenDuplicada.id = `imagen${index + 11}`;
        document.querySelector('#imagenes').appendChild(imagenDuplicada);
        IMAGENES.push(imagenDuplicada);
    })
}

const ocultarImagenes = function(){
    IMAGENES.forEach((imagen) => {
        imagen.classList.add('ocultar');
    });
}

const ocultarImagenesSeleccionadas = function(imagen1, imagen2){
    imagen1.classList.remove('ocultar');
    imagen2.classList.remove('ocultar');
}

const mostrarImagenes = function(){
    IMAGENES.forEach((imagen) => {
        imagen.classList.remove('ocultar');
    });
}

const mostrarImagenesSeleccionadas = function(imagen1, imagen2){
    imagen1.classList.add('ocultar');
    imagen2.classList.add('ocultar');
}

let seleccionImagen1 = null;
let seleccionImagen2 = null;
let parejaDeImagenes = 0;

const ronda = function(event){
    const imagenSeleccionada = event.target;
    imagenSeleccionada.classList.remove('ocultar');
    imagenSeleccionada.classList.add('seleccionada');

    if(!seleccionImagen1) seleccionImagen1 = imagenSeleccionada;
    else if(!seleccionImagen2) seleccionImagen2 = imagenSeleccionada;

    if(seleccionImagen1.getAttribute('src') === seleccionImagen2.getAttribute('src')){
        seleccionImagen1.removeEventListener('click', ronda);
        seleccionImagen2.removeEventListener('click', ronda);
        ocultarImagenesSeleccionadas(seleccionImagen1, seleccionImagen2);
        seleccionImagen1 = null;
        seleccionImagen2 = null;
        parejaDeImagenes++;
    }

    if(parejaDeImagenes === IMAGENES.length / 2) alert('Ganaste!');
    else if(seleccionImagen1 && seleccionImagen2){
        setTimeout(() => {
            mostrarImagenesSeleccionadas(seleccionImagen1, seleccionImagen2);
            seleccionImagen1.classList.remove('seleccionada');
            seleccionImagen2.classList.remove('seleccionada');
            seleccionImagen1 = null;
            seleccionImagen2 = null;
        }, 1000);
    }
}

const iniciarJuego = function(){
    duplicarImagenes();
    mezclarImagenes();
    ocultarImagenes();
    
    IMAGENES.forEach((imagen) => {
        imagen.addEventListener('click', ronda);
    });
}



iniciarJuego();
