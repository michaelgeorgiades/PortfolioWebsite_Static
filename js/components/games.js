// Games component
function renderGamesSection() {
    return `
        <div class="section-content">
            <h2 class="section-title">Interactive Games</h2>
            <p class="section-subtitle">Classic games built with HTML5 Canvas</p>

            <div class="games-grid">
                <div class="game-card" id="snakeGame">
                    <h3>Snake</h3>
                    <canvas id="snakeCanvas" width="300" height="400"></canvas>
                    <div class="game-info">
                        <div class="score">Score: <span id="snakeScore">0</span></div>
                        <button class="btn btn-primary" id="snakeStartBtn">Start Game</button>
                        <p class="game-controls">Use arrow keys or WASD to play</p>
                    </div>
                </div>

                <div class="game-card" id="tetrisGame">
                    <h3>Tetris</h3>
                    <canvas id="tetrisCanvas" width="300" height="400"></canvas>
                    <div class="game-info">
                        <div class="score">Score: <span id="tetrisScore">0</span></div>
                        <button class="btn btn-primary" id="tetrisStartBtn">Start Game</button>
                        <p class="game-controls">Use ← → keys to move, ↑ to rotate</p>
                    </div>
                </div>

                <div class="game-card" id="breakoutGame">
                    <h3>Breakout</h3>
                    <canvas id="breakoutCanvas" width="300" height="400"></canvas>
                    <div class="game-info">
                        <div class="score">
                            Score: <span id="breakoutScore">0</span> |
                            Lives: <span id="breakoutLives">3</span>
                        </div>
                        <button class="btn btn-primary" id="breakoutStartBtn">Start Game</button>
                        <p class="game-controls">Use ← → arrow keys or A D to control paddle</p>
                    </div>
                </div>

                <div class="game-card" id="pongGame">
                    <h3>Pong</h3>
                    <canvas id="pongCanvas" width="300" height="380"></canvas>
                    <div class="game-info">
                        <div class="score">
                            Player: <span id="pongPlayerScore">0</span> |
                            AI: <span id="pongAiScore">0</span>
                        </div>
                        <button class="btn btn-primary" id="pongStartBtn">Start Game</button>
                        <p class="game-controls">Use ↑ ↓ arrow keys to control paddle</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}
