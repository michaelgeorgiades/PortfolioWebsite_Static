// Global variables
let currentSection = 'home';
let isMobileMenuOpen = false;
let currentPhotoData = null;
let gameEventListeners = {
    snake: null,
    tetris: null,
    pong: null,
    breakout: null
};



// Photo data
const photos = [
    { id: 1, title: "Umhlanga Lighthouse", description: "Umhlanga Lighthouse in South Africa", price: 5, image: "./attached_assets/lighthouse.jpg" },
    { id: 2, title: "a Vulture", description: "A Vulture in Black & White", price: 5, image: "./attached_assets/vulture.jpg" },
    { id: 3, title: "Oxpecker on Zebra Tail", description: "An Oxpecker on a Zebra's Tail", price: 5, image: "./attached_assets/oxpeckerzebratail.jpg" },
    { id: 4, title: "Oxpeckers on Giraffe", description: "Oxpeckers on a giraffe's back", price: 5, image: "./attached_assets/oxpeckergiraffe.jpg" },
    { id: 5, title: "Tower Bridge in London", description: "Tower Bridge in London", price: 5, image: "./attached_assets/towerbridge.jpg" },
    { id: 6, title: "Oxpeckers on Zebra", description: "Oxpeckers on a zebras's back", price: 5, image: "./attached_assets/tickbirds.jpg" },
    { id: 7, title: "Oxpeckers on Rhino", description: "Oxpeckers on a rhino's back", price: 5, image: "./attached_assets/oxpeackerrhino.jpg" },
    { id: 8, title: "Durban Skyline", description: "Durban Skyline", price: 5, image: "./attached_assets/durban.jpg" }
];


// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeBackground();
    initializeGames();
    initializeModal();
    initializeContactForm();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        isMobileMenuOpen = !isMobileMenuOpen;
        mobileNav.classList.toggle('show');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            scrollToSection(section);
            
            // Close mobile menu if open
            if (isMobileMenuOpen) {
                mobileNav.classList.remove('show');
                isMobileMenuOpen = false;
            }
        });
    });
}

function scrollToSection(sectionId) {
    // Remove all game event listeners when leaving games section
    if (currentSection === 'games' && sectionId !== 'games') {
        removeAllGameEventListeners();
    }
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // Add game event listeners only when entering games section
        if (sectionId === 'games') {
            addAllGameEventListeners();
        }
        
        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Game event listener management
function addAllGameEventListeners() {
    if (gameEventListeners.snake) document.addEventListener('keydown', gameEventListeners.snake.keydown);
    if (gameEventListeners.snake) document.addEventListener('keyup', gameEventListeners.snake.keyup);
    if (gameEventListeners.tetris) document.addEventListener('keydown', gameEventListeners.tetris.keydown);
    if (gameEventListeners.pong) document.addEventListener('keydown', gameEventListeners.pong.keydown);
    if (gameEventListeners.pong) document.addEventListener('keyup', gameEventListeners.pong.keyup);
    if (gameEventListeners.breakout) document.addEventListener('keydown', gameEventListeners.breakout.keydown);
    if (gameEventListeners.breakout) document.addEventListener('keyup', gameEventListeners.breakout.keyup);
}

function removeAllGameEventListeners() {
    if (gameEventListeners.snake) document.removeEventListener('keydown', gameEventListeners.snake.keydown);
    if (gameEventListeners.snake) document.removeEventListener('keyup', gameEventListeners.snake.keyup);
    if (gameEventListeners.tetris) document.removeEventListener('keydown', gameEventListeners.tetris.keydown);
    if (gameEventListeners.pong) document.removeEventListener('keydown', gameEventListeners.pong.keydown);
    if (gameEventListeners.pong) document.removeEventListener('keyup', gameEventListeners.pong.keyup);
    if (gameEventListeners.breakout) document.removeEventListener('keydown', gameEventListeners.breakout.keydown);
    if (gameEventListeners.breakout) document.removeEventListener('keyup', gameEventListeners.breakout.keyup);
}

// Animated background
function initializeBackground() {
    const container = document.getElementById('backgroundAnimation');
    const colors = ['#B87333', '#D4A574'];
    
    function createDot() {
        const dot = document.createElement('div');
        dot.className = 'dot';
        
        // Random size between 1px and 1.5px
        const size = Math.random() * 0.5 + 1;
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
        
        // Random horizontal position
        dot.style.left = Math.random() * window.innerWidth + 'px';
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        dot.style.background = color;
        dot.style.boxShadow = `0 0 4px ${color}`;
        
        // Random animation duration between 8s and 15s
        const duration = Math.random() * 7 + 8;
        dot.style.animationDuration = duration + 's';
        
        container.appendChild(dot);
        
        // Remove dot after animation
        setTimeout(() => {
            if (dot.parentNode) {
                dot.parentNode.removeChild(dot);
            }
        }, duration * 1000);
    }
    
    // Create dots at random intervals
    function startDotCreation() {
        createDot();
        // Random delay between 800ms and 8600ms
        const delay = Math.random() * 7800 + 800;
        setTimeout(startDotCreation, delay);
    }
    
    startDotCreation();
}

// Games functionality
function initializeGames() {
    initializeSnakeGame();
    initializeTetrisGame();
    initializePongGame();
    initializeBreakoutGame();
}

// Snake Game
function initializeSnakeGame() {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('snakeStartBtn');
    const scoreElement = document.getElementById('snakeScore');
    
    const GRID_SIZE = 20;
    const GRID_WIDTH = canvas.width / GRID_SIZE;
    const GRID_HEIGHT = canvas.height / GRID_SIZE;
    
    let gameState = {
        snake: [{ x: 10, y: 10 }],
        food: { x: 15, y: 15 },
        direction: { x: 0, y: 0 },
        score: 0,
        gameRunning: false
    };
    
    let gameLoop = null;
    let keysPressed = new Set();
    
    function drawGame() {
        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw snake
        ctx.fillStyle = '#B87333';
        gameState.snake.forEach(segment => {
            ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
        });
        
        // Draw food
        ctx.fillStyle = '#D4A574';
        ctx.fillRect(gameState.food.x * GRID_SIZE, gameState.food.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
    }
    
    function updateGame() {
        if (!gameState.gameRunning) return;
        
        // Move snake
        const head = { ...gameState.snake[0] };
        head.x += gameState.direction.x;
        head.y += gameState.direction.y;
        
        // Check wall collision
        if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
            gameOver();
            return;
        }
        
        // Check self collision
        if (gameState.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            gameOver();
            return;
        }
        
        gameState.snake.unshift(head);
        
        // Check food collision
        if (head.x === gameState.food.x && head.y === gameState.food.y) {
            gameState.score += 10;
            scoreElement.textContent = gameState.score;
            generateFood();
        } else {
            gameState.snake.pop();
        }
        
        drawGame();
    }
    
    function generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_WIDTH),
                y: Math.floor(Math.random() * GRID_HEIGHT)
            };
        } while (gameState.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        gameState.food = newFood;
    }
    
    function gameOver() {
        gameState.gameRunning = false;
        clearInterval(gameLoop);
        startBtn.textContent = 'Start Game';
        showToast('Game Over! Score: ' + gameState.score);
    }
    
    function startGame() {
        gameState = {
            snake: [{ x: 10, y: 10 }],
            food: { x: 15, y: 15 },
            direction: { x: 0, y: 0 },
            score: 0,
            gameRunning: true
        };
        scoreElement.textContent = '0';
        generateFood();
        drawGame();
        
        gameLoop = setInterval(updateGame, 150);
        startBtn.textContent = 'Stop Game';
    }
    
    function stopGame() {
        gameState.gameRunning = false;
        clearInterval(gameLoop);
        startBtn.textContent = 'Start Game';
    }
    
    // Controls
    function handleKeyPress(e) {
        // Don't capture keys if user is typing in form inputs or not in games section
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || currentSection !== 'games') return;
        if (!gameState.gameRunning) return;
        
        const key = e.key;
        if (keysPressed.has(key)) return;
        keysPressed.add(key);
        
        switch(key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (gameState.direction.y === 0) gameState.direction = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (gameState.direction.y === 0) gameState.direction = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (gameState.direction.x === 0) gameState.direction = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (gameState.direction.x === 0) gameState.direction = { x: 1, y: 0 };
                break;
        }
    }
    
    function handleKeyUp(e) {
        keysPressed.delete(e.key);
    }
    
    // Store event listeners for external management
    gameEventListeners.snake = {
        keydown: handleKeyPress,
        keyup: handleKeyUp
    };
    
    startBtn.addEventListener('click', () => {
        if (gameState.gameRunning) {
            stopGame();
        } else {
            startGame();
        }
    });
    
    // Initial draw
    drawGame();
}

// Tetris Game
function initializeTetrisGame() {
    const canvas = document.getElementById('tetrisCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('tetrisStartBtn');
    const scoreElement = document.getElementById('tetrisScore');
    
    const BLOCK_SIZE = 30;
    const COLS = canvas.width / BLOCK_SIZE;
    const ROWS = canvas.height / BLOCK_SIZE;
    
    const pieces = [
        [[1,1,1,1]], // I
        [[1,1],[1,1]], // O
        [[0,1,0],[1,1,1]], // T
        [[0,1,1],[1,1,0]], // S
        [[1,1,0],[0,1,1]], // Z
        [[1,0,0],[1,1,1]], // J
        [[0,0,1],[1,1,1]]  // L
    ];
    
    const colors = ['#B87333', '#D4A574', '#8B4513', '#CD853F', '#DEB887', '#F4A460', '#D2B48C'];
    
    let gameState = {
        board: [],
        currentPiece: null,
        score: 0,
        gameRunning: false
    };
    
    let gameLoop = null;
    
    function initializeBoard() {
        return Array(ROWS).fill().map(() => Array(COLS).fill(0));
    }
    
    function createPiece() {
        const shapeIndex = Math.floor(Math.random() * pieces.length);
        return {
            x: Math.floor(COLS / 2) - 1,
            y: 0,
            shape: pieces[shapeIndex],
            color: colors[shapeIndex]
        };
    }
    
    function drawBlock(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
    }
    
    function drawGame() {
        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw board
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                if (gameState.board[y][x]) {
                    drawBlock(x, y, colors[gameState.board[y][x] - 1]);
                }
            }
        }
        
        // Draw current piece
        if (gameState.currentPiece) {
            const piece = gameState.currentPiece;
            piece.shape.forEach((row, dy) => {
                row.forEach((value, dx) => {
                    if (value) {
                        drawBlock(piece.x + dx, piece.y + dy, piece.color);
                    }
                });
            });
        }
    }
    
    function isValidPosition(piece, dx = 0, dy = 0) {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const newX = piece.x + x + dx;
                    const newY = piece.y + y + dy;
                    
                    if (newX < 0 || newX >= COLS || newY >= ROWS) {
                        return false;
                    }
                    
                    if (newY >= 0 && gameState.board[newY][newX]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    
    function rotatePiece(piece) {
        const shape = piece.shape;
        const rows = shape.length;
        const cols = shape[0].length;
        const rotated = [];
        
        for (let i = 0; i < cols; i++) {
            rotated[i] = [];
            for (let j = 0; j < rows; j++) {
                rotated[i][j] = shape[rows - 1 - j][i];
            }
        }
        
        return rotated;
    }
    
    function placePiece() {
        const piece = gameState.currentPiece;
        const colorIndex = colors.indexOf(piece.color) + 1;
        
        piece.shape.forEach((row, dy) => {
            row.forEach((value, dx) => {
                if (value) {
                    gameState.board[piece.y + dy][piece.x + dx] = colorIndex;
                }
            });
        });
        
        // Clear lines
        clearLines();
        
        // Create new piece
        gameState.currentPiece = createPiece();
        
        // Check game over
        if (!isValidPosition(gameState.currentPiece)) {
            gameOver();
        }
    }
    
    function clearLines() {
        let linesCleared = 0;
        
        for (let y = ROWS - 1; y >= 0; y--) {
            if (gameState.board[y].every(cell => cell !== 0)) {
                gameState.board.splice(y, 1);
                gameState.board.unshift(Array(COLS).fill(0));
                linesCleared++;
                y++; // Check the same line again
            }
        }
        
        if (linesCleared > 0) {
            gameState.score += linesCleared * 100;
            scoreElement.textContent = gameState.score;
        }
    }
    
    function updateGame() {
        if (!gameState.gameRunning || !gameState.currentPiece) return;
        
        if (isValidPosition(gameState.currentPiece, 0, 1)) {
            gameState.currentPiece.y++;
        } else {
            placePiece();
        }
        
        drawGame();
    }
    
    function gameOver() {
        gameState.gameRunning = false;
        clearInterval(gameLoop);
        startBtn.textContent = 'Start Game';
        showToast('Game Over! Score: ' + gameState.score);
    }
    
    function startGame() {
        gameState = {
            board: initializeBoard(),
            currentPiece: createPiece(),
            score: 0,
            gameRunning: true
        };
        scoreElement.textContent = '0';
        drawGame();
        
        gameLoop = setInterval(updateGame, 1000);
        startBtn.textContent = 'Stop Game';
    }
    
    function stopGame() {
        gameState.gameRunning = false;
        clearInterval(gameLoop);
        startBtn.textContent = 'Start Game';
    }
    
    // Controls
    function handleKeyPress(e) {
        // Don't capture keys if user is typing in form inputs or not in games section
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || currentSection !== 'games') return;
        if (!gameState.gameRunning || !gameState.currentPiece) return;
        
        e.preventDefault();
        const piece = gameState.currentPiece;
        
        switch(e.key) {
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (isValidPosition(piece, -1, 0)) {
                    piece.x--;
                    drawGame();
                }
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (isValidPosition(piece, 1, 0)) {
                    piece.x++;
                    drawGame();
                }
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (isValidPosition(piece, 0, 1)) {
                    piece.y++;
                    drawGame();
                }
                break;
            case 'ArrowUp':
            case 'w':
            case 'W':
            case ' ':
                const rotatedShape = rotatePiece(piece);
                const rotatedPiece = { ...piece, shape: rotatedShape };
                if (isValidPosition(rotatedPiece)) {
                    piece.shape = rotatedShape;
                    drawGame();
                }
                break;
        }
    }
    
    // Store event listeners for external management
    gameEventListeners.tetris = {
        keydown: handleKeyPress
    };
    
    startBtn.addEventListener('click', () => {
        if (gameState.gameRunning) {
            stopGame();
        } else {
            startGame();
        }
    });
    
    // Initial draw
    gameState.board = initializeBoard();
    drawGame();
}

// Pong Game
function initializePongGame() {
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('pongStartBtn');
    const playerScoreElement = document.getElementById('pongPlayerScore');
    const aiScoreElement = document.getElementById('pongAiScore');
    
    const PADDLE_WIDTH = 10;
    const PADDLE_HEIGHT = 80;
    const BALL_SIZE = 10;
    const PADDLE_SPEED = 6;
    const BALL_SPEED = 4;
    
    let gameState = {
        ball: { x: canvas.width / 2, y: canvas.height / 2, dx: BALL_SPEED, dy: BALL_SPEED, size: BALL_SIZE },
        paddles: {
            player: { x: 10, y: canvas.height / 2 - PADDLE_HEIGHT / 2, width: PADDLE_WIDTH, height: PADDLE_HEIGHT },
            ai: { x: canvas.width - 20, y: canvas.height / 2 - PADDLE_HEIGHT / 2, width: PADDLE_WIDTH, height: PADDLE_HEIGHT }
        },
        score: { player: 0, ai: 0 },
        gameRunning: false
    };
    
    let gameLoop = null;
    let keysPressed = new Set();
    
    function drawGame() {
        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw center line
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = '#B87333';
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw paddles
        ctx.fillStyle = '#B87333';
        ctx.fillRect(gameState.paddles.player.x, gameState.paddles.player.y, PADDLE_WIDTH, PADDLE_HEIGHT);
        ctx.fillRect(gameState.paddles.ai.x, gameState.paddles.ai.y, PADDLE_WIDTH, PADDLE_HEIGHT);
        
        // Draw ball
        ctx.fillStyle = '#D4A574';
        ctx.fillRect(gameState.ball.x - BALL_SIZE/2, gameState.ball.y - BALL_SIZE/2, BALL_SIZE, BALL_SIZE);
    }
    
    function updateGame() {
        if (!gameState.gameRunning) return;
        
        // Move player paddle
        if ((keysPressed.has('ArrowUp') || keysPressed.has('w') || keysPressed.has('W')) && 
            gameState.paddles.player.y > 0) {
            gameState.paddles.player.y -= PADDLE_SPEED;
        }
        if ((keysPressed.has('ArrowDown') || keysPressed.has('s') || keysPressed.has('S')) && 
            gameState.paddles.player.y < canvas.height - PADDLE_HEIGHT) {
            gameState.paddles.player.y += PADDLE_SPEED;
        }
        
        // AI paddle movement
        const aiCenter = gameState.paddles.ai.y + PADDLE_HEIGHT / 2;
        const ballY = gameState.ball.y;
        
        if (aiCenter < ballY - 10) {
            gameState.paddles.ai.y += PADDLE_SPEED * 0.7;
        } else if (aiCenter > ballY + 10) {
            gameState.paddles.ai.y -= PADDLE_SPEED * 0.7;
        }
        
        // Keep AI paddle in bounds
        gameState.paddles.ai.y = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, gameState.paddles.ai.y));
        
        // Move ball
        gameState.ball.x += gameState.ball.dx;
        gameState.ball.y += gameState.ball.dy;
        
        // Ball collision with top/bottom walls
        if (gameState.ball.y <= gameState.ball.size || gameState.ball.y >= canvas.height - gameState.ball.size) {
            gameState.ball.dy = -gameState.ball.dy;
        }
        
        // Ball collision with paddles
        const ball = gameState.ball;
        const playerPaddle = gameState.paddles.player;
        const aiPaddle = gameState.paddles.ai;
        
        // Player paddle collision
        if (ball.x - ball.size <= playerPaddle.x + playerPaddle.width &&
            ball.x + ball.size >= playerPaddle.x &&
            ball.y >= playerPaddle.y &&
            ball.y <= playerPaddle.y + playerPaddle.height) {
            ball.dx = Math.abs(ball.dx);
            const hitPos = (ball.y - playerPaddle.y) / playerPaddle.height;
            ball.dy = (hitPos - 0.5) * BALL_SPEED * 2;
        }
        
        // AI paddle collision
        if (ball.x + ball.size >= aiPaddle.x &&
            ball.x - ball.size <= aiPaddle.x + aiPaddle.width &&
            ball.y >= aiPaddle.y &&
            ball.y <= aiPaddle.y + aiPaddle.height) {
            ball.dx = -Math.abs(ball.dx);
            const hitPos = (ball.y - aiPaddle.y) / aiPaddle.height;
            ball.dy = (hitPos - 0.5) * BALL_SPEED * 2;
        }
        
        // Score
        if (ball.x < 0) {
            gameState.score.ai++;
            aiScoreElement.textContent = gameState.score.ai;
            resetBall();
        } else if (ball.x > canvas.width) {
            gameState.score.player++;
            playerScoreElement.textContent = gameState.score.player;
            resetBall();
        }
        
        drawGame();
    }
    
    function resetBall() {
        gameState.ball.x = canvas.width / 2;
        gameState.ball.y = canvas.height / 2;
        gameState.ball.dx = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
        gameState.ball.dy = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
    }
    
    function startGame() {
        gameState.score = { player: 0, ai: 0 };
        playerScoreElement.textContent = '0';
        aiScoreElement.textContent = '0';
        resetBall();
        gameState.gameRunning = true;
        
        gameLoop = setInterval(updateGame, 16);
        startBtn.textContent = 'Stop Game';
    }
    
    function stopGame() {
        gameState.gameRunning = false;
        clearInterval(gameLoop);
        startBtn.textContent = 'Start Game';
    }
    
    // Controls
    function handleKeyDown(e) {
        // Don't capture keys if user is typing in form inputs or not in games section
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || currentSection !== 'games') return;
        if (['ArrowUp', 'ArrowDown', 'w', 'W', 's', 'S'].includes(e.key)) {
            e.preventDefault();
            keysPressed.add(e.key);
        }
    }
    
    function handleKeyUp(e) {
        keysPressed.delete(e.key);
    }
    
    // Store event listeners for external management
    gameEventListeners.pong = {
        keydown: handleKeyDown,
        keyup: handleKeyUp
    };
    
    startBtn.addEventListener('click', () => {
        if (gameState.gameRunning) {
            stopGame();
        } else {
            startGame();
        }
    });
    
    // Initial draw
    drawGame();
}

// Breakout Game
function initializeBreakoutGame() {
    const canvas = document.getElementById('breakoutCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('breakoutStartBtn');
    const scoreElement = document.getElementById('breakoutScore');
    const livesElement = document.getElementById('breakoutLives');
    
    const PADDLE_WIDTH = 75;
    const PADDLE_HEIGHT = 10;
    const BALL_SIZE = 8;
    const PADDLE_SPEED = 7;
    const BALL_SPEED = 4;
    const BRICK_ROWS = 5;
    const BRICK_COLS = 8;
    const BRICK_WIDTH = 55;
    const BRICK_HEIGHT = 20;
    const BRICK_PADDING = 5;
    
    let gameState = {
        ball: { x: canvas.width / 2, y: canvas.height - 50, dx: BALL_SPEED, dy: -BALL_SPEED, size: BALL_SIZE },
        paddle: { x: canvas.width / 2 - PADDLE_WIDTH / 2, y: canvas.height - 20, width: PADDLE_WIDTH, height: PADDLE_HEIGHT },
        bricks: [],
        score: 0,
        lives: 3,
        gameRunning: false
    };
    
    let gameLoop = null;
    let keysPressed = new Set();
    
    function initializeBricks() {
        const bricks = [];
        const colors = ['#B87333', '#D4A574', '#8B4513', '#CD853F', '#DEB887'];
        
        for (let row = 0; row < BRICK_ROWS; row++) {
            for (let col = 0; col < BRICK_COLS; col++) {
                bricks.push({
                    x: col * (BRICK_WIDTH + BRICK_PADDING) + BRICK_PADDING,
                    y: row * (BRICK_HEIGHT + BRICK_PADDING) + 50,
                    width: BRICK_WIDTH,
                    height: BRICK_HEIGHT,
                    color: colors[row],
                    visible: true
                });
            }
        }
        
        return bricks;
    }
    
    function drawGame() {
        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw bricks
        gameState.bricks.forEach(brick => {
            if (brick.visible) {
                ctx.fillStyle = brick.color;
                ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
            }
        });
        
        // Draw paddle
        ctx.fillStyle = '#B87333';
        ctx.fillRect(gameState.paddle.x, gameState.paddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
        
        // Draw ball
        ctx.fillStyle = '#D4A574';
        ctx.fillRect(gameState.ball.x - BALL_SIZE/2, gameState.ball.y - BALL_SIZE/2, BALL_SIZE, BALL_SIZE);
    }
    
    function checkBrickCollision() {
        const ball = gameState.ball;
        
        for (let brick of gameState.bricks) {
            if (!brick.visible) continue;
            
            if (ball.x < brick.x + brick.width &&
                ball.x + ball.size > brick.x &&
                ball.y < brick.y + brick.height &&
                ball.y + ball.size > brick.y) {
                
                brick.visible = false;
                gameState.score += 10;
                scoreElement.textContent = gameState.score;
                
                // Determine collision side
                const ballCenterX = ball.x + ball.size / 2;
                const ballCenterY = ball.y + ball.size / 2;
                const brickCenterX = brick.x + brick.width / 2;
                const brickCenterY = brick.y + brick.height / 2;
                
                const dx = ballCenterX - brickCenterX;
                const dy = ballCenterY - brickCenterY;
                
                if (Math.abs(dx / brick.width) > Math.abs(dy / brick.height)) {
                    ball.dx = -ball.dx;
                } else {
                    ball.dy = -ball.dy;
                }
                
                break;
            }
        }
    }
    
    function updateGame() {
        if (!gameState.gameRunning) return;
        
        // Move paddle
        if ((keysPressed.has('ArrowLeft') || keysPressed.has('a') || keysPressed.has('A')) && 
            gameState.paddle.x > 0) {
            gameState.paddle.x -= PADDLE_SPEED;
        }
        if ((keysPressed.has('ArrowRight') || keysPressed.has('d') || keysPressed.has('D')) && 
            gameState.paddle.x < canvas.width - gameState.paddle.width) {
            gameState.paddle.x += PADDLE_SPEED;
        }
        
        // Move ball
        gameState.ball.x += gameState.ball.dx;
        gameState.ball.y += gameState.ball.dy;
        
        // Ball collision with walls
        if (gameState.ball.x <= gameState.ball.size || gameState.ball.x >= canvas.width - gameState.ball.size) {
            gameState.ball.dx = -gameState.ball.dx;
        }
        
        if (gameState.ball.y <= gameState.ball.size) {
            gameState.ball.dy = -gameState.ball.dy;
        }
        
        // Ball collision with paddle
        const ball = gameState.ball;
        const paddle = gameState.paddle;
        
        if (ball.y + ball.size >= paddle.y &&
            ball.y - ball.size <= paddle.y + paddle.height &&
            ball.x >= paddle.x &&
            ball.x <= paddle.x + paddle.width) {
            
            ball.dy = -Math.abs(ball.dy);
            
            // Add angle based on where ball hit paddle
            const hitPos = (ball.x - paddle.x) / paddle.width;
            ball.dx = (hitPos - 0.5) * BALL_SPEED * 2;
        }
        
        // Check brick collisions
        checkBrickCollision();
        
        // Check if ball went off bottom
        if (ball.y > canvas.height) {
            gameState.lives--;
            livesElement.textContent = gameState.lives;
            
            if (gameState.lives <= 0) {
                gameOver();
                return;
            }
            
            // Reset ball position
            ball.x = canvas.width / 2;
            ball.y = canvas.height - 50;
            ball.dx = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
            ball.dy = -BALL_SPEED;
        }
        
        // Check if all bricks are destroyed
        const remainingBricks = gameState.bricks.filter(brick => brick.visible);
        if (remainingBricks.length === 0) {
            gameState.bricks = initializeBricks();
            showToast('Level Complete!');
        }
        
        drawGame();
    }
    
    function gameOver() {
        gameState.gameRunning = false;
        clearInterval(gameLoop);
        startBtn.textContent = 'Start Game';
        showToast('Game Over! Score: ' + gameState.score);
    }
    
    function startGame() {
        gameState = {
            ball: { x: canvas.width / 2, y: canvas.height - 50, dx: BALL_SPEED, dy: -BALL_SPEED, size: BALL_SIZE },
            paddle: { x: canvas.width / 2 - PADDLE_WIDTH / 2, y: canvas.height - 20, width: PADDLE_WIDTH, height: PADDLE_HEIGHT },
            bricks: initializeBricks(),
            score: 0,
            lives: 3,
            gameRunning: true
        };
        
        scoreElement.textContent = '0';
        livesElement.textContent = '3';
        drawGame();
        
        gameLoop = setInterval(updateGame, 16);
        startBtn.textContent = 'Stop Game';
    }
    
    function stopGame() {
        gameState.gameRunning = false;
        clearInterval(gameLoop);
        startBtn.textContent = 'Start Game';
    }
    
    // Controls
    function handleKeyDown(e) {
        // Don't capture keys if user is typing in form inputs or not in games section
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || currentSection !== 'games') return;
        if (['ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D'].includes(e.key)) {
            e.preventDefault();
            keysPressed.add(e.key);
        }
    }
    
    function handleKeyUp(e) {
        keysPressed.delete(e.key);
    }
    
    // Store event listeners for external management
    gameEventListeners.breakout = {
        keydown: handleKeyDown,
        keyup: handleKeyUp
    };
    
    startBtn.addEventListener('click', () => {
        if (gameState.gameRunning) {
            stopGame();
        } else {
            startGame();
        }
    });
    
    // Initial setup
    gameState.bricks = initializeBricks();
    drawGame();
}

// Photo modal functionality
function initializeModal() {
    const modal = document.getElementById('photoModal');
    const closeBtn = document.getElementById('closeModal');
    const purchaseBtn = document.getElementById('purchaseBtn');
    
    closeBtn.addEventListener('click', closePhotoModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePhotoModal();
        }
    });

    paypal.Buttons({
     // configuration options
    }).render('#paypal-button-container-modal');
    
    purchaseBtn.addEventListener('click', () => {
        showToast('PayPal integration would be implemented here');
    });
}

function openPhotoModal(photoId) {
    const photo = photos.find(p => p.id === photoId);
    if (!photo) return;
    
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    
    modalImage.src = photo.image;
    modalImage.alt = photo.title;
    modalTitle.textContent = photo.title;
    modalDescription.textContent = photo.description;
    modalPrice.textContent = `$${photo.price}`;
    
    modal.style.display = 'block';
}

function closePhotoModal() {
    const modal = document.getElementById('photoModal');
    modal.style.display = 'none';
}

// Contact form functionality
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Simulate form submission
        showToast('Message sent successfully!');
        form.reset();
    });
}

// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Utility functions
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.openPhotoModal = openPhotoModal;
window.closePhotoModal = closePhotoModal;
window.showToast = showToast;