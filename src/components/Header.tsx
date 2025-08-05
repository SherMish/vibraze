"use client";

import React from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="glass-effect m-4 p-6"
    >
      <div className="flex items-center justify-center space-x-3">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="p-2 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 animate-glow"
        >
          <Volume2 className="w-8 h-8 text-white" />
        </motion.div>
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text">Vibraze</h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full animate-pulse">
              100% FREE
            </span>
            <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
              NO SIGNUP
            </span>
          </div>
        </div>
      </div>
      <p className="text-center mt-3 text-gray-300 text-lg">
        🚀 Boost Your Video Audio for{" "}
        <span className="text-pink-400 font-semibold">Instagram</span>,{" "}
        <span className="text-blue-400 font-semibold">TikTok</span> &{" "}
        <span className="text-red-400 font-semibold">YouTube</span>
      </p>
      <p className="text-center mt-1 text-gray-400 text-sm">
        ⚡ Instant processing • 🔒 Privacy-first • 💯 Professional quality
      </p>
    </motion.header>
  );
}
