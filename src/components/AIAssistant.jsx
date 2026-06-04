import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  { text: "HELLO INNOVATOR", delay: 3000 },
  { text: "ANALYZING INTERESTS", delay: 8000 },
  { text: "WORKSHOPS DETECTED", delay: 13000 },
  { text: "COMPETITIONS AVAILABLE", delay: 18000 },
  { text: "FUTURE READY", delay: 23000 },
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMsg, setCurrentMsg] = useState(null);
  const [msgIndex, setMsgIndex] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!scrolled) return;

    const timer = setTimeout(() => {
      setShowPanel(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [scrolled]);

  useEffect(() => {
    if (!showPanel || !isOpen) return;

    const interval = setInterval(() => {
      setMsgIndex((prev) => {
        if (prev >= messages.length) {
          setCurrentMsg(messages[messages.length - 1]);
          return prev;
        }
        setCurrentMsg(messages[prev]);
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [showPanel, isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showPanel && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass-panel rounded-xl p-4 mb-4 w-64 border border-neon-cyan/10"
          >
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <div>
                <p className="font-orbitron text-[10px] font-bold text-white/80">TECHFEST AI</p>
                <p className="font-mono text-[8px] text-white/30">v2.0.26 // ONLINE</p>
              </div>
            </div>

            <div className="h-20 flex items-center">
              <AnimatePresence mode="wait">
                {currentMsg && (
                  <motion.p
                    key={currentMsg.text}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="font-mono text-xs text-neon-cyan tracking-wider"
                  >
                    <span className="text-white/20">{">"}</span> {currentMsg.text}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-1"
                    >
                      _
                    </motion.span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-2 mt-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                    i < msgIndex ? "bg-neon-cyan" : "bg-white/5"
                  }`}
                />
              ))}
            </div>

            <p className="font-mono text-[7px] text-white/10 mt-2 tracking-wider text-center">
              SYSTEM READY // AWAITING INPUT
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {showPanel && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:shadow-[0_0_50px_rgba(0,240,255,0.4)] transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="text-white text-xl font-bold"
          >
            {isOpen ? "✕" : "✦"}
          </motion.span>
        </motion.button>
      )}
    </div>
  );
}
