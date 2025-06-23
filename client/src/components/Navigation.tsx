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
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Horizontal dots - more frequent and varied */}
        <div className="absolute w-3 h-3 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#B87333',
          top: '10%', 
          animationDelay: '0s',
          boxShadow: '0 0 6px #B87333'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#D4A574',
          top: '15%', 
          animationDelay: '1s',
          boxShadow: '0 0 4px #D4A574'
        }}></div>
        <div className="absolute w-4 h-4 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#B87333',
          top: '20%', 
          animationDelay: '2s',
          boxShadow: '0 0 8px #B87333'
        }}></div>
        <div className="absolute w-3 h-3 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#D4A574',
          top: '25%', 
          animationDelay: '3s',
          boxShadow: '0 0 6px #D4A574'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#B87333',
          top: '30%', 
          animationDelay: '4s',
          boxShadow: '0 0 4px #B87333'
        }}></div>
        <div className="absolute w-4 h-4 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#D4A574',
          top: '35%', 
          animationDelay: '5s',
          boxShadow: '0 0 8px #D4A574'
        }}></div>
        <div className="absolute w-3 h-3 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#B87333',
          top: '40%', 
          animationDelay: '6s',
          boxShadow: '0 0 6px #B87333'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#D4A574',
          top: '45%', 
          animationDelay: '7s',
          boxShadow: '0 0 4px #D4A574'
        }}></div>
        <div className="absolute w-4 h-4 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#B87333',
          top: '50%', 
          animationDelay: '8s',
          boxShadow: '0 0 8px #B87333'
        }}></div>
        <div className="absolute w-3 h-3 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#D4A574',
          top: '55%', 
          animationDelay: '9s',
          boxShadow: '0 0 6px #D4A574'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#B87333',
          top: '60%', 
          animationDelay: '10s',
          boxShadow: '0 0 4px #B87333'
        }}></div>
        <div className="absolute w-4 h-4 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#D4A574',
          top: '65%', 
          animationDelay: '11s',
          boxShadow: '0 0 8px #D4A574'
        }}></div>
        <div className="absolute w-3 h-3 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#B87333',
          top: '70%', 
          animationDelay: '0.5s',
          boxShadow: '0 0 6px #B87333'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#D4A574',
          top: '75%', 
          animationDelay: '1.5s',
          boxShadow: '0 0 4px #D4A574'
        }}></div>
        <div className="absolute w-4 h-4 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#B87333',
          top: '80%', 
          animationDelay: '2.5s',
          boxShadow: '0 0 8px #B87333'
        }}></div>
        <div className="absolute w-3 h-3 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#D4A574',
          top: '85%', 
          animationDelay: '3.5s',
          boxShadow: '0 0 6px #D4A574'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow" style={{
          backgroundColor: '#B87333',
          top: '90%', 
          animationDelay: '4.5s',
          boxShadow: '0 0 4px #B87333'
        }}></div>
        
        {/* Vertical dots - more frequent and varied */}
        <div className="absolute w-3 h-3 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '5%', 
          animationDelay: '0s',
          boxShadow: '0 0 6px #B87333'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '10%', 
          animationDelay: '1s',
          boxShadow: '0 0 4px #D4A574'
        }}></div>
        <div className="absolute w-4 h-4 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '15%', 
          animationDelay: '2s',
          boxShadow: '0 0 8px #B87333'
        }}></div>
        <div className="absolute w-3 h-3 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '20%', 
          animationDelay: '3s',
          boxShadow: '0 0 6px #D4A574'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '25%', 
          animationDelay: '4s',
          boxShadow: '0 0 4px #B87333'
        }}></div>
        <div className="absolute w-4 h-4 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '30%', 
          animationDelay: '5s',
          boxShadow: '0 0 8px #D4A574'
        }}></div>
        <div className="absolute w-3 h-3 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '35%', 
          animationDelay: '6s',
          boxShadow: '0 0 6px #B87333'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '40%', 
          animationDelay: '7s',
          boxShadow: '0 0 4px #D4A574'
        }}></div>
        <div className="absolute w-4 h-4 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '45%', 
          animationDelay: '8s',
          boxShadow: '0 0 8px #B87333'
        }}></div>
        <div className="absolute w-3 h-3 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '50%', 
          animationDelay: '9s',
          boxShadow: '0 0 6px #D4A574'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '55%', 
          animationDelay: '10s',
          boxShadow: '0 0 4px #B87333'
        }}></div>
        <div className="absolute w-4 h-4 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '60%', 
          animationDelay: '11s',
          boxShadow: '0 0 8px #D4A574'
        }}></div>
        <div className="absolute w-3 h-3 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '65%', 
          animationDelay: '0.5s',
          boxShadow: '0 0 6px #B87333'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '70%', 
          animationDelay: '1.5s',
          boxShadow: '0 0 4px #D4A574'
        }}></div>
        <div className="absolute w-4 h-4 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '75%', 
          animationDelay: '2.5s',
          boxShadow: '0 0 8px #B87333'
        }}></div>
        <div className="absolute w-3 h-3 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '80%', 
          animationDelay: '3.5s',
          boxShadow: '0 0 6px #D4A574'
        }}></div>
        <div className="absolute w-2 h-2 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '85%', 
          animationDelay: '4.5s',
          boxShadow: '0 0 4px #B87333'
        }}></div>
        <div className="absolute w-4 h-4 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#D4A574',
          left: '90%', 
          animationDelay: '5.5s',
          boxShadow: '0 0 8px #D4A574'
        }}></div>
        <div className="absolute w-3 h-3 rounded-full animate-circuit-flow-vertical" style={{
          backgroundColor: '#B87333',
          left: '95%', 
          animationDelay: '6.5s',
          boxShadow: '0 0 6px #B87333'
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
