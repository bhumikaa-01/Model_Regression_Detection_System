import { motion } from "motion/react";
import "./Aurora.css";

export default function Aurora() {
  return (
    <div className="aurora-container">
      {/* Blue Aurora */}
      <motion.div
        className="aurora aurora-blue"
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Purple Aurora */}
      <motion.div
        className="aurora aurora-purple"
        animate={{
          x: [0, -100, 0],
          y: [0, 90, 0],
          scale: [1.1, 0.95, 1.1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cyan Aurora */}
      <motion.div
        className="aurora aurora-cyan"
        animate={{
          x: [0, 80, 0],
          y: [0, 70, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Glow */}
      <motion.div
        className="aurora-glow"
        animate={{
          opacity: [0.35, 0.7, 0.35],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}