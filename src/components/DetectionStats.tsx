import type { Classification } from "./WebcamDetector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Recycle, AlertTriangle } from "lucide-react";

interface DetectionStatsProps {
  history: Classification[];
}

const DetectionStats = ({ history }: DetectionStatsProps) => {
  const counts = { biodegradable: 0, recyclable: 0, hazardous: 0 };
  history.forEach((item) => {
    if (counts[item.category] !== undefined) counts[item.category]++;
  });

  const stats = [
    { label: "Biodegradable", count: counts.biodegradable, icon: Leaf, color: "text-eco-bio" },
    { label: "Recyclable", count: counts.recyclable, icon: Recycle, color: "text-eco-recycle" },
    { label: "Hazardous", count: counts.hazardous, icon: AlertTriangle, color: "text-eco-hazard" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((s) => (
        <Card key={s.label} className="border-border">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
              {s.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className={`text-3xl font-mono font-bold ${s.color}`}>{s.count}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DetectionStats;
