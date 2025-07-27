import { Button } from "@/components/ui/button";
import { Menu, X, Home, User, Code, Award, Layers, Mail } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hideTimer, setHideTimer] = useState<NodeJS.Timeout | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Clear inline styles when active section changes
  useEffect(() => {
    const navButtons = document.querySelectorAll('nav button span');
    navButtons.forEach(span => {
      if (span instanceof HTMLElement) {
        span.style.width = '';
        span.style.opacity = '';
      }
    });
  }, [activeSection]);

  const resetHideTimer = useCallback(() => {
    if (hideTimer) {
      clearTimeout(hideTimer);
    }
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    setHideTimer(timer);
  }, [hideTimer]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleInteraction = () => {
      if (timeoutId) clearTimeout(timeoutId);
      setIsVisible(true);
      
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 2500);
    };

    // --- UPDATED SCROLL HANDLER WITH 60% THRESHOLD ---
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollThreshold = 100;
      const progress = Math.min(scrollY / scrollThreshold, 1);
      
      setIsScrolled(scrollY > 50);
      setScrollProgress(progress);
      
      const sections = ['home', 'about', 'skills', 'certifications', 'projects', 'contact'];
      let newActiveSection = 'home'; // Default value

      // Iterate from the last section to the first to find the current one
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);

        if (element) {
          const rect = element.getBoundingClientRect();
          
          // Check if the top of the section is at or above the 40% mark of the viewport.
          // This means the section is covering at least the bottom 60% of the screen.
          if (rect.top <= window.innerHeight * 0.4) { 
            newActiveSection = sectionId;
            break; // Found the correct section, so we exit the loop
          }
        }
      }
      
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    const events = ['mousemove', 'keydown', 'click', 'touchstart'];
    events.forEach(event => document.addEventListener(event, handleInteraction, { passive: true }));
    
    document.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleInteraction, { passive: true });

    handleInteraction();
    handleScroll();

    return () => {
      events.forEach(event => document.removeEventListener(event, handleInteraction));
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleInteraction);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeSection, resetHideTimer]);

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const headerHeight = 80;
        const offset = 0;
        const elementPosition = element.offsetTop - headerHeight - offset;
        window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
    resetHideTimer();
  };

  const navItems = [
    { label: "Home", id: "home", icon: Home },
    { label: "About", id: "about", icon: User },
    { label: "Skills", id: "skills", icon: Code },
    { label: "Certifications", id: "certifications", icon: Award },
    { label: "Projects", id: "projects", icon: Layers },
    { label: "Contact", id: "contact", icon: Mail },
  ];

  const topPosition = scrollProgress * 16;
  const sideMargin = scrollProgress * 16;
  const maxSideMargin = window.innerWidth * 0.09;
  const finalSideMargin = Math.min(sideMargin, maxSideMargin);
  const borderRadius = scrollProgress * 16;

  return (
    <header 
      className={`z-50 fixed transform-gpu transition-all duration-700 ease-out ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : isScrolled 
            ? '-translate-y-full opacity-0 scale-95 pointer-events-none'
            : activeSection !== 'home'
              ? '-translate-y-full opacity-0 pointer-events-none'
              : 'translate-y-0 opacity-100 scale-100'
      }`}
      style={{
        top: `${topPosition}px`,
        left: `${finalSideMargin}px`,
        right: `${finalSideMargin}px`,
        willChange: 'transform, opacity, top, left, right'
      }}
    >
      <div 
        className="backdrop-blur-xl border max-w-none mx-auto animate-fade-in transition-all duration-700 ease-out px-8 py-3 group"
        style={{
          backgroundColor: `hsl(220 25% 15% / 0.95)`,
          borderColor: `hsl(220 20% 50% / ${0.6 + (scrollProgress * 0.2)})`,
          borderRadius: `${borderRadius}px`,
          boxShadow: `0 8px 24px hsl(220 25% 10% / 0.6)`,
          willChange: 'box-shadow, background-color'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 hsl(220 25% 10% / 0)';
          e.currentTarget.style.backgroundColor = 'hsl(220 25% 15% / 0.92)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 24px hsl(220 25% 10% / 0.6)';
          e.currentTarget.style.backgroundColor = 'hsl(220 25% 15% / 0.95)';
        }}
      >
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-white hover:text-accent transition-colors duration-300 cursor-pointer" 
               onClick={() => scrollToSection('home')}>
            Ahmed Rehman
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 mx-1 rounded-lg flex items-center gap-2 border-2 border-transparent transition-all duration-300 font-medium ${
                  activeSection === item.id 
                    ? 'text-accent bg-accent/20 shadow-md border-accent/30 hover:scale-[1.08]' 
                    : 'text-foreground/80 hover:text-accent hover:scale-[1.08] hover:bg-accent/10'
                }`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  transformOrigin: 'center',
                  minWidth: 'fit-content'
                }}
                onMouseEnter={(e) => {
                  const span = e.currentTarget.querySelector('span');
                  if (span && activeSection !== item.id) {
                    span.style.width = '75%';
                    span.style.opacity = '1';
                  }
                }}
                onMouseLeave={(e) => {
                  const span = e.currentTarget.querySelector('span');
                  if (span && activeSection !== item.id) {
                    span.style.width = '0';
                    span.style.opacity = '0';
                  }
                }}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
                <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-accent transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'w-3/4 opacity-100' 
                    : 'w-0 opacity-0'
                }`} />
              </button>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-muted/30 hover:scale-110 transition-all duration-300"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              resetHideTimer();
            }}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-border/30 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left transition-all duration-300 py-3 px-4 rounded-lg flex items-center gap-3 hover:scale-105 ${
                    activeSection === item.id 
                      ? 'text-accent bg-accent/20 border border-accent/30' 
                      : 'text-foreground/80 hover:text-accent hover:bg-accent/10 hover:border hover:border-accent/20'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;