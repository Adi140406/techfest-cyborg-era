import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 border border-neon-cyan/50 rounded flex items-center justify-center">
                <span className="font-orbitron font-black text-sm text-neon-cyan">TF</span>
              </div>
              <span className="font-orbitron text-xs font-bold tracking-wider text-white/60">
                TECHFEST 2026
              </span>
            </div>
            <p className="font-grotesk text-xs text-white/30 max-w-md leading-relaxed">
              Techfest IIT Bombay is Asia's largest Science and Technology Festival.
              Join us as we build the future, one innovation at a time.
            </p>
          </div>

          <div>
            <h4 className="font-orbitron text-[10px] font-bold text-white/40 tracking-wider uppercase mb-4">
              Navigate
            </h4>
            <div className="space-y-2">
              {["Home", "Events", "Workshops", "Sponsors"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block font-mono text-[10px] text-white/20 hover:text-neon-cyan transition-colors duration-300 tracking-wider uppercase"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-orbitron text-[10px] font-bold text-white/40 tracking-wider uppercase mb-4">
              Connect
            </h4>
            <div className="space-y-2">
              {["Instagram", "Twitter", "LinkedIn", "YouTube"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block font-mono text-[10px] text-white/20 hover:text-neon-cyan transition-colors duration-300 tracking-wider uppercase"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="holographic-divider mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[8px] text-white/10 tracking-widest">
            © 2026 TECHFEST IIT BOMBAY. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-[8px] text-white/10 tracking-widest">
            RISE OF THE CYBORG ERA
          </p>
        </div>
      </div>
    </footer>
  );
}
