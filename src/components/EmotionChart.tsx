import { Card } from "@/components/ui/card";
import { TrendingUp, Activity } from "lucide-react";

interface DataPoint {
  time: string;
  emotion: string;
  confidence: number;
}

interface EmotionChartProps {
  title: string;
  data: DataPoint[];
  type: "trends" | "distribution";
}

export function EmotionChart({ title, data, type }: EmotionChartProps) {
  // Mock chart visualization using CSS
  const emotionColors = {
    happy: "bg-emotion-happy",
    calm: "bg-emotion-calm", 
    neutral: "bg-emotion-neutral",
    sad: "bg-emotion-sad",
    anxious: "bg-emotion-anxious"
  };

  const renderTrends = () => (
    <div className="space-y-4">
      {/* Mock trend line */}
      <div className="relative h-40 bg-background-secondary/30 rounded-lg p-4">
        <div className="absolute inset-4 flex items-end justify-between">
          {[65, 45, 78, 82, 59, 71, 88, 76].map((height, i) => (
            <div
              key={i}
              className="bg-gradient-to-t from-primary to-accent rounded-t-sm opacity-80"
              style={{ 
                height: `${height}%`, 
                width: "8px",
                boxShadow: `0 0 10px hsl(var(--primary) / 0.4)`
              }}
            />
          ))}
        </div>
        
        {/* Trend line overlay */}
        <svg className="absolute inset-4 w-full h-full opacity-60">
          <polyline
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            points="0,80 20,120 40,60 60,40 80,100 100,70 120,20 140,50"
            className="opacity-80"
          />
        </svg>
      </div>
      
      <div className="grid grid-cols-4 gap-2 text-xs">
        <div className="text-center">
          <div className="text-muted-foreground">6h ago</div>
          <div className="text-emotion-calm">Calm</div>
        </div>
        <div className="text-center">
          <div className="text-muted-foreground">4h ago</div>
          <div className="text-emotion-happy">Happy</div>
        </div>
        <div className="text-center">
          <div className="text-muted-foreground">2h ago</div>
          <div className="text-emotion-neutral">Neutral</div>
        </div>
        <div className="text-center">
          <div className="text-muted-foreground">Now</div>
          <div className="text-emotion-calm">Calm</div>
        </div>
      </div>
    </div>
  );

  const renderDistribution = () => (
    <div className="space-y-6">
      {/* Mock donut chart */}
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
          {/* Happy - 35% */}
          <circle
            cx="50" cy="50" r="35"
            fill="none"
            stroke="hsl(var(--emotion-happy))"
            strokeWidth="12"
            strokeDasharray="77 143"
            strokeDashoffset="0"
            className="opacity-80"
          />
          {/* Calm - 30% */}
          <circle
            cx="50" cy="50" r="35"
            fill="none"
            stroke="hsl(var(--emotion-calm))"
            strokeWidth="12"
            strokeDasharray="66 154"
            strokeDashoffset="-77"
            className="opacity-80"
          />
          {/* Neutral - 25% */}
          <circle
            cx="50" cy="50" r="35"
            fill="none"
            stroke="hsl(var(--emotion-neutral))"
            strokeWidth="12"
            strokeDasharray="55 165"
            strokeDashoffset="-143"
            className="opacity-80"
          />
          {/* Anxious - 10% */}
          <circle
            cx="50" cy="50" r="35"
            fill="none"
            stroke="hsl(var(--emotion-anxious))"
            strokeWidth="12"
            strokeDasharray="22 198"
            strokeDashoffset="-198"
            className="opacity-80"
          />
        </svg>
      </div>
      
      {/* Legend */}
      <div className="space-y-2">
        {[
          { emotion: "Happy", percentage: 35, color: "emotion-happy" },
          { emotion: "Calm", percentage: 30, color: "emotion-calm" },
          { emotion: "Neutral", percentage: 25, color: "emotion-neutral" },
          { emotion: "Anxious", percentage: 10, color: "emotion-anxious" }
        ].map(({ emotion, percentage, color }) => (
          <div key={emotion} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-${color}`} />
              <span className="text-muted-foreground">{emotion}</span>
            </div>
            <span className="font-medium">{percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="glass-card p-6 bg-gradient-to-br from-background-secondary/50 to-background-tertiary/30">
      <div className="flex items-center gap-2 mb-6">
        {type === "trends" ? (
          <TrendingUp className="h-5 w-5 text-primary" />
        ) : (
          <Activity className="h-5 w-5 text-accent" />
        )}
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      </div>
      
      {type === "trends" ? renderTrends() : renderDistribution()}
    </Card>
  );
}