import { ReactNode } from 'react'

export function StatCard({
  label,
  value,
  delta,
  icon,
  tone = 'cyber',
  sparkline,
  footer
}: {
  label: string
  value: ReactNode
  delta?: string
  icon?: ReactNode
  tone?: 'cyber' | 'red' | 'amber' | 'green' | 'violet'
  sparkline?: number[]
  footer?: ReactNode
}) {
  const toneCfg = {
    cyber:  { glow: 'rgba(34,211,238,0.3)',  text: 'text-cyber-200',   border: 'border-cyber-500/25' },
    red:    { glow: 'rgba(239,68,68,0.3)',    text: 'text-red-300',     border: 'border-red-500/25' },
    amber:  { glow: 'rgba(245,158,11,0.3)',   text: 'text-amber-300',   border: 'border-amber-500/25' },
    green:  { glow: 'rgba(16,185,129,0.3)',   text: 'text-emerald-300', border: 'border-emerald-500/25' },
    violet: { glow: 'rgba(167,139,250,0.3)',  text: 'text-violet-300',  border: 'border-violet-500/25' }
  }[tone]

  return (
    <div className={'relative overflow-hidden rounded-md border bg-ink-800/50 p-4 backdrop-blur-sm ' + toneCfg.border}>
      <span className="corner-tl" />
      <span className="corner-br" />

      <div className="flex items-start justify-between">
        <div className="stat-label">{label}</div>
        {icon && <div className={'text-[18px] ' + toneCfg.text}>{icon}</div>}
      </div>
      <div className={'mt-2 font-display text-[26px] font-bold leading-none tracking-tight ' + toneCfg.text} style={{ textShadow: `0 0 22px ${toneCfg.glow}` }}>
        {value}
      </div>
      {delta && (
        <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-400">
          {delta}
        </div>
      )}
      {sparkline && <Spark data={sparkline} tone={tone} />}
      {footer && <div className="mt-3 border-t border-white/5 pt-2 text-[10.5px] text-slate-400">{footer}</div>}
    </div>
  )
}

function Spark({ data, tone }: { data: number[]; tone: 'cyber' | 'red' | 'amber' | 'green' | 'violet' }) {
  const colors = { cyber: '#22d3ee', red: '#ef4444', amber: '#f59e0b', green: '#10b981', violet: '#a78bfa' }[tone]
  const max = Math.max(...data), min = Math.min(...data)
  const W = 200, H = 36
  const path = data.map((d, i) => {
    const x = (i / (data.length - 1)) * W
    const y = H - ((d - min) / Math.max(1, max - min)) * H
    return (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1)
  }).join(' ')
  const area = path + ` L${W} ${H} L0 ${H} Z`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="mt-2 h-10 w-full">
      <defs>
        <linearGradient id={'sp-' + tone} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors} stopOpacity="0.4" />
          <stop offset="100%" stopColor={colors} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sp-${tone})`} />
      <path d={path} fill="none" stroke={colors} strokeWidth="1.4" />
    </svg>
  )
}
