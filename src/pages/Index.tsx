import Counter from '@/components/Counter';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-glow opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-glow opacity-15 blur-3xl rounded-full"></div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <Counter target={1000} duration={4000} delay={800} />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-muted-foreground text-sm animate-fade-in-up" style={{ animationDelay: '1s' }}>
          Beautiful counting animation
        </p>
      </div>
    </div>
  );
};

export default Index;
