import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";

const floatingTexts = [
  { text: "INNOVATE", x: "15%", y: "20%", delay: 2.5, color: "#00f0ff" },
  { text: "CREATE", x: "85%", y: "25%", delay: 3, color: "#7c3aed" },
  { text: "ENGINEER", x: "10%", y: "75%", delay: 3.5, color: "#0088ff" },
  { text: "DREAM", x: "80%", y: "70%", delay: 4, color: "#a855f7" },
  { text: "ASCEND", x: "50%", y: "15%", delay: 4.5, color: "#00f0ff" },
];

export default function Hero({ onExplore, onEnter, mouse }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-space/30 to-deep-space pointer-events-none z-10" />

      <div className="absolute inset-0 z-[2] pointer-events-none">
        {floatingTexts.map((item) => (
          <motion.div
            key={item.text}
            className="absolute font-orbitron font-black text-sm md:text-lg tracking-[0.3em]"
            style={{
              left: item.x,
              top: item.y,
              color: item.color,
              opacity: 0.08,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.08, 0.04, 0.08], scale: 1 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            {item.text}
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent"
            style={{
              top: `${15 + i * 14}%`,
              left: "5%",
              right: "5%",
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scaleX: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-3"
        >
          <span className="font-orbitron text-sm md:text-xl tracking-[0.4em] text-blue-400 uppercase font-bold drop-shadow-[0_0_8px_rgba(0,100,255,0.4)]">
            IIT Bombay Techfest 2026 Presents
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6"
        >
          <span className="font-orbitron text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.15em] gradient-text">
            CYBORG ERA
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none mb-4"
        >
          <span className="gradient-text">WELCOME TO</span>
          <br />
          <span className="gradient-text">THE FUTURE</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="font-grotesk text-sm md:text-lg text-white/50 max-w-2xl mb-10 leading-relaxed"
        >
          Where innovators, engineers, creators and dreamers build tomorrow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <MagneticButton onClick={onEnter} className="px-10 py-4 text-sm">
            ENTER TECHFEST
          </MagneticButton>
          <MagneticButton onClick={onExplore} variant="secondary" className="px-8 py-4 text-xs">
            EXPLORE EVENTS
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[7px] text-white/15 tracking-[0.3em] uppercase">
            Scroll to explore
          </span>
          <div className="scroll-indicator">
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none" className="text-white/20">
              <rect x="0.5" y="0.5" width="13" height="21" rx="6.5" stroke="currentColor" strokeWidth="1" />
              <motion.circle
                cx="7" cy="7" r="1.5" fill="currentColor"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute top-0 left-0 w-full h-[1px] z-30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        style={{ transformOrigin: "left" }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-30" />
      </motion.div>
    </motion.section>
  );
}
