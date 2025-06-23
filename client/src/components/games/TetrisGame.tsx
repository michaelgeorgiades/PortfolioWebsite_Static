import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface TetrisPiece {
  x: number;
  y: number;
  shape: number[][];
  color: string;
}

export default function TetrisGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const gameStateRef = useRef({
    currentPiece: null as TetrisPiece | null,
    board: [] as number[][],
    gameLoop: null as NodeJS.Timeout | null,
  });

  const BLOCK_SIZE = 32;
  const COLS = 10;
  const ROWS = 20;
  const COLORS = ['#000000', '#B87333', '#D4A574', '#8B5A2B'];

  // Simple Tetris pieces
  const PIECES = [
    {
      shape: [[1,1,1,1]], // I-piece
      color: '#B87333'
    },
    {
      shape: [[1,1],[1,1]], // O-piece
      color: '#D4A574'
    },
    {
      shape: [[1,1,1],[0,1,0]], // T-piece
      color: '#8B5A2B'
    },
    {
      shape: [[1,1,1],[1,0,0]], // L-piece
      color: '#B87333'
    },
    {
      shape: [[1,1,1],[0,0,1]], // J-piece
      color: '#D4A574'
    }
  ];

  const initializeBoard = () => {
    return Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
  };

  const createNewPiece = (): TetrisPiece => {
    const piece = PIECES[Math.floor(Math.random() * PIECES.length)];
    const shapeWidth = piece.shape && piece.shape[0] ? piece.shape[0].length : 1;
    return {
      x: Math.floor(COLS / 2) - Math.floor(shapeWidth / 2),
      y: 0,
      shape: piece.shape,
      color: piece.color
    };
  };

  const drawBlock = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw board
    const { board } = gameStateRef.current;
    if (board && board.length > 0) {
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          if (board[row] && board[row][col]) {
            drawBlock(ctx, col, row, COLORS[board[row][col]]);
          }
        }
      }
    }

    // Draw current piece
    const { currentPiece } = gameStateRef.current;
    if (currentPiece) {
      ctx.fillStyle = currentPiece.color;
      for (let row = 0; row < currentPiece.shape.length; row++) {
        for (let col = 0; col < currentPiece.shape[row].length; col++) {
          if (currentPiece.shape[row][col]) {
            const x = (currentPiece.x + col) * BLOCK_SIZE;
            const y = (currentPiece.y + row) * BLOCK_SIZE;
            ctx.fillRect(x, y, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
          }
        }
      }
    }
  };

  const isValidPosition = (piece: TetrisPiece, dx = 0, dy = 0): boolean => {
    const { board } = gameStateRef.current;
    if (!board || !piece || !piece.shape) return false;
    
    for (let row = 0; row < piece.shape.length; row++) {
      for (let col = 0; col < piece.shape[row].length; col++) {
        if (piece.shape[row][col]) {
          const newX = piece.x + col + dx;
          const newY = piece.y + row + dy;
          
          if (newX < 0 || newX >= COLS || newY >= ROWS) {
            return false;
          }
          
          if (newY >= 0 && board[newY] && board[newY][newX]) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const placePiece = () => {
    const { currentPiece, board } = gameStateRef.current;
    if (!currentPiece || !board) return;

    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col]) {
          const boardY = currentPiece.y + row;
          const boardX = currentPiece.x + col;
          if (boardY >= 0 && board[boardY]) {
            board[boardY][boardX] = 1;
          }
        }
      }
    }

    // Check for completed lines
    let linesCleared = 0;
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row].every(cell => cell !== 0)) {
        board.splice(row, 1);
        board.unshift(Array(COLS).fill(0));
        linesCleared++;
        row++; // Check the same row again
      }
    }

    if (linesCleared > 0) {
      setScore(prev => prev + linesCleared * 100);
    }

    gameStateRef.current.currentPiece = createNewPiece();
    
    // Check game over
    if (!isValidPosition(gameStateRef.current.currentPiece)) {
      stopGame();
    }
  };

  const gameLoop = () => {
    const { currentPiece } = gameStateRef.current;
    if (!currentPiece || !gameStateRef.current.board) return;

    if (isValidPosition(currentPiece, 0, 1)) {
      currentPiece.y++;
    } else {
      placePiece();
    }

    draw();
  };

  const startGame = () => {
    if (gameRunning) return;
    
    setGameRunning(true);
    setScore(0);
    gameStateRef.current.board = initializeBoard();
    gameStateRef.current.currentPiece = createNewPiece();
    
    gameStateRef.current.gameLoop = setInterval(gameLoop, 500);
  };

  const stopGame = () => {
    setGameRunning(false);
    if (gameStateRef.current.gameLoop) {
      clearInterval(gameStateRef.current.gameLoop);
      gameStateRef.current.gameLoop = null;
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!gameRunning || !gameStateRef.current.currentPiece) return;

    const { currentPiece } = gameStateRef.current;
    
    switch(e.key) {
      case 'ArrowLeft':
        if (isValidPosition(currentPiece, -1, 0)) {
          currentPiece.x--;
          draw();
        }
        break;
      case 'ArrowRight':
        if (isValidPosition(currentPiece, 1, 0)) {
          currentPiece.x++;
          draw();
        }
        break;
      case 'ArrowDown':
        if (isValidPosition(currentPiece, 0, 1)) {
          currentPiece.y++;
          draw();
        }
        break;
      case 'ArrowUp':
        // Rotate piece (simple 90-degree rotation)
        if (currentPiece.shape && currentPiece.shape[0]) {
          const rotated = currentPiece.shape[0].map((_, index) =>
            currentPiece.shape.map(row => row[index]).reverse()
          );
          const rotatedPiece = { ...currentPiece, shape: rotated };
          if (isValidPosition(rotatedPiece)) {
            currentPiece.shape = rotated;
            draw();
          }
        }
        break;
    }
  };

  useEffect(() => {
    // Initialize board if not exists
    if (!gameStateRef.current.board || gameStateRef.current.board.length === 0) {
      gameStateRef.current.board = initializeBoard();
    }
    
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
      <h3 className="text-2xl font-semibold text-copper mb-4 text-center">Tetris</h3>
      <div className="game-container bg-black rounded-lg p-4 mb-4">
        <canvas 
          ref={canvasRef}
          width={COLS * BLOCK_SIZE}
          height={ROWS * BLOCK_SIZE}
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
          Use arrow keys to play: ← → ↓ for movement, ↑ to rotate
        </div>
      </div>
    </div>
  );
}
