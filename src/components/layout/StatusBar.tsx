import { Cpu, HardDrive, Wifi, ShieldCheck, Workflow, AlertTriangle } from 'lucide-react'

const TICKER_ITEMS = [
  '🔴 OP/SUNBURST — Layer-3 round-trip confirmed — ₦1.2B frozen at Zenith 003…21',
  '🟡 Radar — structured deposits detected across 14 branches (A. Nwosu)',
  '🟢 Recovery — Jersey FCU confirms asset transfer, ₦12.1B inbound 48h window',
  '🔴 Blockchain — mixer exit identified, bc1q…8fqrz → ProsperPay OTC',
  '🟣 Governance — quarterly bias audit M-GNN-01 cleared by AI Ethics Office',
  '🟡 Defense Core — insider threat alert ANALYST-0217 quarantined',
  '🟢 Cross-border — MLAT response returned from UK NCA (OP/CLEARWATER)',
  '🔴 Deepfake Shield — 4 synthetic KYCs blocked across PalmPay/Kuda/Access',
  '🟣 Model M-FUS-01 canary at 18%, precision 0.903 on 24h window',
  '🟢 Court-ready dossier generated for OP/GHOSTVEIN — 214 pages, citations verified'
]

export function StatusBar() {
  return (
    <footer className="relative flex h-8 shrink-0 items-center gap-4 border-t border-cyber-500/10 bg-ink-900/80 px-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-emerald-300">
          <span className="blink-dot h-1.5 w-1.5 bg-emerald-400 text-emerald-400" />
          OPERATIONAL
        </span>
        <span className="text-slate-700">|</span>
        <span className="flex items-center gap-1.5 text-cyber-300"><Cpu className="h-3 w-3" /> CPU 61%</span>
        <span className="flex items-center gap-1.5 text-cyber-300"><HardDrive className="h-3 w-3" /> STORE 4.21 PB</span>
        <span className="flex items-center gap-1.5 text-cyber-300"><Wifi className="h-3 w-3" /> INGEST 2.89M/hr</span>
        <span className="flex items-center gap-1.5 text-emerald-300"><ShieldCheck className="h-3 w-3" /> ZERO-TRUST</span>
        <span className="flex items-center gap-1.5 text-violet-300"><Workflow className="h-3 w-3" /> 47 MODELS</span>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div className="marquee flex whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span key={i} className="mx-8 inline-flex items-center gap-2 normal-case tracking-normal text-slate-400">
              {t}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-900 to-transparent" />
      </div>

      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-amber-300">
          <AlertTriangle className="h-3 w-3" /> NATIONAL RISK 73
        </span>
        <span className="text-slate-700">|</span>
        <span>GE-NFIIS · v1.0.4 · AUTH: TS/SCI</span>
      </div>
    </footer>
  )
}
