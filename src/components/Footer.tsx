import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Instagram, Mail, Heart } from "lucide-react";
import XLogo from "@/components/ui/x-logo";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: null, label: "X", href: "https://x.com", customIcon: XLogo },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/ahmedurehman" },
    { icon: Mail, label: "Email", href: "mailto:ahmedurehman20@gmail.com" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
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
    <footer ref={sectionRef} className="bg-muted/30 border-t border-border/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center text-center md:text-left">
          {/* Logo/Name */}
          <div 
            className={`md:text-left transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Ahmed Rehman</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Full Stack Developer crafting digital experiences
            </p>
          </div>

          {/* Social Links */}
          <div 
            className={`flex justify-center transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 sm:h-10 sm:w-10 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" title={social.label}>
                    {social.customIcon ? (
                      <social.customIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : social.icon ? (
                      <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : null}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div 
            className={`text-center md:text-right order-last transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <p className="text-muted-foreground text-xs sm:text-sm">
              © {currentYear} Ahmed Rehman. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm flex items-center justify-center md:justify-end gap-1 mt-1">
              Built with <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 fill-current" /> and code
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;