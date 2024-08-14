// Referencias a los elementos del DOM
const player1Paddle = document.getElementById('playerPaddle');
const player2Paddle = document.getElementById('player2Paddle');
const ball = document.getElementById('ball');
const player1ScoreDisplay = document.getElementById('playerScore');
const player2ScoreDisplay = document.getElementById('computerScore');
const gameContainer = document.getElementById('gameContainer');
const celebration = document.getElementById('celebration');
const resetButton = document.getElementById('resetButton');

// Variables de estado del juego
let player1Score = 0;
let player2Score = 0;
let player1PaddleY = gameContainer.offsetHeight / 2 - player1Paddle.offsetHeight / 2;
let player2PaddleY = gameContainer.offsetHeight / 2 - player2Paddle.offsetHeight / 2;
let ballX = gameContainer.offsetWidth / 2;
let ballY = gameContainer.offsetHeight / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let paddleSpeed = 30;

// Inicializar posiciones de las paletas
player1Paddle.style.top = player1PaddleY + 'px';
player2Paddle.style.top = player2PaddleY + 'px';

// Manejo de eventos de teclado
document.addEventListener('keydown', function(event) {
    // Controles del Jugador 1 (W y S)
    if (event.key === 'w') {
        player1PaddleY -= paddleSpeed;
    } else if (event.key === 's') {
        player1PaddleY += paddleSpeed;
    }

    // Controles del Jugador 2 (Flechas arriba y abajo)
    if (event.key === 'ArrowUp') {
        player2PaddleY -= paddleSpeed;
    } else if (event.key === 'ArrowDown') {
        player2PaddleY += paddleSpeed;
    }

    // Asegura que las paletas no salgan del contenedor
    player1PaddleY = Math.max(0, Math.min(gameContainer.offsetHeight - player1Paddle.offsetHeight, player1PaddleY));
    player2PaddleY = Math.max(0, Math.min(gameContainer.offsetHeight - player2Paddle.offsetHeight, player2PaddleY));

    // Actualiza las posiciones de las paletas
    player1Paddle.style.top = player1PaddleY + 'px';
    player2Paddle.style.top = player2PaddleY + 'px';
});

// Función para mover la bola
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Rebote en las paredes superior e inferior
    if (ballY <= 0 || ballY >= gameContainer.offsetHeight - ball.offsetHeight) {
        ballSpeedY *= -1;
    }

    // Rebote en la paleta del Jugador 1
    if (ballX <= player1Paddle.offsetLeft + player1Paddle.offsetWidth &&
        ballY >= player1PaddleY && ballY <= player1PaddleY + player1Paddle.offsetHeight) {
        ballSpeedX *= -1;
        increaseBallSpeed();
    }

    // Rebote en la paleta del Jugador 2
    if (ballX >= player2Paddle.offsetLeft - ball.offsetWidth &&
        ballY >= player2PaddleY && ballY <= player2PaddleY + player2Paddle.offsetHeight) {
        ballSpeedX *= -1;
        increaseBallSpeed();
    }

    // Gol para el Jugador 1
    if (ballX >= gameContainer.offsetWidth - ball.offsetWidth) {
        player1Score++;
        updateScoreboard();
        showCelebration('¡GOOL!', 'green');
        resetBall();
    }

    // Gol para el Jugador 2
    if (ballX <= 0) {
        player2Score++;
        updateScoreboard();
        showCelebration('¡GOOL!', 'red');
        resetBall();
    }

    // Actualiza la posición de la bola
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}

// Función para actualizar el marcador
function updateScoreboard() {
    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;
}

// Función para resetear la posición de la bola
function resetBall() {
    ballX = gameContainer.offsetWidth / 2;
    ballY = gameContainer.offsetHeight / 2;
    ballSpeedX = 5;
    ballSpeedY = 5;
}

// Función para incrementar la velocidad de la bola
function increaseBallSpeed() {
    ballSpeedX *= 1.1;
    ballSpeedY *= 1.1;
}

// Función para mostrar la celebración de un gol
function showCelebration(text, color) {
    celebration.textContent = text;
    celebration.style.color = color;
    celebration.classList.remove('hidden');
    setTimeout(() => celebration.classList.add('hidden'), 2000);
}

// Evento para reiniciar el juego
resetButton.addEventListener('click', function() {
    player1Score = 0;
    player2Score = 0;
    updateScoreboard();
    resetBall();
});

// Movimiento constante de la bola y actualización del juego
setInterval(function() {
    moveBall();
}, 30);

returnbutton.addEventListener('click', function() {
    window.location.href = '../index.html';
});