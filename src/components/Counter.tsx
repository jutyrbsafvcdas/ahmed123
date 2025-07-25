import { useState, useEffect } from 'react';

interface CounterProps {
  target: number;
  duration?: number;
  delay?: number;
}

const Counter = ({ target, duration = 3000, delay = 500 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      
      const startTime = Date.now();
      const startValue = 0;
      
      const animate = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth easing function for natural counting
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOutCubic);
        
        setCount(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(target);
          setIsAnimating(false);
        }
      };
      
      animate();
    }, delay);

    return () => clearTimeout(timer);
  }, [target, duration, delay]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Main Counter */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-glow opacity-30 blur-3xl rounded-full"></div>
        <div className={`
          text-8xl md:text-9xl lg:text-[12rem] font-black 
          bg-gradient-primary bg-clip-text text-transparent 
          animate-counter-glow transition-all duration-300 ease-counter
          ${isAnimating ? 'scale-105' : 'scale-100'}
        `}>
          {count.toLocaleString()}
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="w-64 md:w-80 h-1 bg-secondary rounded-full overflow-hidden animate-pulse-glow">
        <div 
          className="h-full bg-gradient-primary transition-all duration-300 ease-counter rounded-full"
          style={{ width: `${(count / target) * 100}%` }}
        ></div>
      </div>
      
      {/* Labels */}
      <div className="text-center space-y-4 animate-fade-in-up">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Counting to {target.toLocaleString()}
        </h1>
        <p className="text-muted-foreground text-lg">
          {count === target ? '🎉 Complete!' : isAnimating ? 'Counting...' : 'Ready to count'}
        </p>
      </div>
    </div>
  );
};

export default Counter;