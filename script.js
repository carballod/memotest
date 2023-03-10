const IMAGENES = Array.from(document.getElementsByTagName("img"));

const mezclarAleatoriamenteImagenesDuplicadas = function(){
    const imagenesMezcladas = IMAGENES
        .flatMap((imagen) => [imagen, imagen])
        .sort(() => Math.random() - 0.5);
        
    establecerOrdenDeImagenes(imagenesMezcladas);

    return imagenesMezcladas;
};

const establecerOrdenDeImagenes = function(imagenes){
    imagenes.forEach((imagen, index) => {
    imagen.style.order = index;
    });
}

const duplicarImagenes = function(){
    IMAGENES.forEach((imagen, index) => {
        const imagenDuplicada = imagen.cloneNode(true);
        imagenDuplicada.id = `imagen${index + 11}`;
        document.querySelector('.imagenes').appendChild(imagenDuplicada);
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

const inhabilitarJugador = function(){
    IMAGENES.forEach((imagen) => {
        imagen.onclick = () => {};
    });
}

let seleccionImagen1 = null;
let seleccionImagen2 = null;
let parejaDeImagenes = 0;
let puedeSeleccionar = true;

const ronda = function(event){
    if (!puedeSeleccionar) return;

    const imagenSeleccionada = event.target;
    if (imagenSeleccionada.classList.contains('seleccionada') || seleccionImagen1 && seleccionImagen2) {
        return;
    }

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

    if(parejaDeImagenes === IMAGENES.length / 2){
        setTimeout(() => {
            terminarRonda();
        }, 500);
    } else if(seleccionImagen1 && seleccionImagen2){
        puedeSeleccionar = false;
        setTimeout(() => {
            mostrarImagenesSeleccionadas(seleccionImagen1, seleccionImagen2);
            seleccionImagen1.classList.remove('seleccionada');
            seleccionImagen2.classList.remove('seleccionada');
            seleccionImagen1 = null;
            seleccionImagen2 = null;
            puedeSeleccionar = true;
        }, 1000);
    }
}

const iniciarJuego = function(){
    duplicarImagenes();
    mezclarAleatoriamenteImagenesDuplicadas();
    ocultarImagenes();
    
    IMAGENES.forEach((imagen) => {
        imagen.addEventListener('click', ronda);
    });
}

const terminarRonda = function(){
    const finJuego = document.querySelector('.fin-juego');
    finJuego.style.display = "block";

    reiniciar = document.querySelector('.reiniciar')
    reiniciar.onclick = () => {
        location.reload();
    }
}

iniciarJuego();
