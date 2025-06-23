import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen text-gray-100" style={{backgroundColor: 'hsl(0, 0%, 6%)'}}>
      <Navigation />
      
      {/* Contact Section */}
      <section className="py-20 pt-32 circuit-bg">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-16">
            <span className="text-copper">Get In</span> Touch
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-8">Contact Information</h2>
              
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
                    className="border-copper/30 text-white focus:border-copper"
                    style={{backgroundColor: 'hsl(0, 0%, 10%)'}}
                    placeholder="Your name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    {...form.register("email")}
                    className="border-copper/30 text-white focus:border-copper"
                    style={{backgroundColor: 'hsl(0, 0%, 10%)'}}
                    placeholder="your.email@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                  <Input 
                    id="subject"
                    {...form.register("subject")}
                    className="border-copper/30 text-white focus:border-copper"
                    style={{backgroundColor: 'hsl(0, 0%, 10%)'}}
                    placeholder="What's this about?"
                  />
                  {form.formState.errors.subject && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-300">Message</Label>
                  <Textarea 
                    id="message"
                    {...form.register("message")}
                    className="border-copper/30 text-white focus:border-copper min-h-32"
                    style={{backgroundColor: 'hsl(0, 0%, 10%)'}}
                    placeholder="Tell me about your project or inquiry..."
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-400 text-sm mt-1">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <Button 
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full copper-gradient text-white hover:shadow-lg hover:shadow-copper/25 transition-all duration-300"
                >
                  {contactMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}