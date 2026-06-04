import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const innovations = [
  {
    title: "AI",
    desc: "Artificial Intelligence & Machine Learning reshaping every industry.",
    icon: "◆",
    gradient: "from-neon-cyan to-neon-blue",
    color: "#00f0ff",
    particles: ["ML", "DL", "NLP", "CV"],
  },
  {
    title: "ROBOTICS",
    desc: "Autonomous systems and humanoid robots redefining automation.",
    icon: "⬥",
    gradient: "from-neon-purple to-neon-violet",
    color: "#7c3aed",
    particles: ["ROS", "CV", "PLC", "IoT"],
  },
  {
    title: "SPACE TECH",
    desc: "Exploring beyond boundaries with next-gen aerospace innovations.",
    icon: "◇",
    gradient: "from-neon-blue to-neon-cyan",
    color: "#0088ff",
    particles: ["SAT", "RKT", "RVR", "SDR"],
  },
  {
    title: "CYBERSECURITY",
    desc: "Securing the digital frontier with advanced cryptographic systems.",
    icon: "◈",
    gradient: "from-neon-violet to-neon-purple",
    color: "#a855f7",
    particles: ["ZKP", "TLS", "WAF", "SOC"],
  },
  {
    title: "SUSTAINABLE ENGG",
    desc: "Green technology and sustainable solutions for a better tomorrow.",
    icon: "⟐",
    gradient: "from-neon-cyan to-emerald-400",
    color: "#00f0ff",
    particles: ["EV", "SOL", "WND", "GRN"],
  },
  {
    title: "FUTURE MOBILITY",
    desc: "Electric vehicles, hyperloop, and autonomous transportation networks.",
    icon: "⟡",
    gradient: "from-neon-blue to-neon-violet",
    color: "#0088ff",
    particles: ["EVT", "HPR", "ADS", "V2X"],
  },
];

export default function SectionInnovation() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      id="innovation"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 md:py-32 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-[#080c24] to-deep-space pointer-events-none z-0" />

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 rounded-full border border-neon-purple/5"
          style={{
            width: 700,
            height: 700,
            marginLeft: -350,
            marginTop: -350,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 rounded-full border border-neon-cyan/5"
          style={{
            width: 500,
            height: 500,
            marginLeft: -250,
            marginTop: -250,
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 text-center max-w-4xl mx-auto mb-16 md:mb-20"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-purple/50" />
          <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-neon-purple/50 uppercase">
            Section 02
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-purple/50" />
        </div>

        <motion.h2 className="font-orbitron text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tight">
          <span className="gradient-text">THE AGE OF</span>
          <br />
          <span className="gradient-text">INNOVATION</span>
        </motion.h2>

        <motion.p className="font-grotesk text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
          Ideas become inventions. From laboratory breakthroughs to real-world impact,
          technology transforms the impossible into the inevitable.
        </motion.p>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl w-full px-4">
        {innovations.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -12, scale: 1.03 }}
            className="glass-card rounded-xl p-6 md:p-8 group cursor-default relative overflow-hidden perspective-1000"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`}
            />

            <div className="relative z-10">
              <motion.div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-lg`}
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              >
                <span className="text-lg text-white">{item.icon}</span>
              </motion.div>

              <h3
                className="font-orbitron text-lg md:text-xl font-bold mb-2 tracking-wider"
                style={{ color: item.color }}
              >
                {item.title}
              </h3>

              <p className="font-grotesk text-xs md:text-sm text-white/40 leading-relaxed mb-4">
                {item.desc}
              </p>

              <div className="flex gap-1.5 flex-wrap">
                {item.particles.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[7px] tracking-wider px-2 py-0.5 rounded"
                    style={{
                      background: `${item.color}15`,
                      color: item.color,
                      border: `1px solid ${item.color}20`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
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
