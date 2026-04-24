import { Bell, Search, Command, Lock, Satellite, Gauge, Zap, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

export function TopBar({ title, subtitle, chips }: { title: string; subtitle?: string; chips?: { label: string; tone?: 'red' | 'amber' | 'green' | 'violet' }[] }) {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <header className="relative z-10 flex h-14 shrink-0 items-center gap-4 border-b border-cyber-500/10 bg-ink-900/70 px-5 backdrop-blur">
      {/* Module title */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative flex h-7 w-7 items-center justify-center rounded-sm border border-cyber-400/40 bg-cyber-500/10">
          <Gauge className="h-4 w-4 text-cyber-300" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="truncate font-display text-[14.5px] font-semibold uppercase tracking-[0.2em] text-cyber-100 text-glow">{title}</h1>
            {chips?.map((c, i) => (
              <span key={i} className={
                'chip ' +
                (c.tone === 'red' ? 'chip-red' :
                 c.tone === 'amber' ? 'chip-amber' :
                 c.tone === 'green' ? 'chip-green' :
                 c.tone === 'violet' ? 'chip-violet' : '')
              }>{c.label}</span>
            ))}
          </div>
          {subtitle && (
            <div className="truncate font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">{subtitle}</div>
          )}
        </div>
      </div>

      <div className="flex-1" />

      {/* Command bar */}
      <div className="relative hidden w-[360px] max-w-[35vw] items-center gap-2 rounded-sm border border-cyber-500/20 bg-ink-800/70 px-3 py-1.5 lg:flex">
        <Search className="h-3.5 w-3.5 text-cyber-400/70" />
        <input
          placeholder="Query any entity, wallet, BVN, case, transaction…"
          className="flex-1 bg-transparent font-mono text-[11.5px] text-slate-200 placeholder:text-slate-600 focus:outline-none"
        />
        <span className="flex items-center gap-1 rounded-sm border border-cyber-500/20 bg-cyber-500/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-cyber-300">
          <Command className="h-2.5 w-2.5" /> K
        </span>
      </div>

      {/* Status pills */}
      <div className="flex items-center gap-2">
        <StatusPill icon={<Satellite className="h-3 w-3" />} label="INGEST" value="2.89M/hr" tone="cyber" />
        <StatusPill icon={<Zap className="h-3 w-3" />} label="MODELS" value="47 live" tone="green" />
        <StatusPill icon={<Lock className="h-3 w-3" />} label="CRYPTO" value="MLS + Kyber" tone="violet" />
        <button className="relative rounded-sm border border-cyber-500/20 bg-ink-800/60 p-1.5 text-cyber-300 transition hover:bg-cyber-500/10">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 font-mono text-[9px] font-bold text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            12
          </span>
        </button>
      </div>

      {/* Clock */}
      <div className="hidden flex-col items-end border-l border-cyber-500/10 pl-4 md:flex">
        <div className="flex items-center gap-1.5 font-mono text-[12px] font-semibold text-cyber-200">
          <Clock className="h-3 w-3" />
          {time.toLocaleTimeString('en-GB')} <span className="text-slate-600">WAT</span>
        </div>
        <div className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-slate-500">
          {time.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'short', day: '2-digit' })}
        </div>
      </div>

      {/* Accent glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyber-400/40 to-transparent" />
    </header>
  )
}

function StatusPill({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: 'cyber' | 'green' | 'violet' | 'red' }) {
  const color =
    tone === 'green'  ? 'text-emerald-300 border-emerald-500/30' :
    tone === 'violet' ? 'text-violet-300 border-violet-500/30' :
    tone === 'red'    ? 'text-red-300 border-red-500/30' :
    'text-cyber-300 border-cyber-500/30'
  return (
    <div className={'hidden items-center gap-2 rounded-sm border bg-ink-800/60 px-2 py-1 font-mono text-[10px] uppercase tracking-widest md:inline-flex ' + color}>
      {icon}
      <span className="text-slate-500">{label}</span>
      <span>{value}</span>
    </div>
  )
}
