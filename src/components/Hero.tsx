import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowDown, Instagram, Code, Zap, SpaceIcon, LucideDice6 } from "lucide-react";
import XLogo from "@/components/ui/x-logo";
import { useState, useEffect, useRef } from "react";

// Keyframes for the bounce animation remain the same
const bounceKeyframes = `
  @keyframes final-bounce {
    0%, 100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
`;

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);
  const texts = ["Full Stack Developer", "Problem Solver", "Code Artist"];
  const technologies = ["React", "TypeScript", "Node.js", "Python", "AWS", "MongoDB", "GraphQL", "Docker"];
  const midpoint = Math.floor(technologies.length / 2);

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasAnimatedIn(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasAnimatedIn) return; // Don't start text animation until section is visible
    const textSwapInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % texts.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => {
      clearInterval(textSwapInterval);
    };
  }, [hasAnimatedIn, texts.length]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const nameBaseClasses = "transition-all duration-1000 ease-out bg-clip-text text-transparent";

  return (
    <>
      <style>{bounceKeyframes}</style>
      <section ref={sectionRef} id="home" className="min-h-screen flex items-center justify-center bg-hero-gradient text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* UPDATED: Icons now fade in when the section is visible */}
          <div 
            className={`absolute top-[175px] sm:top-[127px] right-8 sm:right-20 animate-bounce transition-opacity duration-1000 ${!hasAnimatedIn ? 'opacity-0' : 'opacity-15'}`} 
            style={{ animationDelay: '1s', transitionDelay: '500ms' }}
          >
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-white hover:scale-125 transition-transform duration-300" />
          </div>
          <div 
            className={`absolute bottom-[175px] sm:bottom-[207px] right-[26px] sm:right-[50px] animate-bounce transition-opacity duration-1000 ${!hasAnimatedIn ? 'opacity-0' : 'opacity-20'}`} 
            style={{ animationDelay: '0.5s', transitionDelay: '700ms' }}
          >
            <SpaceIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white hover:scale-125 transition-transform duration-300" />
          </div>
          <div 
            className={`absolute top-72 sm:top-60 left-4 sm:left-20 animate-bounce transition-opacity duration-1000 ${!hasAnimatedIn ? 'opacity-0' : 'opacity-20'}`} 
            style={{ animationDelay: '1.5s', transitionDelay: '900ms' }}
          >
            <Code className="h-4 w-4 sm:h-4 sm:w-4 text-white hover:scale-125 transition-transform duration-300" />
          </div>
          <div 
            className={`absolute bottom-[210px] sm:bottom-80 left-8 sm:left-32 animate-bounce transition-opacity duration-1000 ${!hasAnimatedIn ? 'opacity-0' : 'opacity-15'}`} 
            style={{ animationDelay: '0.8s', transitionDelay: '1100ms' }}
          >
            <LucideDice6 className="h-4 w-4 sm:h-5 sm:w-5 text-white hover:scale-125 transition-transform duration-300" />
          </div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          {/* The rest of the component remains the same, using !hasAnimatedIn for its own entry animations */}
          <div className="animate-fade-in">
            <div className="relative mb-16 mt-32 sm:mt-34">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[121px] font-bold mb-4 tracking-tight relative overflow-hidden py-2">
                <span className={`inline-block ${nameBaseClasses} ${!hasAnimatedIn ? '-translate-x-10 bg-gradient-to-r from-white/0 via-white/0 to-white/0' : 'translate-x-0 bg-gradient-to-r from-white via-white to-white/80'}`}>
                  Silence is the best key
                </span>
                <span className={`block ${nameBaseClasses} ${!hasAnimatedIn ? 'translate-x-10 bg-gradient-to-r from-white/0 via-white/0 to-primary-foreground/0' : 'translate-x-0 bg-gradient-to-r from-white/80 via-white to-primary-foreground'}`}>
                  ~ Yahya aayan azyan shayan ahmed
                </span>
              </h1>
              <div className="h-8 flex items-center justify-center relative overflow-hidden">
                <p className={`text-xl sm:text-2xl md:text-3xl font-medium text-accent transition-all duration-500 transform ${isAnimating ? 'translate-y-full opacity-0 scale-95' : 'translate-y-0 opacity-100 scale-100'}`}>
                  {texts[currentText]}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className={`text-base sm:text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto leading-relaxed mb-6 px-4 transition-all duration-700 ease-out ${!hasAnimatedIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`} style={{ transitionDelay: '200ms' }}>
                Crafting digital experiences with modern technologies
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto px-4">
                {technologies.map((tech, index) => {
                  const initialTransform = index < midpoint ? '-translate-x-4 opacity-0' : 'translate-x-4 opacity-0';
                  return (
                    <span 
                      key={tech}
                      className={`px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium
                                hover:bg-accent/20 hover:text-accent transition-all duration-500 ease-out hover:scale-105 hover:rotate-2
                                border border-accent/30 backdrop-blur-sm
                                ${!hasAnimatedIn ? initialTransform : 'translate-x-0 translate-y-0 opacity-100'}`}
                      style={{ transitionDelay: `${index * 50 + 400}ms` }}
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="relative mb-12">
              <p className={`text-base sm:text-lg mb-8 text-foreground/85 max-w-3xl mx-auto leading-relaxed px-4 transition-all duration-700 ease-out ${!hasAnimatedIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`} style={{ transitionDelay: '800ms' }}>
                Transforming ideas into elegant, scalable solutions. I specialize in building full-stack applications that don't just work, they inspire and delight users.
              </p>
              
              <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center px-4 transition-all duration-700 ease-out ${!hasAnimatedIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`} style={{ transitionDelay: '900ms' }}>
                <Button 
                  size="default" 
                  onClick={scrollToProjects}
                  className="group transition-all duration-300 hover:scale-105 relative bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-[0_0_15px_rgba(178,148,246,0.3)] px-6"
                >
                  Explore My Work
                  <ArrowDown className="ml-2 h-3 w-3 group-hover:translate-y-1 transition-transform" />
                </Button>
                
                <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
                  {[
                     { icon: Github, label: "GitHub", href: "https://github.com" },
                     { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
                     { icon: null, label: "X", href: "https://x.com", customIcon: XLogo },
                     { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                     { icon: Mail, label: "Email", href: "mailto:ahmed@example.com" },
                  ].map((social) => (
                    <Button 
                      key={social.label}
                      variant="outline" 
                      size="icon" 
                      className="bg-accent/10 border-accent/30 hover:border-accent/50 hover:scale-125 transition-all duration-300 group relative overflow-hidden backdrop-blur-sm hover:shadow-lg hover:bg-accent/20 text-foreground hover:text-accent"
                      asChild
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer" title={social.label}>
                        {social.customIcon ? <social.customIcon className="h-4 w-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 relative z-10" /> : <social.icon className="h-4 w-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 relative z-10" />}
                        <span className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent scale-0 group-hover:scale-100 transition-transform duration-300 rounded-md" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <div 
              className={`flex flex-col items-center gap-1 sm:gap-2 mt-2 mb-8 transition-opacity duration-500 ${!hasAnimatedIn ? 'opacity-0' : 'opacity-100'}`} 
              style={{
                animation: hasAnimatedIn ? 'final-bounce 1s infinite' : 'none',
                transitionDelay: '1300ms'
              }}
            >
              <span className="text-xs sm:text-sm text-foreground/70 font-medium whitespace-nowrap">Scroll to explore</span>
              <ArrowDown className="h-3 w-3 sm:h-5 sm:w-5 text-foreground/70" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;