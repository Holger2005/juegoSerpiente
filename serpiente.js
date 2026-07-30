
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;
const serpiente = [
  {x:10,y:9},
  {x:10,y:8},
  {x:9,y:8},
  {x:8,y:8},
  {x:7,y:8},
  {x:6,y:8}
];
let puntaje = 0;
let comida = {
  x: Math.floor(Math.random() * (canvas.width / TAMANIO_CELDA)),
  y: Math.floor(Math.random() * (canvas.height / TAMANIO_CELDA))
};

let intervaloSerpiente = setInterval(moverSerpiente,1000);
// Primera pintura del juego al cargar la página
dibujarTodo();

function limpiarCanvas() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
}

function dibujarTablero(){
  ctx.strokeStyle = "rgba(228, 17, 17, 0.29)";
  ctx.lineWidth = 1;

  for(let x = 0; x <= canvas.width; x += TAMANIO_CELDA){
    ctx.beginPath();
    ctx.moveTo(x , 0);
    ctx.lineTo(x , canvas.height);
    ctx.stroke();
  }
  for(let y = 0; y <= canvas.height; y += TAMANIO_CELDA){
    ctx.beginPath();
    ctx.moveTo(0 , y);
    ctx.lineTo(canvas.width , y);
    ctx.stroke();
  }
}
function pintarParte(lineaX, lineaY, color){
  ctx.fillStyle = color;
  ctx.fillRect(lineaX*TAMANIO_CELDA,lineaY*TAMANIO_CELDA,TAMANIO_CELDA,TAMANIO_CELDA);
  ctx.strokeRect(lineaX*TAMANIO_CELDA,lineaY*TAMANIO_CELDA,TAMANIO_CELDA,TAMANIO_CELDA)
}

function pintarSerpiente(){
  for(let i = 0; i<serpiente.length; i++){
    if (i === 0){
      ctx.fillStyle = "#f6d100";
      ctx.fillRect(serpiente[i].x*TAMANIO_CELDA,serpiente[i].y*TAMANIO_CELDA,TAMANIO_CELDA,TAMANIO_CELDA);
      ctx.strokeStyle = "#7f1d1d";
      ctx.strokeRect(serpiente[i].x*TAMANIO_CELDA,serpiente[i].y*TAMANIO_CELDA,TAMANIO_CELDA,TAMANIO_CELDA)
    }else{
      pintarParte(serpiente[i].x,serpiente[i].y,"#f80c0ccb");
    }
  }
}

function moverDerecha(){
  let cabezaActual = serpiente[0];
  let objeto ={x:cabezaActual.x+1,y:cabezaActual.y}
  serpiente.unshift(objeto);
  serpiente.pop();
}

function moverIzquierda(){
  let cabezaActual = serpiente[0];
  let objeto ={x:cabezaActual.x-1,y:cabezaActual.y}
  serpiente.unshift(objeto);
  serpiente.pop();
}

function moverArriba(){
  let cabezaActual = serpiente[0];
  let objeto ={x:cabezaActual.x,y:cabezaActual.y-1}
  serpiente.unshift(objeto);
  serpiente.pop();
}

function moverAbajo(){
  let cabezaActual = serpiente[0];
  let objeto ={x:cabezaActual.x,y:cabezaActual.y+1}
  serpiente.unshift(objeto);
  serpiente.pop();
}

function cambiarDireccion(direccion){
  if (direccion === "derecha"){
    direccionActual = "derecha"
  } else if (direccion === "izquierda" ){
    direccionActual = "izquierda"
  } else if (direccion === "arriba"){
    direccionActual = "arriba"
  } else if (direccion === "abajo"){
    direccionActual = "abajo"
  }

}

function iniciarJuego(){
  intervaloSerpiente = setInterval(moverSerpiente,1000);
}

function pausarJuego(){
  clearInterval(intervaloSerpiente);
}

let direccionActual = "derecha";

function moverSerpiente(){
  if (direccionActual === "derecha") moverDerecha();
  if (direccionActual === "izquierda") moverIzquierda();
  if (direccionActual === "arriba") moverArriba();
  if (direccionActual === "abajo") moverAbajo();
    if (atrapaComida()=== true) {
    puntaje++; 
    document.getElementById("puntaje").innerText = puntaje
    
    let cola = serpiente[serpiente.length - 1];
    let nuevaParte = { x: cola.x, y: cola.y };

    if (direccionActual === "derecha") {
      nuevaParte.x = cola.x - 1;
    } else if (direccionActual === "izquierda") {
      nuevaParte.x = cola.x + 1;
    } else if (direccionActual === "arriba") {
      nuevaParte.y = cola.y + 1;
    } else if (direccionActual === "abajo") {
      nuevaParte.y = cola.y - 1;
    }
    serpiente.push(nuevaParte);
    comida.x = Math.floor(Math.random() * (canvas.width / TAMANIO_CELDA));
    comida.y = Math.floor(Math.random() * (canvas.height / TAMANIO_CELDA));
    
  }
  
  dibujarTodo();
}
function pintarComida(){
  pintarParte(comida.x, comida.y, "#38bdf8");
}

function atrapaComida() {
  let cabezaActual = serpiente[0];

  if (cabezaActual.x === comida.x && cabezaActual.y === comida.y) {
    return true;
  } else {
    return false;
  }
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarComida();
}

