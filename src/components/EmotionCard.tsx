import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Brain, Heart, Zap } from "lucide-react";

interface EmotionCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: "brain" | "heart" | "zap";
  variant?: "primary" | "accent" | "emotion";
  isLoading?: boolean;
}

const icons = {
  brain: Brain,
  heart: Heart,
  zap: Zap,
};

export function EmotionCard({ 
  title, 
  value, 
  subtitle, 
  icon = "brain", 
  variant = "primary",
  isLoading = false 
}: EmotionCardProps) {
  const [displayValue, setDisplayValue] = useState<string | number>(isLoading ? "..." : value);
  const IconComponent = icons[icon];

  useEffect(() => {
    if (!isLoading) {
      setDisplayValue(value);
    }
  }, [value, isLoading]);

  const getGradientClass = () => {
    switch (variant) {
      case "accent":
        return "from-accent/20 to-accent/5";
      case "emotion":
        return "from-emotion-calm/20 to-emotion-happy/10";
      default:
        return "from-primary/20 to-primary/5";
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case "accent":
        return "text-accent";
      case "emotion":
        return "text-emotion-calm";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className={`glass-card p-6 text-center bg-gradient-to-br ${getGradientClass()}`}>
      <div className="flex items-center justify-center gap-2 mb-4">
        <IconComponent className={`h-5 w-5 ${getIconColor()}`} />
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      </div>
      
      <div className="space-y-2">
        <div className={`emotion-indicator ${isLoading ? 'animate-pulse' : 'animate-pulse-glow'}`}>
          {displayValue}
        </div>
        
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </Card>
  );
}