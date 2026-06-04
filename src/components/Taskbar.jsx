import { useState } from "react";
import { motion } from "framer-motion";

const items = [
  { id: "home", label: "HOME", icon: "⌂" },
  { id: "events", label: "EVENTS", icon: "◈" },
  { id: "contact", label: "CONTACT", icon: "✉" },
  { id: "about", label: "ABOUT US", icon: "⛭" },
  { id: "sponsors", label: "SPONSORS", icon: "★" },
  { id: "store", label: "STORE", icon: "☰" },
  { id: "accommodation", label: "ACCOMMODATION", icon: "☷" },
];

export default function Taskbar() {
  const [active, setActive] = useState("home");

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.8 }}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1 py-4 px-2 glass-panel rounded-r-xl border-l-0 border border-white/5"
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`group relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
            active === item.id
              ? "text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20"
              : "text-white/30 hover:text-white/70 hover:bg-white/5"
          }`}
        >
          <span className="text-lg">{item.icon}</span>
          <span className="absolute left-full ml-3 px-3 py-1.5 rounded-md glass-panel border border-white/5 text-[9px] font-orbitron font-bold tracking-wider text-white/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {item.label}
          </span>
        </button>
      ))}
    </motion.aside>
  );
}
