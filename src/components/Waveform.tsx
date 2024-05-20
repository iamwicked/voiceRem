"use client"; // Ensure wavesurfer.js runs on the client

import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

interface WaveformProps {
  audioFile: File | null;
  onRegionUpdate?: (start: number, end: number) => void; // Callback for region updates
}

export default function Waveform({ audioFile, onRegionUpdate }: WaveformProps) {
  const waveformRef = useRef<WaveSurfer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioFile && containerRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: containerRef.current,
        waveColor: "#9333ea",
        progressColor: "#a855f7",
        height: 100,
        interact: true,
      });

      wavesurfer.loadBlob(audioFile);
      waveformRef.current = wavesurfer;

      wavesurfer.on("region-updated", (region) => {
        if (onRegionUpdate) {
          onRegionUpdate(region.start, region.end);
        }
      });

      return () => wavesurfer.destroy(); // Clean up on component unmount
    }
  }, [audioFile, onRegionUpdate]);

  return <div ref={containerRef} className="w-full" />;
}
