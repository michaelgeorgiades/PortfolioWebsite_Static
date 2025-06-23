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
        <div className="absolute w-3 h-3 bg-copper rounded-full animate-circuit-flow opacity-80" style={{top: '10%', animationDelay: '0s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow opacity-60" style={{top: '15%', animationDelay: '0.8s'}}></div>
        <div className="absolute w-4 h-4 bg-copper rounded-full animate-circuit-flow opacity-40" style={{top: '20%', animationDelay: '1.6s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow opacity-90" style={{top: '25%', animationDelay: '2.4s'}}></div>
        <div className="absolute w-3 h-3 bg-copper rounded-full animate-circuit-flow opacity-50" style={{top: '30%', animationDelay: '3.2s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow opacity-70" style={{top: '35%', animationDelay: '4s'}}></div>
        <div className="absolute w-4 h-4 bg-copper rounded-full animate-circuit-flow opacity-60" style={{top: '40%', animationDelay: '4.8s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow opacity-80" style={{top: '45%', animationDelay: '5.6s'}}></div>
        <div className="absolute w-3 h-3 bg-copper rounded-full animate-circuit-flow opacity-45" style={{top: '50%', animationDelay: '6.4s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow opacity-75" style={{top: '55%', animationDelay: '7.2s'}}></div>
        <div className="absolute w-4 h-4 bg-copper rounded-full animate-circuit-flow opacity-55" style={{top: '60%', animationDelay: '8s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow opacity-85" style={{top: '65%', animationDelay: '8.8s'}}></div>
        <div className="absolute w-3 h-3 bg-copper rounded-full animate-circuit-flow opacity-65" style={{top: '70%', animationDelay: '9.6s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow opacity-50" style={{top: '75%', animationDelay: '10.4s'}}></div>
        <div className="absolute w-4 h-4 bg-copper rounded-full animate-circuit-flow opacity-70" style={{top: '80%', animationDelay: '11.2s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow opacity-80" style={{top: '85%', animationDelay: '12s'}}></div>
        <div className="absolute w-3 h-3 bg-copper rounded-full animate-circuit-flow opacity-60" style={{top: '90%', animationDelay: '12.8s'}}></div>
        
        {/* Vertical dots - more frequent and varied */}
        <div className="absolute w-3 h-3 bg-copper rounded-full animate-circuit-flow-vertical opacity-70" style={{left: '5%', animationDelay: '0.3s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow-vertical opacity-80" style={{left: '10%', animationDelay: '1.1s'}}></div>
        <div className="absolute w-4 h-4 bg-copper rounded-full animate-circuit-flow-vertical opacity-50" style={{left: '15%', animationDelay: '1.9s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow-vertical opacity-90" style={{left: '20%', animationDelay: '2.7s'}}></div>
        <div className="absolute w-3 h-3 bg-copper rounded-full animate-circuit-flow-vertical opacity-40" style={{left: '25%', animationDelay: '3.5s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow-vertical opacity-75" style={{left: '30%', animationDelay: '4.3s'}}></div>
        <div className="absolute w-4 h-4 bg-copper rounded-full animate-circuit-flow-vertical opacity-65" style={{left: '35%', animationDelay: '5.1s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow-vertical opacity-55" style={{left: '40%', animationDelay: '5.9s'}}></div>
        <div className="absolute w-3 h-3 bg-copper rounded-full animate-circuit-flow-vertical opacity-85" style={{left: '45%', animationDelay: '6.7s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow-vertical opacity-60" style={{left: '50%', animationDelay: '7.5s'}}></div>
        <div className="absolute w-4 h-4 bg-copper rounded-full animate-circuit-flow-vertical opacity-70" style={{left: '55%', animationDelay: '8.3s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow-vertical opacity-45" style={{left: '60%', animationDelay: '9.1s'}}></div>
        <div className="absolute w-3 h-3 bg-copper rounded-full animate-circuit-flow-vertical opacity-80" style={{left: '65%', animationDelay: '9.9s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow-vertical opacity-50" style={{left: '70%', animationDelay: '10.7s'}}></div>
        <div className="absolute w-4 h-4 bg-copper rounded-full animate-circuit-flow-vertical opacity-75" style={{left: '75%', animationDelay: '11.5s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow-vertical opacity-65" style={{left: '80%', animationDelay: '12.3s'}}></div>
        <div className="absolute w-3 h-3 bg-copper rounded-full animate-circuit-flow-vertical opacity-55" style={{left: '85%', animationDelay: '13.1s'}}></div>
        <div className="absolute w-2 h-2 bg-copper-light rounded-full animate-circuit-flow-vertical opacity-85" style={{left: '90%', animationDelay: '13.9s'}}></div>
        <div className="absolute w-4 h-4 bg-copper rounded-full animate-circuit-flow-vertical opacity-60" style={{left: '95%', animationDelay: '14.7s'}}></div>
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
