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

const IMAGENES = [imagen1, imagen2, imagen3, imagen4, imagen5, imagen6, imagen7, imagen8, imagen9, imagen10];

const mezclarImagenes = function(){
    return IMAGENES
        .flatMap((imagen) => [imagen, imagen])
        .sort(() => Math.random() - 0.5)
        .forEach((imagen, index) => {
            imagen.style.order = index;
        });
}; 


const duplicarImagenes = function(){
    IMAGENES.map((imagen, index) => {
        const imagenDuplicada = imagen.cloneNode(true);
        imagenDuplicada.id = `imagen${index + 11}`;
        document.querySelector('#imagenes').appendChild(imagenDuplicada);
        IMAGENES.push(imagenDuplicada); // Agregar la imagen duplicada al arreglo
    })
}


const iniciar = function(){
    duplicarImagenes();
    mezclarImagenes();
}

iniciar();
