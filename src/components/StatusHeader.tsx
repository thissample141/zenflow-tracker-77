import { useState, useEffect } from "react";
import { Brain, Wifi, WifiOff } from "lucide-react";

export function StatusHeader() {
  const [isConnected, setIsConnected] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate connection status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsConnected(prev => Math.random() > 0.1 ? true : !prev);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="glass-card p-4 mb-8 bg-gradient-to-r from-background-secondary/80 to-background-tertiary/60">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
            <Brain className="h-6 w-6 text-primary animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ZenFlow Tracker
            </h1>
            <p className="text-xs text-muted-foreground">
              Emotion Mental Health Monitoring
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="text-right">
            <div className="font-medium">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-xs text-muted-foreground">
              {currentTime.toLocaleDateString()}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Wifi className="h-4 w-4 text-health-excellent" />
            ) : (
              <WifiOff className="h-4 w-4 text-health-concerning" />
            )}
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              isConnected ? 'bg-health-excellent' : 'bg-health-concerning'
            }`} />
            <span className="text-xs text-muted-foreground">
              {isConnected ? 'Connected' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}