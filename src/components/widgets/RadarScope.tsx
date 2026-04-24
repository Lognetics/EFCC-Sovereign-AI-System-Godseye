import { useEffect, useMemo, useState } from 'react'
import { riskColor } from '../../data/mockData'

interface Blip {
  id: string
  angle: number   // rad
  dist: number    // 0..1
  risk: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE' | 'LOW'
  label: string
  born: number
}

export function RadarScope({ size = 380 }: { size?: number }) {
  const R = size / 2 - 10
  const [blips, setBlips] = useState<Blip[]>([])
  const [sweep, setSweep] = useState(0)

  useEffect(() => {
    const tick = () => setSweep(s => (s + 2) % 360)
    const t = setInterval(tick, 40)
    return () => clearInterval(t)
  }, [])

  // Occasional blip generator
  useEffect(() => {
    const add = setInterval(() => {
      const tier = Math.random()
      const risk = tier < 0.1 ? 'CRITICAL' : tier < 0.3 ? 'HIGH' : tier < 0.55 ? 'ELEVATED' : tier < 0.8 ? 'MODERATE' : 'LOW'
      const labels = ['NIP burst', 'Crypto exit', 'Structured deposits', 'New beneficiary', 'Round-trip', 'Cross-border', 'PEP link', 'Night hours', 'High velocity', 'Mixer exit']
      setBlips(prev => {
        const nb = {
          id: Math.random().toString(36).slice(2, 9),
          angle: Math.random() * Math.PI * 2,
          dist: 0.2 + Math.random() * 0.75,
          risk: risk as Blip['risk'],
          label: labels[Math.floor(Math.random() * labels.length)],
          born: Date.now()
        }
        return [...prev.filter(b => Date.now() - b.born < 6500), nb].slice(-14)
      })
    }, 900)
    return () => clearInterval(add)
  }, [])

  const cx = size / 2, cy = size / 2
  const sweepRad = (sweep * Math.PI) / 180
  const sweepX = cx + R * Math.cos(sweepRad)
  const sweepY = cy + R * Math.sin(sweepRad)

  return (
    <div className="relative flex items-center justify-center">
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <defs>
          <radialGradient id="radar-bg">
            <stop offset="0%" stopColor="rgba(34,211,238,0.14)" />
            <stop offset="80%" stopColor="rgba(34,211,238,0.02)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="radar-sweep-g" gradientUnits="userSpaceOnUse" x1={cx} y1={cy} x2={sweepX} y2={sweepY}>
            <stop offset="0%" stopColor="rgba(34,211,238,0.5)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {/* Background */}
        <circle cx={cx} cy={cy} r={R} fill="url(#radar-bg)" />
        {/* Rings */}
        {[0.25, 0.5, 0.75, 1].map((f, i) => (
          <circle key={i} cx={cx} cy={cy} r={R * f} fill="none" stroke="rgba(34,211,238,0.25)" strokeDasharray={i === 3 ? '' : '4 4'} strokeWidth="0.8" />
        ))}
        {/* Axes */}
        {[0, 45, 90, 135].map(a => {
          const r = (a * Math.PI) / 180
          return (
            <line key={a}
              x1={cx + R * Math.cos(r)}
              y1={cy + R * Math.sin(r)}
              x2={cx - R * Math.cos(r)}
              y2={cy - R * Math.sin(r)}
              stroke="rgba(34,211,238,0.1)"
            />
          )
        })}

        {/* Sweep wedge */}
        <g transform={`translate(${cx} ${cy})`}>
          <g transform={`rotate(${sweep})`}>
            <path d={`M 0 0 L ${R} 0 A ${R} ${R} 0 0 1 ${Math.cos(Math.PI / 4) * R} ${Math.sin(Math.PI / 4) * R} Z`} fill="rgba(34,211,238,0.1)" />
            <line x1="0" y1="0" x2={R} y2="0" stroke="#22d3ee" strokeWidth="1.4" opacity="0.8" />
          </g>
        </g>

        {/* Blips */}
        {blips.map(b => {
          const age = (Date.now() - b.born) / 6500
          const opacity = Math.max(0.1, 1 - age)
          const x = cx + b.dist * R * Math.cos(b.angle)
          const y = cy + b.dist * R * Math.sin(b.angle)
          const c = riskColor(b.risk)
          return (
            <g key={b.id} opacity={opacity}>
              <circle cx={x} cy={y} r={8} fill={c} opacity="0.18">
                <animate attributeName="r" from="3" to="14" dur="1.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.3" to="0" dur="1.4s" repeatCount="indefinite" />
              </circle>
              <circle cx={x} cy={y} r={3} fill={c} style={{ filter: `drop-shadow(0 0 4px ${c})` }} />
              <text x={x + 6} y={y + 3} fill={c} style={{ fontSize: 8.5, fontFamily: 'JetBrains Mono', letterSpacing: 0.5 }}>
                {b.label}
              </text>
            </g>
          )
        })}

        {/* Center */}
        <circle cx={cx} cy={cy} r={4} fill="#22d3ee" style={{ filter: 'drop-shadow(0 0 6px #22d3ee)' }} />
      </svg>

      {/* Corner HUD labels */}
      <div className="pointer-events-none absolute inset-0 font-mono text-[9.5px] uppercase tracking-widest text-cyber-300/70">
        <span className="absolute left-1 top-1">Bearing 0°</span>
        <span className="absolute right-1 top-1">Range 500km</span>
        <span className="absolute left-1 bottom-1">Sweep {sweep}°</span>
        <span className="absolute right-1 bottom-1">Live</span>
      </div>
    </div>
  )
}
