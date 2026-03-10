import { useRef, useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ClassificationOverlay from "./ClassificationOverlay";

export interface Classification {
  label: string;
  category: "biodegradable" | "recyclable" | "hazardous";
  confidence: number;
}

interface WebcamDetectorProps {
  onClassification?: (items: Classification[]) => void;
}

const WebcamDetector = ({ onClassification }: WebcamDetectorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [isStreaming, setIsStreaming] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);
  const [classifications, setClassifications] = useState<Classification[]>([]);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: 640, height: 480 },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsStreaming(true);
    } catch {
      toast.error("Could not access camera. Please allow camera permissions.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
    setClassifications([]);
  }, []);

  const captureAndClassify = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || isClassifying) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.7);

    setIsClassifying(true);
    try {
      const { data, error } = await supabase.functions.invoke("classify-waste", {
        body: { image: dataUrl },
      });

      if (error) {
        console.error("Classification error:", error);
        return;
      }

      const items: Classification[] = data?.classifications ?? [];
      setClassifications(items);
      onClassification?.(items);
    } catch (e) {
      console.error("Classification failed:", e);
    } finally {
      setIsClassifying(false);
    }
  }, [isClassifying, onClassification]);

  // Auto-classify every 3 seconds while streaming
  useEffect(() => {
    if (isStreaming) {
      intervalRef.current = setInterval(captureAndClassify, 3000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [isStreaming, captureAndClassify]);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-lg border border-border bg-card aspect-video">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />

        {!isStreaming && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/80">
            <Camera className="w-16 h-16 text-muted-foreground mb-3" />
            <p className="text-muted-foreground font-mono text-sm">Camera off</p>
          </div>
        )}

        {isClassifying && (
          <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm rounded-md px-3 py-1.5 flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span className="text-xs font-mono text-foreground">Analyzing…</span>
          </div>
        )}

        <ClassificationOverlay items={classifications} />
      </div>

      <div className="flex gap-3">
        {!isStreaming ? (
          <Button onClick={startCamera} className="flex-1 gap-2">
            <Camera className="w-4 h-4" />
            Start Detection
          </Button>
        ) : (
          <Button onClick={stopCamera} variant="destructive" className="flex-1 gap-2">
            <CameraOff className="w-4 h-4" />
            Stop Detection
          </Button>
        )}
      </div>
    </div>
  );
};

export default WebcamDetector;
