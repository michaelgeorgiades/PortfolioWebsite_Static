import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/resume", label: "Resume" },
  { path: "/photography", label: "Photography" },
  { path: "/games", label: "Games" },
  { path: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  const handleNavClick = (path: string) => {
    setLocation(path);
    setIsMenuOpen(false);
  };

  // No scroll detection needed for page-based navigation

  return (
    <>
      {/* Enhanced Moving Dots Background Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0'
      }}>
        {/* Horizontal dots - random timing and positions */}
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#B87333',
          top: '12%', 
          animationDelay: '0.3s',
          boxShadow: '0 0 3px #B87333'
        }}></div>
        <div className="absolute w-1.5 h-1.5 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#D4A574',
          top: '27%', 
          animationDelay: '2.7s',
          boxShadow: '0 0 2px #D4A574'
        }}></div>
        <div className="absolute w-2.5 h-2.5 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#B87333',
          top: '8%', 
          animationDelay: '5.1s',
          boxShadow: '0 0 4px #B87333'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#D4A574',
          top: '43%', 
          animationDelay: '1.8s',
          boxShadow: '0 0 3px #D4A574'
        }}></div>
        <div className="absolute w-1.5 h-1.5 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#B87333',
          top: '61%', 
          animationDelay: '7.2s',
          boxShadow: '0 0 2px #B87333'
        }}></div>
        <div className="absolute w-2.5 h-2.5 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#D4A574',
          top: '76%', 
          animationDelay: '0.9s',
          boxShadow: '0 0 4px #D4A574'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#B87333',
          top: '34%', 
          animationDelay: '4.3s',
          boxShadow: '0 0 3px #B87333'
        }}></div>
        <div className="absolute w-1.5 h-1.5 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#D4A574',
          top: '89%', 
          animationDelay: '6.8s',
          boxShadow: '0 0 2px #D4A574'
        }}></div>
        <div className="absolute w-2.5 h-2.5 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#B87333',
          top: '51%', 
          animationDelay: '3.4s',
          boxShadow: '0 0 4px #B87333'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#D4A574',
          top: '18%', 
          animationDelay: '8.6s',
          boxShadow: '0 0 3px #D4A574'
        }}></div>
        <div className="absolute w-1.5 h-1.5 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#B87333',
          top: '67%', 
          animationDelay: '2.1s',
          boxShadow: '0 0 2px #B87333'
        }}></div>
        <div className="absolute w-2.5 h-2.5 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#D4A574',
          top: '82%', 
          animationDelay: '5.7s',
          boxShadow: '0 0 4px #D4A574'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#B87333',
          top: '39%', 
          animationDelay: '1.2s',
          boxShadow: '0 0 3px #B87333'
        }}></div>
        <div className="absolute w-1.5 h-1.5 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#D4A574',
          top: '23%', 
          animationDelay: '7.9s',
          boxShadow: '0 0 2px #D4A574'
        }}></div>
        <div className="absolute w-2.5 h-2.5 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#B87333',
          top: '55%', 
          animationDelay: '4.8s',
          boxShadow: '0 0 4px #B87333'
        }}></div>
        
        {/* Vertical dots - random timing and positions */}
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '8%', 
          animationDelay: '1.4s',
          boxShadow: '0 0 3px #B87333'
        }}></div>
        <div className="absolute w-1.5 h-1.5 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '23%', 
          animationDelay: '6.2s',
          boxShadow: '0 0 2px #D4A574'
        }}></div>
        <div className="absolute w-2.5 h-2.5 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '37%', 
          animationDelay: '3.8s',
          boxShadow: '0 0 4px #B87333'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '52%', 
          animationDelay: '8.1s',
          boxShadow: '0 0 3px #D4A574'
        }}></div>
        <div className="absolute w-1.5 h-1.5 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '67%', 
          animationDelay: '2.6s',
          boxShadow: '0 0 2px #B87333'
        }}></div>
        <div className="absolute w-2.5 h-2.5 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '81%', 
          animationDelay: '5.3s',
          boxShadow: '0 0 4px #D4A574'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '14%', 
          animationDelay: '7.5s',
          boxShadow: '0 0 3px #B87333'
        }}></div>
        <div className="absolute w-1.5 h-1.5 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '29%', 
          animationDelay: '1.7s',
          boxShadow: '0 0 2px #D4A574'
        }}></div>
        <div className="absolute w-2.5 h-2.5 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '43%', 
          animationDelay: '4.9s',
          boxShadow: '0 0 4px #B87333'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '58%', 
          animationDelay: '6.7s',
          boxShadow: '0 0 3px #D4A574'
        }}></div>
        <div className="absolute w-1.5 h-1.5 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '73%', 
          animationDelay: '0.8s',
          boxShadow: '0 0 2px #B87333'
        }}></div>
        <div className="absolute w-2.5 h-2.5 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '87%', 
          animationDelay: '3.2s',
          boxShadow: '0 0 4px #D4A574'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '19%', 
          animationDelay: '8.4s',
          boxShadow: '0 0 3px #B87333'
        }}></div>
        <div className="absolute w-1.5 h-1.5 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '34%', 
          animationDelay: '2.3s',
          boxShadow: '0 0 2px #D4A574'
        }}></div>
        <div className="absolute w-2.5 h-2.5 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '48%', 
          animationDelay: '5.8s',
          boxShadow: '0 0 4px #B87333'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '63%', 
          animationDelay: '1.1s',
          boxShadow: '0 0 3px #D4A574'
        }}></div>
        <div className="absolute w-1.5 h-1.5 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '78%', 
          animationDelay: '7.3s',
          boxShadow: '0 0 2px #B87333'
        }}></div>
        <div className="absolute w-2.5 h-2.5 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '92%', 
          animationDelay: '4.1s',
          boxShadow: '0 0 4px #D4A574'
        }}></div>
      </div>

      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-xl font-bold text-copper">MG</span>
              <span className="ml-2 text-sm text-gray-300">Systems Engineer</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={cn(
                    "nav-link text-gray-300 hover:text-copper transition-colors duration-300",
                    location === item.path && "text-copper"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-copper"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={cn("fas text-xl", isMenuOpen ? "fa-times" : "fa-bars")}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden border-t border-copper-dark transition-all duration-300",
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )} style={{backgroundColor: 'hsl(0, 0%, 10%)'}}>
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={cn(
                  "block w-full text-left py-2 text-gray-300 hover:text-copper transition-colors",
                  location === item.path && "text-copper"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
