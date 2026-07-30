
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
  ctx.fillStyle = "#f80c0ccb";
  ctx.fillRect(lineaX*TAMANIO_CELDA,lineaY*TAMANIO_CELDA,TAMANIO_CELDA,TAMANIO_CELDA);
  ctx.strokeRect(lineaX*TAMANIO_CELDA,lineaY*TAMANIO_CELDA,TAMANIO_CELDA,TAMANIO_CELDA)
}
function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
}

function pintarSerpiente(){
  for(let i = 0; i<=serpiente.length; i++){
    if (i == 0){
      ctx.fillStyle = "#f6d100";
      ctx.fillRect(serpiente[i].x*TAMANIO_CELDA,serpiente[i].y*TAMANIO_CELDA,TAMANIO_CELDA,TAMANIO_CELDA);
      ctx.strokeRect(serpiente[i].x*TAMANIO_CELDA,serpiente[i].y*TAMANIO_CELDA,TAMANIO_CELDA,TAMANIO_CELDA)
    }else{
      pintarParte(serpiente[i].x,serpiente[i].y);
    }
    
  }
}