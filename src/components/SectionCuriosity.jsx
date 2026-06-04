import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const elements = [
  { label: "E = mc²", desc: "Energy & Matter", symbol: "⚛", color: "#00f0ff" },
  { label: "F = ma", desc: "Laws of Motion", symbol: "◈", color: "#7c3aed" },
  { label: "∫ f(x)dx", desc: "Infinite Possibilities", symbol: "∫", color: "#0088ff" },
  { label: "∇ · B = 0", desc: "Electromagnetism", symbol: "⟐", color: "#a855f7" },
  { label: "ψ(x,t)", desc: "Quantum State", symbol: "ψ", color: "#00f0ff" },
  { label: "DNA", desc: "Code of Life", symbol: "⟡", color: "#7c3aed" },
];

export default function SectionCuriosity() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.25], [120, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section
      id="curiosity"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 md:py-32 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-navy/90 to-deep-space pointer-events-none z-0" />

      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              height: 20 + Math.random() * 40,
              background: `linear-gradient(to bottom, transparent, ${i % 2 === 0 ? "#00f0ff" : "#7c3aed"}${Math.floor(5 + Math.random() * 10).toString(16)}, transparent)`,
            }}
            animate={{
              y: [-30, 30],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{
            width: 500,
            height: 500,
            marginLeft: -250,
            marginTop: -250,
            background: "radial-gradient(circle, rgba(0,240,255,0.03) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 text-center max-w-4xl mx-auto mb-16 md:mb-24"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-cyan/50" />
          <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-neon-cyan/50 uppercase">
            Section 01
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-cyan/50" />
        </div>

        <motion.h2 className="font-orbitron text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tight">
          <span className="gradient-text">THE AGE OF</span>
          <br />
          <span className="gradient-text">CURIOSITY</span>
        </motion.h2>

        <motion.p className="font-grotesk text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
          Every revolution begins with a question. Humanity's relentless pursuit of understanding
          has driven us from the stars to the quantum realm.
        </motion.p>
      </motion.div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl w-full px-4">
        {elements.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 60, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="glass-card rounded-xl p-5 md:p-6 text-center group cursor-default relative overflow-hidden perspective-1000"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at center, ${item.color}, transparent)`,
              }}
            />

            <motion.div
              className="text-2xl md:text-3xl block mb-3"
              style={{ color: item.color }}
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            >
              {item.symbol}
            </motion.div>

            <h3
              className="font-orbitron text-xs md:text-sm font-bold mb-1 tracking-wider"
              style={{ color: item.color }}
            >
              {item.label}
            </h3>

            <p className="font-grotesk text-[10px] md:text-xs text-white/30">
              {item.desc}
            </p>

            <div
              className="absolute bottom-0 left-0 right-0 h-px transition-transform duration-500 scale-x-0 group-hover:scale-x-100"
              style={{
                background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
