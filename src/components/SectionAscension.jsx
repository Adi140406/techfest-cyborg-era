import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function SectionAscension() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.2], [120, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.85, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section
      id="ascension"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 md:py-32 px-4 overflow-hidden"
    >
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-deep-space via-[#0a0e27] to-deep-space pointer-events-none z-0"
      />

      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ opacity: bgOpacity }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 rounded-full border border-neon-cyan/10"
          style={{ width: 800, height: 800, marginLeft: -400, marginTop: -400 }}
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 rounded-full border border-neon-purple/10"
          style={{ width: 600, height: 600, marginLeft: -300, marginTop: -300 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 rounded-full border border-neon-cyan/20"
          style={{ width: 400, height: 400, marginLeft: -200, marginTop: -200 }}
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px"
            style={{
              top: `${15 + i * 9}%`,
              left: "2%",
              right: "2%",
              background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? "#00f0ff" : "#7c3aed"}${Math.floor(15).toString(16)}, transparent)`,
              transform: `rotate(${i * 3}deg)`,
              transformOrigin: "center",
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scaleX: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ y: titleY, opacity: titleOpacity, scale }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-cyan/50" />
          <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-neon-cyan/50 uppercase">
            Final Section
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-cyan/50" />
        </div>

        <motion.h2 className="font-orbitron text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
          <span className="gradient-text">BUILD THE</span>
          <br />
          <span className="gradient-text">FUTURE</span>
        </motion.h2>

        <motion.p className="font-grotesk text-base md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Join Asia's Largest Science and Technology Festival.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <MagneticButton className="px-12 py-5 text-sm md:text-base">
            REGISTER NOW
          </MagneticButton>
          <MagneticButton variant="secondary" className="px-8 py-5 text-xs">
            EXPLORE TECHFEST 2026
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-16 flex items-center justify-center gap-6 md:gap-10 flex-wrap"
        >
          {["INNOVATE", "CREATE", "INSPIRE", "TRANSFORM"].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + i * 0.2 }}
              className="font-orbitron text-[8px] md:text-[10px] tracking-[0.4em] text-white/20 uppercase"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-10"
        style={{ opacity: bgOpacity }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50" />
      </motion.div>
    </section>
  );
}
