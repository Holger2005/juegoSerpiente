
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;
    

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
function pintarParte(lineaX, lineaY){
  ctx.fillStyle = "#ffe75cd0";
  ctx.fillRect(lineaX*TAMANIO_CELDA,lineaY*TAMANIO_CELDA,TAMANIO_CELDA,TAMANIO_CELDA);
  ctx.strokeRect(lineaX*TAMANIO_CELDA,lineaY*TAMANIO_CELDA,TAMANIO_CELDA,TAMANIO_CELDA)
}
function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarParte(5,5);
  pintarParte(10,2);
  pintarParte(19,5);
  pintarParte(0,10);
  pintarParte(5,19);
  pintarParte(0,19);

}

