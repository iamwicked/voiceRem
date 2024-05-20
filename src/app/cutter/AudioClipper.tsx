"use client";

import { useState, useRef } from "react";
import FileInput from "@/components/FileInput";
import Button from "@/components/Button";
import Waveform from "@/components/Waveform";

export default function AudioClipper() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [clipStart, setClipStart] = useState(0);
  const [clipEnd, setClipEnd] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFileChange = (file: File) => {
    setAudioFile(file);
    if (audioRef.current) {
      audioRef.current.src = URL.createObjectURL(file);
      audioRef.current.load();
      setClipEnd(audioRef.current.duration);
    }
  };

  const handleRegionUpdate = (start: number, end: number) => {
    setClipStart(start);
    setClipEnd(end);
  };

  const handleClip = async () => {
    if (!audioFile || !audioRef.current) return;
  
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(await audioFile.arrayBuffer());
  
    const offlineAudioContext = new OfflineAudioContext(
      audioBuffer.numberOfChannels,
      (clipEnd - clipStart) * audioContext.sampleRate,
      audioContext.sampleRate
    );
  
    const source = offlineAudioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineAudioContext.destination);
    source.start(0, clipStart, clipEnd - clipStart);
  
    const clippedBuffer = await offlineAudioContext.startRendering();
  
    // Convert AudioBuffer to ArrayBuffer
    const audioData = clippedBuffer.getChannelData(0); // Get data from first channel
    const arrayBuffer = new ArrayBuffer(audioData.length * 2); // 2 bytes per sample (16-bit)
    const view = new DataView(arrayBuffer);
    for (let i = 0; i < audioData.length; i++) {
      view.setInt16(i * 2, audioData[i] * 32767, true); // Convert to 16-bit PCM
    }
  
    const blob = new Blob([arrayBuffer], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = "clipped_audio.wav";
    link.click();
  };
  

  return (
    <div className="content-area">
      <h1 className="main-heading">Audio Cutter</h1>
      <p className="subheading">
        Select a file and the region you want to cut.
      </p>
      <FileInput onChange={handleFileChange} />

      {audioFile && (
        <div className="mt-8 space-y-4">
          <audio
            ref={audioRef}
            controls
            onLoadedMetadata={() => setClipEnd(audioRef.current?.duration || 0)}
            className="w-full" 
          />

          <Waveform audioFile={audioFile} onRegionUpdate={handleRegionUpdate} />

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Start Time Input */}
            <div className="flex-1">
              <label htmlFor="clipStart" className="block text-sm font-medium text-gray-300">Start Time (seconds)</label>
              <input
                type="number"
                id="clipStart"
                min={0}
                max={clipEnd}
                value={clipStart}
                onChange={(e) => setClipStart(parseFloat(e.target.value))}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            {/* End Time Input */}
            <div className="flex-1">
              <label htmlFor="clipEnd" className="block text-sm font-medium text-gray-300">End Time (seconds)</label>
              <input
                type="number"
                id="clipEnd"
                min={clipStart}
                max={audioRef.current?.duration || 0}
                value={clipEnd}
                onChange={(e) => setClipEnd(parseFloat(e.target.value))}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
          </div> 

          <Button onClick={handleClip} className="clip-button">
            Clip Audio
          </Button>
        </div>
      )}
    </div>
  );
}