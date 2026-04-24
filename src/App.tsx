import { useEffect, useState } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { StatusBar } from './components/layout/StatusBar'
import { CommandCenter } from './modules/CommandCenter'
import { DataFusion } from './modules/DataFusion'
import { AIBrain } from './modules/AIBrain'
import { Blockchain } from './modules/Blockchain'
import { RealTimeRadar } from './modules/RealTimeRadar'
import { Forensics } from './modules/Forensics'
import { Copilot } from './modules/Copilot'
import { Defense } from './modules/Defense'
import { GlobalBridge } from './modules/GlobalBridge'
import { Governance } from './modules/Governance'
import { Academy } from './modules/Academy'
import { Eye } from 'lucide-react'

export type ModuleKey =
  | 'command' | 'fusion' | 'brain' | 'blockchain' | 'radar'
  | 'forensics' | 'copilot' | 'defense' | 'global' | 'governance' | 'academy'

export default function App() {
  const [active, setActive] = useState<ModuleKey>('command')
  const [boot, setBoot] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setBoot(false), 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {boot ? (
        <BootSplash />
      ) : (
        <>
          <div className="flex min-h-0 flex-1 overflow-hidden">
            <Sidebar active={active} setActive={setActive} />
            <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-grid">
              <ModuleRouter active={active} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyber-500/5 via-transparent to-transparent" />
            </main>
          </div>
          <StatusBar />
        </>
      )}
    </div>
  )
}

function ModuleRouter({ active }: { active: ModuleKey }) {
  switch (active) {
    case 'command':    return <CommandCenter />
    case 'fusion':     return <DataFusion />
    case 'brain':      return <AIBrain />
    case 'blockchain': return <Blockchain />
    case 'radar':      return <RealTimeRadar />
    case 'forensics':  return <Forensics />
    case 'copilot':    return <Copilot />
    case 'defense':    return <Defense />
    case 'global':     return <GlobalBridge />
    case 'governance': return <Governance />
    case 'academy':    return <Academy />
  }
}

function BootSplash() {
  const [line, setLine] = useState(0)
  const LINES = [
    'HANDSHAKE · sovereign root-of-trust (TPM attested) ✓',
    'LOADING · 18 ingest feeds — 2.89M tx/hr target ✓',
    'WARMING · 47 production models (serving)',
    'LINKING · digital twin — 148,302,914 entities ✓',
    'AUTH · operator DCP A. Okonkwo (TS/SCI) ✓',
    'READY · GOD\'S EYE · GE-NFIIS v1.0.4'
  ]

  useEffect(() => {
    const t = setInterval(() => setLine(l => Math.min(l + 1, LINES.length - 1)), 380)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid-dense opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan-line bg-gradient-to-r from-transparent via-cyber-400 to-transparent" />

      <div className="relative w-[640px] max-w-[92vw] space-y-5 text-center">
        {/* Logo */}
        <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 animate-pulse-slow rounded-full border border-cyber-400/30" />
          <div className="absolute inset-3 rounded-full border border-cyber-400/50" />
          <div className="absolute inset-6 rounded-full border border-cyber-400/80 ring-cyber" />
          <div className="absolute inset-0 targeting rounded-full" style={{ animation: 'radar-sweep 4s linear infinite' }} />
          <Eye className="relative h-10 w-10 text-cyber-300 text-glow" />
        </div>

        <div className="space-y-1">
          <div className="font-display text-[34px] font-bold tracking-[0.4em] text-cyber-200 text-glow">GOD&apos;S EYE</div>
          <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-slate-400">EFCC · Sovereign AI System · GE-NFIIS</div>
          <div className="mx-auto mt-3 h-px w-56 bg-gradient-to-r from-transparent via-cyber-400/60 to-transparent" />
        </div>

        <div className="mx-auto w-full max-w-[460px] rounded-md border border-cyber-500/25 bg-ink-900/70 p-3 text-left font-mono text-[11px] text-slate-300 backdrop-blur-sm">
          {LINES.slice(0, line + 1).map((l, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className={i === line ? 'text-cyber-300' : 'text-emerald-400'}>
                {i === line ? <span className="blink-dot inline-block h-1.5 w-1.5 bg-cyber-400 text-cyber-400" /> : '✓'}
              </span>
              <span className={i === line ? 'text-slate-200' : 'text-slate-500'}>{l}</span>
            </div>
          ))}
        </div>

        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
          CLEARANCE: TOP-SECRET / SCI · FOR AUTHORIZED EFCC PERSONNEL ONLY
        </div>
      </div>
    </div>
  )
}
