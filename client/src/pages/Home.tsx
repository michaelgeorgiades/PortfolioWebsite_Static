import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navigation from "@/components/Navigation";
import TetrisGame from "@/components/games/TetrisGame";
import SnakeGame from "@/components/games/SnakeGame";
import PayPalButton from "@/components/PayPalButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { formatPrice } from "@/lib/utils";
import type { Photo } from "@shared/schema";
import aviImage from "@assets/avi_1750702570483.jpg";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch photos
  const { data: photos = [], isLoading: photosLoading } = useQuery<Photo[]>({
    queryKey: ['/api/photos'],
  });

  // Contact form
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsPurchaseModalOpen(true);
  };

  const skillCategories = [
    {
      title: "Cloud & DevOps",
      skills: ["Azure", "Docker", "Kubernetes", "PowerShell"]
    },
    {
      title: "Systems",
      skills: ["Windows Server", "Linux", "VMware", "SQL Server"]
    },
    {
      title: "Monitoring",
      skills: ["Kibana", "Grafana", "Kafka", "RabbitMQ"]
    }
  ];

  const workExperience = [
    {
      title: "IT Systems Engineer L2",
      company: "Derivco",
      period: "2013 - 2025",
      responsibilities: [
        "Deployed features to production via Azure & Octopus with zero-downtime rollouts",
        "Automated routine tasks using PowerShell and Bash scripting",
        "Supported Windows Servers, Linux systems, SQL databases, RabbitMQ and Kafka",
        "Responded to Kibana/Grafana-triggered alerts via Pager Duty"
      ]
    },
    {
      title: "Desktop Engineer",
      company: "Seaboard Overseas Trading",
      period: "2010 - 2013",
      responsibilities: [
        "Delivered first-line support to 50+ end-users",
        "Managed hardware/software rollouts and updates",
        "Supported remote connectivity for international teams"
      ]
    },
    {
      title: "System Administrator",
      company: "Propdata",
      period: "2007 - 2010",
      responsibilities: [
        "Maintained company servers and backup systems",
        "Handled Active Directory, DNS/DHCP, and LAN troubleshooting"
      ]
    }
  ];

  return (
    <div className="min-h-screen text-gray-100" style={{backgroundColor: 'hsl(0, 0%, 6%)'}}>
      <Navigation />

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative circuit-bg pt-20">
        <div className="max-w-4xl mx-auto px-4 text-center z-10">
          <div className="mb-8 relative">
            {/* Circuit Board Design Around Photo */}
            <div className="relative w-64 h-64 mx-auto">
              {/* Circuit Paths */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256" fill="none">
                {/* Main circuit paths */}
                <path d="M128 20 L128 50" stroke="hsl(28, 54%, 45%)" strokeWidth="2" opacity="0.8"/>
                <path d="M128 206 L128 236" stroke="hsl(28, 54%, 45%)" strokeWidth="2" opacity="0.8"/>
                <path d="M20 128 L50 128" stroke="hsl(28, 54%, 45%)" strokeWidth="2" opacity="0.8"/>
                <path d="M206 128 L236 128" stroke="hsl(28, 54%, 45%)" strokeWidth="2" opacity="0.8"/>
                
                {/* Diagonal paths */}
                <path d="M50 50 L75 75" stroke="hsl(28, 54%, 45%)" strokeWidth="2" opacity="0.6"/>
                <path d="M206 50 L181 75" stroke="hsl(28, 54%, 45%)" strokeWidth="2" opacity="0.6"/>
                <path d="M50 206 L75 181" stroke="hsl(28, 54%, 45%)" strokeWidth="2" opacity="0.6"/>
                <path d="M206 206 L181 181" stroke="hsl(28, 54%, 45%)" strokeWidth="2" opacity="0.6"/>
                
                {/* Additional circuit lines */}
                <path d="M128 40 L150 40 L150 60" stroke="hsl(28, 54%, 45%)" strokeWidth="1.5" opacity="0.7"/>
                <path d="M128 40 L106 40 L106 60" stroke="hsl(28, 54%, 45%)" strokeWidth="1.5" opacity="0.7"/>
                <path d="M40 128 L40 106 L60 106" stroke="hsl(28, 54%, 45%)" strokeWidth="1.5" opacity="0.7"/>
                <path d="M40 128 L40 150 L60 150" stroke="hsl(28, 54%, 45%)" strokeWidth="1.5" opacity="0.7"/>
                
                {/* Circuit nodes/pins */}
                <circle cx="128" cy="20" r="4" fill="hsl(28, 54%, 45%)" opacity="0.9"/>
                <circle cx="128" cy="236" r="4" fill="hsl(28, 54%, 45%)" opacity="0.9"/>
                <circle cx="20" cy="128" r="4" fill="hsl(28, 54%, 45%)" opacity="0.9"/>
                <circle cx="236" cy="128" r="4" fill="hsl(28, 54%, 45%)" opacity="0.9"/>
                
                <circle cx="50" cy="50" r="3" fill="hsl(28, 54%, 65%)" opacity="0.8"/>
                <circle cx="206" cy="50" r="3" fill="hsl(28, 54%, 65%)" opacity="0.8"/>
                <circle cx="50" cy="206" r="3" fill="hsl(28, 54%, 65%)" opacity="0.8"/>
                <circle cx="206" cy="206" r="3" fill="hsl(28, 54%, 65%)" opacity="0.8"/>
                
                {/* Small connection points */}
                <circle cx="150" cy="40" r="2" fill="hsl(28, 54%, 45%)" opacity="0.7"/>
                <circle cx="106" cy="40" r="2" fill="hsl(28, 54%, 45%)" opacity="0.7"/>
                <circle cx="40" cy="106" r="2" fill="hsl(28, 54%, 45%)" opacity="0.7"/>
                <circle cx="40" cy="150" r="2" fill="hsl(28, 54%, 45%)" opacity="0.7"/>
                <circle cx="216" cy="106" r="2" fill="hsl(28, 54%, 45%)" opacity="0.7"/>
                <circle cx="216" cy="150" r="2" fill="hsl(28, 54%, 45%)" opacity="0.7"/>
                <circle cx="150" cy="216" r="2" fill="hsl(28, 54%, 45%)" opacity="0.7"/>
                <circle cx="106" cy="216" r="2" fill="hsl(28, 54%, 45%)" opacity="0.7"/>
                
                {/* Additional paths */}
                <path d="M216 128 L216 106 L196 106" stroke="hsl(28, 54%, 45%)" strokeWidth="1.5" opacity="0.7"/>
                <path d="M216 128 L216 150 L196 150" stroke="hsl(28, 54%, 45%)" strokeWidth="1.5" opacity="0.7"/>
                <path d="M128 216 L150 216 L150 196" stroke="hsl(28, 54%, 45%)" strokeWidth="1.5" opacity="0.7"/>
                <path d="M128 216 L106 216 L106 196" stroke="hsl(28, 54%, 45%)" strokeWidth="1.5" opacity="0.7"/>
              </svg>
              
              {/* Central Photo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-copper to-copper-light p-1">
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
              
              {/* Animated pulse effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-44 h-44 rounded-full border-2 border-copper/30 animate-pulse-copper"></div>
              </div>
              
              {/* Outer glow ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-copper/20"></div>
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
              onClick={() => document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' })}
              className="copper-gradient text-white px-8 py-3 hover:shadow-lg hover:shadow-copper/25 transition-all duration-300 transform hover:scale-105"
            >
              View Resume
            </Button>
            <Button 
              variant="outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-copper text-copper px-8 py-3 hover:bg-copper hover:text-white transition-all duration-300"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20" style={{backgroundColor: 'hsl(0, 0%, 10%)'}}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-copper">Professional</span> Resume
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Experience Column */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-semibold text-copper mb-8">Work Experience</h3>
              
              <div className="space-y-8">
                {workExperience.map((job, index) => (
                  <Card key={index} className="glass-effect border-copper/20">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-white">{job.title}</h4>
                          <p className="text-copper font-medium">{job.company}</p>
                        </div>
                        <span className="text-gray-400 text-sm mt-2 sm:mt-0">{job.period}</span>
                      </div>
                      <ul className="text-gray-300 space-y-2 text-sm">
                        {job.responsibilities.map((responsibility, idx) => (
                          <li key={idx}>• {responsibility}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Skills & Education Column */}
            <div>
              <h3 className="text-2xl font-semibold text-copper mb-8">Skills & Expertise</h3>
              
              <div className="space-y-6">
                {skillCategories.map((category, index) => (
                  <Card key={index} className="glass-effect border-copper/20">
                    <CardContent className="p-4">
                      <h4 className="text-lg font-semibold text-white mb-3">{category.title}</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, idx) => (
                          <span 
                            key={idx}
                            className="bg-copper/20 text-copper px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="glass-effect border-copper/20">
                  <CardContent className="p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">Certifications</h4>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Azure AZ-900, AZ-104</li>
                      <li>• Microsoft MCSA</li>
                      <li>• VMware vSphere Admin</li>
                      <li>• IT Engineering Diploma</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Download Resume Button */}
          <div className="text-center mt-12">
            <Button className="copper-gradient text-white px-8 py-3 hover:shadow-lg hover:shadow-copper/25 transition-all duration-300">
              <i className="fas fa-download mr-2"></i> Download Full Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Photography Section */}
      <section id="photography" className="py-20 circuit-bg">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-copper">Photography</span> Portfolio
          </h2>
          
          {photosLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-effect p-4 rounded-lg animate-pulse">
                  <div className="bg-gray-700 h-64 rounded mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="group cursor-pointer"
                  onClick={() => handlePhotoClick(photo)}
                >
                  <div className="relative overflow-hidden rounded-lg glass-effect">
                    <img 
                      src={photo.imageUrl} 
                      alt={photo.altText}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-semibold">{photo.title}</h3>
                        <p className="text-sm text-gray-200">{formatPrice(photo.price)}</p>
                      </div>
                      <Button
                        className="absolute bottom-4 right-4 bg-copper text-white hover:bg-copper-dark"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePhotoClick(photo);
                        }}
                      >
                        Buy Print
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="py-20" style={{backgroundColor: 'hsl(0, 0%, 10%)'}}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-copper">Browser</span> Games
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <TetrisGame />
            <SnakeGame />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 circuit-bg">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-copper">Get In</span> Touch
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-copper/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-envelope text-copper"></i>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">me@michaelgeorgiades.co.za</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-copper/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-phone text-copper"></i>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white">+27 79 188 1402</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-copper/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-copper"></i>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white">Durban, South Africa</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-copper/20 rounded-lg flex items-center justify-center">
                    <i className="fab fa-linkedin text-copper"></i>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">LinkedIn</p>
                    <a 
                      href="https://www.linkedin.com/in/michaelgeorgiades" 
                      className="text-copper hover:text-copper-light transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      linkedin.com/in/michaelgeorgiades
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-300">Name</Label>
                  <Input 
                    id="name"
                    {...form.register("name")}
                    className="bg-dark-secondary border-copper-dark text-white focus:border-copper"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    {...form.register("email")}
                    className="bg-dark-secondary border-copper-dark text-white focus:border-copper"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                  <Input 
                    id="subject"
                    {...form.register("subject")}
                    className="bg-dark-secondary border-copper-dark text-white focus:border-copper"
                  />
                  {form.formState.errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-300">Message</Label>
                  <Textarea 
                    id="message"
                    rows={6}
                    {...form.register("message")}
                    className="bg-dark-secondary border-copper-dark text-white focus:border-copper resize-none"
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full copper-gradient text-white hover:shadow-lg hover:shadow-copper/25 transition-all duration-300"
                >
                  {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-primary py-8 border-t border-copper-dark">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Michael Georgiades. Built with passion for technology and innovation.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://linkedin.com" className="text-gray-400 hover:text-copper transition-colors">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a href="https://github.com" className="text-gray-400 hover:text-copper transition-colors">
              <i className="fab fa-github text-xl"></i>
            </a>
            <a href="mailto:me@michaelgeorgiades.co.za" className="text-gray-400 hover:text-copper transition-colors">
              <i className="fas fa-envelope text-xl"></i>
            </a>
          </div>
        </div>
      </footer>

      {/* PayPal Purchase Modal */}
      <Dialog open={isPurchaseModalOpen} onOpenChange={setIsPurchaseModalOpen}>
        <DialogContent className="bg-dark-secondary border-copper/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-copper">Purchase Print</DialogTitle>
          </DialogHeader>
          {selectedPhoto && (
            <div className="text-center">
              <div className="mb-6">
                <img 
                  src={selectedPhoto.imageUrl} 
                  alt={selectedPhoto.altText}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-lg text-white font-medium">{selectedPhoto.title}</p>
                <p className="text-2xl text-copper font-bold">{formatPrice(selectedPhoto.price)}</p>
              </div>
              
              <div className="space-y-4">
                <PayPalButton 
                  amount={selectedPhoto.price}
                  currency="USD"
                  intent="CAPTURE"
                />
                
                <Button 
                  variant="outline"
                  onClick={() => setIsPurchaseModalOpen(false)}
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
