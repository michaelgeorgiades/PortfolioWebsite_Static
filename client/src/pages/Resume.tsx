import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Resume() {
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
      
      {/* Resume Section */}
      <section className="py-20 pt-32" style={{backgroundColor: 'hsl(0, 0%, 10%)'}}>
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-16">
            <span className="text-copper">Professional</span> Resume
          </h1>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Experience Column */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold text-copper mb-8">Work Experience</h2>
              
              <div className="space-y-8">
                {workExperience.map((job, index) => (
                  <Card key={index} className="glass-effect border-copper/20">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{job.title}</h3>
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
              <h2 className="text-2xl font-semibold text-copper mb-8">Skills & Expertise</h2>
              
              <div className="space-y-6">
                {skillCategories.map((category, index) => (
                  <Card key={index} className="glass-effect border-copper/20">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">{category.title}</h3>
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
                    <h3 className="text-lg font-semibold text-white mb-3">Certifications</h3>
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
    </div>
  );
}