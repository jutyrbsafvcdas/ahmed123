import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Experience = () => {
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description: "Lead development of enterprise-scale web applications serving 100k+ users. Architected microservices infrastructure and mentored junior developers.",
      technologies: ["React", "Node.js", "AWS", "PostgreSQL", "Docker"],
      achievements: [
        "Reduced application load time by 60%",
        "Led team of 5 developers",
        "Implemented CI/CD pipeline"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Innovations Inc",
      location: "Austin, TX",
      period: "2020 - 2022",
      description: "Developed responsive web applications and RESTful APIs. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      technologies: ["React", "Express.js", "MongoDB", "TypeScript"],
      achievements: [
        "Built 15+ production applications",
        "Improved code coverage to 95%",
        "Reduced bug reports by 40%"
      ]
    },
    {
      title: "Frontend Developer",
      company: "Creative Studio",
      location: "Remote",
      period: "2019 - 2020",
      description: "Specialized in creating interactive user interfaces and optimizing user experience. Worked closely with designers to implement pixel-perfect designs.",
      technologies: ["JavaScript", "CSS3", "HTML5", "Vue.js"],
      achievements: [
        "Increased user engagement by 35%",
        "Optimized performance metrics",
        "Delivered 20+ client projects"
      ]
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">Professional Experience</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            My journey through the tech industry and key achievements
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-0">
          {experiences.map((exp, index) => (
            <div key={exp.title} className="relative">
              {/* Timeline line - hidden on mobile, visible on larger screens */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-4 sm:left-8 top-20 sm:top-24 w-0.5 h-full bg-gradient-to-b from-primary to-primary/30 z-0 hidden sm:block" />
              )}
              
              {/* Timeline dot - smaller on mobile */}
              <div className="absolute left-2 sm:left-6 top-6 sm:top-8 w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full border-2 sm:border-4 border-background z-10
                            shadow-lg shadow-primary/20" />
              
              <Card className="ml-8 sm:ml-16 mb-6 sm:mb-8 group hover:shadow-elegant transition-all duration-500 
                             hover:scale-[1.01] sm:hover:scale-[1.02] border-2 hover:border-primary/20 bg-card-gradient">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary 
                                   transition-colors duration-300 mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground mb-2">
                        <span className="font-semibold text-base sm:text-lg">{exp.company}</span>
                        <div className="flex items-center gap-1 text-sm sm:text-base">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-primary font-medium text-sm sm:text-base">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                    {exp.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary"
                          className="text-xs sm:text-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Achievements */}
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">Key Achievements:</h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 sm:gap-3 text-muted-foreground">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                          <span className="text-sm sm:text-base leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;