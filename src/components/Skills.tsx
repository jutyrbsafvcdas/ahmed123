import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const skillCategories = {
    Frontend: [
      { name: "React", level: 95, description: "Advanced component architecture & hooks" },
      { name: "TypeScript", level: 90, description: "Type-safe application development" },
      { name: "Next.js", level: 88, description: "Full-stack React framework" },
      { name: "Tailwind CSS", level: 92, description: "Utility-first CSS framework" },
      { name: "JavaScript", level: 94, description: "ES6+ modern features" },
      { name: "HTML/CSS", level: 96, description: "Semantic markup & responsive design" },
    ],
    Backend: [
      { name: "Node.js", level: 87, description: "Server-side JavaScript runtime" },
      { name: "Express.js", level: 85, description: "Fast web application framework" },
      { name: "Python", level: 80, description: "Django & Flask frameworks" },
      { name: "PostgreSQL", level: 83, description: "Relational database management" },
      { name: "MongoDB", level: 78, description: "NoSQL document database" },
      { name: "GraphQL", level: 75, description: "API query language" },
    ],
    Tools: [
      { name: "Git", level: 92, description: "Version control & collaboration" },
      { name: "Docker", level: 80, description: "Containerization & deployment" },
      { name: "AWS", level: 75, description: "Cloud services & infrastructure" },
      { name: "Figma", level: 85, description: "UI/UX design & prototyping" },
      { name: "Jest", level: 82, description: "Testing framework" },
      { name: "Webpack", level: 78, description: "Module bundling" },
    ],
  };

  const categories = Object.keys(skillCategories);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 } // Trigger animation when 20% of the section is visible
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
    <section ref={sectionRef} id="skills" className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 
            className={`text-3xl sm:text-4xl font-bold text-foreground mb-4 transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            Skills & Expertise
          </h2>
          <p 
            className={`text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
            style={{ transitionDelay: '350ms' }}
          >
            A comprehensive overview of my technical skills and proficiency levels
          </p>
        </div>

        {/* Category Navigation */}
        <div 
          className={`flex justify-center mb-12 px-4 transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
          style={{ transitionDelay: '350ms' }}
        >
          <div className="flex flex-wrap gap-2 p-1 bg-secondary/50 rounded-lg max-w-md mx-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-300
                          ${activeCategory === category 
                            ? 'bg-accent text-accent-foreground shadow-md transform scale-105 border border-accent/30' 
                            : 'text-foreground/80 hover:text-accent hover:bg-accent/10 hover:border hover:border-accent/20'
                          }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories[activeCategory as keyof typeof skillCategories].map((skill, index) => (
            <Card 
              key={skill.name}
              className={`group hover:shadow-elegant transition-all duration-500 hover:scale-105
                       border-2 hover:border-accent/30 bg-card border-border/50 overflow-hidden
                       ${!hasAnimated ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
              style={{ transitionDelay: `${index * 100 + 350}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent 
                               transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {skill.level}%
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {skill.description}
                </p>
                
                {/* Animated Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-accent to-primary rounded-full 
                               transition-all duration-1000 ease-out"
                      style={{ 
                        width: hasAnimated ? `${skill.level}%` : '0%'
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;