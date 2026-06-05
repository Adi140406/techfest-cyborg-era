import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CyborgFace from "./CyborgFace";

const bootMessages = [
  { text: "INITIALIZING TECHFEST 2026", delay: 500 },
  { text: "SCANNING GLOBAL INNOVATORS", delay: 2000 },
  { text: "CONNECTING TO FUTURE NETWORK", delay: 3500 },
  { text: "ACCESS GRANTED", delay: 5000 },
];

export default function BootScreen({ onComplete }) {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showSystemInfo, setShowSystemInfo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSystemInfo(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentIndex >= bootMessages.length) return;

    const timer = setTimeout(() => {
      setVisibleMessages((prev) => [...prev, bootMessages[currentIndex].text]);
      setCurrentIndex((prev) => prev + 1);
    }, bootMessages[currentIndex].delay);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1;
      });
    }, 60);

    return () => clearInterval(progressTimer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  const systemLines = [
    "SYS: BOOT_SEQUENCE_INITIATED",
    "SYS: QUANTUM_CORE_ACTIVE",
    "SYS: NEURAL_LINK_ESTABLISHED",
    `SYS: MEM_ALLOC ${Math.floor(Math.random() * 2048 + 1024)}MB`,
    "SYS: SECURITY_PROTOCOLS_ACTIVE",
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-deep-space"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,240,255,0.03)_0%,_transparent_70%)]" />

        <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-6">
          <div className="mb-8 text-center">
            <div className="mb-4 space-y-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_techfest.jpg"
                alt="Techfest IIT Bombay"
                className="w-16 h-16 mx-auto object-contain rounded brightness-110"
              />
              <CyborgFace progress={progress / 100} />
            </div>
            <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text tracking-wider">
              CYBORG ERA
            </h1>
            <p className="font-mono text-[10px] text-white/30 tracking-[0.3em] mt-2 uppercase">
              Techfest IIT Bombay 2026
            </p>
            <p className="font-mono text-[8px] text-neon-cyan/40 tracking-[0.4em] mt-1 uppercase">
              Rise of the Cyborg Era
            </p>
          </div>

          <div className="w-full space-y-3 mb-8">
            {bootMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: visibleMessages[i] ? 1 : 0, x: visibleMessages[i] ? 0 : -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex items-center gap-3"
              >
                <motion.span
                  animate={{ opacity: visibleMessages[i] ? [1, 0, 1] : 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-neon-cyan rounded-full flex-shrink-0"
                />
                <span className="font-mono text-sm tracking-wider text-white/80">
                  {msg.text}
                  {i === currentIndex - 1 && i < bootMessages.length - 1 && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="ml-1"
                    >
                      _
                    </motion.span>
                  )}
                </span>
                {visibleMessages[i] && i < bootMessages.length - 1 && (
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    className="font-mono text-[10px] text-neon-cyan/50"
                  >
                    [OK]
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="flex justify-between w-full mt-1">
            <span className="font-mono text-[8px] text-white/20 tracking-wider uppercase">
              System Boot
            </span>
            <span className="font-mono text-[8px] text-neon-cyan/40">{progress}%</span>
          </div>
        </div>

        {showSystemInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-8 left-8 space-y-1"
          >
            {systemLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: [0, 1, 0.5] }}
                transition={{ delay: i * 0.8, duration: 0.5 }}
                className="font-mono text-[8px] text-white/20 tracking-wider"
              >
                {">"} {line}
              </motion.p>
            ))}
          </motion.div>
        )}

        <div className="absolute bottom-8 right-8 text-right">
          <p className="font-mono text-[8px] text-white/10 tracking-widest">
            CYBORG_OS // v2.0.26
          </p>
          <p className="font-mono text-[8px] text-white/10 tracking-widest mt-1">
            ENCRYPTION: AES-256
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
