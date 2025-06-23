import Navigation from "@/components/Navigation";
import TetrisGame from "@/components/games/TetrisGame";
import SnakeGame from "@/components/games/SnakeGame";
import PongGame from "@/components/games/PongGame";
import BreakoutGame from "@/components/games/BreakoutGame";

export default function Games() {
  return (
    <div className="min-h-screen text-gray-100" style={{backgroundColor: 'hsl(0, 0%, 6%)'}}>
      <Navigation />
      
      {/* Games Section */}
      <section className="py-20 pt-32" style={{backgroundColor: 'hsl(0, 0%, 10%)'}}>
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-16">
            <span className="text-copper">Browser</span> Games
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <TetrisGame />
            <SnakeGame />
            <PongGame />
            <BreakoutGame />
          </div>
        </div>
      </section>
    </div>
  );
}