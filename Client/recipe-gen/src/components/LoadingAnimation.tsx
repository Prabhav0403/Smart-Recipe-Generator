import { Flame } from "lucide-react";

export const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      {/* Cauldron Container */}
      <div className="relative">
        {/* Cauldron */}
        <div className="w-32 h-32 relative">
          {/* Base */}
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-b from-muted to-muted-foreground/20 rounded-b-full border-4 border-muted-foreground/30" />
          
          {/* Bubbles */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 flex justify-around">
            <div className="w-3 h-3 rounded-full bg-primary/60 animate-bubble" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 rounded-full bg-primary/40 animate-bubble" style={{ animationDelay: '0.5s' }} />
            <div className="w-3 h-3 rounded-full bg-primary/50 animate-bubble" style={{ animationDelay: '1s' }} />
          </div>

          {/* Rising steam/ingredients */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-3">
            <div className="text-primary/70 animate-float" style={{ animationDelay: '0s' }}>
              🥕
            </div>
            <div className="text-primary/70 animate-float" style={{ animationDelay: '0.7s' }}>
              🧅
            </div>
            <div className="text-primary/70 animate-float" style={{ animationDelay: '1.4s' }}>
              🥬
            </div>
          </div>
        </div>

        {/* Fire under cauldron */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
          <Flame className="w-6 h-6 text-primary animate-pulse" style={{ animationDelay: '0s' }} />
          <Flame className="w-5 h-5 text-primary/80 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <Flame className="w-6 h-6 text-primary animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-primary animate-pulse">
          Brewing Your Recipe...
        </h3>
        <p className="text-sm text-muted-foreground">
          Mixing ingredients with a touch of magic
        </p>
      </div>
    </div>
  );
};
