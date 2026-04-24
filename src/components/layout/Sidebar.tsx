import {
  LayoutDashboard,
  Database,
  BrainCircuit,
  Link2,
  Radar,
  Microscope,
  Bot,
  ShieldCheck,
  Globe2,
  Scale,
  GraduationCap,
  Activity,
  Eye,
  Home,
  Orbit
} from 'lucide-react'
import type { ModuleKey } from '../../routes'

const MOD: { key: ModuleKey; label: string; sub: string; icon: any; badge?: string }[] = [
  { key: 'command',    label: 'Command & Control',          sub: 'War Room · Live Ops',                icon: LayoutDashboard, badge: 'LIVE' },
  { key: 'fusion',     label: 'Data Fusion & Digital Twin', sub: '18 feeds · 148M entities',           icon: Database },
  { key: 'brain',      label: 'AI Intelligence Core',       sub: "God's Eye Brain · 47 models",        icon: BrainCircuit },
  { key: 'blockchain', label: 'Blockchain Grid',            sub: 'Wallet clustering · Cross-chain',    icon: Link2 },
  { key: 'radar',      label: 'Financial Monitoring Radar', sub: '2.89M tx/hr · Real-time',            icon: Radar, badge: 'RT' },
  { key: 'forensics',  label: 'Digital Forensics Lab',      sub: 'Evidence · Chain-of-Custody',        icon: Microscope },
  { key: 'copilot',    label: 'AI Investigator Copilot',    sub: 'Per-officer augmentation',           icon: Bot },
  { key: 'defense',    label: 'Cybersecurity & Defense',    sub: 'Zero-trust · Insider Threat',        icon: ShieldCheck },
  { key: 'global',     label: 'Global Intelligence Bridge', sub: 'INTERPOL · Europol · FBI · FATF',     icon: Globe2 },
  { key: 'governance', label: 'Legal & Governance',         sub: 'Oversight · Rights · Audit',         icon: Scale },
  { key: 'academy',    label: 'Human Capital · Academy',    sub: '7 programs · 1,490 officers',        icon: GraduationCap }
]

export function Sidebar({ active, setActive, onHome, onDeck }: { active: ModuleKey; setActive: (m: ModuleKey) => void; onHome?: () => void; onDeck?: () => void }) {
  return (
    <aside className="relative flex w-[268px] shrink-0 flex-col border-r border-cyber-500/10 bg-ink-900/80 backdrop-blur-sm">
      {/* Brand */}
      <div className="relative flex items-center gap-3 border-b border-cyber-500/10 px-5 py-4">
        <button onClick={onHome} className="relative flex h-10 w-10 items-center justify-center rounded-full border border-cyber-400/70 ring-cyber transition hover:border-cyber-200" title="Return to landing">
          <Eye className="h-5 w-5 text-cyber-300" />
          <span className="absolute inset-0 targeting rounded-full" />
        </button>
        <div>
          <div className="font-display text-[15px] font-bold leading-none tracking-wide text-cyber-100 text-glow">
            GOD&apos;S EYE
          </div>
          <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.3em] text-slate-500">
            EFCC · GE-NFIIS · v1.1
          </div>
        </div>
      </div>

      {/* Clearance bar */}
      <div className="relative flex items-center justify-between border-b border-cyber-500/10 px-5 py-2">
        <div className="flex items-center gap-2">
          <span className="blink-dot h-1.5 w-1.5 bg-emerald-400 text-emerald-400"></span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-300/90">Secure Session</span>
        </div>
        <span className="chip chip-violet">TS/SCI</span>
      </div>

      {/* Quick nav */}
      <div className="flex items-center gap-1.5 border-b border-cyber-500/10 px-3 py-2">
        <button onClick={onHome} className="flex-1 inline-flex items-center gap-1.5 rounded-sm border border-white/10 bg-white/5 px-2 py-1 font-mono text-[9.5px] uppercase tracking-widest text-slate-300 transition hover:border-cyber-400/50 hover:text-cyber-200">
          <Home className="h-3 w-3" /> Landing
        </button>
        <button onClick={onDeck} className="flex-1 inline-flex items-center gap-1.5 rounded-sm border border-cyber-500/30 bg-cyber-500/10 px-2 py-1 font-mono text-[9.5px] uppercase tracking-widest text-cyber-200 transition hover:border-cyber-400 hover:bg-cyber-500/20">
          <Orbit className="h-3 w-3" /> 3D Deck
        </button>
      </div>

      {/* Module list */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <div className="mb-2 px-2 font-mono text-[9.5px] uppercase tracking-[0.3em] text-slate-600">
          Operational Modules
        </div>
        <div className="space-y-0.5">
          {MOD.map(m => {
            const Icon = m.icon
            const isActive = active === m.key
            return (
              <button
                key={m.key}
                data-active={isActive}
                className="nav-item group w-full text-left"
                onClick={() => setActive(m.key)}
              >
                <Icon className={'h-[18px] w-[18px] shrink-0 ' + (isActive ? 'text-cyber-300' : 'text-slate-500 group-hover:text-cyber-300')} />
                <div className="flex-1 overflow-hidden">
                  <div className="truncate font-display text-[12.5px] tracking-wide">{m.label}</div>
                  <div className="truncate font-mono text-[9.5px] uppercase tracking-[0.15em] text-slate-600">{m.sub}</div>
                </div>
                {m.badge && (
                  <span className={'chip ' + (m.badge === 'LIVE' ? 'chip-red' : 'chip-green')}>
                    <span className="blink-dot h-1 w-1 bg-current text-current" />{m.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-5 mb-2 px-2 font-mono text-[9.5px] uppercase tracking-[0.3em] text-slate-600">
          System Pulse
        </div>
        <MiniPulse />
      </nav>

      {/* Footer */}
      <div className="border-t border-cyber-500/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-cyber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-500/40 to-fuchsia-500/30" />
            <div className="relative flex h-full w-full items-center justify-center font-display text-[12px] text-cyber-100">AO</div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-display text-[12px] text-slate-200">DCP A. Okonkwo</div>
            <div className="truncate font-mono text-[9.5px] uppercase tracking-[0.2em] text-slate-500">Clearance · Level 5</div>
          </div>
          <div className="flex items-center gap-1 font-mono text-[9px] text-emerald-300">
            <Activity className="h-3 w-3" /> 99.99
          </div>
        </div>
      </div>

      {/* Scan line effect */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan-line bg-gradient-to-r from-transparent via-cyber-400/60 to-transparent" />
    </aside>
  )
}

function MiniPulse() {
  return (
    <div className="space-y-2 px-2 pb-2">
      {[
        { k: 'Ingest',       v: '2.89M/hr', w: 86, c: 'cyber' },
        { k: 'Risk Index',   v: '73/100',   w: 73, c: 'amber' },
        { k: 'Threat Level', v: 'ELEVATED', w: 58, c: 'red' },
        { k: 'Compute',      v: '61%',      w: 61, c: 'cyber' }
      ].map(x => (
        <div key={x.k}>
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-slate-500">
            <span>{x.k}</span>
            <span className={
              x.c === 'red' ? 'text-red-300' :
              x.c === 'amber' ? 'text-amber-300' :
              'text-cyber-200'
            }>{x.v}</span>
          </div>
          <div className="progress-track mt-1">
            <div
              className={
                'progress-fill ' +
                (x.c === 'red' ? '[background:linear-gradient(90deg,#ef444499,#f87171)]' :
                 x.c === 'amber' ? '[background:linear-gradient(90deg,#f59e0b99,#fbbf24)]' : '')
              }
              style={{ width: x.w + '%' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
