
import { User, Award, Code, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";

const AnimatedDigit = ({ value, duration = 3000 }: { value: number; duration?: number }) => {
  const [displayDigits, setDisplayDigits] = useState<{digit: string, animating: boolean, direction: 'up' | 'down'}[]>([]);
  
  useEffect(() => {
    if (value === 0) {
      setDisplayDigits([{digit: '0', animating: false, direction: 'up'}]);
      return;
    }

    const targetDigits = value.toString().split('');
    const numDigits = targetDigits.length;
    
    // Initialize display digits
    if (displayDigits.length === 0) {
      setDisplayDigits(targetDigits.map(d => ({digit: d, animating: false, direction: 'up'})));
      return;
    }

    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing function
      const easeInOutCubic = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      const newDisplayDigits = targetDigits.map((targetDigit, digitIndex) => {
        const targetValue = parseInt(targetDigit);
        const currentDigit = displayDigits[digitIndex]?.digit || '0';
        const currentValue = parseInt(currentDigit);
        
        if (numDigits === 1) {
          // Single digit: go through all intermediate values
          const newValue = Math.floor(easeInOutCubic * targetValue);
          const isChanging = newValue !== currentValue;
          
          return {
            digit: newValue.toString(),
            animating: isChanging,
            direction: 'up' as const
          };
        } else {
          // Multi-digit: analog clock concept
          const digitPosition = numDigits - digitIndex - 1; // 0 = rightmost, 1 = second from right, etc.
          
          if (digitPosition === 0) {
            // Rightmost digit: cycles through 0-9 multiple times
            const totalCycles = Math.floor(targetValue / Math.pow(10, digitPosition));
            const cycleProgress = (easeInOutCubic * targetValue) / Math.pow(10, digitPosition);
            const newValue = Math.floor(cycleProgress % 10);
            const isChanging = newValue !== currentValue;
            
            return {
              digit: newValue.toString(),
              animating: isChanging,
              direction: 'up' as const
            };
          } else {
            // Left digits: move proportionally slower like hour hand
            const digitWeight = Math.pow(10, digitPosition);
            const digitProgress = (easeInOutCubic * targetValue) / digitWeight;
            const newValue = Math.floor(digitProgress) % 10;
            const isChanging = newValue !== currentValue;
            
            return {
              digit: newValue.toString(),
              animating: isChanging,
              direction: 'up' as const
            };
          }
        }
      });
      
      setDisplayDigits(newDisplayDigits);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration]);
  
  return (
    <div className="flex">
      {displayDigits.map((digitData, index) => (
        <div key={index} className="relative overflow-hidden h-8 sm:h-10 w-4 sm:w-6">
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
              digitData.animating ? 'animate-digit-cylinder' : ''
            }`}
          >
            {digitData.digit}
          </div>
        </div>
      ))}
    </div>
  );
};

const About = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { icon: Code, label: "Projects Built", value: 10, suffix: "+", color: "text-blue-500" },
    { icon: User, label: "Freelance Projects", value: 5, suffix: "+", color: "text-green-500" },
    { icon: Award, label: "Learning Journey", value: 2, suffix: "+ Years", color: "text-purple-500" },
    { icon: Zap, label: "Certifications", value: 10, suffix: "+", color: "text-orange-500" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            setCounts(stats.map(stat => stat.value));
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              About Me
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate full-stack developer and solutions architect who specializes in 
              cutting-edge technologies including AI/ML integration, cloud-native architectures, 
              and blockchain development. I build enterprise-grade applications that scale and perform.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My expertise spans from microservices architecture and DevOps automation to 
              advanced security implementations and performance optimization. I lead technical 
              teams and drive innovation in high-impact projects across various industries.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {[
                "AI/ML Integration", "Cloud Architecture", "DevOps Expert", 
                "System Design", "Blockchain Development", "Microservices",
                "Performance Optimization", "Security Specialist"
              ].map((trait) => (
                 <span 
                   key={trait}
                   className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium
                            hover:bg-accent/20 hover:text-accent transition-colors duration-300"
                 >
                  {trait}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={stat.label}
                className="group hover:shadow-elegant transition-all duration-500 hover:scale-105 
                         border-2 hover:border-accent/30 bg-card border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-3 ${stat.color} 
                                       group-hover:scale-110 transition-transform duration-300`} />
                  <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1 
                                group-hover:text-accent transition-colors duration-300 flex items-center justify-center">
                    <AnimatedDigit value={hasAnimated ? counts[index] : 0} duration={2000} />
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
