import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars, Environment } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import "./Game.css";

/* =========================
   ASTRONAUT
========================= */

function Astronaut({ position }) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;

    group.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.025;
  });

  return (
    <group ref={group} position={position}>
      {/* Body */}
      <mesh castShadow>
        <capsuleGeometry args={[0.38, 0.7, 6, 12]} />
        <meshStandardMaterial
          color="#e5e7eb"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Helmet */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <sphereGeometry args={[0.34, 20, 20]} />
        <meshStandardMaterial
          color="#f8fafc"
          roughness={0.25}
        />
      </mesh>

      {/* Visor */}
      <mesh position={[0, 0.72, -0.3]}>
        <sphereGeometry args={[0.235, 20, 20]} />
        <meshStandardMaterial
          color="#07111f"
          metalness={0.8}
          roughness={0.1}
          emissive="#06111f"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Backpack */}
      <mesh position={[0, 0.05, 0.42]}>
        <boxGeometry args={[0.42, 0.65, 0.2]} />
        <meshStandardMaterial
          color="#cbd5e1"
          roughness={0.5}
        />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.5, 0.05, 0]} rotation={[0, 0, -0.18]}>
        <capsuleGeometry args={[0.12, 0.6, 5, 10]} />
        <meshStandardMaterial color="#dbeafe" />
      </mesh>

      <mesh position={[0.5, 0.05, 0]} rotation={[0, 0, 0.18]}>
        <capsuleGeometry args={[0.12, 0.6, 5, 10]} />
        <meshStandardMaterial color="#dbeafe" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.2, -0.65, 0]}>
        <capsuleGeometry args={[0.14, 0.5, 5, 10]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>

      <mesh position={[0.2, -0.65, 0]}>
        <capsuleGeometry args={[0.14, 0.5, 5, 10]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>

      {/* Chest light */}
      <mesh position={[0, 0.15, -0.39]}>
        <boxGeometry args={[0.12, 0.08, 0.025]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={3}
        />
      </mesh>
    </group>
  );
}

/* =========================
   MARS
========================= */

function MarsGround() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1, 0]}
      receiveShadow
    >
      <planeGeometry args={[100, 100, 40, 40]} />

      <meshStandardMaterial
        color="#713f12"
        roughness={1}
      />
    </mesh>
  );
}

/* =========================
   ROCKS
========================= */

function Rocks() {
  const rocks = useRef([]);

  if (rocks.current.length === 0) {
    for (let i = 0; i < 30; i++) {
      const x = (Math.random() - 0.5) * 90;
      const z = (Math.random() - 0.5) * 90;

      if (Math.abs(x) < 6 && Math.abs(z) < 6) continue;

      rocks.current.push({
        x,
        z,
        scale: Math.random() * 1.2 + 0.3,
        rotation: Math.random() * Math.PI,
      });
    }
  }

  return (
    <group>
      {rocks.current.map((rock, i) => (
        <mesh
          key={i}
          position={[rock.x, -0.35, rock.z]}
          rotation={[0, rock.rotation, 0]}
          scale={rock.scale}
          castShadow
        >
          <dodecahedronGeometry args={[0.65, 0]} />

          <meshStandardMaterial
            color="#542d0b"
            roughness={1}
          />
        </mesh>
      ))}
    </group>
  );
}

/* =========================
   EARTH
========================= */

function Earth() {
  const earthRef = useRef();

  const [
    earthTexture,
    earthNormal,
    cloudTexture,
  ] = useLoader(THREE.TextureLoader, [
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
    "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg",
    "https://threejs.org/examples/textures/planets/earth_clouds_1024.png",
  ]);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group
      ref={earthRef}
      position={[0, 15, -40]}
    >
      {/* Earth */}
      <mesh>
        <sphereGeometry args={[13, 64, 64]} />

        <meshPhongMaterial
          map={earthTexture}
          normalMap={earthNormal}
          normalScale={new THREE.Vector2(0.25, 0.25)}
          shininess={15}
        />
      </mesh>

      {/* Clouds */}
      <mesh scale={1.012}>
        <sphereGeometry args={[13, 64, 64]} />

        <meshPhongMaterial
          map={cloudTexture}
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere */}
      <mesh scale={1.055}>
        <sphereGeometry args={[13, 48, 48]} />

        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/* =========================
   SPACE STATION
========================= */

function SpaceStation() {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y =
        state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group
      ref={ref}
      position={[18, 9, -18]}
      scale={1.1}
    >
      <mesh>
        <cylinderGeometry args={[0.7, 0.7, 4, 16]} />
        <meshStandardMaterial
          color="#cbd5e1"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[3, 0, 0]}>
        <boxGeometry args={[5, 0.08, 1.7]} />
        <meshStandardMaterial
          color="#172554"
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[-3, 0, 0]}>
        <boxGeometry args={[5, 0.08, 1.7]} />
        <meshStandardMaterial
          color="#172554"
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

/* =========================
   PLAYER
========================= */

function PlayerController({ onMove }) {
  const keys = useRef({});

  useEffect(() => {
    const down = (e) => {
      keys.current[e.key.toLowerCase()] = true;
    };

    const up = (e) => {
      keys.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame(() => {
    const speed = 0.12;

    let x = 0;
    let z = 0;

    if (keys.current.w) z -= speed;
    if (keys.current.s) z += speed;
    if (keys.current.a) x -= speed;
    if (keys.current.d) x += speed;

    if (x || z) {
      onMove(x, z);
    }
  });

  return null;
}

/* =========================
   CAMERA
========================= */

function CameraFollow({ playerPosition }) {
  useFrame(({ camera }) => {
    const desired = new THREE.Vector3(
      playerPosition[0],
      playerPosition[1] + 4.5,
      playerPosition[2] + 8
    );

    camera.position.lerp(desired, 0.08);

    camera.lookAt(
      playerPosition[0],
      playerPosition[1] + 1.5,
      playerPosition[2]
    );
  });

  return null;
}

/* =========================
   SCENE
========================= */

function Scene({
  playerPosition,
  setPlayerPosition,
}) {
  return (
    <>
      <Stars
        radius={150}
        depth={80}
        count={2500}
        factor={3}
        saturation={0}
        fade
        speed={0.15}
      />

      <Environment preset="night" />

      <ambientLight intensity={0.3} />

      <directionalLight
        position={[-30, 35, -30]}
        intensity={2.5}
        color="#fff2cc"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <directionalLight
        position={[20, 15, 20]}
        intensity={0.25}
        color="#60a5fa"
      />

      <MarsGround />

      <Rocks />

      <Earth />

      <SpaceStation />

      <Astronaut position={playerPosition} />

      <PlayerController
        onMove={(x, z) => {
          setPlayerPosition((prev) => [
            THREE.MathUtils.clamp(
              prev[0] + x,
              -45,
              45
            ),
            prev[1],
            THREE.MathUtils.clamp(
              prev[2] + z,
              -45,
              45
            ),
          ]);
        }}
      />

      <CameraFollow
        playerPosition={playerPosition}
      />
    </>
  );
}

/* =========================
   GAME
========================= */

export default function Game() {
  const [started, setStarted] = useState(false);

  const [playerPosition, setPlayerPosition] =
    useState([0, 0, 8]);

  return (
    <section className="game-section">
      <div className="game-wrapper">

        <div className="game-header">
          <div>
            <span className="game-label">
              PORTFOLIO GAME
            </span>

            <h2>
              MARS <span>MISSION</span>
            </h2>
          </div>

          <div className="game-status">
            <span className="status-dot"></span>
            LIVE SIMULATION
          </div>
        </div>

        <div className="game-screen">

          <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{
              position: [0, 4, 12],
              fov: 52,
              near: 0.1,
              far: 300,
            }}
            gl={{
              antialias: true,
              powerPreference: "high-performance",
              toneMapping:
                THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.1,
            }}
          >
            <Scene
              playerPosition={playerPosition}
              setPlayerPosition={setPlayerPosition}
            />
          </Canvas>

          {!started && (
            <div className="game-start">
              <div className="game-start-card">

                <div className="planet-icon">
                  🌍
                </div>

                <div className="mission-tag">
                  MISSION 001
                </div>

                <h1>
                  MARS
                  <br />
                  <span>EXPLORER</span>
                </h1>

                <p>
                  Explore the Martian surface.
                </p>

                <button
                  className="start-button"
                  onClick={() => setStarted(true)}
                >
                  START MISSION
                </button>

                <div className="controls">
                  <span>W</span>
                  <span>A</span>
                  <span>S</span>
                  <span>D</span>
                </div>

                <small>
                  W A S D — MOVE
                </small>

              </div>
            </div>
          )}

          {started && (
            <>
              <div className="hud-top">
                <div>
                  <span>LOCATION</span>
                  <strong>
                    MARS • SECTOR 07
                  </strong>
                </div>

                <div>
                  <span>OBJECTIVE</span>
                  <strong>
                    EXPLORE
                  </strong>
                </div>
              </div>

              <div className="hud-bottom">
                <div className="crosshair">
                  +
                </div>

                <div className="hud-controls">
                  W A S D
                  <small>MOVE</small>
                </div>
              </div>
            </>
          )}

        </div>

        <div className="game-footer">
          <span>THREE.JS</span>
          <span>•</span>
          <span>WEBGL</span>
          <span>•</span>
          <span>MARS SIMULATION</span>
        </div>

      </div>
    </section>
  );
}