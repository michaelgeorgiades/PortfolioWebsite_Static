import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  visible: boolean;
}

interface GameState {
  ball: {
    x: number;
    y: number;
    dx: number;
    dy: number;
    size: number;
  };
  paddle: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  bricks: Brick[];
  score: number;
  lives: number;
}

export default function BreakoutGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const gameStateRef = useRef<GameState | null>(null);
  const gameLoopRef = useRef<number | null>(null);
  const keysRef = useRef<Set<string>>(new Set());

  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 400;
  const PADDLE_WIDTH = 80;
  const PADDLE_HEIGHT = 10;
  const BALL_SIZE = 6;
  const PADDLE_SPEED = 6;
  const BALL_SPEED = 3;
  const BRICK_ROWS = 5;
  const BRICK_COLS = 10;
  const BRICK_WIDTH = 50;
  const BRICK_HEIGHT = 20;
  const BRICK_PADDING = 5;
  const BRICK_OFFSET_TOP = 50;

  const initializeBricks = (): Brick[] => {
    const bricks: Brick[] = [];
    const colors = ['#B87333', '#D4A574', '#8B5A2B', '#CD853F', '#DEB887'];
    
    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        bricks.push({
          x: col * (BRICK_WIDTH + BRICK_PADDING) + BRICK_PADDING,
          y: row * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP,
          width: BRICK_WIDTH,
          height: BRICK_HEIGHT,
          color: colors[row],
          visible: true
        });
      }
    }
    
    return bricks;
  };

  const initializeGame = (): GameState => {
    return {
      ball: {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT - 50,
        dx: BALL_SPEED * (Math.random() > 0.5 ? 1 : -1),
        dy: -BALL_SPEED,
        size: BALL_SIZE
      },
      paddle: {
        x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2,
        y: CANVAS_HEIGHT - 20,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT
      },
      bricks: initializeBricks(),
      score: 0,
      lives: 3
    };
  };

  const draw = (gameState: GameState) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw bricks
    gameState.bricks.forEach(brick => {
      if (brick.visible) {
        ctx.fillStyle = brick.color;
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        
        // Add border for depth
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
      }
    });

    // Draw paddle
    ctx.fillStyle = '#B87333';
    ctx.fillRect(gameState.paddle.x, gameState.paddle.y, gameState.paddle.width, gameState.paddle.height);

    // Draw ball
    ctx.fillStyle = '#D4A574';
    ctx.beginPath();
    ctx.arc(gameState.ball.x, gameState.ball.y, gameState.ball.size, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkBrickCollision = (gameState: GameState) => {
    const ball = gameState.ball;
    
    for (let brick of gameState.bricks) {
      if (!brick.visible) continue;
      
      if (ball.x + ball.size >= brick.x &&
          ball.x - ball.size <= brick.x + brick.width &&
          ball.y + ball.size >= brick.y &&
          ball.y - ball.size <= brick.y + brick.height) {
        
        brick.visible = false;
        gameState.score += 10;
        setScore(prev => prev + 10);
        
        // Determine which side of the brick was hit
        const ballCenterX = ball.x;
        const ballCenterY = ball.y;
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
  };

  const updateGame = () => {
    const gameState = gameStateRef.current;
    if (!gameState) return;

    // Move paddle
    if ((keysRef.current.has('ArrowLeft') || keysRef.current.has('a') || keysRef.current.has('A')) && 
        gameState.paddle.x > 0) {
      gameState.paddle.x -= PADDLE_SPEED;
    }
    if ((keysRef.current.has('ArrowRight') || keysRef.current.has('d') || keysRef.current.has('D')) && 
        gameState.paddle.x < CANVAS_WIDTH - gameState.paddle.width) {
      gameState.paddle.x += PADDLE_SPEED;
    }

    // Move ball
    gameState.ball.x += gameState.ball.dx;
    gameState.ball.y += gameState.ball.dy;

    // Ball collision with walls
    if (gameState.ball.x <= gameState.ball.size || gameState.ball.x >= CANVAS_WIDTH - gameState.ball.size) {
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
    checkBrickCollision(gameState);

    // Check if ball went off bottom
    if (ball.y > CANVAS_HEIGHT) {
      gameState.lives--;
      setLives(prev => prev - 1);
      
      if (gameState.lives <= 0) {
        stopGame();
        return;
      }
      
      // Reset ball position
      ball.x = CANVAS_WIDTH / 2;
      ball.y = CANVAS_HEIGHT - 50;
      ball.dx = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
      ball.dy = -BALL_SPEED;
    }

    // Check if all bricks are destroyed
    const remainingBricks = gameState.bricks.filter(brick => brick.visible);
    if (remainingBricks.length === 0) {
      // Level complete - could restart with new bricks
      gameState.bricks = initializeBricks();
    }

    draw(gameState);
  };

  const startGame = () => {
    if (gameRunning) return;
    
    setGameRunning(true);
    setScore(0);
    setLives(3);
    gameStateRef.current = initializeGame();
    
    const gameLoop = () => {
      updateGame();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    
    gameLoop();
  };

  const stopGame = () => {
    setGameRunning(false);
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (['ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D'].includes(e.key)) {
      e.preventDefault();
      keysRef.current.add(e.key);
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    keysRef.current.delete(e.key);
  };

  useEffect(() => {
    // Initialize display
    const gameState = initializeGame();
    gameStateRef.current = gameState;
    draw(gameState);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);

  return (
    <div className="glass-effect p-6 rounded-lg">
      <h3 className="text-2xl font-semibold text-copper mb-4 text-center">Breakout</h3>
      <div className="game-container bg-black rounded-lg p-4 mb-4">
        <canvas 
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="mx-auto border-2 border-copper-dark rounded"
        />
      </div>
      <div className="text-center space-y-2">
        <div className="flex justify-center space-x-8 text-gray-300">
          <div>
            <span>Score: </span>
            <span className="text-copper font-semibold">{score}</span>
          </div>
          <div>
            <span>Lives: </span>
            <span className="text-copper font-semibold">{lives}</span>
          </div>
        </div>
        <Button 
          onClick={gameRunning ? stopGame : startGame}
          className="copper-gradient text-white hover:shadow-lg hover:shadow-copper/25 transition-all duration-300"
        >
          {gameRunning ? 'Stop Game' : 'Start Game'}
        </Button>
        <div className="text-xs text-gray-400 mt-2">
          Use ← → arrow keys or A D to control the paddle
        </div>
      </div>
    </div>
  );
}