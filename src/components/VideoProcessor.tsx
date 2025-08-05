"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Download,
  Volume2,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

interface ProcessingState {
  isLoading: boolean;
  progress: number;
  stage: string;
}

export default function VideoProcessor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(
    null
  );
  const [processing, setProcessing] = useState<ProcessingState>({
    isLoading: false,
    progress: 0,
    stage: "",
  });
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [audioBoost, setAudioBoost] = useState(6); // Default 6dB boost
  const [isPlaying, setIsPlaying] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const processedVideoRef = useRef<HTMLVideoElement>(null);
  const ffmpegRef = useRef<FFmpeg>();

  // Initialize FFmpeg
  useEffect(() => {
    const loadFFmpeg = async () => {
      try {
        const ffmpeg = new FFmpeg();
        ffmpegRef.current = ffmpeg;

        ffmpeg.on("log", ({ message }) => {
          console.log(message);
        });

        ffmpeg.on("progress", ({ progress }) => {
          setProcessing((prev) => ({
            ...prev,
            progress: Math.round(progress * 100),
          }));
        });

        await ffmpeg.load({
          coreURL: await toBlobURL(
            "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js",
            "text/javascript"
          ),
          wasmURL: await toBlobURL(
            "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm",
            "application/wasm"
          ),
        });

        setFfmpegLoaded(true);
      } catch (error) {
        console.error("Failed to load FFmpeg:", error);
        setProcessing({
          isLoading: false,
          progress: 0,
          stage:
            "Failed to load video processing engine. Please refresh and try again.",
        });
        setFfmpegLoaded(false);
      }
    };

    loadFFmpeg();
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      setProcessedVideoUrl(null);
      setProcessing({ isLoading: false, progress: 0, stage: "" });
    }
  };

  const processVideo = async () => {
    if (!selectedFile || !ffmpegRef.current) return;

    setProcessing({
      isLoading: true,
      progress: 0,
      stage: "Preparing video...",
    });

    try {
      const ffmpeg = ffmpegRef.current;

      // Write input file
      setProcessing((prev) => ({ ...prev, stage: "Loading video file..." }));
      await ffmpeg.writeFile("input.mp4", await fetchFile(selectedFile));

      // Process video with audio boost
      setProcessing((prev) => ({ ...prev, stage: "Boosting audio..." }));
      await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-af",
        `volume=${audioBoost}dB`,
        "-c:v",
        "copy", // Copy video stream without re-encoding
        "-c:a",
        "aac", // Re-encode audio with AAC
        "-b:a",
        "128k", // Audio bitrate
        "output.mp4",
      ]);

      // Read output file
      setProcessing((prev) => ({ ...prev, stage: "Finalizing..." }));
      const data = (await ffmpeg.readFile("output.mp4")) as Uint8Array;
      const blob = new Blob([new Uint8Array(data)], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);

      setProcessedVideoUrl(url);
      setProcessing({ isLoading: false, progress: 100, stage: "Complete!" });
    } catch (error) {
      console.error("Error processing video:", error);
      setProcessing({
        isLoading: false,
        progress: 0,
        stage:
          "Processing failed. Please try a different video or refresh the page.",
      });
    }
  };

  const downloadVideo = () => {
    if (processedVideoUrl) {
      const a = document.createElement("a");
      a.href = processedVideoUrl;
      a.download = `${selectedFile?.name.replace(/\.[^/.]+$/, "")}_boosted.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const resetAll = () => {
    setSelectedFile(null);
    setProcessedVideoUrl(null);
    setProcessing({ isLoading: false, progress: 0, stage: "" });
    setIsPlaying(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const togglePlayback = (videoElement: HTMLVideoElement | null) => {
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        setIsPlaying(true);
      } else {
        videoElement.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="glass-effect p-8"
      >
        {/* Upload Section */}
        <AnimatePresence>
          {!selectedFile && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-dashed border-primary-500/50 rounded-xl p-12 cursor-pointer hover:border-primary-500 transition-colors duration-300 hover:bg-primary-500/5"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-16 h-16 text-primary-500 mx-auto mb-4 animate-float" />
                <h3 className="text-xl font-semibold mb-2">
                  🎬 Upload Your Video - It's FREE!
                </h3>
                <p className="text-gray-300 mb-3 text-lg">
                  📈{" "}
                  <span className="text-green-400 font-semibold">
                    Boost engagement
                  </span>{" "}
                  with louder, clearer audio
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="text-center p-2 bg-pink-500/10 rounded-lg border border-pink-500/20">
                    <span className="text-pink-400">📱 Instagram</span>
                    <p className="text-xs text-gray-400">
                      Algorithm loves clear audio
                    </p>
                  </div>
                  <div className="text-center p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <span className="text-blue-400">🎵 TikTok</span>
                    <p className="text-xs text-gray-400">
                      Higher audio = More views
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  ✅ Supports MP4, MOV, AVI • No file size limits • Instant
                  processing
                </p>
              </motion.div>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Processing Controls */}
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* File Info */}
            <div className="glass-effect p-4 rounded-lg">
              <h4 className="font-semibold text-primary-400 mb-2">
                Selected File:
              </h4>
              <p className="text-gray-300">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>

            {/* Benefits Section */}
            <div className="glass-effect p-6 rounded-lg mb-6">
              <h4 className="text-lg font-semibold text-center mb-4 gradient-text">
                🚀 Why Boost Your Audio?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-green-400 font-semibold mb-1">
                    📈 Algorithm Boost
                  </div>
                  <p className="text-gray-300">
                    Louder audio = Higher engagement rates
                  </p>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-blue-400 font-semibold mb-1">
                    👂 Better Retention
                  </div>
                  <p className="text-gray-300">
                    Clear audio keeps viewers watching longer
                  </p>
                </div>
                <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-purple-400 font-semibold mb-1">
                    🎯 More Reach
                  </div>
                  <p className="text-gray-300">
                    Platforms favor content with quality audio
                  </p>
                </div>
              </div>
            </div>

            {/* Audio Boost Control */}
            <div className="glass-effect p-6 rounded-lg">
              <label className="block text-sm font-medium mb-4">
                🎚️ Audio Boost Level:{" "}
                <span className="text-primary-400 font-bold">
                  {audioBoost}dB
                </span>
                <span className="text-gray-400 text-xs ml-2">
                  {audioBoost === 0 && "Original"}
                  {audioBoost > 0 && audioBoost <= 5 && "Subtle"}
                  {audioBoost > 5 && audioBoost <= 10 && "Recommended"}
                  {audioBoost > 10 && audioBoost <= 15 && "Strong"}
                  {audioBoost > 15 && "Maximum"}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={audioBoost}
                onChange={(e) => setAudioBoost(Number(e.target.value))}
                className="w-full h-3 bg-dark-700 rounded-lg appearance-none cursor-pointer slider"
                disabled={processing.isLoading}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0dB (Original)</span>
                <span className="text-center">
                  <span className="text-primary-400">6dB Recommended</span>
                </span>
                <span>20dB (Max)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={processVideo}
                disabled={processing.isLoading || !ffmpegLoaded}
                className="flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 neon-border"
              >
                <Volume2 className="w-5 h-5" />
                <span>
                  {processing.isLoading
                    ? "🎯 Boosting Audio..."
                    : "🚀 Boost Audio FREE"}
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetAll}
                className="flex items-center space-x-2 bg-dark-700 hover:bg-dark-600 text-gray-300 px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </motion.button>
            </div>

            {/* Progress Bar */}
            <AnimatePresence>
              {processing.isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="glass-effect p-4 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">
                      {processing.stage}
                    </span>
                    <span className="text-sm text-primary-400">
                      {processing.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${processing.progress}%` }}
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Video Preview and Download */}
            {processedVideoUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-effect p-6 rounded-lg"
              >
                <h4 className="font-semibold text-green-400 mb-4 text-center text-xl">
                  🎉 Your Video is Now SUPERCHARGED!
                </h4>
                <div className="text-center mb-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <p className="text-green-300 font-semibold">
                    ✅ Audio boosted by {audioBoost}dB
                  </p>
                  <p className="text-gray-400 text-sm">
                    Ready for Instagram, TikTok & YouTube!
                  </p>
                </div>

                {/* Video Player */}
                <div className="relative rounded-lg overflow-hidden mb-4">
                  <video
                    ref={processedVideoRef}
                    src={processedVideoUrl}
                    className="w-full max-h-96 object-contain bg-black"
                    controls
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                </div>

                {/* Download Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadVideo}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 mx-auto animate-glow"
                >
                  <Download className="w-5 h-5" />
                  <span>💾 Download Your Viral-Ready Video</span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* FFmpeg Loading Status */}
        {!ffmpegLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 text-sm mt-4"
          >
            Loading video processing engine...
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
