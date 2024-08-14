const gameContainer = document.getElementById('gameContainer');
const playerPaddle = document.getElementById('playerPaddle');
const computerPaddle = document.getElementById('computerPaddle');
const ball = document.getElementById('ball');
const playerScoreDisplay = document.getElementById('playerScore');
const computerScoreDisplay = document.getElementById('computerScore');
const celebration = document.getElementById('celebration');
const resetButton = document.getElementById('resetButton');

let playerScore = 0;
let computerScore = 0;
let playerPaddleY = 0;
let computerPaddleY = 0;
let ballX = 400;
let ballY = 300;
let ballSpeedX = 6; // Aumenta la velocidad inicial de la pelota
let ballSpeedY = 6; // Aumenta la velocidad inicial de la pelota
let paddleSpeed = 60; // Aumenta la velocidad de la paleta del jugador // <--- Aquí se ajusta la velocidad del jugador
let computerSpeed = 30; // Aumenta la velocidad de la paleta de la máquina // <--- Aquí se ajusta la velocidad de la máquina

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        playerPaddleY -= paddleSpeed;
    } else if (event.key === 'ArrowDown') {
        playerPaddleY += paddleSpeed;
    }
    playerPaddleY = Math.max(0, Math.min(gameContainer.offsetHeight - playerPaddle.offsetHeight, playerPaddleY));
    playerPaddle.style.top = playerPaddleY + 'px';
});

function moveComputerPaddle() {
    if (ballY > computerPaddleY + computerPaddle.offsetHeight / 2) {
        computerPaddleY += computerSpeed; // La máquina se mueve más rápido hacia abajo
    } else {
        computerPaddleY -= computerSpeed; // La máquina se mueve más rápido hacia arriba
    }
    computerPaddleY = Math.max(0, Math.min(gameContainer.offsetHeight - computerPaddle.offsetHeight, computerPaddleY));
    computerPaddle.style.top = computerPaddleY + 'px';
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Rebote en las paredes superiores e inferiores
    if (ballY <= 0 || ballY >= gameContainer.offsetHeight - ball.offsetHeight) {
        ballSpeedY *= -1;
        increaseBallSpeed();
    }

    // Rebote en la paleta del jugador
    if (ballX <= playerPaddle.offsetLeft + playerPaddle.offsetWidth &&
        ballY >= playerPaddleY && ballY <= playerPaddleY + playerPaddle.offsetHeight) {
        ballSpeedX *= -1;
        increaseBallSpeed();
    }

    // Rebote en la paleta de la computadora
    if (ballX >= computerPaddle.offsetLeft - ball.offsetWidth &&
        ballY >= computerPaddleY && ballY <= computerPaddleY + computerPaddle.offsetHeight) {
        ballSpeedX *= -1;
        increaseBallSpeed();
        ballSpeedX *= 1.1; // Aumenta la velocidad de la pelota cuando la máquina la golpea
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

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}

function increaseBallSpeed() {
    ballSpeedX *= 1.1; // Incrementa la velocidad de la pelota en cada rebote
    ballSpeedY *= 1.1; // Incrementa la velocidad de la pelota en cada rebote
}

function updateScoreboard() {
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}

function showCelebration(text, colorClass) {
    celebration.textContent = text;
    celebration.className = colorClass;
    celebration.classList.remove('hidden');
    setTimeout(() => {
        celebration.classList.add('hidden');
    }, 1000);
}

function resetBall() {
    ballX = gameContainer.offsetWidth / 2 - ball.offsetWidth / 2;
    ballY = gameContainer.offsetHeight / 2 - ball.offsetHeight / 2;
    ballSpeedX = 6;
    ballSpeedY = 6;
}

resetButton.addEventListener('click', function() {
    playerScore = 0;
    computerScore = 0;
    updateScoreboard();
    resetBall();
});

setInterval(function() {
    moveBall();
    moveComputerPaddle();
}, 30);

returnbutton.addEventListener('click', function() {
    window.location.href = '../index.html';
});
