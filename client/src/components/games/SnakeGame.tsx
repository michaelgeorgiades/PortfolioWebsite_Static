import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface Position {
  x: number;
  y: number;
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const gameStateRef = useRef({
    snake: [] as Position[],
    food: { x: 0, y: 0 } as Position,
    direction: { x: 0, y: 0 } as Position,
    gameLoop: null as NodeJS.Timeout | null,
  });

  const GRID_SIZE = 20;
  const CANVAS_SIZE = 320;
  const GRID_COUNT = CANVAS_SIZE / GRID_SIZE;

  const getRandomPosition = (): Position => ({
    x: Math.floor(Math.random() * GRID_COUNT) * GRID_SIZE,
    y: Math.floor(Math.random() * GRID_COUNT) * GRID_SIZE,
  });

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = '#B87333';
    gameStateRef.current.snake.forEach(segment => {
      ctx.fillRect(segment.x, segment.y, GRID_SIZE - 2, GRID_SIZE - 2);
    });

    // Draw food
    ctx.fillStyle = '#D4A574';
    const { food } = gameStateRef.current;
    ctx.fillRect(food.x, food.y, GRID_SIZE - 2, GRID_SIZE - 2);
  };

  const gameLoop = () => {
    const { snake, food, direction } = gameStateRef.current;
    
    if (direction.x === 0 && direction.y === 0) return;

    // Move snake
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    // Check wall collision
    if (head.x < 0 || head.x >= CANVAS_SIZE || head.y < 0 || head.y >= CANVAS_SIZE) {
      stopGame();
      return;
    }

    // Check self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      stopGame();
      return;
    }

    snake.unshift(head);

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
      setScore(prev => prev + 10);
      // Generate new food position that doesn't overlap with snake
      let newFood: Position;
      do {
        newFood = getRandomPosition();
      } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
      gameStateRef.current.food = newFood;
    } else {
      snake.pop();
    }

    draw();
  };

  const startGame = () => {
    if (gameRunning) return;
    
    setGameRunning(true);
    setScore(0);
    
    const centerX = Math.floor(GRID_COUNT / 2) * GRID_SIZE;
    const centerY = Math.floor(GRID_COUNT / 2) * GRID_SIZE;
    
    gameStateRef.current.snake = [{ x: centerX, y: centerY }];
    gameStateRef.current.food = getRandomPosition();
    gameStateRef.current.direction = { x: GRID_SIZE, y: 0 };
    
    draw();
    gameStateRef.current.gameLoop = setInterval(gameLoop, 150);
  };

  const stopGame = () => {
    setGameRunning(false);
    if (gameStateRef.current.gameLoop) {
      clearInterval(gameStateRef.current.gameLoop);
      gameStateRef.current.gameLoop = null;
    }
    gameStateRef.current.direction = { x: 0, y: 0 };
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!gameRunning) return;

    e.preventDefault();
    const { direction } = gameStateRef.current;
    
    switch(e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (direction.y === 0) {
          gameStateRef.current.direction = { x: 0, y: -GRID_SIZE };
        }
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (direction.y === 0) {
          gameStateRef.current.direction = { x: 0, y: GRID_SIZE };
        }
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (direction.x === 0) {
          gameStateRef.current.direction = { x: -GRID_SIZE, y: 0 };
        }
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (direction.x === 0) {
          gameStateRef.current.direction = { x: GRID_SIZE, y: 0 };
        }
        break;
    }
  };

  useEffect(() => {
    // Initialize game display
    gameStateRef.current.snake = [{ 
      x: Math.floor(GRID_COUNT / 2) * GRID_SIZE, 
      y: Math.floor(GRID_COUNT / 2) * GRID_SIZE 
    }];
    gameStateRef.current.food = getRandomPosition();
    draw();

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (gameStateRef.current.gameLoop) {
        clearInterval(gameStateRef.current.gameLoop);
      }
    };
  }, [gameRunning]);

  return (
    <div className="glass-effect p-6 rounded-lg">
      <h3 className="text-2xl font-semibold text-copper mb-4 text-center">Snake</h3>
      <div className="game-container bg-black rounded-lg p-4 mb-4">
        <canvas 
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="mx-auto border-2 border-copper-dark rounded"
        />
      </div>
      <div className="text-center space-y-2">
        <div className="text-gray-300">
          <span>Score: </span>
          <span className="text-copper font-semibold">{score}</span>
        </div>
        <Button 
          onClick={gameRunning ? stopGame : startGame}
          className="copper-gradient text-white hover:shadow-lg hover:shadow-copper/25 transition-all duration-300"
        >
          {gameRunning ? 'Stop Game' : 'Start Game'}
        </Button>
        <div className="text-xs text-gray-400 mt-2">
          Use arrow keys or WASD to control the snake
        </div>
      </div>
    </div>
  );
}
