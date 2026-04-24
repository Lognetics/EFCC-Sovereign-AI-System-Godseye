import { motion, useMotionValue, useScroll, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, Eye, Play, Activity, BrainCircuit, Link2, Radar, Microscope, Bot, ShieldCheck, Globe2, Scale, GraduationCap, Database, ChevronDown, Sparkles, Zap, Network, Target, Lock } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial, OrbitControls, Sparkles as DreiSparkles } from '@react-three/drei'
import * as THREE from 'three'
import { MODULES, type ModuleKey } from '../routes'
import { LIVE_METRICS, formatNaira, ALERTS, CASES } from '../data/mockData'

type LandingProps = {
  onEnter: () => void
  onNavigateModule: (m: ModuleKey) => void
  onOpenCommand: () => void
}

export function Landing({ onEnter, onNavigateModule, onOpenCommand }: LandingProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.5 })

  return (
    <div ref={containerRef} className="relative h-full overflow-y-auto overflow-x-hidden bg-ink-900 text-slate-100" style={{ scrollBehavior: 'smooth' }}>
      <TopProgress progress={progress} />
      <Nav onEnter={onEnter} onOpenCommand={onOpenCommand} />
      <Hero onEnter={onEnter} />
      <MarqueeStrip />
      <MissionSection />
      <ModulesSection onNavigateModule={onNavigateModule} />
      <LiveSection />
      <GlobalSection />
      <FinalCTA onEnter={onEnter} />
      <Footer />
    </div>
  )
}

// --------------------------------------------------------------
// Top scroll progress bar
// --------------------------------------------------------------
function TopProgress({ progress }: { progress: any }) {
  return (
    <motion.div
      style={{ scaleX: progress, transformOrigin: '0% 50%' }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] bg-gradient-to-r from-cyber-500 via-cyan-300 to-cyber-500"
    />
  )
}

// --------------------------------------------------------------
// Floating nav bar
// --------------------------------------------------------------
function Nav({ onEnter, onOpenCommand }: { onEnter: () => void; onOpenCommand: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const el = document.querySelector('#root > div')
    const onScroll = (e: Event) => {
      const target = e.target as HTMLElement
      setScrolled(target.scrollTop > 40)
    }
    const scroller = document.querySelector('.h-full.overflow-y-auto')
    scroller?.addEventListener('scroll', onScroll)
    return () => scroller?.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 24 }}
      className={'fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-4 transition-all ' + (scrolled ? 'bg-ink-900/80 backdrop-blur-md border-b border-white/5' : '')}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-cyber-400/60">
          <Eye className="h-4 w-4 text-cyber-300" />
          <div className="absolute inset-0 rounded-full targeting" />
        </div>
        <div>
          <div className="font-display text-[13px] font-bold tracking-[0.28em] text-cyber-100">GOD'S EYE</div>
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500">GE-NFIIS · DEMO</div>
        </div>
      </div>

      <nav className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-widest text-slate-400 md:flex">
        <a href="#mission" className="hover:text-cyber-200 transition">Mission</a>
        <a href="#modules" className="hover:text-cyber-200 transition">Modules</a>
        <a href="#live" className="hover:text-cyber-200 transition">Live</a>
        <a href="#global" className="hover:text-cyber-200 transition">Global</a>
      </nav>

      <div className="flex items-center gap-2">
        <button onClick={onOpenCommand} className="hidden items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-300 hover:border-cyber-500/40 hover:text-cyber-200 md:inline-flex">
          Search <span className="ml-1 rounded-sm border border-white/10 bg-white/5 px-1">⌘K</span>
        </button>
        <button onClick={onEnter} className="btn-primary inline-flex items-center gap-2 rounded-sm px-3 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.22em]">
          Enter System <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.header>
  )
}

// --------------------------------------------------------------
// Hero with WebGL 3D centerpiece
// --------------------------------------------------------------
function Hero({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* 3D background canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]}>
          <color attach="background" args={['#03060c']} />
          <fog attach="fog" args={['#03060c', 3, 9]} />
          <ambientLight intensity={0.35} />
          <pointLight position={[4, 4, 4]} intensity={1.4} color={'#22d3ee'} />
          <pointLight position={[-4, -2, 2]} intensity={0.9} color={'#a78bfa'} />

          <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
            <HeroOrb />
          </Float>

          <DreiSparkles count={220} size={2.2} scale={[10, 10, 10]} speed={0.45} noise={0.5} color={'#67e8f9'} opacity={0.8} />
          <OrbitingRing radius={1.9} tilt={0.5} color="#22d3ee" />
          <OrbitingRing radius={2.6} tilt={-0.3} color="#a78bfa" />

          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-300 backdrop-blur-md"
        >
          <span className="blink-dot h-1.5 w-1.5 bg-emerald-400 text-emerald-400" />
          SOVEREIGN · AI-NATIVE · LIVE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.1 }}
          className="font-display text-[min(13.5vw,160px)] font-black leading-[0.9] tracking-[0.02em]"
          style={{
            backgroundImage: 'linear-gradient(180deg, #ecfeff 0%, #67e8f9 50%, #0e7490 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 60px rgba(34,211,238,0.35)'
          }}
        >
          GOD&apos;S EYE
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-cyber-300">
            National Financial Intelligence & Investigation System
          </div>
          <p className="max-w-[720px] text-balance text-[17px] leading-relaxed text-slate-300">
            From fragmented investigations to a unified, predictive, real-time financial intelligence state — a single command surface fusing eleven operational domains into one sovereign brain.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-3"
        >
          <button onClick={onEnter} className="btn-primary inline-flex items-center gap-2 rounded-sm px-5 py-3 font-display text-[13px] font-semibold uppercase tracking-[0.22em]">
            Enter Command Deck <ArrowRight className="h-4 w-4" />
          </button>
          <a href="#modules" className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-5 py-3 font-display text-[13px] font-semibold uppercase tracking-[0.22em] text-slate-200 transition hover:border-cyber-400 hover:text-cyber-100 backdrop-blur-md">
            <Play className="h-3.5 w-3.5" /> Tour the modules
          </a>
        </motion.div>
      </div>

      {/* Bottom scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7, y: [0, 8, 0] }}
        transition={{ delay: 1.4, duration: 2.5, repeat: Infinity }}
        className="absolute inset-x-0 bottom-8 flex justify-center"
      >
        <div className="flex flex-col items-center gap-1 text-slate-500">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </motion.div>

      {/* Corner HUD decoration */}
      <div className="pointer-events-none absolute inset-4 z-10 font-mono text-[10px] uppercase tracking-widest text-cyber-400/50">
        <div className="absolute left-0 top-0 flex items-center gap-2"><span>▲</span><span>N 09.0820° · E 8.6753°</span></div>
        <div className="absolute right-0 top-0 flex items-center gap-2"><span>ABUJA · WAT</span><span>▲</span></div>
        <div className="absolute left-0 bottom-0 flex items-center gap-2"><span>◄</span><span>{new Date().toISOString().slice(0, 10)}</span></div>
        <div className="absolute right-0 bottom-0 flex items-center gap-2"><span>LINK · NOMINAL</span><span>►</span></div>
      </div>
    </section>
  )
}

function HeroOrb() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((s, dt) => {
    if (ref.current) { ref.current.rotation.x += dt * 0.15; ref.current.rotation.y += dt * 0.22 }
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.1, 5]} />
      <MeshDistortMaterial
        color="#0891b2"
        attach="material"
        distort={0.4}
        speed={2.4}
        roughness={0.15}
        metalness={0.9}
        emissive={'#22d3ee'}
        emissiveIntensity={0.35}
      />
    </mesh>
  )
}

function OrbitingRing({ radius, tilt, color }: { radius: number; tilt: number; color: string }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame((s, dt) => { if (ref.current) ref.current.rotation.z += dt * 0.2 })
  return (
    <group ref={ref} rotation={[tilt, 0, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.004, 8, 200]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}

// --------------------------------------------------------------
// Marquee band
// --------------------------------------------------------------
function MarqueeStrip() {
  const items = [
    'SOVEREIGN COMPUTE · ABUJA PRIME',
    '2.89M TRANSACTIONS / HOUR',
    '47 PRODUCTION MODELS · LIVE',
    '148,302,914 ENTITIES TRACKED',
    'INTERPOL · EUROPOL · FBI · FATF · AFRIPOL',
    '₦178.8B REPATRIATED (FY)',
    'ZERO-TRUST · POST-QUANTUM · WORM AUDIT'
  ]
  return (
    <div className="relative border-y border-white/5 bg-ink-900/80 py-3">
      <div className="marquee flex whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.32em] text-slate-500">
            <span className="text-cyber-400">◈</span> {t}
          </span>
        ))}
      </div>
    </div>
  )
}

// --------------------------------------------------------------
// Mission section (sticky scroll-reveal)
// --------------------------------------------------------------
function MissionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0.3])

  const stats = [
    { v: '11', k: 'Operational modules', s: 'one unified cockpit' },
    { v: '2.89M', k: 'Transactions / hr', s: 'real-time ingestion' },
    { v: '47', k: 'Production models', s: 'behavioral · graph · predictive' },
    { v: '99.99%', k: 'Uptime', s: '30-day service level' }
  ]

  return (
    <section id="mission" ref={ref} className="relative py-32 px-6">
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_20%,rgba(34,211,238,0.35),transparent_60%)]" />
      </motion.div>

      <div className="mx-auto max-w-6xl">
        <motion.div style={{ opacity }}>
          <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-cyber-400">
            <span className="h-px w-12 bg-cyber-400/60" /> 01 · Mission
          </div>
          <h2 className="font-display text-[min(8vw,72px)] font-bold leading-[1.05]">
            See patterns no human can see.<br />
            <span className="text-slate-500">Connect data no system has connected.</span><br />
            <span className="bg-gradient-to-r from-cyber-300 via-cyan-200 to-cyber-500 bg-clip-text text-transparent">Stop financial crime before it fully happens.</span>
          </h2>
        </motion.div>

        <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => <StatTile key={s.k} v={s.v} k={s.k} s={s.s} delay={i * 0.08} />)}
        </div>
      </div>
    </section>
  )
}

function StatTile({ v, k, s, delay }: { v: string; k: string; s: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition hover:border-cyber-500/40"
    >
      <div className="relative z-10">
        <div className="font-display text-[48px] font-bold leading-none tracking-tight text-cyber-100" style={{ textShadow: '0 0 24px rgba(34,211,238,0.3)' }}>{v}</div>
        <div className="mt-3 font-display text-[12px] uppercase tracking-[0.25em] text-cyber-300">{k}</div>
        <div className="mt-1 text-[11px] text-slate-500">{s}</div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyber-400/60 to-transparent transition-transform group-hover:scale-x-110" />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyber-500/10 blur-3xl transition group-hover:bg-cyber-400/20" />
    </motion.div>
  )
}

// --------------------------------------------------------------
// Modules horizontal sticky section
// --------------------------------------------------------------
const MOD_ICON: Record<string, any> = {
  command:    Activity,
  fusion:     Database,
  brain:      BrainCircuit,
  blockchain: Link2,
  radar:      Radar,
  forensics:  Microscope,
  copilot:    Bot,
  defense:    ShieldCheck,
  global:     Globe2,
  governance: Scale,
  academy:    GraduationCap
}

function ModulesSection({ onNavigateModule }: { onNavigateModule: (m: ModuleKey) => void }) {
  return (
    <section id="modules" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-cyber-400">
          <span className="h-px w-12 bg-cyber-400/60" /> 02 · The Eleven
        </div>
        <h2 className="font-display text-[min(7vw,56px)] font-bold leading-[1.05]">
          Eleven domains.<br /><span className="text-slate-500">One sovereign brain.</span>
        </h2>
        <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-slate-400">
          Every module is live and interactive. Tap any card to open the full cockpit.
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m, i) => {
            const Icon = MOD_ICON[m.key]
            return (
              <ModuleCard
                key={m.key}
                index={i}
                accent={m.accent}
                title={m.title}
                blurb={m.blurb}
                icon={<Icon className="h-5 w-5" />}
                glyph={m.glyph}
                onClick={() => onNavigateModule(m.key)}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ModuleCard({ index, accent, title, blurb, icon, glyph, onClick }: { index: number; accent: string; title: string; blurb: string; icon: ReactNode; glyph: string; onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  const mouse = useMotionValue('50% 50%')
  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
    mouse.set(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 3) * 0.08 + Math.floor(index / 3) * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-ink-800/40 p-6 text-left backdrop-blur-sm transition"
      style={{ willChange: 'transform' }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
        style={{ background: `radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), ${accent}22, transparent 60%)` }}
      />
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border" style={{ borderColor: accent + '50', background: accent + '10', color: accent }}>
            {icon}
          </div>
          <div className="font-display text-[18px] font-semibold leading-tight" style={{ color: accent }}>{title}</div>
        </div>
        <span className="font-display text-[44px] leading-none opacity-20" style={{ color: accent }}>{glyph}</span>
      </div>

      <p className="relative z-10 mt-4 text-[13px] leading-relaxed text-slate-400">{blurb}</p>

      <div className="relative z-10 mt-6 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">Open module</span>
        <ArrowRight className="h-4 w-4 translate-x-0 transition group-hover:translate-x-1" style={{ color: accent }} />
      </div>

      {/* Border accent */}
      <div className="absolute inset-x-4 bottom-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}70, transparent)` }} />
    </motion.button>
  )
}

// --------------------------------------------------------------
// Live intelligence teaser (with animated mini dashboard)
// --------------------------------------------------------------
function LiveSection() {
  return (
    <section id="live" className="relative py-32 px-6">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-cyber-400">
            <span className="h-px w-12 bg-cyber-400/60" /> 03 · Live intelligence
          </div>
          <h2 className="font-display text-[min(7vw,52px)] font-bold leading-[1.05]">Predictive,<br /><span className="text-slate-500">not reactive.</span></h2>
          <p className="mt-6 text-[16px] leading-relaxed text-slate-400 max-w-[520px]">
            Behavioral, graph and predictive models converge to surface crime <em>before</em> it completes. Every alert arrives with a probability, an explanation, and a court-ready narrative.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              { i: <Target className="h-4 w-4" />, t: 'Pre-incident alerts at 81.4% precision', c: '#22d3ee' },
              { i: <Network className="h-4 w-4" />, t: 'Graph-first syndicate identification', c: '#a78bfa' },
              { i: <Zap className="h-4 w-4" />,    t: 'Mean time to flag 1.41s — freeze 3.8s', c: '#f59e0b' },
              { i: <Lock className="h-4 w-4" />,    t: 'Immutable WORM audit for every action', c: '#10b981' }
            ].map(x => (
              <li key={x.t} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-md border" style={{ borderColor: x.c + '40', background: x.c + '12', color: x.c }}>{x.i}</span>
                <span className="text-[13px] text-slate-300">{x.t}</span>
              </li>
            ))}
          </ul>
        </div>

        <MiniDashboard />
      </div>
    </section>
  )
}

function MiniDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [alerts, setAlerts] = useState(() => ALERTS.slice(0, 4))

  useEffect(() => {
    if (!inView) return
    const t = setInterval(() => {
      setAlerts(prev => {
        const rot = prev.slice(1).concat(prev[0])
        return rot
      })
    }, 2800)
    return () => clearInterval(t)
  }, [inView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-xl border border-white/10 bg-ink-800/60 p-5 backdrop-blur"
    >
      <span className="corner-tl" /><span className="corner-tr" /><span className="corner-bl" /><span className="corner-br" />

      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="blink-dot h-1.5 w-1.5 bg-red-400 text-red-400" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-red-300">Live alert stream</span>
        </div>
        <span className="font-mono text-[10px] text-slate-500">{LIVE_METRICS.alertsOpen.toLocaleString()} open</span>
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {alerts.map((a, i) => (
            <motion.div
              key={a.id}
              layout
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-md border border-white/5 bg-white/[0.02] p-3"
              style={{ borderLeftWidth: 3, borderLeftColor: a.severity === 'CRITICAL' ? '#ef4444' : a.severity === 'HIGH' ? '#f59e0b' : '#eab308' }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9.5px] uppercase tracking-widest text-slate-500">{a.id} · {a.module}</span>
                <span className={'chip ' + (a.severity === 'CRITICAL' ? 'chip-red' : 'chip-amber')}>{a.severity}</span>
              </div>
              <div className="mt-1 text-[12.5px] text-slate-100">{a.title}</div>
              <div className="mt-1 font-mono text-[10px] text-slate-500">{a.entity} · confidence {a.confidence}%</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { k: 'Recovered', v: formatNaira(LIVE_METRICS.assetsRecovered) },
          { k: 'Frozen 24h', v: formatNaira(LIVE_METRICS.frozenLast24h) },
          { k: 'Uptime', v: LIVE_METRICS.uptime + '%' }
        ].map(s => (
          <div key={s.k} className="rounded-md border border-white/5 bg-white/[0.02] p-2 text-center">
            <div className="font-display text-[15px] font-bold text-cyber-200">{s.v}</div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-500">{s.k}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// --------------------------------------------------------------
// Global section
// --------------------------------------------------------------
function GlobalSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  return (
    <section id="global" ref={ref} className="relative py-32 px-6">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <GlobeViz />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-cyber-400">
            <span className="h-px w-12 bg-cyber-400/60" /> 04 · Global reach
          </div>
          <h2 className="font-display text-[min(7vw,52px)] font-bold leading-[1.05]">Cross-border.<br /><span className="text-slate-500">Single pane of glass.</span></h2>
          <p className="mt-6 max-w-[520px] text-[16px] leading-relaxed text-slate-400">
            INTERPOL · Europol · FBI · FATF · AFRIPOL · Egmont — integrated MLAT pipelines, asset-tracing corridors and joint-op command, unified into one secure bridge.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { k: 'Repatriated (FY)', v: '₦178.8B', c: '#10b981' },
              { k: 'Active MLATs', v: '48',     c: '#22d3ee' },
              { k: 'Joint Ops',     v: '9',      c: '#a78bfa' }
            ].map(s => (
              <div key={s.k} className="rounded-md border p-3" style={{ borderColor: s.c + '40', background: s.c + '10' }}>
                <div className="font-display text-[22px] font-bold" style={{ color: s.c }}>{s.v}</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-slate-500">{s.k}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function GlobeViz() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="relative aspect-square w-full max-w-[520px]">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 3]} intensity={1.6} color="#22d3ee" />
        <pointLight position={[-3, -3, 2]} intensity={0.8} color="#a78bfa" />
        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.2}>
          <Globe />
        </Float>
        <DreiSparkles count={120} size={1.6} scale={[6, 6, 6]} speed={0.3} color="#67e8f9" opacity={0.6} />
      </Canvas>
    </motion.div>
  )
}

function Globe() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((s, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.18 })
  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#0e7490" emissive="#22d3ee" emissiveIntensity={0.2} roughness={0.25} metalness={0.8} wireframe={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.01, 32, 32]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.25, 0.003, 6, 120]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
      </mesh>
    </>
  )
}

// --------------------------------------------------------------
// Final CTA
// --------------------------------------------------------------
function FinalCTA({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="relative overflow-hidden py-32 px-6">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(34,211,238,0.12),transparent_70%)]" />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <Sparkles className="mx-auto mb-4 h-6 w-6 text-cyber-300 animate-pulse-slow" />
          <h2 className="font-display text-[min(9vw,88px)] font-black leading-[0.95]">
            Step into the deck.
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] text-[16px] leading-relaxed text-slate-400">
            A 3D spatial command center where every module becomes a node you can circle, pull forward, and inhabit.
          </p>
        </motion.div>
        <motion.button
          onClick={onEnter}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6 }}
          className="btn-primary inline-flex items-center gap-2 rounded-sm px-6 py-4 font-display text-[14px] font-semibold uppercase tracking-[0.25em]"
        >
          Enter Command Deck <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </section>
  )
}

// --------------------------------------------------------------
// Footer
// --------------------------------------------------------------
function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-cyber-400/60">
            <Eye className="h-3.5 w-3.5 text-cyber-300" />
          </div>
          <div>
            <div className="font-display text-[11px] font-bold tracking-[0.28em] text-cyber-100">GOD'S EYE · GE-NFIIS</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500">Built by Lognetics · demonstration UI · synthetic data</div>
          </div>
        </div>

        <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-widest text-slate-500">
          <a href="https://github.com/Lognetics/EFCC-Sovereign-AI-System-Godseye" target="_blank" rel="noreferrer" className="hover:text-cyber-200 transition">GitHub</a>
          <span>·</span>
          <span>v1.1.0</span>
          <span>·</span>
          <span>TS/SCI · AUTHORIZED ONLY</span>
        </div>
      </div>
    </footer>
  )
}
