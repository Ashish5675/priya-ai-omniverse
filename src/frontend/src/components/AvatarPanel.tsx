import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type React from "react";
import * as THREE from "three";
import { useAriaStore } from "../store/useAriaStore";
import type { AvatarMood } from "../types";

// ─── Wardrobe color tables ─────────────────────────────────────────────────────
// Dress colors: index 0 = royal blue, 1 = deep red, 2 = black
const DRESS_COLORS = [0x4169e1, 0xcc3333, 0x222222] as const;
// Sandal colors driven by jeans index (tan/brown palette)
const SANDAL_COLORS = [0xa0785a, 0x7a4f3a, 0xc8a882] as const;

// ─── Skin / hair / base materials ─────────────────────────────────────────────

/** Warm tan skin tone */
function makeSkinMat(emissive = 0.08) {
  return new THREE.MeshPhongMaterial({
    color: new THREE.Color(0xd4956a),
    emissive: new THREE.Color(0xb06040),
    emissiveIntensity: emissive,
    shininess: 60,
    transparent: false,
  });
}

/** Dark brown hair */
function makeHairMat() {
  return new THREE.MeshPhongMaterial({
    color: new THREE.Color(0x3b1f0c),
    emissive: new THREE.Color(0x5c3d1e),
    emissiveIntensity: 0.25,
    shininess: 90,
  });
}

/** Cyan holographic wireframe overlay */
function makeWireMat() {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x00d9ff),
    wireframe: true,
    transparent: true,
    opacity: 0.09,
  });
}

/** Glowing cyan eye highlight */
function makeEyeMat() {
  return new THREE.MeshPhongMaterial({
    color: new THREE.Color(0xffffff),
    emissive: new THREE.Color(0x00d9ff),
    emissiveIntensity: 1.0,
    shininess: 200,
  });
}

/** Iris — warm hazel-brown */
function makeIrisMat() {
  return new THREE.MeshPhongMaterial({
    color: new THREE.Color(0x5a3a1a),
    emissive: new THREE.Color(0x00d9ff),
    emissiveIntensity: 0.15,
    shininess: 120,
  });
}

/** Lip color — soft rose */
function makeLipMat() {
  return new THREE.MeshPhongMaterial({
    color: new THREE.Color(0xb85c70),
    emissive: new THREE.Color(0x8b2040),
    emissiveIntensity: 0.2,
    shininess: 80,
  });
}

/** Dress fabric with subtle glow */
function makeDressMat(colorIndex: number) {
  const hex = DRESS_COLORS[colorIndex] ?? DRESS_COLORS[0];
  return new THREE.MeshPhongMaterial({
    color: new THREE.Color(hex),
    emissive: new THREE.Color(hex),
    emissiveIntensity: 0.28,
    shininess: 85,
    transparent: true,
    opacity: 0.97,
  });
}

/** Wedge sandal — tan/brown leather */
function makeSandalMat(colorIndex: number) {
  const hex = SANDAL_COLORS[colorIndex] ?? SANDAL_COLORS[0];
  return new THREE.MeshPhongMaterial({
    color: new THREE.Color(hex),
    emissive: new THREE.Color(hex),
    emissiveIntensity: 0.12,
    shininess: 55,
  });
}

/** Cyan accent bright — for glow accents */
function makeCyanBright(emissive = 0.95) {
  return new THREE.MeshPhongMaterial({
    color: new THREE.Color(0x00d9ff),
    emissive: new THREE.Color(0x00d9ff),
    emissiveIntensity: emissive,
    shininess: 130,
    transparent: true,
    opacity: 0.85,
  });
}

// ─── Shared gaze target (module-level, updated by mouse listener) ──────────────

const gazeTarget = { x: 0, y: 0 };
const gazeCurrent = { x: 0, y: 0 };

// ─── Particle system ──────────────────────────────────────────────────────────

function Particles({ mood }: { mood: AvatarMood }) {
  const COUNT = 60;
  const ref = useRef<THREE.Points>(null);

  const { geo, mat, baseAngles, baseSpeeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const ang = new Float32Array(COUNT);
    const spd = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      ang[i] = (i / COUNT) * Math.PI * 2;
      const r = 0.85 + Math.random() * 0.55;
      positions[i * 3] = Math.cos(ang[i]) * r;
      positions[i * 3 + 1] = 1.45 + (Math.random() - 0.5) * 1.1;
      positions[i * 3 + 2] = Math.sin(ang[i]) * r;
      spd[i] = 0.28 + Math.random() * 0.45;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const m = new THREE.PointsMaterial({
      color: 0x00d9ff,
      size: 0.038,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    return { geo: g, mat: m, baseAngles: ang, baseSpeeds: spd };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const attr = ref.current.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;

    const radiusMult =
      mood === "thinking"
        ? 1.55
        : mood === "speaking"
          ? 1.35
          : mood === "happy"
            ? 1.7
            : 1.0;
    const speedMult =
      mood === "thinking"
        ? 1.9
        : mood === "speaking"
          ? 1.5
          : mood === "happy"
            ? 1.4
            : 0.9;

    for (let i = 0; i < COUNT; i++) {
      const a = baseAngles[i] + t * baseSpeeds[i] * speedMult * 0.5;
      const r = (0.85 + Math.sin(t * baseSpeeds[i] + i) * 0.14) * radiusMult;
      attr.setX(i, Math.cos(a) * r);
      attr.setZ(i, Math.sin(a) * r);
      attr.setY(i, 1.45 + Math.sin(t * baseSpeeds[i] * 1.15 + i * 0.55) * 0.3);
    }
    attr.needsUpdate = true;

    mat.opacity =
      mood === "thinking" || mood === "speaking"
        ? 0.92
        : mood === "happy"
          ? 1.0
          : 0.55;
    mat.color.setHex(
      mood === "thinking" ? 0x9955ff : mood === "happy" ? 0x00ffcc : 0x00d9ff,
    );
  });

  return <points ref={ref} geometry={geo} material={mat} />;
}

// ─── Humanoid Body (Priya — realistic young woman) ────────────────────────────

function HumanoidBody({
  mood,
  wardrobeTop,
  wardrobeJeans,
  wardrobeHeels,
}: {
  mood: AvatarMood;
  wardrobeTop: number;
  wardrobeJeans: number;
  wardrobeHeels: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const jawRef = useRef<THREE.Mesh>(null);
  const eyeLRef = useRef<THREE.Mesh>(null);
  const eyeRRef = useRef<THREE.Mesh>(null);
  const glowRingRef = useRef<THREE.Mesh>(null);
  const chestGlowRef = useRef<THREE.Mesh>(null);

  const prevWardrobe = useRef({ top: -1, jeans: -1, heels: -1 });

  const { skin, skinBright, wire, eye, iris, hair, lip, cyanBright } = useMemo(
    () => ({
      skin: makeSkinMat(0.08),
      skinBright: makeSkinMat(0.18),
      wire: makeWireMat(),
      eye: makeEyeMat(),
      iris: makeIrisMat(),
      hair: makeHairMat(),
      lip: makeLipMat(),
      cyanBright: makeCyanBright(0.85),
    }),
    [],
  );

  // Wardrobe-driven materials
  const dressMat = useMemo(() => makeDressMat(wardrobeTop), [wardrobeTop]);
  const sandalMat = useMemo(
    () => makeSandalMat(wardrobeJeans),
    [wardrobeJeans],
  );

  const speakPhaseRef = useRef(0);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // ── Gaze lerp ────────────────────────────────────────────────────────────
    const LERP = 0.05;
    gazeCurrent.x += (gazeTarget.x - gazeCurrent.x) * LERP;
    gazeCurrent.y += (gazeTarget.y - gazeCurrent.y) * LERP;

    // ── Mood animations ──────────────────────────────────────────────────────
    if (mood === "idle") {
      groupRef.current.position.y = Math.sin(t * 0.75) * 0.07;
      groupRef.current.rotation.y = Math.sin(t * 0.28) * 0.12;
      skin.emissiveIntensity = 0.06 + Math.sin(t * 1.4) * 0.04;
      cyanBright.emissiveIntensity = 0.7 + Math.sin(t * 1.6) * 0.2;
    }

    if (mood === "thinking") {
      groupRef.current.rotation.y = t * 0.65;
      groupRef.current.position.y = 0;
      skin.emissiveIntensity = 0.1 + Math.sin(t * 3.2) * 0.08;
      cyanBright.emissiveIntensity = 0.9 + Math.sin(t * 2.8 + 1) * 0.4;
    }

    if (mood === "speaking") {
      groupRef.current.position.y = Math.sin(t * 4.2) * 0.03;
      skin.emissiveIntensity = 0.08 + Math.sin(t * 6.5) * 0.04;

      // Head movement while speaking ~0.8 Hz
      if (headRef.current) {
        const freq = 0.8 * Math.PI * 2;
        headRef.current.rotation.y =
          gazeCurrent.x * 0.3 + Math.sin(t * freq) * 0.15;
        headRef.current.rotation.x =
          gazeCurrent.y * 0.3 + Math.sin(t * freq * 0.6 + 1.2) * 0.08;
      }

      // Lip-sync jaw animation
      if (jawRef.current) {
        speakPhaseRef.current += 0.18;
        const fastRhythm = Math.abs(Math.sin(speakPhaseRef.current * 9.0));
        const slowRhythm = Math.abs(Math.sin(speakPhaseRef.current * 2.8));
        const jawOpen = (fastRhythm * 0.7 + slowRhythm * 0.3) * 0.065;
        jawRef.current.position.y = -0.15 + jawOpen;
        jawRef.current.scale.z = 1 + jawOpen * 4;
      }
    } else {
      // Reset jaw when not speaking
      if (jawRef.current) {
        jawRef.current.position.y += (-0.15 - jawRef.current.position.y) * 0.15;
        jawRef.current.scale.z += (1 - jawRef.current.scale.z) * 0.15;
      }
    }

    if (mood === "happy") {
      groupRef.current.rotation.y = t * 0.42;
      groupRef.current.position.y = Math.sin(t * 2.5) * 0.05;
      skin.emissiveIntensity = 0.15 + Math.sin(t * 5.5) * 0.08;
      cyanBright.emissiveIntensity = 1.2 + Math.sin(t * 4) * 0.4;
    }

    if (mood === "alert") {
      groupRef.current.rotation.z = Math.sin(t * 8) * 0.04;
      skin.color.setHex(0xe08060);
      skin.emissiveIntensity = 0.15 + Math.sin(t * 6) * 0.08;
      cyanBright.color.setHex(0xff4444);
      cyanBright.emissive.setHex(0xff4444);
    } else {
      // Reset skin/accent to natural colors
      skin.color.setHex(0xd4956a);
      if (mood !== "thinking") {
        cyanBright.color.setHex(0x00d9ff);
        cyanBright.emissive.setHex(0x00d9ff);
      }
    }

    // Head idle sway + gaze (non-speaking)
    if (mood !== "speaking" && headRef.current) {
      const idleSway = Math.sin(t * 0.48) * 0.035;
      headRef.current.rotation.z = idleSway;
      headRef.current.rotation.y = gazeCurrent.x * 0.3;
      headRef.current.rotation.x = gazeCurrent.y * 0.3;
    }

    // Eye gaze tracking
    if (eyeLRef.current) {
      eyeLRef.current.rotation.y = gazeCurrent.x * 0.4;
      eyeLRef.current.rotation.x = -gazeCurrent.y * 0.4;
    }
    if (eyeRRef.current) {
      eyeRRef.current.rotation.y = gazeCurrent.x * 0.4;
      eyeRRef.current.rotation.x = -gazeCurrent.y * 0.4;
    }

    if (glowRingRef.current) {
      glowRingRef.current.rotation.x = t * 0.58;
      glowRingRef.current.rotation.z = t * 0.38;
    }
    if (chestGlowRef.current && mood !== "idle") {
      chestGlowRef.current.scale.setScalar(1 + Math.sin(t * 4) * 0.15);
    }

    const pw = prevWardrobe.current;
    if (
      pw.top !== wardrobeTop ||
      pw.jeans !== wardrobeJeans ||
      pw.heels !== wardrobeHeels
    ) {
      prevWardrobe.current = {
        top: wardrobeTop,
        jeans: wardrobeJeans,
        heels: wardrobeHeels,
      };
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.35, 0]}>
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* HEAD GROUP                                                             */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <group ref={headRef} position={[0, 1.42, 0]}>
        {/* Skull — slightly oval, warm skin */}
        <mesh material={skin}>
          <sphereGeometry args={[0.36, 32, 28]} />
        </mesh>
        {/* Subtle wireframe overlay for holographic feel */}
        <mesh material={wire}>
          <sphereGeometry args={[0.375, 12, 12]} />
        </mesh>

        {/* Forehead broad highlight */}
        <mesh position={[0, 0.12, 0.32]} material={skinBright}>
          <sphereGeometry args={[0.12, 12, 8]} />
        </mesh>

        {/* Cheekbones */}
        <mesh position={[-0.22, -0.01, 0.28]} material={skinBright}>
          <sphereGeometry args={[0.07, 8, 8]} />
        </mesh>
        <mesh position={[0.22, -0.01, 0.28]} material={skinBright}>
          <sphereGeometry args={[0.07, 8, 8]} />
        </mesh>

        {/* ── Eyes (gaze-tracked) ── */}
        {/* Eye whites */}
        <mesh ref={eyeLRef} position={[-0.12, 0.07, 0.33]} material={eye}>
          <sphereGeometry args={[0.05, 16, 12]} />
        </mesh>
        <mesh ref={eyeRRef} position={[0.12, 0.07, 0.33]} material={eye}>
          <sphereGeometry args={[0.05, 16, 12]} />
        </mesh>
        {/* Irises — hazel brown with cyan glow hint */}
        <mesh position={[-0.12, 0.07, 0.375]} material={iris}>
          <circleGeometry args={[0.032, 16]} />
        </mesh>
        <mesh position={[0.12, 0.07, 0.375]} material={iris}>
          <circleGeometry args={[0.032, 16]} />
        </mesh>

        {/* Eyebrows — dark brown thin boxes */}
        <mesh
          position={[-0.12, 0.18, 0.33]}
          rotation={[0, 0, 0.12]}
          material={hair}
        >
          <boxGeometry args={[0.1, 0.013, 0.015]} />
        </mesh>
        <mesh
          position={[0.12, 0.18, 0.33]}
          rotation={[0, 0, -0.12]}
          material={hair}
        >
          <boxGeometry args={[0.1, 0.013, 0.015]} />
        </mesh>

        {/* Nose — subtle ridge */}
        <mesh position={[0, -0.04, 0.36]} material={skinBright}>
          <sphereGeometry args={[0.026, 8, 8]} />
        </mesh>
        <mesh position={[0, 0.03, 0.35]} rotation={[0.2, 0, 0]} material={skin}>
          <capsuleGeometry args={[0.014, 0.05, 4, 8]} />
        </mesh>

        {/* Lips */}
        <mesh position={[0, -0.12, 0.345]} material={lip}>
          <boxGeometry args={[0.12, 0.022, 0.016]} />
        </mesh>
        <mesh position={[0, -0.15, 0.338]} material={lip}>
          <boxGeometry args={[0.1, 0.018, 0.014]} />
        </mesh>

        {/* ── Jaw (lip-sync animated) ── */}
        <mesh ref={jawRef} position={[0, -0.15, 0.22]} material={skin}>
          <boxGeometry args={[0.22, 0.075, 0.1]} />
        </mesh>

        {/* Ears */}
        <mesh position={[-0.365, 0.03, 0]} material={skin}>
          <sphereGeometry args={[0.055, 10, 8]} />
        </mesh>
        <mesh position={[0.365, 0.03, 0]} material={skin}>
          <sphereGeometry args={[0.055, 10, 8]} />
        </mesh>

        {/* ── Long Brown Hair — volume on head ── */}
        {/* Top crown */}
        <mesh position={[0, 0.3, -0.02]} material={hair}>
          <sphereGeometry args={[0.34, 18, 14]} />
        </mesh>
        {/* Side volumes — full cheek framing */}
        <mesh position={[-0.31, 0.12, -0.06]} material={hair}>
          <sphereGeometry args={[0.15, 12, 10]} />
        </mesh>
        <mesh position={[0.31, 0.12, -0.06]} material={hair}>
          <sphereGeometry args={[0.15, 12, 10]} />
        </mesh>
        {/* Front face-framing strands */}
        <mesh position={[-0.26, -0.04, 0.22]} material={hair}>
          <sphereGeometry args={[0.07, 8, 8]} />
        </mesh>
        <mesh position={[0.26, -0.04, 0.22]} material={hair}>
          <sphereGeometry args={[0.07, 8, 8]} />
        </mesh>
      </group>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* LONG HAIR — flowing down behind / over shoulders                      */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* Main back hair curtain — behind head */}
      <mesh position={[0, 1.16, -0.32]} material={hair}>
        <cylinderGeometry args={[0.28, 0.22, 0.55, 14]} />
      </mesh>
      {/* Left shoulder-length flow */}
      <mesh
        position={[-0.32, 0.82, -0.18]}
        rotation={[0.12, 0.1, 0.22]}
        material={hair}
      >
        <cylinderGeometry args={[0.085, 0.055, 0.72, 10]} />
      </mesh>
      {/* Right shoulder-length flow */}
      <mesh
        position={[0.32, 0.82, -0.18]}
        rotation={[0.12, -0.1, -0.22]}
        material={hair}
      >
        <cylinderGeometry args={[0.085, 0.055, 0.72, 10]} />
      </mesh>
      {/* Lower hair flow reaching mid-back */}
      <mesh position={[0, 0.5, -0.38]} material={hair}>
        <cylinderGeometry args={[0.18, 0.13, 0.62, 12]} />
      </mesh>
      {/* Lower strands */}
      <mesh
        position={[-0.18, 0.22, -0.36]}
        rotation={[0.08, 0, 0.06]}
        material={hair}
      >
        <cylinderGeometry args={[0.065, 0.035, 0.52, 8]} />
      </mesh>
      <mesh
        position={[0.18, 0.22, -0.36]}
        rotation={[0.08, 0, -0.06]}
        material={hair}
      >
        <cylinderGeometry args={[0.065, 0.035, 0.52, 8]} />
      </mesh>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* NECK                                                                   */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <mesh position={[0, 0.98, 0]} material={skin}>
        <cylinderGeometry args={[0.09, 0.11, 0.3, 16]} />
      </mesh>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* BLUE MINI DRESS — bodice + skirt                                       */}
      {/* wardrobeTop index controls dress color                                 */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* Bodice (waist to chest, form-fitting) */}
      <mesh position={[0, 0.55, 0]} material={dressMat}>
        <cylinderGeometry args={[0.23, 0.2, 0.58, 20]} />
      </mesh>
      <mesh position={[0, 0.55, 0]} material={wire}>
        <cylinderGeometry args={[0.245, 0.215, 0.6, 12]} />
      </mesh>
      {/* Chest / bust shaping */}
      <mesh position={[0, 0.74, 0.12]} material={dressMat}>
        <sphereGeometry args={[0.16, 14, 10]} />
      </mesh>
      {/* Waist definition */}
      <mesh position={[0, 0.35, 0]} material={dressMat}>
        <cylinderGeometry args={[0.185, 0.2, 0.18, 18]} />
      </mesh>
      {/* Mini skirt flare — from hip to mid-thigh */}
      <mesh position={[0, 0.1, 0]} material={dressMat}>
        <cylinderGeometry args={[0.27, 0.22, 0.32, 20]} />
      </mesh>
      {/* Skirt hem slight flare */}
      <mesh position={[0, -0.07, 0]} material={dressMat}>
        <cylinderGeometry args={[0.29, 0.27, 0.12, 18]} />
      </mesh>

      {/* Chest glow accent (holographic badge) */}
      <mesh ref={chestGlowRef} position={[0, 0.7, 0.23]} material={cyanBright}>
        <boxGeometry args={[0.1, 0.07, 0.02]} />
      </mesh>

      {/* ── Shoulders ── */}
      <mesh position={[-0.34, 0.78, 0]} material={skin}>
        <sphereGeometry args={[0.085, 14, 12]} />
      </mesh>
      <mesh position={[0.34, 0.78, 0]} material={skin}>
        <sphereGeometry args={[0.085, 14, 12]} />
      </mesh>

      {/* ── Arms — bare skin (dress is sleeveless) ── */}
      <mesh position={[-0.46, 0.42, 0]} rotation={[0, 0, 0.14]} material={skin}>
        <cylinderGeometry args={[0.062, 0.055, 0.6, 12]} />
      </mesh>
      <mesh position={[0.46, 0.42, 0]} rotation={[0, 0, -0.14]} material={skin}>
        <cylinderGeometry args={[0.062, 0.055, 0.6, 12]} />
      </mesh>

      {/* Elbows */}
      <mesh position={[-0.5, 0.12, 0]} material={skinBright}>
        <sphereGeometry args={[0.062, 10, 10]} />
      </mesh>
      <mesh position={[0.5, 0.12, 0]} material={skinBright}>
        <sphereGeometry args={[0.062, 10, 10]} />
      </mesh>

      {/* Forearms */}
      <mesh
        position={[-0.51, -0.12, 0]}
        rotation={[0, 0, 0.08]}
        material={skin}
      >
        <cylinderGeometry args={[0.052, 0.044, 0.52, 12]} />
      </mesh>
      <mesh
        position={[0.51, -0.12, 0]}
        rotation={[0, 0, -0.08]}
        material={skin}
      >
        <cylinderGeometry args={[0.052, 0.044, 0.52, 12]} />
      </mesh>

      {/* Hands */}
      <mesh position={[-0.52, -0.42, 0]} material={skinBright}>
        <sphereGeometry args={[0.065, 10, 10]} />
      </mesh>
      <mesh position={[0.52, -0.42, 0]} material={skinBright}>
        <sphereGeometry args={[0.065, 10, 10]} />
      </mesh>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* BARE LEGS — skin tone from mid-thigh down                             */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* Upper thighs (just below dress hem) */}
      <mesh position={[-0.09, -0.28, 0]} material={skin}>
        <cylinderGeometry args={[0.098, 0.088, 0.34, 14]} />
      </mesh>
      <mesh position={[0.09, -0.28, 0]} material={skin}>
        <cylinderGeometry args={[0.098, 0.088, 0.34, 14]} />
      </mesh>

      {/* Knees */}
      <mesh position={[-0.09, -0.5, 0]} material={skinBright}>
        <sphereGeometry args={[0.088, 12, 10]} />
      </mesh>
      <mesh position={[0.09, -0.5, 0]} material={skinBright}>
        <sphereGeometry args={[0.088, 12, 10]} />
      </mesh>

      {/* Lower legs — calves */}
      <mesh position={[-0.09, -0.76, 0]} material={skin}>
        <cylinderGeometry args={[0.075, 0.062, 0.52, 12]} />
      </mesh>
      <mesh position={[0.09, -0.76, 0]} material={skin}>
        <cylinderGeometry args={[0.075, 0.062, 0.52, 12]} />
      </mesh>

      {/* Ankles */}
      <mesh position={[-0.09, -1.04, 0]} material={skin}>
        <sphereGeometry args={[0.058, 10, 8]} />
      </mesh>
      <mesh position={[0.09, -1.04, 0]} material={skin}>
        <sphereGeometry args={[0.058, 10, 8]} />
      </mesh>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* WEDGE SANDALS — platform base + wedge heel                            */}
      {/* wardrobeJeans index controls sandal color                             */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* Left sandal — platform base */}
      <mesh
        position={[-0.09, -1.13, 0.05]}
        rotation={[0.08, 0, 0]}
        material={sandalMat}
      >
        <boxGeometry args={[0.112, 0.05, 0.24]} />
      </mesh>
      {/* Left wedge heel ramp (tapered box acting as slope) */}
      <mesh
        position={[-0.09, -1.17, -0.08]}
        rotation={[-0.28, 0, 0]}
        material={sandalMat}
      >
        <boxGeometry args={[0.1, 0.06, 0.14]} />
      </mesh>
      {/* Left toe strap */}
      <mesh position={[-0.09, -1.09, 0.1]} material={sandalMat}>
        <boxGeometry args={[0.1, 0.012, 0.025]} />
      </mesh>
      {/* Left ankle strap */}
      <mesh
        position={[-0.09, -1.04, 0.0]}
        rotation={[0, 0, 0]}
        material={sandalMat}
      >
        <cylinderGeometry args={[0.065, 0.065, 0.012, 16, 1, true]} />
      </mesh>

      {/* Right sandal — platform base */}
      <mesh
        position={[0.09, -1.13, 0.05]}
        rotation={[0.08, 0, 0]}
        material={sandalMat}
      >
        <boxGeometry args={[0.112, 0.05, 0.24]} />
      </mesh>
      {/* Right wedge heel ramp */}
      <mesh
        position={[0.09, -1.17, -0.08]}
        rotation={[-0.28, 0, 0]}
        material={sandalMat}
      >
        <boxGeometry args={[0.1, 0.06, 0.14]} />
      </mesh>
      {/* Right toe strap */}
      <mesh position={[0.09, -1.09, 0.1]} material={sandalMat}>
        <boxGeometry args={[0.1, 0.012, 0.025]} />
      </mesh>
      {/* Right ankle strap */}
      <mesh position={[0.09, -1.04, 0.0]} material={sandalMat}>
        <cylinderGeometry args={[0.065, 0.065, 0.012, 16, 1, true]} />
      </mesh>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* HOLOGRAPHIC GLOW HALO                                                 */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <mesh ref={glowRingRef} position={[0, 1.42, 0]} material={wire}>
        <torusGeometry args={[0.52, 0.013, 8, 64]} />
      </mesh>
      {/* Secondary ambient ring around body */}
      <mesh
        position={[0, 0.4, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        material={wire}
      >
        <torusGeometry args={[0.6, 0.008, 6, 48]} />
      </mesh>
    </group>
  );
}

// ─── Lights + Scene ───────────────────────────────────────────────────────────

function Scene() {
  const { avatarMood, wardrobe } = useAriaStore();
  return (
    <>
      <ambientLight intensity={0.18} />
      {/* Key light — warm skin tone from front-top */}
      <pointLight position={[0.5, 3.5, 2.5]} intensity={2.2} color={0xffe0c0} />
      {/* Rim light — cyan holographic from side */}
      <pointLight position={[-2.5, 1, -1]} intensity={0.85} color={0x00d9ff} />
      {/* Fill — soft cyan from right */}
      <pointLight position={[2, 0, 1.5]} intensity={0.55} color={0x00bbdd} />
      {/* Hair backlight — makes brown hair shine */}
      <pointLight position={[0, 2, -2]} intensity={0.7} color={0x7c3aed} />
      {avatarMood === "happy" && (
        <pointLight position={[0, 0, 3]} intensity={1.2} color={0x00ffcc} />
      )}
      <HumanoidBody
        mood={avatarMood}
        wardrobeTop={wardrobe.top}
        wardrobeJeans={wardrobe.jeans}
        wardrobeHeels={wardrobe.heels}
      />
      <Particles mood={avatarMood} />
    </>
  );
}

// ─── Mood metadata ────────────────────────────────────────────────────────────

const MOOD_LABEL: Record<AvatarMood, string> = {
  idle: "STANDBY",
  thinking: "PROCESSING",
  speaking: "RESPONDING",
  happy: "ENGAGED",
  alert: "ALERT",
};

const MOOD_DESC: Record<AvatarMood, string> = {
  idle: "Neural networks at rest",
  thinking: "Analyzing query...",
  speaking: "Priya is speaking...",
  happy: "Interaction optimal",
  alert: "Attention required",
};

const MOOD_COLOR: Record<AvatarMood, string> = {
  idle: "#00d9ff",
  thinking: "#7c3aed",
  speaking: "#0099ff",
  happy: "#00ffcc",
  alert: "#ff4444",
};

const STATS = [
  { label: "NEURAL", value: "98%" },
  { label: "MEMORY", value: "72%" },
  { label: "SYNC", value: "100%" },
];

// ─── Public component ─────────────────────────────────────────────────────────

export function AvatarPanel() {
  const { avatarMood, isSpeaking } = useAriaStore();
  const color = MOOD_COLOR[avatarMood];

  const idleGazeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = -(e.clientY / window.innerHeight - 0.5) * 2;
      gazeTarget.x = Math.max(-1, Math.min(1, nx));
      gazeTarget.y = Math.max(-1, Math.min(1, ny));

      if (idleGazeTimerRef.current) clearTimeout(idleGazeTimerRef.current);
      idleGazeTimerRef.current = setTimeout(() => {
        gazeTarget.x = 0;
        gazeTarget.y = 0;
      }, 5000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (idleGazeTimerRef.current) clearTimeout(idleGazeTimerRef.current);
    };
  }, []);

  return (
    <div className="scanline-overlay h-full flex flex-col bg-card/30 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.7 0.18 200 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.18 200 / 0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* 3D Canvas */}
      <div className="flex-1 relative min-h-0">
        <Canvas
          camera={{ position: [0, 0.55, 3.3], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
          data-ocid="avatar-canvas"
        >
          <Scene />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI * 0.22}
            maxPolarAngle={Math.PI * 0.78}
          />
        </Canvas>

        {/* Corner decorators */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary/60 pointer-events-none" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary/60 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary/60 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary/60 pointer-events-none" />

        {/* Mood label */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
          <div
            className="glass-panel px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase flex items-center gap-2"
            style={{ borderColor: `${color}44` }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full animate-pulse"
              style={{ background: color, boxShadow: `0 0 6px ${color}` }}
            />
            <span style={{ color }}>Priya — {MOOD_LABEL[avatarMood]}</span>
          </div>
        </div>
      </div>

      {/* Status panel */}
      <div className="border-t border-primary/20 p-4 glass-panel flex-shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ background: color, boxShadow: `0 0 8px ${color}` }}
            />
            <span
              className="font-mono text-xs font-bold tracking-widest"
              style={{ color }}
            >
              {MOOD_LABEL[avatarMood]}
            </span>
          </div>

          {isSpeaking && (
            <div className="flex gap-0.5 items-end h-4">
              {[
                { h: 2, id: "b1" },
                { h: 4, id: "b2" },
                { h: 3, id: "b3" },
                { h: 5, id: "b4" },
                { h: 2, id: "b5" },
                { h: 4, id: "b6" },
              ].map(({ h, id }, i) => (
                <div
                  key={id}
                  className="w-1 bg-primary rounded-full"
                  style={{
                    height: h * 2,
                    animation: "pulse-bar 0.4s ease-in-out infinite",
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground font-mono mb-3">
          {MOOD_DESC[avatarMood]}
        </p>

        <div className="grid grid-cols-3 gap-2">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center border border-border/20 rounded-lg py-1.5 px-2"
            >
              <div className="text-xs font-bold text-primary font-mono">
                {stat.value}
              </div>
              <div className="text-[10px] text-muted-foreground/60 font-mono tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
