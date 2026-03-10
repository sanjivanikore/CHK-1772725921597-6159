import type { Classification } from "./WebcamDetector";

const categoryStyles: Record<string, string> = {
  biodegradable: "bg-eco-bio text-eco-bio-foreground",
  recyclable: "bg-eco-recycle text-eco-recycle-foreground",
  hazardous: "bg-eco-hazard text-eco-hazard-foreground",
};

const ClassificationOverlay = ({ items }: { items: Classification[] }) => {
  if (!items.length) return null;

  return (
    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
      {items.map((item, i) => (
        <div
          key={`${item.label}-${i}`}
          className={`${categoryStyles[item.category] ?? "bg-muted text-foreground"} 
            rounded-md px-3 py-1.5 text-xs font-mono font-semibold 
            backdrop-blur-sm shadow-md flex items-center gap-2`}
        >
          <span>{item.label}</span>
          <span className="opacity-75">
            {(item.confidence * 100).toFixed(0)}%
          </span>
          <span className="opacity-60 capitalize text-[10px]">
            {item.category}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ClassificationOverlay;
