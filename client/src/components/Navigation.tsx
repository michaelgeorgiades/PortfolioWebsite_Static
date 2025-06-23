import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/utils";

const navItems = [
  { id: "home", label: "Home" },
  { id: "resume", label: "Resume" },
  { id: "photography", label: "Photography" },
  { id: "games", label: "Games" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollY = window.scrollY;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop - 100 && scrollY < offsetTop + offsetHeight - 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Circuit Animation Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-1 h-1 bg-copper rounded-full animate-circuit-flow" style={{top: '20%', animationDelay: '0s'}}></div>
        <div className="absolute w-1 h-1 bg-copper-light rounded-full animate-circuit-flow" style={{top: '40%', animationDelay: '1s'}}></div>
        <div className="absolute w-1 h-1 bg-copper rounded-full animate-circuit-flow" style={{top: '60%', animationDelay: '2s'}}></div>
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
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "nav-link text-gray-300 hover:text-copper transition-colors duration-300",
                    activeSection === item.id && "text-copper"
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
          "md:hidden bg-dark-secondary border-t border-copper-dark transition-all duration-300",
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}>
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "block w-full text-left py-2 text-gray-300 hover:text-copper transition-colors",
                  activeSection === item.id && "text-copper"
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
