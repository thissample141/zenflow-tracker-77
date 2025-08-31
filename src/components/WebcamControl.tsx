import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Play, Square, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function WebcamControl() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleWebcamToggle = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (!isActive) {
        setIsActive(true);
        toast({
          title: "Webcam Started",
          description: "Real-time emotion detection is now active",
        });
      } else {
        setIsActive(false);
        toast({
          title: "Webcam Stopped",
          description: "Emotion detection has been paused",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle webcam",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-card p-6 text-center bg-gradient-to-br from-accent/20 to-accent/5">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Camera className="h-5 w-5 text-accent" />
        <h3 className="text-sm font-medium text-muted-foreground">Webcam Detection</h3>
      </div>
      
      <div className="space-y-4">
        <Button
          onClick={handleWebcamToggle}
          disabled={isLoading}
          className={`neon-button w-full ${
            isActive 
              ? 'bg-gradient-to-r from-health-concerning to-destructive' 
              : 'bg-gradient-to-r from-primary to-accent'
          }`}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : isActive ? (
            <Square className="h-4 w-4 mr-2" />
          ) : (
            <Play className="h-4 w-4 mr-2" />
          )}
          {isLoading ? 'Connecting...' : isActive ? 'Stop Detection' : 'Start Detection'}
        </Button>
        
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            isActive ? 'bg-health-excellent animate-pulse' : 'bg-muted'
          }`} />
          <span className="text-xs text-muted-foreground">
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Real-time emotion tracking via camera
        </p>
      </div>
    </Card>
  );
}