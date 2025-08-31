import { Card } from "@/components/ui/card";
import { Heart, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HealthScoreProps {
  score: number;
  status: "excellent" | "good" | "moderate" | "concerning";
  trend?: "up" | "down" | "stable";
}

export function HealthScore({ score, status, trend = "stable" }: HealthScoreProps) {
  const getStatusColor = () => {
    switch (status) {
      case "excellent":
        return "bg-health-excellent text-background";
      case "good":
        return "bg-health-good text-background";
      case "moderate":
        return "bg-health-moderate text-background";
      case "concerning":
        return "bg-health-concerning text-background";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getScoreColor = () => {
    switch (status) {
      case "excellent":
        return "text-health-excellent";
      case "good":
        return "text-health-good";
      case "moderate":
        return "text-health-moderate";
      case "concerning":
        return "text-health-concerning";
      default:
        return "text-muted-foreground";
    }
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card className="glass-card p-6 text-center bg-gradient-to-br from-primary/10 to-accent/5">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Heart className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-medium text-muted-foreground">Mental Health Score</h3>
      </div>
      
      <div className="relative w-32 h-32 mx-auto mb-4">
        {/* Background Circle */}
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            fill="none"
            className="opacity-20"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={`hsl(var(--health-${status}))`}
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 10px hsl(var(--health-${status}) / 0.5))`
            }}
          />
        </svg>
        
        {/* Score Display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor()}`}>
              {score}
            </div>
            <div className="text-xs text-muted-foreground">/ 100</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Badge className={`${getStatusColor()} text-xs px-3 py-1`}>
          {trend === "up" && <TrendingUp className="h-3 w-3 mr-1" />}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
        
        <p className="text-xs text-muted-foreground">
          Based on recent emotion patterns
        </p>
      </div>
    </Card>
  );
}