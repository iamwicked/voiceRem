"use client";

import { useState, useRef, useEffect } from "react";

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        chunksRef.current = [];
        setAudioUrl(URL.createObjectURL(blob));
        setAudioBlob(blob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingDuration(0);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const handleDownload = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "recorded_audio.webm";
      link.click();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-white">Audio Recorder</h1>
      <p className="text-gray-300 text-sm mb-2">
        Recording Time: {formatTime(recordingDuration)}
      </p>
      {!isRecording && (
        <button
          onClick={startRecording}
          className="record-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Recording
        </button>
      )}
      {isRecording && (
        <button
          onClick={stopRecording}
          className="stop-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Stop Recording
        </button>
      )}
      {audioUrl && (
        <div className="mt-4">
          <audio controls src={audioUrl} />
          <button
            onClick={handleDownload}
            className="download-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Download Recording
          </button>
        </div>
      )}
    </div>
  );
}
