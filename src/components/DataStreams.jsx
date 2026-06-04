import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

const codeSnippets = [
  "01001000 01100101 01101100 01101100 01101111",
  "const future = await innovate();",
  "while( curiosity ) { explore(); }",
  "SYSTEM::INITIALIZE_QUANTUM_CORE",
  "neural.network.connect(innovators);",
  "0x5465636866657374",
  "if (dream) { create.reality(); }",
  "async function buildTomorrow() {}",
  "curl -X POST /api/ascension",
  "git commit -m 'built the future'",
];

export default function DataStreams() {
  const streams = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      snippet: codeSnippets[i % codeSnippets.length],
      height: 100 + Math.random() * 200,
      fontSize: 7 + Math.random() * 5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute top-0"
          style={{
            left: `${stream.left}%`,
            height: `${stream.height}px`,
          }}
          initial={{ y: -stream.height }}
          animate={{ y: "100vh" }}
          transition={{
            duration: stream.duration,
            repeat: Infinity,
            delay: stream.delay,
            ease: "linear",
          }}
        >
          <span
            className="block font-mono text-neon-cyan/10 whitespace-nowrap"
            style={{ fontSize: `${stream.fontSize}px`, writingMode: "vertical-lr" }}
          >
            {stream.snippet}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
