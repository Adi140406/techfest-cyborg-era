import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const nodes = [
  { id: "competitions", label: "COMPETITIONS", x: 50, y: 18, color: "#00f0ff", icon: "🏆", connections: ["workshops", "exhibitions", "technoholix"] },
  { id: "workshops", label: "WORKSHOPS", x: 18, y: 42, color: "#7c3aed", icon: "🔧", connections: ["competitions", "exhibitions", "summits"] },
  { id: "exhibitions", label: "EXHIBITIONS", x: 82, y: 42, color: "#0088ff", icon: "🎪", connections: ["competitions", "workshops", "startup"] },
  { id: "summits", label: "SUMMITS", x: 32, y: 68, color: "#a855f7", icon: "🎤", connections: ["workshops", "technoholix", "research"] },
  { id: "technoholix", label: "TECHNOHOLIX", x: 68, y: 68, color: "#00f0ff", icon: "🎮", connections: ["competitions", "summits", "startup"] },
  { id: "startup", label: "STARTUP ZONE", x: 18, y: 88, color: "#7c3aed", icon: "🚀", connections: ["exhibitions", "technoholix", "research"] },
  { id: "research", label: "RESEARCH", x: 82, y: 88, color: "#0088ff", icon: "🔬", connections: ["summits", "startup"] },
];

const nodeMap = {};
nodes.forEach((n) => { nodeMap[n.id] = n; });

export default function SectionEcosystem() {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.2], [80, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hoveredId) {
        const randomId = nodes[Math.floor(Math.random() * nodes.length)].id;
        setActiveId(randomId);
        setTimeout(() => setActiveId(null), 1500);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [hoveredId]);

  const isConnected = (id) => {
    if (!hoveredId && !activeId) return "neutral";
    const source = hoveredId || activeId;
    if (!source) return "neutral";
    if (id === source) return "active";
    const node = nodeMap[source];
    if (node && node.connections.includes(id)) return "connected";
    return "dimmed";
  };

  const getConnectionOpacity = (from, to) => {
    const fromState = isConnected(from);
    const toState = isConnected(to);
    if (fromState === "active" && toState === "connected") return 0.9;
    if (toState === "active" && fromState === "connected") return 0.9;
    if (fromState === "connected" && toState === "connected") return 0.4;
    return 0.06;
  };

  return (
    <section
      id="ecosystem"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 md:py-32 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-navy to-deep-space pointer-events-none z-0" />

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 text-center max-w-4xl mx-auto mb-12 md:mb-16"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-cyan/50" />
          <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-neon-cyan/50 uppercase">
            Section 03
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-cyan/50" />
        </div>

        <motion.h2 className="font-orbitron text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tight">
          <span className="gradient-text">THE TECHFEST</span>
          <br />
          <span className="gradient-text">ECOSYSTEM</span>
        </motion.h2>

        <motion.p className="font-grotesk text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
          ONE FESTIVAL. INFINITE POSSIBILITIES.
        </motion.p>
      </motion.div>

      <div className="relative z-10 w-full max-w-4xl mx-auto aspect-square md:aspect-[4/3] px-4">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ filter: "url(#glow)" }}
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {nodes.map((node) =>
            node.connections.map((targetId) => {
              const target = nodeMap[targetId];
              if (!target) return null;
              const key = [node.id, targetId].sort().join("-");
              const opacity = getConnectionOpacity(node.id, targetId);
              const isHighlighted = opacity > 0.4;
              const strokeColor = isHighlighted
                ? hoveredId === node.id || activeId === node.id
                  ? node.color
                  : target.color
                : "#ffffff";
              return (
                <line
                  key={key}
                  x1={node.x}
                  y1={node.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={strokeColor}
                  strokeWidth={isHighlighted ? 0.5 : 0.12}
                  opacity={opacity}
                  className="transition-all duration-500"
                />
              );
            })
          )}

          {nodes.map((node) => {
            const state = isConnected(node.id);
            const r = state === "active" ? 5.5 : 3.5;
            const opacity = state === "dimmed" ? 0.2 : 1;
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ cursor: "pointer" }}
              >
                {state === "active" && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={12}
                    fill="none"
                    stroke={node.color}
                    strokeWidth={0.3}
                    opacity={0.6}
                  >
                    <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={r}
                  fill={node.color}
                  opacity={opacity}
                  className="transition-all duration-300"
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={10}
                  fill="none"
                  stroke={node.color}
                  strokeWidth={state === "active" ? 0.5 : 0.2}
                  opacity={state === "active" ? 0.5 : 0.15}
                  className="transition-all duration-300"
                />
                <text
                  x={node.x}
                  y={node.y - 8}
                  textAnchor="middle"
                  fill={state === "active" ? node.color : "#ffffff"}
                  opacity={state === "dimmed" ? 0.15 : 0.7}
                  fontSize="2.2"
                  fontFamily="Orbitron, sans-serif"
                  fontWeight="700"
                  className="transition-all duration-300"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {hoveredId && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mt-6 glass-panel px-6 py-3 rounded-lg border border-neon-cyan/10"
        >
          <p className="font-mono text-[10px] text-neon-cyan/60 tracking-wider">
            {nodeMap[hoveredId]?.label} — {nodeMap[hoveredId]?.connections.length} connections active
          </p>
        </motion.div>
      )}

      {!hoveredId && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative z-10 mt-8 font-mono text-[10px] text-white/20 tracking-[0.2em] uppercase"
        >
          Hover over a node to explore connections
        </motion.p>
      )}
    </section>
  );
}
