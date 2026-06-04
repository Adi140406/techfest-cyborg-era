import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlitchTransition({ trigger, children }) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    if (trigger) {
      setGlitching(true);
      const timer = setTimeout(() => setGlitching(false), 600);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div className="relative">
      <AnimatePresence>
        {glitching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute inset-0 z-50 pointer-events-none"
          >
            <div className="absolute inset-0 bg-neon-cyan/5 mix-blend-overlay animate-glitch" />
            <div className="absolute inset-0 bg-neon-purple/5 mix-blend-overlay animate-glitch" style={{ animationDelay: "0.1s" }} />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-neon-cyan/30" />
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon-purple/30" />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
