// 1. Capturamos el canvas
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// Tamaño de cada cuadrito en la cuadrícula
const TAMANIO_CELDA = 25;

// La serpiente
let serpiente = [
  {x:10,y:9},
  {x:10,y:8},
  {x:9,y:8},
  {x:8,y:8},
  {x:7,y:8},
  {x:6,y:8}
];

// Puntos acumulados en el juego
let puntaje = 0;

// Posición aleatoria inicial de la comida
let comida = {
  x: Math.floor(Math.random() * (canvas.width / TAMANIO_CELDA)),
  y: Math.floor(Math.random() * (canvas.height / TAMANIO_CELDA))
};

// Velocidad a la que se mueve la serpiente
let velocidad = 300;

//Verifica si perdio
let juegoTerminado = false; 

// Inicia el movimiento automático de la serpiente
let intervaloSerpiente = setInterval(moverSerpiente,velocidad);

// Primera pintura del juego al cargar la página
dibujarTodo();

// Borra todo lo que está dibujado en el canvas
function limpiarCanvas() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
}

// Dibuja las líneas que forman la cuadrícula del fondo
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

// Dibuja un solo cuadro en las coordenadas indicadas
function pintarParte(lineaX, lineaY, color){
  ctx.fillStyle = color;
  ctx.fillRect(lineaX*TAMANIO_CELDA,lineaY*TAMANIO_CELDA,TAMANIO_CELDA,TAMANIO_CELDA);
  ctx.strokeRect(lineaX*TAMANIO_CELDA,lineaY*TAMANIO_CELDA,TAMANIO_CELDA,TAMANIO_CELDA)
}

// Recorre el arreglo de la serpiente y dibuja cada una de sus partes
function pintarSerpiente(){
  for(let i = 0; i<serpiente.length; i++){
    // Si es la cabeza, la pinta de un color distinto
    if (i === 0){
      ctx.fillStyle = "#f6d100";
      ctx.fillRect(serpiente[i].x*TAMANIO_CELDA,serpiente[i].y*TAMANIO_CELDA,TAMANIO_CELDA,TAMANIO_CELDA);
      ctx.strokeStyle = "#7f1d1d";
      ctx.strokeRect(serpiente[i].x*TAMANIO_CELDA,serpiente[i].y*TAMANIO_CELDA,TAMANIO_CELDA,TAMANIO_CELDA)
    }else{
      // El resto del cuerpo lo pinta rojo
      pintarParte(serpiente[i].x,serpiente[i].y,"#f80c0ccb");
    }
  }
}

// Agregan una nueva cabeza en la dirección indicada y borran la cola
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

// Actualiza la dirección asegurando que no pueda ir en reversa directamente
function cambiarDireccion(direccion){
  if (direccion === "derecha" && direccionActual !== "izquierda"){
    direccionActual = "derecha";
  } else if (direccion === "izquierda" && direccionActual !== "derecha"){
    direccionActual = "izquierda";
  } else if (direccion === "arriba" && direccionActual !== "abajo"){
    direccionActual = "arriba";
  } else if (direccion === "abajo" && direccionActual !== "arriba"){
    direccionActual = "abajo";
  }
}

// Reactiva el movimiento automático de la serpiente
function iniciarJuego(){
  intervaloSerpiente = setInterval(moverSerpiente,velocidad);
}

// Detiene el movimiento automático
function pausarJuego(){
  clearInterval(intervaloSerpiente);
}

// Dirección por defecto al iniciar
let direccionActual = "derecha";

function moverSerpiente(){
  if (juegoTerminado === true){
    return;
  }  // Si se perdió, no hace nada

  // Mueve la serpiente según la dirección actual
  if (direccionActual === "derecha") moverDerecha();
  if (direccionActual === "izquierda") moverIzquierda();
  if (direccionActual === "arriba") moverArriba();
  if (direccionActual === "abajo") moverAbajo();

  // Verifica si chocó contra las paredes
  if (verificarColisionBordes()=== true) {
    juegoTerminado = true;
    pausarJuego();
    mostrarGameOver();
    return;
  }

  // Verifica si la serpiente pasó por encima de la comida
  if (atrapaComida() === true) {
    puntaje++; 
    document.getElementById("puntaje").innerText = puntaje
      
    // Hace crecer a la serpiente agregando una nueva parte al final
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

    // Genera una nueva comida en otra posición aleatoria
    comida.x = Math.floor(Math.random() * (canvas.width / TAMANIO_CELDA));
    comida.y = Math.floor(Math.random() * (canvas.height / TAMANIO_CELDA));
  }
  // Actualiza los gráficos en pantalla
  dibujarTodo();
}

// Dibuja el cuadro azul que representa la comida
function pintarComida(){
  pintarParte(comida.x, comida.y, "#38bdf8");
}

// Comprueba si las coordenadas de la cabeza coinciden con las de la comida
function atrapaComida() {
  let cabezaActual = serpiente[0];

  if (cabezaActual.x === comida.x && cabezaActual.y === comida.y) {
    return true;
  } else {
    return false;
  }
}

// Comprueba si la cabeza de la serpiente salió del límite del canvas
function verificarColisionBordes() {
  let cabeza = serpiente[0];
  let limiteColumnas = canvas.width / TAMANIO_CELDA;
  let limiteFilas = canvas.height / TAMANIO_CELDA;

  if (cabeza.x < 0 || cabeza.x >= limiteColumnas || cabeza.y < 0 || cabeza.y >= limiteFilas) {
    return true;
  }
  return false;
}

// Muestra la pantalla negra semi-transparente de fin de juego
function mostrarGameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
}

// Restablece todas las variables a su estado original para volver a jugar
function reiniciarJuego() {
  juegoTerminado = false;
  puntaje = 0;
  document.getElementById("puntaje").innerText = puntaje;
  direccionActual = "derecha";
  velocidad = 300;

  serpiente = [
    {x:10,y:9}, {x:10,y:8}, {x:9,y:8},
    {x:8,y:8}, {x:7,y:8}, {x:6,y:8}
  ];

  comida.x = Math.floor(Math.random() * (canvas.width / TAMANIO_CELDA));
  comida.y = Math.floor(Math.random() * (canvas.height / TAMANIO_CELDA));

  pausarJuego(); 
  dibujarTodo();
  iniciarJuego();
}

// Función maestra que se encarga de pintar todo en orden
function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarComida();
}