import { useState, useCallback } from "react";
import WebcamDetector, { type Classification } from "@/components/WebcamDetector";
import DetectionStats from "@/components/DetectionStats";
import DetectionLog from "@/components/DetectionLog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BarChart3, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [history, setHistory] = useState<Classification[]>([]);

  const handleClassification = useCallback((items: Classification[]) => {
    if (items.length > 0) {
      setHistory((prev) => [...prev, ...items]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <Eye className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-mono font-bold text-foreground tracking-tight">
              EcoVision
            </h1>
          </div>
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="gap-2 font-mono text-xs">
              <BarChart3 className="w-3.5 h-3.5" />
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-6 space-y-6 max-w-4xl">
        <div className="space-y-1">
          <h2 className="font-mono text-lg font-semibold text-foreground">
            Real-Time Waste Detection
          </h2>
          <p className="text-sm text-muted-foreground font-mono">
            Point your camera at waste items for AI-powered classification
          </p>
        </div>

        <WebcamDetector onClassification={handleClassification} />

        <DetectionStats history={history} />

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
              Detection Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DetectionLog history={history} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
