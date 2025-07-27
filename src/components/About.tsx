import { User, Award, Code, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";

// AnimatedDigit Component (no changes needed)
const AnimatedDigit = ({ value }: { value: number }) => {
  const digitRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);

  const DIGIT_HEIGHT = 40;
  const EASE_OUT_QUART = (t: number): number => 1 - Math.pow(1 - t, 4);
  const EASE_OUT_BACK_SUBTLE = (t: number): number => {
    const c1 = 0.8;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  useEffect(() => {
    if (value === currentValue || isAnimating) return;

    const targetDigits = value.toString().split("").map(Number);
    const numDigits = targetDigits.length;
    digitRefs.current = Array(numDigits).fill(null);
    setIsAnimating(true);
    
    setTimeout(() => {
      const start = performance.now();
      const duration = Math.min(3000, 600 + value * 100);

      targetDigits.forEach((targetDigit, i) => {
        const digitColumn = digitRefs.current[i];
        if (!digitColumn) return;

        digitColumn.innerHTML = ''; 

        const digitPosition = numDigits - 1 - i;
        const spins = 2 + digitPosition * 2;
        const totalElements = spins * 10;
        
        for (let j = 0; j < totalElements; j++) {
          const digitDiv = document.createElement('div');
          digitDiv.className = 'h-10 flex items-center justify-center text-foreground';
          digitDiv.textContent = String(j % 10);
          digitColumn.appendChild(digitDiv);
        }

        const finalElementIndex = (spins - 1) * 10 + targetDigit;
        const finalScrollY = finalElementIndex * DIGIT_HEIGHT;

        const animate = (time: number) => {
          const elapsed = time - start;
          const progress = Math.min(elapsed / duration, 1);
          
          const easingFunction = (digitPosition === 0) 
            ? EASE_OUT_BACK_SUBTLE 
            : EASE_OUT_QUART;
          
          const easedProgress = easingFunction(progress);

          digitColumn.style.transform = `translateY(-${easedProgress * finalScrollY}px)`;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            digitColumn.style.transform = `translateY(-${finalScrollY}px)`;
            if (i === 0) { 
              setIsAnimating(false);
              setCurrentValue(value);
            }
          }
        };

        requestAnimationFrame(animate);
      });
    }, 20);
    
  }, [value, isAnimating, currentValue]);

  if (value === 0 && !isAnimating) {
    return <div className="text-2xl sm:text-3xl font-bold text-foreground">0</div>;
  }

  const numDigits = value > 0 ? value.toString().length : 1;

  return (
    <div className="flex text-2xl sm:text-3xl font-bold">
      {Array.from({ length: numDigits }, (_, index) => (
        <div 
          key={index} 
          className="relative w-6 h-10 overflow-hidden"
        >
          <div
            ref={(el) => (digitRefs.current[index] = el)}
            className="absolute top-0 left-0 right-0 flex flex-col"
          />
        </div>
      ))}
    </div>
  );
};


const About = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { icon: Code, label: "Projects Built", value: 10, suffix: "+", color: "text-blue-500" },
    { icon: User, label: "Freelance Projects", value: 5, suffix: "+", color: "text-green-500" },
    { icon: Award, label: "Learning Journey", value: 2, suffix: "+ Years", color: "text-purple-500" },
    { icon: Zap, label: "Certifications", value: 10, suffix: "+", color: "text-orange-500" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Delay setting counts slightly to sync with the card animation
          setTimeout(() => {
            setCounts(stats.map(stat => stat.value));
          }, 400); 
        }
      },
      { threshold: 0.3 }
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
  }, [hasAnimated, stats]);

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* --- LEFT COLUMN ANIMATION --- */}
          <div className="space-y-6">
            <h2 
              className={`text-3xl sm:text-4xl font-bold text-foreground mb-6 transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'}`} 
              style={{ transitionDelay: '200ms' }}
            >
              About Me
            </h2>
            <p 
              className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'}`}
              style={{ transitionDelay: '350ms' }}
            >
              I'm a passionate full-stack developer and solutions architect who specializes in 
              cutting-edge technologies including AI/ML integration, cloud-native architectures, 
              and blockchain development. I build enterprise-grade applications that scale and perform.
            </p>
            <p 
              className={`text-lg text-muted-foreground leading-relaxed transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'}`}
              style={{ transitionDelay: '400ms' }}
            >
              My expertise spans from microservices architecture and DevOps automation to 
              advanced security implementations and performance optimization. I lead technical 
              teams and drive innovation in high-impact projects across various industries.
            </p>
            <div 
              className={`flex flex-wrap gap-3 pt-4 transition-all duration-700 ease-out ${!hasAnimated ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'}`}
              style={{ transitionDelay: '500ms' }}
            >
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
          
          {/* --- RIGHT COLUMN ANIMATION --- */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={stat.label}
                className={`group hover:shadow-elegant transition-all duration-700 ease-out hover:scale-105 
                         border-2 hover:border-accent/30 bg-card border-border/50
                         ${!hasAnimated ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}
                style={{ transitionDelay: `${index * 150 + 200}ms` }}
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-3 ${stat.color} 
                                       group-hover:scale-110 transition-transform duration-300`} />
                  <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1 
                                group-hover:text-accent transition-colors duration-300 flex items-center justify-center">
                    <AnimatedDigit value={counts[index]} />
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