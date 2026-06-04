import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const stats = [
  { value: "300+", label: "EVENTS", desc: "Competitions, workshops, exhibitions & more", suffix: "Events" },
  { value: "180K+", label: "VISITORS", desc: "Students and innovators from across the globe", suffix: "Visitors" },
  { value: "50+", label: "COUNTRIES", desc: "Global participation and international collaboration", suffix: "Countries" },
  { value: "₹1Cr+", label: "PRIZE POOL", desc: "Winning rewards for groundbreaking innovation", suffix: "Prize" },
];

const achievementItems = [
  { label: "TECHNOLOGY SHOWCASES", value: "200+", color: "#00f0ff", progress: 95 },
  { label: "SPEAKERS & MENTORS", value: "150+", color: "#7c3aed", progress: 85 },
  { label: "STARTUP EXHIBITORS", value: "75+", color: "#0088ff", progress: 70 },
  { label: "MEDIA COVERAGE", value: "1B+", color: "#a855f7", progress: 90 },
  { label: "VOLUNTEERS", value: "2000+", color: "#00f0ff", progress: 88 },
];

function AnimatedCounter({ to, suffix = "" }) {
  const num = parseInt(to);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className="block font-orbitron text-2xl md:text-4xl lg:text-5xl font-black gradient-text mb-2"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CountingNumber to={num} />{suffix ? "+" : ""}
        </motion.span>
      ) : (
        "0"
      )}
    </motion.span>
  );
}

function CountingNumber({ to }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress: countProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const count = useTransform(countProgress, [0, 1], [0, to]);

  return (
    <span ref={ref}>
      <motion.span>{Math.floor(count.get())}</motion.span>
    </span>
  );
}

export default function SectionBuilders() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.2], [80, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      id="builders"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 md:py-32 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-[#0a0e27] to-deep-space pointer-events-none z-0" />

      <div className="absolute inset-0 z-[1] pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 4,
              height: 2 + Math.random() * 4,
              background: i % 2 === 0 ? "#00f0ff" : "#7c3aed",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 text-center max-w-4xl mx-auto mb-16 md:mb-20"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-cyan/50" />
          <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-neon-cyan/50 uppercase">
            Section 04
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-cyan/50" />
        </div>

        <motion.h2 className="font-orbitron text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tight">
          <span className="gradient-text">THE BUILDERS OF</span>
          <br />
          <span className="gradient-text">TOMORROW</span>
        </motion.h2>

        <motion.p className="font-grotesk text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
          A global community of innovators connected by a shared vision of the future.
        </motion.p>
      </motion.div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl w-full px-4 mb-12 md:mb-16">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-card rounded-xl p-5 md:p-6 text-center group"
          >
            <AnimatedCounter to={parseInt(stat.value)} suffix={stat.value.includes("+")} />
            <h3 className="font-orbitron text-[10px] md:text-xs font-bold text-white/80 tracking-wider mb-1">
              {stat.label}
            </h3>
            <p className="font-grotesk text-[8px] md:text-[10px] text-white/30 leading-relaxed">
              {stat.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-xl p-6 md:p-8 border border-white/5"
        >
          <h3 className="font-orbitron text-xs md:text-sm font-bold text-white/60 tracking-wider mb-6 uppercase text-center">
            Achievement Dashboard
          </h3>
          <div className="space-y-5">
            {achievementItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group"
              >
                <div className="flex justify-between mb-1.5">
                  <span className="font-mono text-[9px] md:text-[10px] tracking-wider text-white/40">
                    {item.label}
                  </span>
                  <span
                    className="font-mono text-[10px] md:text-xs font-bold"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </span>
                </div>
                <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: i * 0.15, ease: "easeOut" }}
                    className="h-full rounded-full relative"
                    style={{
                      background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
                    }}
                  >
                    <div
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                      style={{ background: item.color, boxShadow: `0 0 10px ${item.color}` }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
