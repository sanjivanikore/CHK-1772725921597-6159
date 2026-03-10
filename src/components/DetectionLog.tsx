import type { Classification } from "./WebcamDetector";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Leaf, Recycle } from "lucide-react";

const icons = {
  biodegradable: Leaf,
  recyclable: Recycle,
  hazardous: AlertTriangle,
};

const colors = {
  biodegradable: "text-eco-bio",
  recyclable: "text-eco-recycle",
  hazardous: "text-eco-hazard",
};

const DetectionLog = ({ history }: { history: Classification[] }) => {
  if (!history.length) {
    return (
      <div className="text-center py-8 text-muted-foreground font-mono text-sm">
        No detections yet. Start the camera to begin classifying waste.
      </div>
    );
  }

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-2">
        {[...history].reverse().map((item, i) => {
          const Icon = icons[item.category];
          return (
            <div
              key={`${item.label}-${i}`}
              className="flex items-center gap-3 p-3 rounded-md bg-muted/50 border border-border"
            >
              <Icon className={`w-4 h-4 ${colors[item.category]}`} />
              <span className="font-mono text-sm text-foreground flex-1">{item.label}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {(item.confidence * 100).toFixed(0)}%
              </span>
              <span className={`font-mono text-xs capitalize ${colors[item.category]}`}>
                {item.category}
              </span>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default DetectionLog;
