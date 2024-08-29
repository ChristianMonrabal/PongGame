// Referencias a los elementos del DOM
const gameContainer = document.getElementById('gameContainer');
const playerPaddle = document.getElementById('playerPaddle');
const computerPaddle = document.getElementById('computerPaddle');
const ball = document.getElementById('ball');
const playerScoreDisplay = document.getElementById('playerScore');
const computerScoreDisplay = document.getElementById('computerScore');
const celebration = document.getElementById('celebration');
const resetButton = document.getElementById('resetButton');

// Variables de estado del juego
let playerScore = 0;
let computerScore = 0;
let playerPaddleY = gameContainer.offsetHeight / 2 - playerPaddle.offsetHeight / 2;
let computerPaddleY = gameContainer.offsetHeight / 2 - computerPaddle.offsetHeight / 2;
let ballX = gameContainer.offsetWidth / 2;
let ballY = gameContainer.offsetHeight / 2;
let ballSpeedX = 6;
let ballSpeedY = 6;
let paddleSpeed = 20;
let computerSpeed = 30; // Aumentar la velocidad de la computadora para seguir la bola mejor
let computerMaxSpeed = 20; // Velocidad máxima que la paleta puede alcanzar
let keysPressed = {};

// Inicializar posiciones de las paletas
playerPaddle.style.top = playerPaddleY + 'px';
computerPaddle.style.top = computerPaddleY + 'px';

// Manejo de eventos de teclado
document.addEventListener('keydown', function (event) {
    keysPressed[event.key] = true;
});

document.addEventListener('keyup', function (event) {
    keysPressed[event.key] = false;
});

// Función para mover la paleta del jugador
function movePlayerPaddle() {
    if (keysPressed['ArrowUp']) {
        playerPaddleY -= paddleSpeed;
    }
    if (keysPressed['ArrowDown']) {
        playerPaddleY += paddleSpeed;
    }

    playerPaddleY = Math.max(0, Math.min(gameContainer.offsetHeight - playerPaddle.offsetHeight, playerPaddleY));
    playerPaddle.style.top = playerPaddleY + 'px';
}

// Función para mover la paleta de la computadora rápidamente siguiendo la bola
function moveComputerPaddle() {
    let targetY = ballY - computerPaddle.offsetHeight / 2; // Posición objetivo al centro de la bola
    let deltaY = targetY - computerPaddleY; // Diferencia entre la posición actual y la objetivo

    // Movimiento agresivo y rápido hacia la bola
    if (Math.abs(deltaY) > computerSpeed) {
        computerPaddleY += Math.sign(deltaY) * Math.min(computerMaxSpeed, Math.abs(deltaY));
    } else {
        computerPaddleY += deltaY;
    }

    // Limita la posición de la paleta para que no salga del contenedor
    computerPaddleY = Math.max(0, Math.min(gameContainer.offsetHeight - computerPaddle.offsetHeight, computerPaddleY));
    computerPaddle.style.top = computerPaddleY + 'px';
}

// Función para mover la bola con ajuste para rebote seguro
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Rebote en las paredes superiores e inferiores
    if (ballY <= 0 || ballY >= gameContainer.offsetHeight - ball.offsetHeight) {
        ballSpeedY *= -1;
        increaseBallSpeed();
    }

    // Rebote en la paleta del jugador
    if (
        ballX <= playerPaddle.offsetLeft + playerPaddle.offsetWidth &&
        ballX + ball.offsetWidth >= playerPaddle.offsetLeft &&
        ballY + ball.offsetHeight >= playerPaddleY &&
        ballY <= playerPaddleY + playerPaddle.offsetHeight
    ) {
        // Ajustar la posición de la bola para evitar superposiciones
        ballX = playerPaddle.offsetLeft + playerPaddle.offsetWidth;
        ballSpeedX = Math.abs(ballSpeedX); // Asegura que rebota a la derecha
        increaseBallSpeed();
    }

    // Rebote en la paleta de la computadora
    if (
        ballX + ball.offsetWidth >= computerPaddle.offsetLeft &&
        ballX <= computerPaddle.offsetLeft + computerPaddle.offsetWidth &&
        ballY + ball.offsetHeight >= computerPaddleY &&
        ballY <= computerPaddleY + computerPaddle.offsetHeight
    ) {
        // Ajustar la posición de la bola para evitar superposiciones
        ballX = computerPaddle.offsetLeft - ball.offsetWidth;
        ballSpeedX = -Math.abs(ballSpeedX); // Asegura que rebota a la izquierda
        increaseBallSpeed();
    }

    // Gol del jugador
    if (ballX >= gameContainer.offsetWidth - ball.offsetWidth) {
        playerScore++;
        updateScoreboard();
        showCelebration('¡GOOL!', 'green');
        resetBall();
    }

    // Gol del enemigo
    if (ballX <= 0) {
        computerScore++;
        updateScoreboard();
        showCelebration('¡GOOL!', 'red');
        resetBall();
    }

    // Actualiza la posición de la bola
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}

// Función para incrementar la velocidad de la bola
function increaseBallSpeed() {
    ballSpeedX *= 1.1; // Incrementa la velocidad de forma controlada
    ballSpeedY *= 1.1;
}

// Función para actualizar el marcador
function updateScoreboard() {
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}

// Función para mostrar la celebración de un gol
function showCelebration(text, colorClass) {
    celebration.textContent = text;
    celebration.className = colorClass;
    celebration.classList.remove('hidden');
    setTimeout(() => {
        celebration.classList.add('hidden');
    }, 1000);
}

// Función para resetear la posición de la bola
function resetBall() {
    ballX = gameContainer.offsetWidth / 2 - ball.offsetWidth / 2;
    ballY = gameContainer.offsetHeight / 2 - ball.offsetHeight / 2;
    ballSpeedX = 6;
    ballSpeedY = 6;
}

// Evento para reiniciar el juego
resetButton.addEventListener('click', function () {
    playerScore = 0;
    computerScore = 0;
    updateScoreboard();
    resetBall();
});

// Movimiento constante de la bola, paletas y actualización del juego
setInterval(function () {
    movePlayerPaddle();
    moveComputerPaddle();
    moveBall();
}, 30);
