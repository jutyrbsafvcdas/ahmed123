import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, Calendar, Code } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  // ... (project data remains the same)
  {
    title: "Analytics Dashboard",
    description: "A comprehensive analytics platform that helps businesses track KPIs and make data-driven decisions. Built with React, TypeScript, and D3.js for dynamic visualizations.",
    image: project1,
    tech: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL"],
    languages: ["TypeScript", "JavaScript"],
    date: "2024-01-15",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "E-Commerce Mobile App",
    description: "Full-featured shopping application with real-time inventory, secure payments, and personalized recommendations. Optimized for mobile-first user experience.",
    image: project2,
    tech: ["React Native", "Redux", "Firebase", "Stripe API"],
    languages: ["JavaScript", "Java"],
    date: "2024-03-20",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Project Management Tool",
    description: "Collaborative project management platform with kanban boards, real-time updates, and team communication features. Designed for remote teams.",
    image: project3,
    tech: ["Next.js", "Prisma", "Socket.io", "Tailwind CSS"],
    languages: ["TypeScript", "JavaScript"],
    date: "2024-02-10",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Machine Learning Pipeline",
    description: "Automated ML pipeline for data processing, model training, and deployment. Includes real-time predictions and model monitoring dashboard.",
    image: project1,
    tech: ["Python", "TensorFlow", "Docker", "AWS", "FastAPI"],
    languages: ["Python"],
    date: "2024-04-05",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Blockchain Voting System",
    description: "Secure and transparent voting platform built on Ethereum. Features smart contracts, voter verification, and real-time result tracking.",
    image: project2,
    tech: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
    languages: ["JavaScript", "Solidity"],
    date: "2023-12-12",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Enterprise API Gateway",
    description: "High-performance API gateway with rate limiting, authentication, and analytics. Handles millions of requests with sub-millisecond latency.",
    image: project3,
    tech: ["Java", "Spring Boot", "Redis", "Kubernetes", "GraphQL"],
    languages: ["Java"],
    date: "2024-01-28",
    liveUrl: "#",
    githubUrl: "#"
  }
];

const Projects = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const languages = ["all", "JavaScript", "TypeScript", "Python", "Java", "Solidity"];
  
  const filteredProjects = selectedLanguage === "all" 
    ? projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : projects
        .filter(project => project.languages.includes(selectedLanguage))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 } // Start animation when 10% of the section is visible
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            Featured Projects
          </h2>
          <p 
            className={`text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 px-4 transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
            style={{ transitionDelay: '300ms' }}
          >
            Explore my work filtered by programming language or view all projects sorted by date
          </p>
          
          <div 
            className={`transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 px-4">
              {languages.map((language) => (
                <Button
                  key={language}
                  variant={selectedLanguage === language ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLanguage(language)}
                  className={`transition-all duration-300 hover:scale-105 ${
                    selectedLanguage === language 
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                      : 'border-accent/30 text-foreground hover:bg-accent/10 hover:text-accent hover:border-accent/50'
                  }`}
                >
                  {language === "all" ? <><Filter className="h-4 w-4 mr-2" />All Projects</> : <><Code className="h-4 w-4 mr-2" />{language}</>}
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
              {selectedLanguage !== "all" && ` for ${selectedLanguage}`}
            </p>
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={`${project.title}-${index}`}
              className={`group hover:shadow-elegant transition-all duration-500 hover:scale-105
                       border-2 hover:border-accent/30 bg-card border-border/50
                       ${!hasAnimated ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img src={project.image} alt={project.title} className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(project.date)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl mb-3 text-card-foreground group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs text-accent border-accent/30">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div 
            className={`text-center py-12 transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <p className="text-muted-foreground text-lg">
              No projects found for {selectedLanguage}. Try selecting a different language filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;