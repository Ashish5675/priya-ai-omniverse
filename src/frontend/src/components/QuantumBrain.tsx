import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface QuantumBrainProps {
  isVisible: boolean;
}

// Neural network topology: 5 layers
const LAYERS = [3, 5, 7, 5, 3];
const SVG_W = 600;
const SVG_H = 130;
const NODE_R = 6;
const LAYER_X_STEP = SVG_W / (LAYERS.length + 1);

// Pre-compute node positions
function getNodes() {
  return LAYERS.map((count, li) => {
    const x = LAYER_X_STEP * (li + 1);
    return Array.from({ length: count }, (_, ni) => {
      const y = (SVG_H / (count + 1)) * (ni + 1);
      return { x, y, id: `n-${li}-${ni}` };
    });
  });
}

// Pre-compute edges between adjacent layers
function getEdges(nodes: ReturnType<typeof getNodes>) {
  const edges: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    id: string;
  }[] = [];
  for (let li = 0; li < nodes.length - 1; li++) {
    for (const a of nodes[li]) {
      for (const b of nodes[li + 1]) {
        edges.push({
          x1: a.x,
          y1: a.y,
          x2: b.x,
          y2: b.y,
          id: `e-${a.id}-${b.id}`,
        });
      }
    }
  }
  return edges;
}

const NODES = getNodes();
const EDGES = getEdges(NODES);

// Signal particles — a subset of edges for visual clarity
const PARTICLE_EDGES = EDGES.filter((_, i) => i % 3 === 0);

export function QuantumBrain({ isVisible }: QuantumBrainProps) {
  const [slowed, setSlowed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isVisible) {
      setSlowed(false);
      timerRef.current = setTimeout(() => setSlowed(true), 2000);
    } else {
      setSlowed(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isVisible]);

  const pulseDuration = slowed ? "2.4s" : "0.9s";
  const particleDuration = slowed ? "2.8s" : "1.1s";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          data-ocid="quantum_brain.panel"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            width: "100%",
            height: "150px",
            background: "#0a0a1a",
            borderRadius: "12px",
            border: "1px solid rgba(0,220,255,0.45)",
            boxShadow:
              "0 0 18px rgba(0,220,255,0.18), inset 0 0 24px rgba(0,220,255,0.04)",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* SVG Neural Network */}
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: "100%",
              height: "118px",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            aria-hidden="true"
          >
            <defs>
              {/* Node gradients */}
              <radialGradient id="qb-grad-cyan" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00eeff" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.5" />
              </radialGradient>
              <radialGradient id="qb-grad-purple" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.4" />
              </radialGradient>
              {/* Particle glow filter */}
              <filter id="qb-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Define paths for each particle edge */}
              {PARTICLE_EDGES.map((e) => (
                <path
                  key={`path-${e.id}`}
                  id={`qbpath-${e.id}`}
                  d={`M${e.x1},${e.y1} L${e.x2},${e.y2}`}
                  fill="none"
                />
              ))}
            </defs>

            {/* Edges */}
            {EDGES.map((e) => (
              <line
                key={e.id}
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                stroke="rgba(0,220,255,0.12)"
                strokeWidth="0.75"
              />
            ))}

            {/* Signal particles along a subset of edges */}
            {PARTICLE_EDGES.map((e, pi) => (
              <circle
                key={`particle-${e.id}`}
                r="3"
                fill="#00eeff"
                filter="url(#qb-glow)"
              >
                <animateMotion
                  href={`#qbpath-${e.id}`}
                  dur={particleDuration}
                  begin={`${(pi * 0.18) % 2}s`}
                  repeatCount="indefinite"
                  calcMode="linear"
                />
              </circle>
            ))}

            {/* Nodes */}
            {NODES.map((layer, li) =>
              layer.map((node, ni) => {
                const isMidLayer = li === 2;
                const grad =
                  ni % 2 === 0 ? "url(#qb-grad-cyan)" : "url(#qb-grad-purple)";
                return (
                  <g key={node.id}>
                    {/* Outer glow ring */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={NODE_R + 4}
                      fill="none"
                      stroke={
                        isMidLayer
                          ? "rgba(168,85,247,0.3)"
                          : "rgba(0,220,255,0.2)"
                      }
                      strokeWidth="1"
                    >
                      <animate
                        attributeName="r"
                        values={`${NODE_R + 3};${NODE_R + 7};${NODE_R + 3}`}
                        dur={pulseDuration}
                        begin={`${(li * 0.15 + ni * 0.08) % 1.5}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.5;0.15;0.5"
                        dur={pulseDuration}
                        begin={`${(li * 0.15 + ni * 0.08) % 1.5}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                    {/* Core node */}
                    <circle cx={node.x} cy={node.y} r={NODE_R} fill={grad}>
                      <animate
                        attributeName="r"
                        values={`${NODE_R};${NODE_R + 2};${NODE_R}`}
                        dur={pulseDuration}
                        begin={`${(li * 0.15 + ni * 0.08) % 1.5}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.85;1;0.85"
                        dur={pulseDuration}
                        begin={`${(li * 0.15 + ni * 0.08) % 1.5}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                );
              }),
            )}
          </svg>

          {/* Center label */}
          <BlinkingLabel />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BlinkingLabel() {
  return (
    <span
      style={{
        position: "absolute",
        bottom: "8px",
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: "10px",
        letterSpacing: "0.2em",
        color: "#00eeff",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        animation: "qb-blink 1.2s step-end infinite",
        textShadow: "0 0 8px rgba(0,238,255,0.7)",
      }}
    >
      ◈ ARIA PROCESSING ◈
      <style>{`
        @keyframes qb-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
      `}</style>
    </span>
  );
}
