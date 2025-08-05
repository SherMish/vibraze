"use client";

import React from "react";
import VideoProcessor from "@/components/VideoProcessor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-primary-500/10 rounded-full blur-xl animate-float-random"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-float-random"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-28 h-28 bg-blue-500/10 rounded-full blur-xl animate-float-random"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-20 h-20 bg-green-500/10 rounded-full blur-xl animate-float-random"
          style={{ animationDelay: "6s" }}
        ></div>
      </div>

      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <ErrorBoundary>
          <VideoProcessor />
        </ErrorBoundary>
      </div>
      <Footer />
    </main>
  );
}
