import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line, Sphere, MeshDistortMaterial, Stars, Text, Trail } from "@react-three/drei";
import * as THREE from "three";

function AICore({ mouse }) {
  const coreRef = useRef();
  const innerRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.getElapsedTime() * 0.15 + mouse.current.x * 0.8;
      coreRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1 + mouse.current.y * 0.5;
      coreRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      innerRef.current.rotation.z = state.clock.getElapsedTime() * 0.15;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05);
    }
  });

  return (
    <group ref={coreRef} position={[0, 0.5, 0]}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.05} />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[1.8, 1]} />
        <MeshDistortMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.5}
          distort={0.4}
          speed={3}
        />
      </mesh>

      <group ref={innerRef}>
        <mesh>
          <icosahedronGeometry args={[1.0, 0]} />
          <MeshDistortMaterial
            color="#7c3aed"
            emissive="#7c3aed"
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
            distort={0.3}
            speed={2}
          />
        </mesh>
      </group>

      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial
          color="#ffffff"
          emissive="#00f0ff"
          emissiveIntensity={2}
          transparent
          opacity={0.4}
          distort={0.05}
          speed={0.5}
        />
      </mesh>

      <OrbitalRing radius={2.5} color="#00f0ff" speed={0.3} tilt={0} />
      <OrbitalRing radius={3.2} color="#7c3aed" speed={-0.2} tilt={0.3} />
      <OrbitalRing radius={3.8} color="#0088ff" speed={0.25} tilt={-0.2} />
      <OrbitalRing radius={4.5} color="#a855f7" speed={-0.15} tilt={0.5} />

      <FloatingParticles count={80} radius={5} color="#00f0ff" />
    </group>
  );
}

function OrbitalRing({ radius, color, speed, tilt }) {
  const ringRef = useRef();
  const points = useMemo(() => {
    const pts = [];
    const segments = 80;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return pts;
  }, [radius]);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = tilt;
      ringRef.current.rotation.z += speed * 0.008;
    }
  });

  return (
    <group ref={ringRef}>
      <Line points={points} color={color} lineWidth={1} transparent opacity={0.25} />
      {[0, 0.25, 0.5, 0.75].map((offset) => (
        <mesh key={offset} position={[
          Math.cos(offset * Math.PI * 2) * radius,
          0,
          Math.sin(offset * Math.PI * 2) * radius
        ]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingParticles({ count, radius, color }) {
  const particles = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.5 + Math.random() * 0.5);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      speeds[i] = 0.2 + Math.random() * 0.3;
    }
    return { position: pos, speeds };
  }, [count, radius]);

  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.03) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.position}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={color} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function CityBuilding({ position, height, width = 0.3, depth = 0.3, color, emissiveColor }) {
  const ref = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.3 + position[0] * 2) * 0.05;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 0.2 + Math.sin(state.clock.getElapsedTime() * 1.5 + position[0] * 3) * 0.15;
    }
  });

  const windows = useMemo(() => {
    const arr = [];
    const floors = Math.floor(height / 0.3);
    for (let f = 0; f < floors; f++) {
      if (Math.random() > 0.4) {
        arr.push({
          y: -height / 2 + 0.15 + f * 0.3,
          lit: Math.random() > 0.3,
        });
      }
    }
    return arr;
  }, [height]);

  return (
    <group position={position}>
      <mesh ref={ref}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={color || "#0a0e27"}
          emissive={emissiveColor || color || "#0a0e27"}
          emissiveIntensity={0.15}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {windows.map((w, i) => (
        <mesh key={i} position={[0, w.y, depth / 2 + 0.01]}>
          <planeGeometry args={[width * 0.6, 0.12]} />
          <meshBasicMaterial
            color={w.lit ? "#00f0ff" : "#1a1a2e"}
            transparent
            opacity={w.lit ? 0.6 : 0.3}
          />
        </mesh>
      ))}

      <pointLight ref={lightRef} position={[0, height / 2 + 0.3, 0]} distance={1.5} intensity={0.3} color={emissiveColor || "#00f0ff"} />

      <mesh position={[0, height / 2 + 0.02, 0]}>
        <boxGeometry args={[width * 1.3, 0.03, depth * 1.3]} />
        <meshBasicMaterial color={emissiveColor || "#00f0ff"} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Cityscape({ scrollProgress }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = -scrollProgress.current * 2;
    }
  });

  const buildings = useMemo(() => {
    const arr = [];
    const cols = 24;
    const rows = 24;
    const spread = 30;

    const colors = ["#0a0e27", "#0f1535", "#1a1040", "#0d1b2a", "#151025", "#0a1628"];
    const emissiveColors = ["#00f0ff", "#7c3aed", "#0088ff", "#a855f7", "#00f0ff", "#7c3aed"];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i / cols - 0.5) * spread;
        const z = (j / rows - 0.5) * spread;
        const dist = Math.sqrt(x * x + z * z);

        if (dist > 14) continue;
        if (dist < 2) continue;

        const heightFactor = 1 - dist / 14;
        const height = 0.3 + Math.random() * 4 * heightFactor + (heightFactor > 0.7 ? Math.random() * 2 : 0);
        const w = 0.15 + Math.random() * 0.35;
        const d = 0.15 + Math.random() * 0.35;
        const colorIdx = Math.floor(Math.random() * colors.length);

        arr.push({
          position: [x, height / 2 - 0.3, z],
          height,
          width: w,
          depth: d,
          color: colors[colorIdx % colors.length],
          emissiveColor: emissiveColors[Math.floor(Math.random() * emissiveColors.length)],
        });
      }
    }
    return arr;
  }, []);

  return (
    <group ref={groupRef}>
      {buildings.map((b, i) => (
        <CityBuilding key={i} {...b} />
      ))}
    </group>
  );
}

function DroneSwarm() {
  const count = 25;
  const drones = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      offset: (i / count) * Math.PI * 2,
      radius: 4 + Math.random() * 6,
      height: 2 + Math.random() * 5,
      speed: 0.15 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  return (
    <group>
      {drones.map((drone, i) => (
        <SwarmDrone key={i} drone={drone} />
      ))}
    </group>
  );
}

function SwarmDrone({ drone }) {
  const ref = useRef();
  const trailRef = useRef();

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * drone.speed + drone.offset;
      const x = Math.cos(t) * drone.radius * (0.5 + 0.5 * Math.sin(t * 0.3));
      const z = Math.sin(t * 0.7) * drone.radius * (0.5 + 0.5 * Math.cos(t * 0.3));
      const y = drone.height + Math.sin(t * 0.5 + drone.phase) * 0.8;
      ref.current.position.set(x, y, z);
      ref.current.rotation.y = t;
      ref.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <octahedronGeometry args={[0.08, 0]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.7} />
      </mesh>
      <pointLight distance={1.5} intensity={0.15} color="#00f0ff" />
    </group>
  );
}

function HolographicBillboards({ scrollProgress }) {
  const billboards = useMemo(() => [
    { text: "INNOVATE", pos: [-5, 2, -6], color: "#00f0ff" },
    { text: "CREATE", pos: [5, 1.5, -7], color: "#7c3aed" },
    { text: "ASCEND", pos: [-4, 3, -8], color: "#0088ff" },
    { text: "FUTURE", pos: [6, 2.5, -9], color: "#a855f7" },
  ], []);

  return (
    <group>
      {billboards.map((b, i) => (
        <FloatingBillboard key={i} {...b} />
      ))}
    </group>
  );
}

function FloatingBillboard({ text, pos, color }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = pos[1] + Math.sin(state.clock.getElapsedTime() * 0.5 + pos[0]) * 0.2;
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2 + pos[0]) * 0.1;
    }
  });

  return (
    <group ref={ref} position={pos}>
      <mesh>
        <planeGeometry args={[2.5, 0.6]} />
        <meshBasicMaterial color={color} transparent opacity={0.06} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[2.3, 0.4]} />
        <meshBasicMaterial color={color} transparent opacity={0.03} />
      </mesh>
    </group>
  );
}

function EnergyGrid() {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.z = (state.clock.getElapsedTime() * 0.5) % 1;
    }
  });

  return (
    <group>
      <gridHelper
        args={[35, 40, "#00f0ff", "#0a0e27"]}
        position={[0, -0.4, 0]}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.38, 0]}>
        <planeGeometry args={[35, 35]} />
        <meshBasicMaterial color="#050816" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function DataParticles() {
  const count = 200;
  const ref = useRef();
  const data = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = Math.random() * 15 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
      sizes[i] = 0.02 + Math.random() * 0.06;
    }
    return { position: pos, sizes };
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={data.position}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={data.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00f0ff"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function SceneContent({ mouse, scrollProgress }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[10, 15, 5]} intensity={0.4} color="#0088ff" />
      <directionalLight position={[-10, -5, -10]} intensity={0.2} color="#7c3aed" />
      <hemisphereLight args={["#00f0ff", "#7c3aed", 0.3]} />

      <AICore mouse={mouse} />
      <Cityscape scrollProgress={scrollProgress} />
      <DroneSwarm />
      <HolographicBillboards scrollProgress={scrollProgress} />
      <EnergyGrid />
      <DataParticles />

      <Stars radius={60} depth={60} count={2000} factor={5} saturation={0} fade speed={0.5} />

      <fog attach="fog" args={["#050816", 18, 35]} />
    </>
  );
}

function SceneContentWrapper({ mouse, scrollProgress }) {
  return <SceneContent mouse={mouse} scrollProgress={scrollProgress} />;
}

export default function ThreeScene({ mouse, scrollProgress }) {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 7], fov: 60, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <SceneContentWrapper mouse={mouse} scrollProgress={scrollProgress} />
    </Canvas>
  );
}
