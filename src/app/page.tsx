"use client";

import React from "react";
import VideoProcessor from "@/components/VideoProcessor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <ErrorBoundary>
          <VideoProcessor />
        </ErrorBoundary>
      </div>
      <Footer />
    </main>
  );
}
