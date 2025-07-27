import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} id="contact" className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            Let's Work Together
          </h2>
          <p 
            className={`text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            Ready to bring your ideas to life? I'm always interested in discussing new opportunities and exciting projects.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12">
          {/* Left Card Animation */}
          <Card 
            className={`bg-card-gradient shadow-card border-border/50 transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'}`}
            style={{ transitionDelay: '350ms' }}
          >
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground">Get In Touch</CardTitle>
              <CardDescription className="text-muted-foreground">
                Whether you have a project in mind or just want to chat about technology, I'd love to hear from you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">Email</p>
                  <a href="mailto:alex@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                    alex@example.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">Phone</p>
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                    +1 (234) 567-8900
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">Location</p>
                  <p className="text-muted-foreground">San Francisco, CA</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground text-center">
                  Available for freelance projects and full-time opportunities
                </p>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Response time: Usually within 24 hours
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Right Card Animation */}
          <Card 
            className={`bg-card-gradient shadow-card border-border/50 transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}
            style={{ transitionDelay: '350ms' }}
          >
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground">Quick Message</CardTitle>
              <CardDescription className="text-muted-foreground">
                Send me a quick message and I'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Your Message" 
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;