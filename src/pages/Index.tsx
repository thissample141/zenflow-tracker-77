import { useState, useEffect } from "react";
import { StatusHeader } from "@/components/StatusHeader";
import { EmotionCard } from "@/components/EmotionCard";
import { HealthScore } from "@/components/HealthScore";
import { WebcamControl } from "@/components/WebcamControl";
import { EmotionChart } from "@/components/EmotionChart";

const Index = () => {
  const [currentEmotion, setCurrentEmotion] = useState("Calm");
  const [confidence, setConfidence] = useState(85);
  const [healthScore, setHealthScore] = useState(78);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading and updates
  useEffect(() => {
    const loadData = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadData);
  }, []);

  // Simulate real-time emotion updates
  useEffect(() => {
    if (!isLoading) {
      const emotions = ["Happy", "Calm", "Neutral", "Focused", "Relaxed"];
      const interval = setInterval(() => {
        const newEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        const newConfidence = Math.floor(Math.random() * 20) + 75; // 75-95%
        const newHealthScore = Math.floor(Math.random() * 30) + 60; // 60-90
        
        setCurrentEmotion(newEmotion);
        setConfidence(newConfidence);
        setHealthScore(newHealthScore);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const getHealthStatus = (score: number): "excellent" | "good" | "moderate" | "concerning" => {
    if (score >= 85) return "excellent";
    if (score >= 70) return "good";
    if (score >= 55) return "moderate";
    return "concerning";
  };

  // Mock chart data
  const trendsData = [
    { time: "6h ago", emotion: "calm", confidence: 82 },
    { time: "4h ago", emotion: "happy", confidence: 78 },
    { time: "2h ago", emotion: "neutral", confidence: 71 },
    { time: "now", emotion: "calm", confidence: confidence }
  ];

  const distributionData = [
    { time: "today", emotion: "happy", confidence: 35 },
    { time: "today", emotion: "calm", confidence: 30 },
    { time: "today", emotion: "neutral", confidence: 25 },
    { time: "today", emotion: "anxious", confidence: 10 }
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <StatusHeader />
        
        {/* Main Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EmotionCard
            title="Current Emotion"
            value={currentEmotion}
            subtitle={`Confidence: ${confidence}%`}
            icon="brain"
            variant="emotion"
            isLoading={isLoading}
          />
          
          <div className="lg:col-span-2">
            <HealthScore
              score={healthScore}
              status={getHealthStatus(healthScore)}
              trend="up"
            />
          </div>
          
          <WebcamControl />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EmotionChart
              title="Emotion Trends (24h)"
              data={trendsData}
              type="trends"
            />
          </div>
          
          <div>
            <EmotionChart
              title="Emotion Distribution"
              data={distributionData}
              type="distribution"
            />
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="glass-card p-6 bg-gradient-to-r from-accent/10 to-primary/10 animate-slide-in">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Your Mental Wellness Journey
            </h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Track your emotional patterns, monitor your mental health score, and gain insights 
              into your well-being with real-time emotion detection technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
