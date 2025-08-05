"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="glass-effect m-4 p-4 text-center"
    >
      <div className="text-center space-y-2">
        <div className="flex justify-center items-center gap-4 mb-3 text-sm">
          <span className="text-green-400">✅ 100% Free</span>
          <span className="text-blue-400">✅ No Signup</span>
          <span className="text-purple-400">✅ Privacy First</span>
        </div>
        <p className="text-gray-400 text-sm">
          © 2024 Vibraze. Make your content viral with boosted audio.
        </p>
        <p className="text-gray-500 text-xs">
          🚀 Perfect for content creators, influencers & businesses
        </p>
      </div>
    </motion.footer>
  );
}
