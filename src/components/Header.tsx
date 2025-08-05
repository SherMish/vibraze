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
          className="p-2 rounded-full bg-gradient-to-br from-primary-500 to-primary-700"
        >
          <Volume2 className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold gradient-text">Vibraze</h1>
      </div>
      <p className="text-center mt-2 text-gray-400">
        Enhance your video audio with professional sound boosting
      </p>
    </motion.header>
  );
}
