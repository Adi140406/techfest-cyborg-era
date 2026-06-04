import { useState, useRef, useCallback } from "react";
import BootScreen from "./components/BootScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ThreeScene from "./components/ThreeScene";
import SectionCuriosity from "./components/SectionCuriosity";
import SectionInnovation from "./components/SectionInnovation";
import SectionEcosystem from "./components/SectionEcosystem";
import SectionBuilders from "./components/SectionBuilders";
import SectionAscension from "./components/SectionAscension";
import AIAssistant from "./components/AIAssistant";
import DataStreams from "./components/DataStreams";
import Taskbar from "./components/Taskbar";
import Footer from "./components/Footer";

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);

  const handleMouseMove = useCallback((e) => {
    mouse.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    };
  }, []);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.current = maxScroll > 0 ? scrollTop / maxScroll : 0;
  }, []);

  const handleExplore = useCallback(() => {
    const eventsSection = document.getElementById("ecosystem");
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleEnter = useCallback(() => {
    const curiositySection = document.getElementById("curiosity");
    if (curiositySection) {
      curiositySection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (!bootComplete) {
    return <BootScreen onComplete={() => setBootComplete(true)} />;
  }

  return (
    <div
      className="relative bg-deep-space text-white overflow-x-hidden"
      onMouseMove={handleMouseMove}
      onScroll={handleScroll}
    >
      <div className="fixed inset-0 z-0 bg-deep-space" />
      <ThreeScene mouse={mouse} scrollProgress={scrollProgress} />
      <DataStreams />
      <Taskbar />
      <Navbar />
      <Hero onExplore={handleExplore} onEnter={handleEnter} mouse={mouse} />
      <SectionCuriosity />
      <SectionInnovation />
      <SectionEcosystem />
      <SectionBuilders />
      <SectionAscension />
      <Footer />
      <AIAssistant />
    </div>
  );
}
