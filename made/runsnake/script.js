const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameOverMessage = document.getElementById('game-over-message');
const finalScoreElement = document.getElementById('final-score');
const currentScoreElement = document.getElementById('current-score');
const highScoreElement = document.getElementById('high-score');

const snakeSize = 20;
const enemySize = 20;
const boardWidth = canvas.width;
const boardHeight = canvas.height;

let snake = [
    { x: 100, y: 100 },
    { x: 80, y: 100 },
    { x: 60, y: 100 }
];
let direction = 'RIGHT';
let enemies = [];
let gameOver = false;
let score = 0;
let intervalId;
let enemyIntervalId;
let gameStarted = false;
let elapsedTime = 0;

let highScore = localStorage.getItem('highScore') || 0;

function updateScore() {
    currentScoreElement.textContent = 'Score: ' + Math.floor(elapsedTime);
    highScoreElement.textContent = 'High Score: ' + highScore;
}

document.addEventListener('keydown', function (event) {
    if (!gameStarted) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            startGame();
        }
    }

    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

function startGame() {
    gameStarted = true;
    gameOver = false;
    score = 0;
    elapsedTime = 0;
    snake = [
        { x: 100, y: 100 },
        { x: 80, y: 100 },
        { x: 60, y: 100 }
    ];
    enemies = [];
    clearInterval(intervalId);
    clearInterval(enemyIntervalId);
    intervalId = setInterval(gameLoop, 100);
    enemyIntervalId = setInterval(spawnEnemies, 5000);
    document.body.style.overflow = 'hidden';
}

function gameOverHandler() {
    clearInterval(intervalId);
    clearInterval(enemyIntervalId);
    document.body.style.overflow = 'auto';
    gameOverMessage.style.display = 'block';
    finalScoreElement.textContent = Math.floor(elapsedTime);
    localStorage.setItem('highScore', Math.max(Math.floor(elapsedTime), highScore));
    highScore = Math.max(Math.floor(elapsedTime), highScore);
    gameOver = true;
}

function gameLoop() {
    elapsedTime += 0.1;
    moveSnake();
    checkCollisions();
    moveEnemies();
    updateGameArea();
    updateScore();
    if (gameOver) return;
}

function moveSnake() {
    let head = { ...snake[0] };

    if (direction === 'UP') head.y -= snakeSize;
    if (direction === 'DOWN') head.y += snakeSize;
    if (direction === 'LEFT') head.x -= snakeSize;
    if (direction === 'RIGHT') head.x += snakeSize;

    snake.unshift(head);
    snake.pop();
}

function spawnEnemies() {
    const numberOfEnemies = Math.floor(Math.random() * 7) + 2;
    for (let i = 0; i < numberOfEnemies; i++) {
        let enemyX = Math.floor(Math.random() * (boardWidth / enemySize)) * enemySize;
        let enemyY = Math.floor(Math.random() * (boardHeight / enemySize)) * enemySize;
        enemies.push({ x: enemyX, y: enemyY });
    }
}

function moveEnemies() {
    enemies.forEach(enemy => {
        let dx = snake[0].x - enemy.x;
        let dy = snake[0].y - enemy.y;
        let angle = Math.atan2(dy, dx);
        let speed = 2;
        enemy.x += Math.cos(angle) * speed;
        enemy.y += Math.sin(angle) * speed;
    });
}

function checkCollisions() {
    if (snake[0].x < 0 || snake[0].x >= boardWidth || snake[0].y < 0 || snake[0].y >= boardHeight) {
        gameOverHandler();
        return;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            gameOverHandler();
            return;
        }
    }

    for (let i = 0; i < enemies.length; i++) {
        if (Math.abs(snake[0].x - enemies[i].x) < snakeSize && Math.abs(snake[0].y - enemies[i].y) < snakeSize) {
            gameOverHandler();
            return;
        }
    }
}

function updateGameArea() {
    ctx.clearRect(0, 0, boardWidth, boardHeight);

    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    });

    enemies.forEach(enemy => {
        ctx.fillStyle = 'red';
        ctx.fillRect(enemy.x, enemy.y, enemySize, enemySize);
    });

    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Time: ' + Math.floor(elapsedTime) + 's', 10, 30);
}
