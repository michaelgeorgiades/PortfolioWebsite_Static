import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import aviImage from "@assets/avi_1750702570483.jpg";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen text-gray-100" style={{backgroundColor: 'hsl(0, 0%, 6%)'}}>
      <Navigation />

      {/* Home Section */}
      <section className="min-h-screen flex items-center justify-center relative circuit-bg pt-20">
        <div className="max-w-4xl mx-auto px-4 text-center z-10">
          <div className="mb-8">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-copper to-copper-light p-1 mb-6">
              <div className="w-full h-full rounded-full overflow-hidden" style={{backgroundColor: 'hsl(0, 0%, 10%)'}}>
                <img 
                  src={aviImage}
                  loading="lazy" 
                  alt="Michael Georgiades - IT Systems Engineer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-full flex items-center justify-center"><i class="fas fa-user text-4xl text-copper"></i></div>';
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Michael</span>{" "}
            <span className="text-copper">Georgiades</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
            Senior IT Systems Engineer
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            16+ years of experience delivering high-availability support and robust infrastructure 
            solutions across Windows, Linux, and Cloud platforms. Passionate about automation, 
            DevOps, and cutting-edge technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => setLocation('/resume')}
              className="copper-gradient text-white px-8 py-3 hover:shadow-lg hover:shadow-copper/25 transition-all duration-300 transform hover:scale-105"
            >
              View Resume
            </Button>
            <Button 
              variant="outline"
              onClick={() => setLocation('/contact')}
              className="border-2 border-copper text-copper px-8 py-3 hover:bg-copper hover:text-white transition-all duration-300"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-20" style={{backgroundColor: 'hsl(0, 0%, 10%)'}}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-copper">Explore</span> My Work
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              className="glass-effect p-6 rounded-lg cursor-pointer hover:border-copper/50 transition-all duration-300 group"
              onClick={() => setLocation('/resume')}
            >
              <div className="text-center">
                <i className="fas fa-file-alt text-3xl text-copper mb-4 group-hover:scale-110 transition-transform"></i>
                <h3 className="text-lg font-semibold text-white mb-2">Resume</h3>
                <p className="text-gray-400 text-sm">Professional experience and skills</p>
              </div>
            </div>

            <div 
              className="glass-effect p-6 rounded-lg cursor-pointer hover:border-copper/50 transition-all duration-300 group"
              onClick={() => setLocation('/photography')}
            >
              <div className="text-center">
                <i className="fas fa-camera text-3xl text-copper mb-4 group-hover:scale-110 transition-transform"></i>
                <h3 className="text-lg font-semibold text-white mb-2">Photography</h3>
                <p className="text-gray-400 text-sm">Visual storytelling and prints</p>
              </div>
            </div>

            <div 
              className="glass-effect p-6 rounded-lg cursor-pointer hover:border-copper/50 transition-all duration-300 group"
              onClick={() => setLocation('/games')}
            >
              <div className="text-center">
                <i className="fas fa-gamepad text-3xl text-copper mb-4 group-hover:scale-110 transition-transform"></i>
                <h3 className="text-lg font-semibold text-white mb-2">Games</h3>
                <p className="text-gray-400 text-sm">Interactive browser games</p>
              </div>
            </div>

            <div 
              className="glass-effect p-6 rounded-lg cursor-pointer hover:border-copper/50 transition-all duration-300 group"
              onClick={() => setLocation('/contact')}
            >
              <div className="text-center">
                <i className="fas fa-envelope text-3xl text-copper mb-4 group-hover:scale-110 transition-transform"></i>
                <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
                <p className="text-gray-400 text-sm">Get in touch with me</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}