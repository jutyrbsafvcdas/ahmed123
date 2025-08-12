import { Button } from "@/components/ui/button";
import { Home, User, Code, Award, Layers, Mail } from "lucide-react";
import { useState, useEffect } from "react";

// --- NEW COMPONENT: Animated Icon for the mobile menu toggle ---
// This component replaces the separate Menu and X icons to create a smooth animation.
const AnimatedMenuIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="relative w-3 h-5">
      {/* Top line */}
      <span
        className={`absolute block h-0.5 w-full bg-current transform transition-all duration-500 ease-in-out ${isOpen ? 'rotate-45 top-[9px]' : 'top-[5px]'
          }`}
      />
      {/* Middle line */}
      <span
        className={`absolute block h-0.5 w-full bg-current transform transition-all duration-500 ease-in-out top-[9px] ${isOpen ? 'opacity-0' : 'opacity-100'
          }`}
      />
      {/* Bottom line */}
      <span
        className={`absolute block h-0.5 w-full bg-current transform transition-all duration-500 ease-in-out ${isOpen ? '-rotate-45 top-[9px]' : 'top-[13px]'
          }`}
      />
    </div>
  );
};

// Header component with symmetrical, smoother animation.
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
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
        // Only hide the header if the menu is closed AND the user has scrolled down.
        if (!isMenuOpen && window.scrollY > 50) {
          setIsVisible(false);
        }
      }, 2500);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrolled = scrollY > 50;
      setIsScrolled(scrolled);
      setScrollProgress(Math.min(scrollY / 100, 1));

      // If the user scrolls back to the top, ensure the header is visible.
      if (scrollY <= 50) {
        setIsVisible(true);
      }

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

    const events = ['mousemove', 'keydown', 'click', 'touchstart', 'scroll'];
    events.forEach(event => document.addEventListener(event, handleInteraction, { passive: true }));
    document.addEventListener('scroll', handleScroll, { passive: true });

    handleInteraction();
    handleScroll();

    return () => {
      events.forEach(event => document.removeEventListener(event, handleInteraction));
      document.removeEventListener('scroll', handleScroll);
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
        className="md:hidden fixed inset-0 z-20 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out data-[state=closed]:opacity-0 data-[state=open]:opacity-100 data-[state=closed]:pointer-events-none"
        onClick={() => setIsMenuOpen(false)}
      />

      <header
        className={`z-30 fixed transform-gpu transition-all duration-700 ease-in-out ${isVisible || isMenuOpen
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
            overflow-hidden group
            transition-all duration-1000 ease-in-out
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
          <div className="flex items-center justify-between px-4 sm:px-8 h-[58px]">
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
                  className={`relative bottom-px px-4 h-10 mx-1 rounded-lg flex items-center gap-2 border-2 border-transparent transition-all duration-300 font-medium 
                    after:content-[''] after:absolute after:left-4 after:right-4 after:bottom-[-2px] after:h-[1px] after:bg-accent after:origin-center after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out 
                    ${activeSection === item.id
                      ? 'text-accent bg-accent/20 border-accent/30 hover:scale-[1.08] after:scale-x-100'
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
              className="md:hidden text-white transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatedMenuIcon isOpen={isMenuOpen} />
            </Button>
          </div>

          {/* --- THIS IS THE EXPANDABLE MOBILE NAVIGATION AREA --- */}
          <div className={`
            md:hidden
            transition-all duration-1000 ease-in-out
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
          `}>
            <div className="h-px bg-border/30 mx-4 my-2" />
            <nav className="grid grid-cols-3 gap-3 p-4 pt-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all duration-200 ${activeSection === item.id
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