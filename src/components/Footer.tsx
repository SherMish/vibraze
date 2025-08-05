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
      <p className="text-gray-400 text-sm">
        © 2024 Vibraze. Enhance your audio experience.
      </p>
    </motion.footer>
  );
}
