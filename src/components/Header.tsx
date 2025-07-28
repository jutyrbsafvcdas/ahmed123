import { Button } from "@/components/ui/button";
import { Menu, X, Home, User, Code, Award, Layers, Mail } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// Header component with integrated expanding mobile menu.
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hideTimer, setHideTimer] = useState < NodeJS.Timeout | null > (null);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Prevent body scroll when the menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Logic for showing/hiding the header on user interaction
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleInteraction = () => {
      if (timeoutId) clearTimeout(timeoutId);
      setIsVisible(true);
      timeoutId = setTimeout(() => {
        // Don't hide the header if the menu is open
        if (!isMenuOpen) setIsVisible(false);
      }, 2500);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setScrollProgress(Math.min(scrollY / 100, 1));
      
      const sections = ['home', 'about', 'skills', 'certifications', 'projects', 'contact'];
      let newActiveSection = 'home';
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          newActiveSection = sections[i]; 
          break;
        }
      }
      setActiveSection(newActiveSection);
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
  }, [isMenuOpen]); // Rerun this effect if isMenuOpen changes

  const scrollToSection = (id: string) => {
    // Close the menu on navigation
    if (isMenuOpen) setIsMenuOpen(false);
    
    setTimeout(() => {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(id);
        if (element) {
          const headerHeight = 80;
          const elementPosition = element.offsetTop - headerHeight;
          window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }
      }
    }, 150); // Small delay to allow menu to start closing
  };

  const navItems = [
    { label: "Home", id: "home", icon: Home },
    { label: "About", id: "about", icon: User },
    { label: "Skills", id: "skills", icon: Code },
    { label: "Certs", id: "certifications", icon: Award }, 
    { label: "Projects", id: "projects", icon: Layers },
    { label: "Contact", id: "contact", icon: Mail },
  ];

  const topPosition = scrollProgress * 16;
  const sideMargin = scrollProgress * 16;
  const maxSideMargin = window.innerWidth * 0.09;
  const finalSideMargin = Math.min(sideMargin, maxSideMargin);
  const borderRadius = scrollProgress * 16;

  return (
    <>
      {/* Background Overlay for when the mobile menu is open */}
      <div 
        data-state={isMenuOpen ? 'open' : 'closed'}
        className="md:hidden fixed inset-0 z-20 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out data-[state=closed]:opacity-0 data-[state=open]:opacity-100 data-[state=closed]:pointer-events-none"
        onClick={() => setIsMenuOpen(false)}
      />

      <header 
        className={`z-30 fixed transform-gpu transition-all duration-700 ease-out ${
          isVisible || isMenuOpen
            ? 'translate-y-0 opacity-100 scale-100' 
            : isScrolled 
              ? '-translate-y-full opacity-0 scale-95 pointer-events-none'
              : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{ top: `${topPosition}px`, left: `${finalSideMargin}px`, right: `${finalSideMargin}px` }}
      >
        {/* --- THIS IS THE MAIN EXPANDING CONTAINER --- */}
        <div 
          className={`
            backdrop-blur-xl border max-w-none mx-auto animate-fade-in 
            transition-all duration-500 ease-out overflow-hidden group
            ${isMenuOpen ? 'max-h-[500px]' : 'max-h-[58px]'}
          `}
          style={{
            backgroundColor: `hsl(220 25% 15% / 0.95)`,
            borderColor: `hsl(220 20% 50% / ${0.6 + (scrollProgress * 0.2)})`,
            borderRadius: `${borderRadius}px`,
            boxShadow: `0 8px 24px hsl(220 25% 10% / 0.6)`
          }}
        >
          {/* Top part of the header (always visible) */}
          <div className="flex items-center justify-between px-4 sm:px-8 py-3 h-[58px]">
            <div className="text-xl font-bold text-white hover:text-accent transition-colors duration-300 cursor-pointer" 
                 onClick={() => scrollToSection('home')}>
              Ahmed Rehman
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 mx-1 rounded-lg flex items-center gap-2 border-2 border-transparent transition-all duration-300 font-medium ${
                    activeSection === item.id 
                      ? 'text-accent bg-accent/20 shadow-md border-accent/30 hover:scale-[1.08]' 
                      : 'text-foreground/80 hover:text-accent hover:scale-[1.08] hover:bg-accent/10'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.id === 'certifications' ? 'Certifications' : item.label} 
                </button>
              ))}
            </nav>

            {/* Mobile Menu Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-muted/30 hover:scale-110 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* --- THIS IS THE EXPANDABLE MOBILE NAVIGATION AREA --- */}
          <div className={`
            md:hidden transition-all duration-500 ease-out
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
          `}>
              <div className="h-px bg-border/30 mx-4 my-2" />
              <nav className="grid grid-cols-3 gap-3 p-4 pt-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all duration-200 ${
                      activeSection === item.id 
                        ? 'text-accent bg-accent/10' 
                        : 'text-foreground/80 hover:bg-muted/50'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
          </div>

        </div>
      </header>
    </>
  );
};

export default Header;