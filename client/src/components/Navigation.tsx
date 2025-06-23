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
      {/* Moving Dots Background Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Horizontal dots */}
        <div className="absolute w-2 h-2 bg-copper rounded-full animate-circuit-flow opacity-60" style={{top: '15%', animationDelay: '0s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow opacity-70" style={{top: '25%', animationDelay: '1s'}}></div>
        <div className="absolute w-2 h-2 bg-copper rounded-full animate-circuit-flow opacity-50" style={{top: '35%', animationDelay: '2s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow opacity-80" style={{top: '45%', animationDelay: '3s'}}></div>
        <div className="absolute w-2 h-2 bg-copper rounded-full animate-circuit-flow opacity-60" style={{top: '55%', animationDelay: '4s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow opacity-70" style={{top: '65%', animationDelay: '5s'}}></div>
        <div className="absolute w-2 h-2 bg-copper rounded-full animate-circuit-flow opacity-50" style={{top: '75%', animationDelay: '6s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow opacity-80" style={{top: '85%', animationDelay: '7s'}}></div>
        
        {/* Vertical dots */}
        <div className="absolute w-2 h-2 bg-copper rounded-full animate-circuit-flow-vertical opacity-60" style={{left: '10%', animationDelay: '0.5s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow-vertical opacity-70" style={{left: '20%', animationDelay: '1.5s'}}></div>
        <div className="absolute w-2 h-2 bg-copper rounded-full animate-circuit-flow-vertical opacity-50" style={{left: '30%', animationDelay: '2.5s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow-vertical opacity-80" style={{left: '40%', animationDelay: '3.5s'}}></div>
        <div className="absolute w-2 h-2 bg-copper rounded-full animate-circuit-flow-vertical opacity-60" style={{left: '50%', animationDelay: '4.5s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow-vertical opacity-70" style={{left: '60%', animationDelay: '5.5s'}}></div>
        <div className="absolute w-2 h-2 bg-copper rounded-full animate-circuit-flow-vertical opacity-50" style={{left: '70%', animationDelay: '6.5s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow-vertical opacity-80" style={{left: '80%', animationDelay: '7.5s'}}></div>
        <div className="absolute w-2 h-2 bg-copper rounded-full animate-circuit-flow-vertical opacity-60" style={{left: '90%', animationDelay: '8.5s'}}></div>
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
