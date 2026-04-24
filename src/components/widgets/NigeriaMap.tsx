import { useMemo, useState } from 'react'
import { RISK_HEATMAP } from '../../data/mockData'

// Rough stylized Nigeria silhouette using polygon with state positions as hotspots.
// This is a conceptual visualization — not a geospatially accurate map.

const STATE_COORDS: { name: string; x: number; y: number }[] = [
  { name: 'Lagos',        x: 0.18, y: 0.78 },
  { name: 'Ogun',         x: 0.22, y: 0.72 },
  { name: 'Oyo',          x: 0.24, y: 0.66 },
  { name: 'Ondo',         x: 0.30, y: 0.78 },
  { name: 'Edo',          x: 0.36, y: 0.72 },
  { name: 'Delta',        x: 0.38, y: 0.82 },
  { name: 'Rivers',       x: 0.48, y: 0.82 },
  { name: 'Bayelsa',      x: 0.44, y: 0.88 },
  { name: 'Akwa Ibom',    x: 0.56, y: 0.82 },
  { name: 'Cross River',  x: 0.62, y: 0.76 },
  { name: 'Anambra',      x: 0.46, y: 0.70 },
  { name: 'Imo',          x: 0.48, y: 0.76 },
  { name: 'Enugu',        x: 0.50, y: 0.64 },
  { name: 'Ebonyi',       x: 0.54, y: 0.66 },
  { name: 'Benue',        x: 0.56, y: 0.56 },
  { name: 'Kogi',         x: 0.42, y: 0.58 },
  { name: 'Nasarawa',     x: 0.50, y: 0.50 },
  { name: 'Abuja (FCT)',  x: 0.46, y: 0.48 },
  { name: 'Plateau',      x: 0.58, y: 0.46 },
  { name: 'Taraba',       x: 0.70, y: 0.50 },
  { name: 'Adamawa',      x: 0.78, y: 0.42 },
  { name: 'Bauchi',       x: 0.66, y: 0.34 },
  { name: 'Gombe',        x: 0.72, y: 0.32 },
  { name: 'Borno',        x: 0.86, y: 0.24 },
  { name: 'Yobe',         x: 0.80, y: 0.22 },
  { name: 'Jigawa',       x: 0.58, y: 0.22 },
  { name: 'Kano',         x: 0.52, y: 0.28 },
  { name: 'Katsina',      x: 0.42, y: 0.20 },
  { name: 'Kaduna',       x: 0.46, y: 0.34 },
  { name: 'Zamfara',      x: 0.34, y: 0.26 },
  { name: 'Sokoto',       x: 0.24, y: 0.20 },
  { name: 'Kebbi',        x: 0.18, y: 0.32 },
  { name: 'Niger',        x: 0.34, y: 0.42 },
  { name: 'Kwara',        x: 0.30, y: 0.56 },
  { name: 'Osun',         x: 0.26, y: 0.70 },
  { name: 'Ekiti',        x: 0.30, y: 0.68 }
]

// Simplified Nigeria outline
const OUTLINE = 'M 60 160 Q 40 120 60 90 Q 90 60 140 55 L 180 45 Q 220 35 260 45 Q 300 35 330 55 Q 380 65 420 80 Q 470 95 490 120 Q 500 150 480 180 Q 490 210 470 230 Q 440 270 400 285 Q 360 300 330 320 Q 300 335 270 330 Q 230 335 195 325 Q 170 340 150 340 Q 120 330 100 310 Q 75 290 70 260 Q 55 230 55 200 Z'

export function NigeriaMap({ height = 520 }: { height?: number }) {
  const [hover, setHover] = useState<string | null>(null)
  const [selected, setSelected] = useState<string>('Lagos')

  const riskLookup = useMemo(() => {
    const m = new Map<string, number>()
    for (const r of RISK_HEATMAP) m.set(r.state, r.value)
    return m
  }, [])

  const W = 540
  const H = height

  const colorFor = (v: number) => {
    if (v >= 80) return '#ef4444'
    if (v >= 65) return '#f59e0b'
    if (v >= 50) return '#eab308'
    if (v >= 35) return '#22d3ee'
    return '#10b981'
  }

  return (
    <div className="relative h-full w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
        <defs>
          <linearGradient id="country-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0.12)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.02)" />
          </linearGradient>
          <filter id="state-glow">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(34,211,238,0.05)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width={W} height={H} fill="url(#map-grid)" />

        {/* Country outline */}
        <g transform="translate(20, 80) scale(1)">
          <path d={OUTLINE} fill="url(#country-fill)" stroke="rgba(34,211,238,0.55)" strokeWidth="1.2" />
          {/* Lat/lon ticks */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1={60} x2={490} y1={60 + i * 35} y2={60 + i * 35} stroke="rgba(34,211,238,0.05)" strokeDasharray="2 4" />
          ))}
        </g>

        {/* State hotspots */}
        {STATE_COORDS.map(s => {
          const v = riskLookup.get(s.name) ?? 35
          const c = colorFor(v)
          const x = s.x * W, y = s.y * H
          const isSelected = s.name === selected
          const isHover = s.name === hover
          const r = 4 + v / 10
          return (
            <g key={s.name}
              onMouseEnter={() => setHover(s.name)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setSelected(s.name)}
              style={{ cursor: 'pointer' }}>
              {/* Pulse */}
              <circle cx={x} cy={y} r={r * 2.4} fill={c} opacity="0.12">
                <animate attributeName="r" from={r * 2} to={r * 4} dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.25" to="0" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx={x} cy={y} r={r} fill={c} opacity="0.35" />
              <circle cx={x} cy={y} r={r * 0.5} fill={c} />
              {(isHover || isSelected) && (
                <g>
                  <circle cx={x} cy={y} r={r + 6} fill="none" stroke={c} strokeWidth="1" strokeDasharray="3 3" />
                  <text x={x + r + 8} y={y + 3} fill="#e2e8f0" style={{ fontSize: 10.5, fontFamily: 'JetBrains Mono' }}>{s.name}</text>
                  <text x={x + r + 8} y={y + 15} fill={c} style={{ fontSize: 9, fontFamily: 'JetBrains Mono' }}>risk {v}/100</text>
                </g>
              )}
            </g>
          )
        })}

        {/* Scan sweep */}
        <g transform={`translate(${W / 2}, ${H / 2})`}>
          <g style={{ transformOrigin: 'center', animation: 'radar-sweep 8s linear infinite' }}>
            <path d={`M 0 0 L ${W / 2} 0 A ${W / 2} ${W / 2} 0 0 1 ${Math.cos(Math.PI / 12) * (W / 2)} ${Math.sin(Math.PI / 12) * (W / 2)} Z`} fill="rgba(34,211,238,0.08)" />
          </g>
        </g>
      </svg>

      {/* Legend */}
      <div className="absolute right-3 top-3 flex flex-col gap-1 rounded-sm border border-cyber-500/15 bg-ink-900/80 p-2 font-mono text-[9.5px] uppercase tracking-widest">
        <div className="text-slate-400">Financial crime risk</div>
        <div className="mt-1 flex gap-1">
          {[{ c: '#10b981', l: '<35' }, { c: '#22d3ee', l: '35-50' }, { c: '#eab308', l: '50-65' }, { c: '#f59e0b', l: '65-80' }, { c: '#ef4444', l: '>80' }].map(x => (
            <div key={x.l} className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full" style={{ background: x.c }} />
              <span className="text-slate-400">{x.l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
