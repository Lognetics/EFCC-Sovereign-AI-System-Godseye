import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Html, OrbitControls, Sparkles as DreiSparkles, Stars, Text as DreiText, MeshDistortMaterial } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Home, Info } from 'lucide-react'
import { MODULES, type ModuleKey, type ModuleMeta } from '../routes'

interface DeckProps {
  onSelect: (m: ModuleKey) => void
  onHome: () => void
}

export function CommandDeck({ onSelect, onHome }: DeckProps) {
  const [hovered, setHovered] = useState<ModuleKey | null>(null)
  const hoveredMeta = hovered ? MODULES.find(m => m.key === hovered)! : null

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* 3D */}
      <Canvas
        camera={{ position: [0, 1.5, 7], fov: 55 }}
        dpr={[1, 2]}
        shadows
      >
        <color attach="background" args={['#020408']} />
        <fog attach="fog" args={['#020408', 10, 22]} />

        <Scene
          hovered={hovered}
          setHovered={setHovered}
          onSelect={onSelect}
        />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={4}
          maxDistance={12}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate
          autoRotateSpeed={0.25}
          enableDamping
          dampingFactor={0.08}
        />

        <Environment preset="night" />
      </Canvas>

      {/* Overlay HUD */}
      <DeckHUD hoveredMeta={hoveredMeta} onHome={onHome} onSelect={onSelect} />
    </div>
  )
}

// --------------------------------------------------------------
function Scene({ hovered, setHovered, onSelect }: {
  hovered: ModuleKey | null
  setHovered: (k: ModuleKey | null) => void
  onSelect: (k: ModuleKey) => void
}) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#22d3ee" distance={10} />
      <pointLight position={[6, 4, 3]} intensity={0.9} color="#a78bfa" />
      <pointLight position={[-5, -2, 4]} intensity={0.6} color="#38bdf8" />

      <Stars radius={60} depth={40} count={3500} factor={3} fade speed={0.6} />
      <DreiSparkles count={260} size={2} scale={[18, 10, 18]} speed={0.4} noise={0.6} color="#67e8f9" opacity={0.7} />

      {/* Central God's Eye core */}
      <Core />

      {/* Rings */}
      <Ring radius={3.0} segments={200} color="#22d3ee" opacity={0.3} />
      <Ring radius={4.2} segments={200} color="#a78bfa" opacity={0.22} tilt={0.15} />
      <Ring radius={5.6} segments={200} color="#67e8f9" opacity={0.18} tilt={-0.1} />

      {/* Orbiting module orbs */}
      {MODULES.map(m => (
        <OrbitingNode
          key={m.key}
          meta={m}
          hovered={hovered === m.key}
          anyHovered={hovered !== null}
          onHoverStart={() => setHovered(m.key)}
          onHoverEnd={() => setHovered(null)}
          onClick={() => onSelect(m.key)}
        />
      ))}

      {/* Grid plane beneath (subtle ground) */}
      <mesh rotation-x={-Math.PI / 2} position-y={-2.5}>
        <planeGeometry args={[40, 40, 40, 40]} />
        <meshBasicMaterial color="#0891b2" transparent opacity={0.05} wireframe />
      </mesh>
    </>
  )
}

// --------------------------------------------------------------
function Core() {
  const ref = useRef<THREE.Mesh>(null!)
  const ringRef = useRef<THREE.Mesh>(null!)
  useFrame((s, dt) => {
    if (ref.current) {
      ref.current.rotation.x += dt * 0.18
      ref.current.rotation.y += dt * 0.28
    }
    if (ringRef.current) ringRef.current.rotation.z += dt * 0.4
  })
  return (
    <group>
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh ref={ref}>
          <icosahedronGeometry args={[1.1, 6]} />
          <MeshDistortMaterial
            color="#0e7490"
            distort={0.35}
            speed={2.4}
            roughness={0.15}
            metalness={0.9}
            emissive={'#22d3ee'}
            emissiveIntensity={0.45}
          />
        </mesh>

        {/* Inner iris ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[1.5, 0.01, 8, 120]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.8} />
        </mesh>

        {/* Pupil */}
        <mesh>
          <sphereGeometry args={[0.32, 32, 32]} />
          <meshBasicMaterial color="#ecfeff" />
        </mesh>
      </Float>

      {/* Core label */}
      <Float floatIntensity={0.1}>
        <Html center distanceFactor={8} zIndexRange={[0, 0]}>
          <div className="pointer-events-none select-none text-center">
            <div className="font-display text-[14px] font-bold uppercase tracking-[0.4em] text-cyber-100" style={{ textShadow: '0 0 20px rgba(34,211,238,0.7)' }}>
              GOD&apos;S EYE
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-cyber-300">Sovereign Core</div>
          </div>
        </Html>
      </Float>
    </group>
  )
}

function Ring({ radius, color, opacity = 0.3, tilt = 0, segments = 128 }: { radius: number; color: string; opacity?: number; tilt?: number; segments?: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((s, dt) => { if (ref.current) ref.current.rotation.z += dt * 0.05 })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.006, 8, segments]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

// --------------------------------------------------------------
function OrbitingNode({ meta, hovered, anyHovered, onHoverStart, onHoverEnd, onClick }: {
  meta: ModuleMeta
  hovered: boolean
  anyHovered: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
  onClick: () => void
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const orbRef = useRef<THREE.Mesh>(null!)
  const radius = [3.0, 4.2, 5.6][meta.orbitRing]
  const tilt   = [0, 0.15, -0.1][meta.orbitRing]
  const startAngle = THREE.MathUtils.degToRad(meta.orbitAngle)

  useFrame((s, dt) => {
    if (!groupRef.current) return
    const t = s.clock.elapsedTime
    const angle = startAngle + t * meta.orbitSpeed
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const y = Math.sin(t * 0.4 + meta.orbitAngle) * 0.25 + (meta.orbitRing === 1 ? 0 : meta.orbitRing === 2 ? -0.4 : 0.4)
    groupRef.current.position.set(x * Math.cos(tilt), y + x * Math.sin(tilt), z)

    if (orbRef.current) {
      orbRef.current.rotation.y += dt * 0.7
      const targetScale = hovered ? 1.45 : (anyHovered ? 0.82 : 1)
      orbRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12)
    }
  })

  return (
    <group ref={groupRef}>
      <group onClick={onClick} onPointerOver={(e) => { e.stopPropagation(); onHoverStart(); document.body.style.cursor = 'pointer' }} onPointerOut={() => { onHoverEnd(); document.body.style.cursor = 'auto' }}>
        <mesh ref={orbRef}>
          <icosahedronGeometry args={[0.28, 2]} />
          <meshStandardMaterial
            color={meta.accent}
            emissive={meta.accent}
            emissiveIntensity={hovered ? 1.2 : 0.65}
            roughness={0.2}
            metalness={0.85}
          />
        </mesh>
        {/* Selection halo */}
        {hovered && (
          <mesh>
            <torusGeometry args={[0.45, 0.008, 8, 64]} />
            <meshBasicMaterial color={meta.accent} transparent opacity={0.8} />
          </mesh>
        )}
        {/* Glyph label floating above */}
        <Html center distanceFactor={10} position={[0, 0.55, 0]} zIndexRange={[0, 0]}>
          <div className="pointer-events-none select-none text-center" style={{ minWidth: 96 }}>
            <div className="font-display text-[10.5px] font-semibold uppercase tracking-[0.25em]"
              style={{
                color: hovered ? meta.accent : '#e2e8f0',
                textShadow: hovered ? `0 0 12px ${meta.accent}` : '0 0 8px rgba(0,0,0,0.9)',
                opacity: hovered ? 1 : 0.65
              }}>
              {meta.short}
            </div>
          </div>
        </Html>
      </group>

      {/* Connection line to core when hovered */}
      {hovered && <Connector accent={meta.accent} />}
    </group>
  )
}

function Connector({ accent }: { accent: string }) {
  // a short beam from this module back toward origin
  return (
    <mesh>
      <cylinderGeometry args={[0.005, 0.005, 1, 8]} />
      <meshBasicMaterial color={accent} transparent opacity={0.4} />
    </mesh>
  )
}

// --------------------------------------------------------------
// Overlay HUD
// --------------------------------------------------------------
function DeckHUD({ hoveredMeta, onHome, onSelect }: { hoveredMeta: ModuleMeta | null; onHome: () => void; onSelect: (k: ModuleKey) => void }) {
  return (
    <>
      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="font-display text-[12px] font-bold uppercase tracking-[0.4em] text-cyber-100">GE-NFIIS · Command Deck</div>
          <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.3em] text-cyber-300/80">Spatial operations theatre · 3D</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="pointer-events-auto flex items-center gap-2">
          <button onClick={onHome} className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-200 backdrop-blur-md transition hover:border-cyber-400 hover:text-cyber-100">
            <ArrowLeft className="h-3 w-3" /> Landing
          </button>
        </motion.div>
      </div>

      {/* Bottom hint bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between rounded-md border border-white/10 bg-black/40 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-slate-400 backdrop-blur-md">
          <span className="flex items-center gap-2"><Info className="h-3 w-3 text-cyber-400" /> Hover a node to focus it · click to enter a module</span>
          <span>Scroll · zoom · drag · rotate</span>
        </div>
      </motion.div>

      {/* Quick-select rail (bottom left, ALL modules as list) */}
      <div className="pointer-events-none absolute left-6 bottom-24 z-10 hidden lg:block">
        <div className="font-mono text-[9.5px] uppercase tracking-[0.32em] text-slate-500 mb-2">Modules · quick select</div>
        <div className="pointer-events-auto flex flex-col gap-1 rounded-md border border-white/10 bg-black/40 p-2 backdrop-blur-md">
          {MODULES.map(m => (
            <button
              key={m.key}
              onClick={() => onSelect(m.key)}
              className="group flex items-center gap-3 rounded-sm px-2 py-1.5 text-left transition hover:bg-white/5"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border" style={{ borderColor: m.accent + '70', color: m.accent }}>
                <span className="font-display text-[11px]">{m.glyph}</span>
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-slate-400 transition group-hover:text-slate-100">{m.short}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Focused module card (right side, appears on hover) */}
      <AnimatePresence>
        {hoveredMeta && (
          <motion.div
            key={hoveredMeta.key}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            className="pointer-events-none absolute right-6 top-24 z-10 w-[300px]"
          >
            <div className="relative overflow-hidden rounded-lg border bg-black/50 p-5 backdrop-blur-md" style={{ borderColor: hoveredMeta.accent + '60' }}>
              <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border font-display text-[18px]" style={{ borderColor: hoveredMeta.accent + '70', color: hoveredMeta.accent, background: hoveredMeta.accent + '14' }}>
                  {hoveredMeta.glyph}
                </div>
                <div className="min-w-0">
                  <div className="font-display text-[15px] font-semibold leading-tight" style={{ color: hoveredMeta.accent }}>{hoveredMeta.title}</div>
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.28em] text-slate-500 mt-1">ring {hoveredMeta.orbitRing} · orbit {hoveredMeta.orbitAngle}°</div>
                </div>
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-slate-300">{hoveredMeta.blurb}</p>
              <div className="mt-4 flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                <ArrowRight className="h-3 w-3" /> Click node to enter
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${hoveredMeta.accent}, transparent)` }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative corner brackets on the whole viewport */}
      <div className="pointer-events-none absolute inset-4 z-0">
        <svg className="absolute inset-0 h-full w-full">
          <g stroke="rgba(34,211,238,0.28)" strokeWidth="1.5" fill="none">
            <path d="M 0 24 L 0 0 L 24 0" />
            <path d="M calc(100% - 24) 0 L 100% 0 L 100% 24" transform="translate(0,0)" />
          </g>
        </svg>
        <div className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-cyber-400/40" />
        <div className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-cyber-400/40" />
        <div className="absolute left-0 bottom-0 h-6 w-6 border-l-2 border-b-2 border-cyber-400/40" />
        <div className="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-cyber-400/40" />
      </div>

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />
    </>
  )
}
