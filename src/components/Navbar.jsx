import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "HOME", href: "#hero" },
  { label: "CURIOSITY", href: "#curiosity" },
  { label: "INNOVATION", href: "#innovation" },
  { label: "ECOSYSTEM", href: "#ecosystem" },
  { label: "IMPACT", href: "#builders" },
  { label: "ASCENSION", href: "#ascension" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 2.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-deep-space/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-8 h-8 md:w-10 md:h-10 border border-neon-cyan/50 rounded flex items-center justify-center">
            <span className="font-orbitron font-black text-xs md:text-sm text-neon-cyan">TF</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-orbitron text-[10px] font-bold tracking-wider text-white/80 block leading-tight">
              TECHFEST<br />2026
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[10px] tracking-[0.2em] text-white/40 hover:text-neon-cyan transition-colors duration-300 uppercase"
            >
              {link.label}
            </a>
          ))}
          <button className="px-5 py-2 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-orbitron text-[10px] tracking-[0.15em] uppercase hover:bg-neon-cyan/20 transition-all duration-300">
            Register
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            className="w-6 h-[1.5px] bg-white/60 block"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-[1.5px] bg-white/60 block"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            className="w-6 h-[1.5px] bg-white/60 block"
          />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-mono text-xs tracking-[0.2em] text-white/40 hover:text-neon-cyan transition-colors duration-300 uppercase"
                >
                  {link.label}
                </a>
              ))}
              <button className="w-full px-5 py-3 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-orbitron text-xs tracking-[0.15em] uppercase">
                Register
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
