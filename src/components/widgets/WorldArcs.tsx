// Stylized world map with arcs for cross-border intelligence flows.
// A conceptual visualization, not geographically precise.

const CITIES: Record<string, [number, number]> = {
  Abuja:        [0.54, 0.56],
  Lagos:        [0.52, 0.58],
  London:       [0.47, 0.30],
  Washington:   [0.22, 0.36],
  Dubai:        [0.66, 0.50],
  Zurich:       [0.50, 0.34],
  Singapore:    [0.80, 0.60],
  Jersey:       [0.465, 0.31],
  Nairobi:      [0.60, 0.62],
  HongKong:     [0.80, 0.46]
}

const ARCS: { from: keyof typeof CITIES; to: keyof typeof CITIES; label: string; tone: 'cyber' | 'red' | 'amber' | 'green' }[] = [
  { from: 'Dubai',      to: 'Abuja', label: '₦28.4B — repatriation',          tone: 'green' },
  { from: 'London',     to: 'Abuja', label: '₦71.9B — UK NCA joint op',       tone: 'green' },
  { from: 'Washington', to: 'Abuja', label: '₦33.8B — FBI MLAT',              tone: 'cyber' },
  { from: 'Zurich',     to: 'Abuja', label: '₦44.2B — FINMA freeze',          tone: 'amber' },
  { from: 'Jersey',     to: 'Abuja', label: '₦12.1B — asset tracing',         tone: 'cyber' },
  { from: 'Nairobi',    to: 'Abuja', label: '₦3.2B — AFRIPOL',                tone: 'green' },
  { from: 'Singapore',  to: 'Abuja', label: '₦9.4B — MAS adjudication',       tone: 'amber' },
  { from: 'HongKong',   to: 'Lagos', label: 'Trade mis-invoicing flow',       tone: 'red' }
]

const toneColor = (t: string) => t === 'red' ? '#ef4444' : t === 'amber' ? '#f59e0b' : t === 'green' ? '#10b981' : '#22d3ee'

// Simplified continent blobs
const LAND = [
  // North America
  'M 30 140 Q 55 90 120 80 Q 160 70 190 95 Q 220 120 210 160 Q 200 190 170 210 Q 140 220 110 210 Q 80 200 60 180 Q 30 170 30 140 Z',
  // South America
  'M 180 220 Q 210 230 230 260 Q 230 320 210 360 Q 190 380 180 360 Q 160 330 165 280 Q 170 240 180 220 Z',
  // Europe + Africa
  'M 330 110 Q 370 100 410 115 Q 440 140 425 170 Q 405 190 375 190 Q 355 200 355 225 Q 360 270 380 310 Q 400 350 390 390 Q 370 410 340 400 Q 315 370 315 330 Q 305 290 315 250 Q 305 220 310 170 Q 310 130 330 110 Z',
  // Asia
  'M 450 110 Q 520 95 600 110 Q 660 130 680 165 Q 700 200 680 230 Q 630 260 580 255 Q 520 255 480 230 Q 450 200 450 160 Q 445 125 450 110 Z',
  // Australia
  'M 620 310 Q 680 305 700 330 Q 710 360 690 380 Q 650 390 620 375 Q 595 355 610 330 Q 615 315 620 310 Z'
]

export function WorldArcs({ height = 420 }: { height?: number }) {
  const W = 760
  const H = height

  const draw = (a: [number, number], b: [number, number]) => {
    const x1 = a[0] * W, y1 = a[1] * H, x2 = b[0] * W, y2 = b[1] * H
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
    const dx = x2 - x1, dy = y2 - y1
    const dist = Math.sqrt(dx * dx + dy * dy)
    const cx = mx - dy * 0.3, cy = my + dx * 0.3 - Math.min(80, dist * 0.5)
    return { path: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, x1, y1, x2, y2, dist }
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
      <defs>
        <pattern id="world-grid" width="40" height="30" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(34,211,238,0.04)" strokeWidth="1" />
        </pattern>
        <radialGradient id="world-bg">
          <stop offset="0%" stopColor="rgba(34,211,238,0.08)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      <rect width={W} height={H} fill="url(#world-grid)" />
      <ellipse cx={W / 2} cy={H / 2} rx={W / 2} ry={H / 2} fill="url(#world-bg)" />

      {/* Latitude */}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={i} x1={0} x2={W} y1={60 + i * 60} y2={60 + i * 60} stroke="rgba(34,211,238,0.05)" strokeDasharray="2 6" />
      ))}

      {/* Land masses */}
      {LAND.map((d, i) => (
        <path key={i} d={d} fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.4)" strokeWidth="0.8" />
      ))}

      {/* Arcs */}
      {ARCS.map((a, i) => {
        const c = toneColor(a.tone)
        const { path } = draw(CITIES[a.from], CITIES[a.to])
        return (
          <g key={i}>
            <path d={path} fill="none" stroke={c} strokeOpacity="0.6" strokeWidth="1.2" />
            <circle r="3" fill={c} style={{ filter: `drop-shadow(0 0 6px ${c})` }}>
              <animateMotion dur={`${3 + i * 0.3}s`} repeatCount="indefinite" path={path} />
            </circle>
          </g>
        )
      })}

      {/* Cities */}
      {Object.entries(CITIES).map(([name, [x, y]]) => {
        const cx = x * W, cy = y * H
        const isHub = name === 'Abuja' || name === 'Lagos'
        return (
          <g key={name}>
            {isHub && (
              <circle cx={cx} cy={cy} r={10} fill="#22d3ee" opacity="0.15">
                <animate attributeName="r" from="6" to="14" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={cx} cy={cy} r={isHub ? 4 : 3} fill={isHub ? '#22d3ee' : '#cbd5e1'} style={{ filter: isHub ? 'drop-shadow(0 0 6px #22d3ee)' : '' }} />
            <text x={cx + 6} y={cy - 4} fill={isHub ? '#22d3ee' : '#cbd5e1'} style={{ fontSize: 9, fontFamily: 'JetBrains Mono', letterSpacing: 1 }}>{name}</text>
          </g>
        )
      })}
    </svg>
  )
}
