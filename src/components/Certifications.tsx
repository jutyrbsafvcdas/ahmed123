import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle } from "lucide-react";

const Certifications = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const certifications = [
    {
      title: "Full Stack Web Development",
      provider: "Coursera",
      issuer: "University of Michigan",
      date: "December 2023",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      verified: true,
      credentialUrl: "#"
    },
    {
      title: "AWS Cloud Practitioner",
      provider: "AWS",
      issuer: "Amazon Web Services",
      date: "October 2023",
      skills: ["Cloud Computing", "AWS Services", "Security"],
      verified: true,
      credentialUrl: "#"
    },
    {
      title: "Advanced JavaScript Concepts",
      provider: "Udemy",
      issuer: "Andrei Neagoie",
      date: "September 2023",
      skills: ["JavaScript", "Async/Await", "Closures", "Prototypes"],
      verified: true,
      credentialUrl: "#"
    },
    {
      title: "UI/UX Design Fundamentals",
      provider: "Coursera",
      issuer: "California Institute of the Arts",
      date: "August 2023",
      skills: ["Figma", "Design Thinking", "Prototyping", "User Research"],
      verified: true,
      credentialUrl: "#"
    },
    {
      title: "Docker & Kubernetes",
      provider: "Udemy",
      issuer: "Maximilian Schwarzmüller",
      date: "July 2023",
      skills: ["Docker", "Kubernetes", "DevOps", "Containerization"],
      verified: true,
      credentialUrl: "#"
    },
    {
      title: "Data Structures and Algorithms",
      provider: "edX",
      issuer: "MIT",
      date: "June 2023",
      skills: ["Data Structures", "Algorithms", "Problem Solving", "Python"],
      verified: true,
      credentialUrl: "#"
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
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
    <section ref={sectionRef} id="certifications" className="py-24 bg-gradient-to-br from-card/30 via-card/20 to-background/95 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl sm:text-4xl font-bold text-foreground mb-4 transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            Certifications
          </h2>
          <p 
            className={`text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            Professional certifications and courses that showcase my commitment to continuous learning and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <Card 
              key={index} 
              className={`group hover:shadow-elegant transition-all duration-500 hover:scale-105 
                       border-2 hover:border-accent/30 border-border/50 bg-card backdrop-blur-sm
                       ${!hasAnimated ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
              style={{ transitionDelay: `${index * 100 + 350}ms` }}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg leading-tight group-hover:text-accent transition-colors duration-300">
                      {cert.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-primary">{cert.provider}</span>
                        {cert.verified && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <div className="text-primary">{cert.issuer}</div>
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{cert.date}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary"
                      className="text-xs bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 transition-colors duration-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div 
          className={`text-center mt-12 transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
          style={{ transitionDelay: '350ms' }}
        >
          <p className="text-muted-foreground">
            Always expanding my knowledge through continuous learning and professional development.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certifications;