import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowDown, Instagram, Code, Zap, Sparkles } from "lucide-react";
import XLogo from "@/components/ui/x-logo";
import { useState, useEffect } from "react";

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const texts = ["Full Stack Developer", "Problem Solver", "Code Artist"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % texts.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-hero-gradient text-primary-foreground relative overflow-hidden">
      {/* Enhanced animated background elements - positioned to avoid mobile overlap */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[175px] sm:top-[127px] right-8 sm:right-20 animate-bounce opacity-15" style={{animationDelay: '1s'}}>
          <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white hover:scale-125 transition-transform duration-300" />
        </div>
        <div className="absolute bottom-[175px] sm:bottom-[207px] right-[26px] sm:right-[50px] animate-bounce opacity-20" style={{animationDelay: '0.5s'}}>
          <Code className="h-5 w-5 sm:h-6 sm:w-6 text-white hover:scale-125 transition-transform duration-300" />
        </div>
        <div className="absolute top-72 sm:top-60 left-4 sm:left-20 animate-bounce opacity-20" style={{animationDelay: '1.5s'}}>
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white hover:scale-125 transition-transform duration-300" />
        </div>
        
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in">
          {/* Creative name with animated background */}
          <div className="relative mb-16 mt-32 sm:mt-34">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[121px] font-bold mb-4 tracking-tight relative">
              <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                Ahmed
              </span>
              <span className="block bg-gradient-to-r from-white/80 via-white to-primary-foreground bg-clip-text text-transparent">
                Rehman
              </span>
            </h1>
            
            {/* Smooth animated role text */}
            <div className="h-8 flex items-center justify-center relative overflow-hidden">
              <p className={`text-xl sm:text-2xl md:text-3xl font-medium text-accent
                            transition-all duration-500 transform ${
                              isAnimating 
                                ? 'translate-y-full opacity-0 scale-95' 
                                : 'translate-y-0 opacity-100 scale-100'
                            }`}>
                {texts[currentText]}
              </p>
            </div>
          </div>

          {/* Animated tech stack */}
          <div className="mb-8">
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto leading-relaxed mb-6 px-4">
              Crafting digital experiences with modern technologies
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto px-4">
              {["React", "TypeScript", "Node.js", "Python", "AWS", "MongoDB", "GraphQL", "Docker"].map((tech, index) => (
                 <span 
                   key={tech}
                   className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium
                            hover:bg-accent/20 hover:text-accent transition-all duration-300 hover:scale-105 hover:rotate-2
                            border border-accent/30 backdrop-blur-sm"
                   style={{ animationDelay: `${index * 100 + 800}ms` }}
                 >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Creative description */}
          <div className="relative mb-12">
            <p className="text-base sm:text-lg mb-8 text-foreground/85 max-w-3xl mx-auto leading-relaxed px-4">
              Transforming ideas into elegant, scalable solutions. I specialize in building 
              full-stack applications that don't just work—they inspire and delight users.
            </p>
            
            {/* Floating action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Button 
                size="default" 
                onClick={scrollToProjects}
                className="group transition-all duration-300 hover:scale-105 relative 
                         bg-accent text-accent-foreground hover:bg-accent/90
                         hover:shadow-[0_0_15px_rgba(178,148,246,0.3)] px-6"
              >
                Explore My Work
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
              
              {/* Social media with enhanced hover effects */}
              <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
                {[
                  { icon: Github, label: "GitHub", href: "https://github.com", color: "hover:bg-gray-800 hover:shadow-gray-800/50" },
                  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", color: "hover:bg-blue-600 hover:shadow-blue-600/50" },
                  { icon: null, label: "X", href: "https://x.com", color: "hover:bg-gray-800 hover:shadow-gray-800/50", customIcon: XLogo },
                  { icon: Instagram, label: "Instagram", href: "https://instagram.com", color: "hover:bg-pink-600 hover:shadow-pink-600/50" },
                  { icon: Mail, label: "Email", href: "mailto:ahmed@example.com", color: "hover:bg-red-600 hover:shadow-red-600/50" },
                ].map((social, index) => (
                  <Button 
                    key={social.label}
                    variant="outline" 
                    size="icon" 
                    className={`bg-accent/10 border-accent/30 hover:border-accent/50 hover:scale-125 
                               transition-all duration-300 group relative overflow-hidden backdrop-blur-sm
                               hover:shadow-lg hover:bg-accent/20 text-foreground hover:text-accent`}
                    style={{ animationDelay: `${index * 150}ms` }}
                    asChild
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer" title={social.label}>
                      {social.customIcon ? (
                        <social.customIcon className="h-5 w-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 relative z-10" />
                      ) : social.icon ? (
                        <social.icon className="h-5 w-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 relative z-10" />
                      ) : null}
                      <span className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent scale-0 group-hover:scale-100 
                                     transition-transform duration-300 rounded-md" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Enhanced scroll indicator - moves with content */}
          <div className="flex flex-col items-center gap-1 sm:gap-2 mt-2 mb-8 animate-bounce">
            <span className="text-xs sm:text-sm text-foreground/70 font-medium whitespace-nowrap">Scroll to explore</span>
            <ArrowDown className="h-4 w-4 sm:h-6 sm:w-6 text-foreground/70" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;