import { useEffect, useMemo, useRef, useState } from 'react'

// --- Area line chart (live stream) -----------------------------
export function LiveAreaChart({ height = 160, color = '#22d3ee', label = 'Transactions / sec', max = 60 }: { height?: number; color?: string; label?: string; max?: number }) {
  const [data, setData] = useState<number[]>(() => Array.from({ length: max }, () => 10 + Math.random() * 40))

  useEffect(() => {
    const t = setInterval(() => {
      setData(prev => {
        const last = prev[prev.length - 1]
        let next = last + (Math.random() - 0.5) * 12
        if (Math.random() < 0.08) next += (Math.random() < 0.5 ? -1 : 1) * 25
        next = Math.max(5, Math.min(95, next))
        return [...prev.slice(1), next]
      })
    }, 700)
    return () => clearInterval(t)
  }, [])

  const W = 600
  const max2 = 100
  const path = data.map((d, i) => {
    const x = (i / (data.length - 1)) * W
    const y = height - (d / max2) * (height - 8) - 4
    return (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1)
  }).join(' ')
  const area = path + ` L${W} ${height} L0 ${height} Z`
  const last = data[data.length - 1]

  return (
    <div className="relative">
      <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-slate-500">
        <span>{label}</span>
        <span className="font-display text-cyber-200" style={{ color }}>{last.toFixed(1)}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" className="h-auto w-full" style={{ height }}>
        <defs>
          <linearGradient id={`livefill-${color.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.45" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <pattern id={`livegrid-${color.slice(1)}`} width="40" height="32" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 32" fill="none" stroke="rgba(34,211,238,0.05)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={W} height={height} fill={`url(#livegrid-${color.slice(1)})`} />
        <path d={area} fill={`url(#livefill-${color.slice(1)})`} />
        <path d={path} fill="none" stroke={color} strokeWidth="1.6" style={{ filter: 'drop-shadow(0 0 6px ' + color + ')' }} />
        {/* Last point */}
        <circle cx={W} cy={height - (last / max2) * (height - 8) - 4} r="3" fill={color} style={{ filter: 'drop-shadow(0 0 6px ' + color + ')' }} />
      </svg>
    </div>
  )
}

// --- Stacked bar (risk breakdown) ------------------------------
export function StackedBars({ data, height = 200 }: { data: { label: string; segments: { value: number; color: string }[] }[]; height?: number }) {
  const W = 600
  const max = Math.max(...data.map(d => d.segments.reduce((a, b) => a + b.value, 0)))
  const barW = W / data.length - 6
  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="h-auto w-full" preserveAspectRatio="none">
      {data.map((d, i) => {
        let acc = 0
        const x = i * (W / data.length) + 3
        return (
          <g key={i}>
            {d.segments.map((s, j) => {
              const h = (s.value / max) * (height - 30)
              const y = height - 20 - acc - h
              acc += h
              return <rect key={j} x={x} y={y} width={barW} height={h} fill={s.color} opacity="0.85" />
            })}
            <text x={x + barW / 2} y={height - 6} fill="#64748b" textAnchor="middle" style={{ fontSize: 9 }}>{d.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

// --- Donut chart ----------------------------------------------
export function DonutChart({ data, size = 220 }: { data: { label: string; value: number; color: string }[]; size?: number }) {
  const total = data.reduce((a, b) => a + b.value, 0)
  const R = size / 2 - 8
  const r = R - 26
  let ang = -Math.PI / 2
  const arcs = data.map(d => {
    const slice = (d.value / total) * Math.PI * 2
    const x1 = size / 2 + R * Math.cos(ang)
    const y1 = size / 2 + R * Math.sin(ang)
    const a2 = ang + slice
    const x2 = size / 2 + R * Math.cos(a2)
    const y2 = size / 2 + R * Math.sin(a2)
    const x3 = size / 2 + r * Math.cos(a2)
    const y3 = size / 2 + r * Math.sin(a2)
    const x4 = size / 2 + r * Math.cos(ang)
    const y4 = size / 2 + r * Math.sin(ang)
    const large = slice > Math.PI ? 1 : 0
    const path = `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${r} ${r} 0 ${large} 0 ${x4} ${y4} Z`
    ang = a2
    return { d, path }
  })
  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={R} fill="none" stroke="rgba(34,211,238,0.08)" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(34,211,238,0.08)" />
        {arcs.map((a, i) => (
          <path key={i} d={a.path} fill={a.d.color} opacity="0.85" />
        ))}
        <text x={size / 2} y={size / 2 - 4} textAnchor="middle" fill="#cbd5e1" style={{ fontSize: 18, fontFamily: 'Rajdhani', fontWeight: 700 }}>
          {total}%
        </text>
        <text x={size / 2} y={size / 2 + 14} textAnchor="middle" fill="#64748b" style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase' }}>total</text>
      </svg>
      <div className="flex-1 space-y-1.5">
        {data.map((d, i) => (
          <div key={i} className="flex items-center justify-between gap-3 font-mono text-[11px]">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
              <span className="text-slate-400">{d.label}</span>
            </span>
            <span className="text-cyber-200">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// --- Radar (multi-dimension) ----------------------------------
export function RadarChart({ axes, values, size = 260 }: { axes: string[]; values: number[]; size?: number }) {
  const cx = size / 2, cy = size / 2, R = size / 2 - 30
  const n = axes.length
  const angle = (i: number) => (-Math.PI / 2) + (i / n) * Math.PI * 2

  const polygon = values.map((v, i) => {
    const rr = (v / 100) * R
    return [cx + rr * Math.cos(angle(i)), cy + rr * Math.sin(angle(i))]
  })

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-auto w-full">
      {/* Rings */}
      {[0.25, 0.5, 0.75, 1].map((f, i) => (
        <circle key={i} cx={cx} cy={cy} r={R * f} fill="none" stroke="rgba(34,211,238,0.12)" />
      ))}
      {/* Axes */}
      {axes.map((_, i) => {
        const x = cx + R * Math.cos(angle(i))
        const y = cy + R * Math.sin(angle(i))
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(34,211,238,0.08)" />
      })}
      {/* Polygon */}
      <polygon
        points={polygon.map(p => p.join(',')).join(' ')}
        fill="rgba(34,211,238,0.15)"
        stroke="#22d3ee"
        strokeWidth="1.5"
      />
      {polygon.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#22d3ee" />
      ))}
      {/* Labels */}
      {axes.map((a, i) => {
        const x = cx + (R + 12) * Math.cos(angle(i))
        const y = cy + (R + 12) * Math.sin(angle(i))
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dy="0.35em" fill="#94a3b8" style={{ fontSize: 9.5, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: 1.2 }}>
            {a}
          </text>
        )
      })}
    </svg>
  )
}

// --- Bar-gauge (horizontal) -----------------------------------
export function BarGauge({ label, value, max = 100, color = '#22d3ee', right }: { label: string; value: number; max?: number; color?: string; right?: string }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div>
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-slate-500">
        <span>{label}</span>
        <span style={{ color }}>{right ?? value}</span>
      </div>
      <div className="progress-track mt-1">
        <div className="progress-fill" style={{ width: pct + '%', background: `linear-gradient(90deg, ${color}99, ${color})` }} />
      </div>
    </div>
  )
}

// --- Heatmap grid (activity by hour) --------------------------
export function HeatmapGrid({ rows = 7, cols = 24, data }: { rows?: number; cols?: number; data?: number[][] }) {
  const matrix = useMemo(() => data ?? Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.random())), [data, rows, cols])
  const max = Math.max(...matrix.flat())
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return (
    <div>
      <div className="flex gap-1 font-mono text-[9px] text-slate-600">
        <div className="w-8" />
        {Array.from({ length: cols }, (_, i) => (
          <div key={i} className="flex-1 text-center">{i % 4 === 0 ? i : ''}</div>
        ))}
      </div>
      {matrix.map((row, i) => (
        <div key={i} className="mt-1 flex items-center gap-1">
          <div className="w-8 font-mono text-[9.5px] uppercase tracking-widest text-slate-500">{DAYS[i] ?? ''}</div>
          {row.map((v, j) => {
            const intensity = v / max
            return (
              <div
                key={j}
                className="flex-1 h-5 rounded-[2px]"
                title={`${DAYS[i]} ${j}:00 · ${(v * 100).toFixed(0)}%`}
                style={{
                  background: `rgba(34,211,238,${0.06 + intensity * 0.85})`,
                  boxShadow: intensity > 0.8 ? '0 0 8px rgba(34,211,238,0.5)' : undefined
                }}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

// --- Waveform (audio/voice analysis) --------------------------
export function Waveform({ color = '#22d3ee', height = 60, bars = 80 }: { color?: string; height?: number; bars?: number }) {
  const [tick, setTick] = useState(0)
  const ref = useRef(Array.from({ length: bars }, (_, i) => 0.3 + 0.5 * Math.abs(Math.sin(i * 0.35))))

  useEffect(() => {
    const t = setInterval(() => {
      ref.current = ref.current.map((_, i) => 0.25 + 0.75 * Math.abs(Math.sin(Date.now() / 300 + i * 0.3)))
      setTick(x => x + 1)
    }, 100)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex items-center gap-[2px]" style={{ height }}>
      {ref.current.map((v, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full"
          style={{
            height: `${v * 100}%`,
            background: `linear-gradient(180deg, ${color}, ${color}aa)`,
            boxShadow: `0 0 6px ${color}66`,
            opacity: 0.85
          }}
        />
      ))}
    </div>
  )
}
