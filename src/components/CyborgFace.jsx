import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Line } from "@react-three/drei";
import * as THREE from "three";

function FaceMesh({ progress }) {
  const headRef = useRef();
  const visorRef = useRef();
  const scanRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
      headRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
      headRef.current.position.y = Math.sin(t * 0.4) * 0.05;
    }

    if (visorRef.current) {
      visorRef.current.position.y = (Math.sin(t * 2) * 0.02) - 0.1;
    }

    if (scanRef.current) {
      scanRef.current.position.y = ((t * 0.5) % 2) - 1;
    }
  });

  return (
    <group ref={headRef} position={[0, 0, 0]}>
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color="#0088ff"
          emissive="#0066ff"
          emissiveIntensity={0.3 + progress * 0.4}
          wireframe
          transparent
          opacity={0.6 + progress * 0.3}
          distort={0.2 + (1 - progress) * 0.3}
          speed={2}
        />
      </mesh>

      <mesh position={[0, 0, 0.05]}>
        <icosahedronGeometry args={[0.85, 1]} />
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.2 + progress * 0.3}
          wireframe
          transparent
          opacity={0.3 + progress * 0.2}
          distort={0.15}
          speed={1.5}
        />
      </mesh>

      <group ref={visorRef} position={[0, -0.1, 0.2]}>
        <mesh>
          <cylinderGeometry args={[0.6, 0.6, 0.08, 24, 1, true]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.3 + progress * 0.4}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh position={[0, 0, 0.01]}>
          <ringGeometry args={[0.3, 0.55, 32]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh position={[0.25, 0, 0.04]}>
          <boxGeometry args={[0.02, 0.1, 0.01]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} />
        </mesh>
        <mesh position={[-0.25, 0, 0.04]}>
          <boxGeometry args={[0.02, 0.1, 0.01]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} />
        </mesh>
      </group>

      <mesh position={[0, 0.3, 0.15]}>
        <boxGeometry args={[0.05, 0.15, 0.05]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.4} />
      </mesh>

      {[-0.35, 0.35].map((x, i) => (
        <group key={i} position={[x, 0.15, 0.18]}>
          <mesh>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.5} />
          </mesh>
          <pointLight distance={0.5} intensity={0.2} color="#00f0ff" />
        </group>
      ))}

      {/* scanning line */}
      <mesh ref={scanRef} position={[0, 0, 0.3]} scale={[1.2, 1, 1]}>
        <planeGeometry args={[1.8, 0.02]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.6 * progress}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <pointLight position={[0, 0, 2]} distance={3} intensity={0.5} color="#0088ff" />
    </group>
  );
}

function ParticleRing({ progress }) {
  const count = 40;
  const ref = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      pos[i * 3] = Math.cos(theta) * 1.8;
      pos[i * 3 + 1] = Math.sin(theta) * 0.3;
      pos[i * 3 + 2] = Math.sin(theta) * 0.5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00f0ff"
        transparent
        opacity={0.3 * progress}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Scene({ progress }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <FaceMesh progress={progress} />
      <ParticleRing progress={progress} />
      <fog attach="fog" args={["#050816", 3, 6]} />
    </>
  );
}

export default function CyborgFace({ progress }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{
        width: "200px",
        height: "200px",
        margin: "0 auto",
      }}
    >
      <Scene progress={progress} />
    </Canvas>
  );
}
