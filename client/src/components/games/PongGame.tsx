import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface GameState {
  ball: {
    x: number;
    y: number;
    dx: number;
    dy: number;
    size: number;
  };
  paddles: {
    player: { x: number; y: number; width: number; height: number };
    ai: { x: number; y: number; width: number; height: number };
  };
  score: {
    player: number;
    ai: number;
  };
}

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const gameStateRef = useRef<GameState | null>(null);
  const gameLoopRef = useRef<number | null>(null);
  const keysRef = useRef<Set<string>>(new Set());

  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 400;
  const PADDLE_WIDTH = 10;
  const PADDLE_HEIGHT = 60;
  const BALL_SIZE = 8;
  const PADDLE_SPEED = 5;
  const BALL_SPEED = 3;

  const initializeGame = (): GameState => {
    return {
      ball: {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2,
        dx: BALL_SPEED * (Math.random() > 0.5 ? 1 : -1),
        dy: BALL_SPEED * (Math.random() > 0.5 ? 1 : -1),
        size: BALL_SIZE
      },
      paddles: {
        player: {
          x: 20,
          y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
          width: PADDLE_WIDTH,
          height: PADDLE_HEIGHT
        },
        ai: {
          x: CANVAS_WIDTH - 30,
          y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
          width: PADDLE_WIDTH,
          height: PADDLE_HEIGHT
        }
      },
      score: {
        player: 0,
        ai: 0
      }
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

    // Draw center line
    ctx.strokeStyle = '#B87333';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = '#B87333';
    ctx.fillRect(gameState.paddles.player.x, gameState.paddles.player.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(gameState.paddles.ai.x, gameState.paddles.ai.y, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Draw ball
    ctx.fillStyle = '#D4A574';
    ctx.beginPath();
    ctx.arc(gameState.ball.x, gameState.ball.y, gameState.ball.size, 0, Math.PI * 2);
    ctx.fill();
  };

  const updateGame = () => {
    const gameState = gameStateRef.current;
    if (!gameState) return;

    // Move player paddle
    if (keysRef.current.has('ArrowUp') && gameState.paddles.player.y > 0) {
      gameState.paddles.player.y -= PADDLE_SPEED;
    }
    if (keysRef.current.has('ArrowDown') && gameState.paddles.player.y < CANVAS_HEIGHT - PADDLE_HEIGHT) {
      gameState.paddles.player.y += PADDLE_SPEED;
    }

    // AI paddle movement
    const aiCenter = gameState.paddles.ai.y + PADDLE_HEIGHT / 2;
    const ballY = gameState.ball.y;
    
    if (aiCenter < ballY - 10) {
      gameState.paddles.ai.y += PADDLE_SPEED * 0.7; // Slightly slower than player
    } else if (aiCenter > ballY + 10) {
      gameState.paddles.ai.y -= PADDLE_SPEED * 0.7;
    }

    // Keep AI paddle in bounds
    gameState.paddles.ai.y = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, gameState.paddles.ai.y));

    // Move ball
    gameState.ball.x += gameState.ball.dx;
    gameState.ball.y += gameState.ball.dy;

    // Ball collision with top/bottom walls
    if (gameState.ball.y <= gameState.ball.size || gameState.ball.y >= CANVAS_HEIGHT - gameState.ball.size) {
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
      // Add some spin based on where the ball hit the paddle
      const hitPos = (ball.y - playerPaddle.y) / playerPaddle.height;
      ball.dy = (hitPos - 0.5) * BALL_SPEED * 2;
    }

    // AI paddle collision
    if (ball.x + ball.size >= aiPaddle.x &&
        ball.x - ball.size <= aiPaddle.x + aiPaddle.width &&
        ball.y >= aiPaddle.y &&
        ball.y <= aiPaddle.y + aiPaddle.height) {
      ball.dx = -Math.abs(ball.dx);
      // Add some spin
      const hitPos = (ball.y - aiPaddle.y) / aiPaddle.height;
      ball.dy = (hitPos - 0.5) * BALL_SPEED * 2;
    }

    // Score
    if (ball.x < 0) {
      gameState.score.ai++;
      setScore(prev => ({ ...prev, ai: prev.ai + 1 }));
      resetBall(gameState);
    } else if (ball.x > CANVAS_WIDTH) {
      gameState.score.player++;
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
      resetBall(gameState);
    }

    draw(gameState);
  };

  const resetBall = (gameState: GameState) => {
    gameState.ball.x = CANVAS_WIDTH / 2;
    gameState.ball.y = CANVAS_HEIGHT / 2;
    gameState.ball.dx = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
    gameState.ball.dy = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
  };

  const startGame = () => {
    if (gameRunning) return;
    
    setGameRunning(true);
    setScore({ player: 0, ai: 0 });
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
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
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
      <h3 className="text-2xl font-semibold text-copper mb-4 text-center">Pong</h3>
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
            <span>Player: </span>
            <span className="text-copper font-semibold">{score.player}</span>
          </div>
          <div>
            <span>AI: </span>
            <span className="text-copper font-semibold">{score.ai}</span>
          </div>
        </div>
        <Button 
          onClick={gameRunning ? stopGame : startGame}
          className="copper-gradient text-white hover:shadow-lg hover:shadow-copper/25 transition-all duration-300"
        >
          {gameRunning ? 'Stop Game' : 'Start Game'}
        </Button>
        <div className="text-xs text-gray-400 mt-2">
          Use ↑ and ↓ arrow keys to control your paddle
        </div>
      </div>
    </div>
  );
}