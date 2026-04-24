import { useMemo, useState } from 'react'
import { NETWORK, riskColor, type GraphNode } from '../../data/mockData'

const KIND_ICON: Record<string, string> = {
  person:   '◉',
  company:  '▣',
  wallet:   '⬢',
  account:  '◆',
  bank:     '■',
  exchange: '⬣',
  shell:    '☗'
}

export function NetworkGraph({ height = 440 }: { height?: number }) {
  const [hover, setHover] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>('n1')

  const width = 720

  const scaled = useMemo(() => {
    return NETWORK.nodes.map(n => ({
      ...n,
      cx: n.x * width,
      cy: n.y * height
    }))
  }, [height])

  const findNode = (id: string) => scaled.find(n => n.id === id)!

  const edgeColor = (kind: string) => {
    switch (kind) {
      case 'flow':      return '#22d3ee'
      case 'crypto':    return '#eab308'
      case 'identity':  return '#a855f7'
      case 'ownership': return '#ef4444'
      default:          return '#64748b'
    }
  }

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
        {/* Grid background */}
        <defs>
          <pattern id="grid-net" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(34,211,238,0.06)" strokeWidth="1" />
          </pattern>
          <filter id="glow-net">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="bg-radial">
            <stop offset="0%" stopColor="rgba(34,211,238,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width={width} height={height} fill="url(#grid-net)" />
        <rect width={width} height={height} fill="url(#bg-radial)" />

        {/* Edges */}
        {NETWORK.edges.map((e, i) => {
          const a = findNode(e.from), b = findNode(e.to)
          if (!a || !b) return null
          const isHot = hover === a.id || hover === b.id || selected === a.id || selected === b.id
          return (
            <g key={i}>
              <line
                x1={a.cx}
                y1={a.cy}
                x2={b.cx}
                y2={b.cy}
                stroke={edgeColor(e.kind)}
                strokeOpacity={isHot ? 0.9 : 0.35}
                strokeWidth={Math.max(1, e.weight / 3)}
                strokeDasharray={e.kind === 'identity' ? '4 4' : e.kind === 'ownership' ? '' : ''}
              />
              {isHot && (
                <circle r="3" fill={edgeColor(e.kind)}>
                  <animateMotion
                    dur={`${4 - Math.min(2, e.weight / 4)}s`}
                    repeatCount="indefinite"
                    path={`M ${a.cx} ${a.cy} L ${b.cx} ${b.cy}`}
                  />
                </circle>
              )}
            </g>
          )
        })}

        {/* Nodes */}
        {scaled.map(n => {
          const isHot = hover === n.id || selected === n.id
          return (
            <g
              key={n.id}
              transform={`translate(${n.cx}, ${n.cy})`}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setSelected(n.id)}
              style={{ cursor: 'pointer' }}
            >
              <circle r={n.r + 8} fill={riskColor(n.risk)} opacity={isHot ? 0.15 : 0.08} />
              <circle r={n.r} fill="#03060c" stroke={riskColor(n.risk)} strokeWidth={isHot ? 2 : 1.3} filter={isHot ? 'url(#glow-net)' : undefined} />
              <text textAnchor="middle" dy="0.35em" fill={riskColor(n.risk)} style={{ fontSize: n.r * 0.9, fontWeight: 700 }}>
                {KIND_ICON[n.kind]}
              </text>
              <text textAnchor="middle" y={n.r + 14} fill={isHot ? '#e2e8f0' : '#94a3b8'} style={{ fontSize: 10, fontFamily: 'JetBrains Mono' }}>
                {n.label}
              </text>
            </g>
          )
        })}

        {/* Targeting crosshair on selected */}
        {selected && (() => {
          const n = findNode(selected)
          if (!n) return null
          return (
            <g transform={`translate(${n.cx}, ${n.cy})`}>
              <circle r={n.r + 22} fill="none" stroke={riskColor(n.risk)} strokeOpacity="0.35" />
              <circle r={n.r + 30} fill="none" stroke={riskColor(n.risk)} strokeOpacity="0.15" strokeDasharray="4 4">
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite" />
              </circle>
            </g>
          )
        })()}
      </svg>

      {/* Legend */}
      <div className="absolute left-3 bottom-3 flex flex-col gap-1 rounded-sm border border-cyber-500/15 bg-ink-900/80 p-2 font-mono text-[9.5px] uppercase tracking-widest">
        <div className="flex items-center gap-2"><span className="h-[3px] w-6 bg-cyber-400" /> <span className="text-slate-400">Financial flow</span></div>
        <div className="flex items-center gap-2"><span className="h-[3px] w-6 bg-yellow-400" /> <span className="text-slate-400">Crypto path</span></div>
        <div className="flex items-center gap-2"><span className="h-[3px] w-6 bg-violet-400 [background-image:repeating-linear-gradient(90deg,currentColor_0_4px,transparent_4px_8px)] [background-size:8px_3px]" /> <span className="text-slate-400">Identity link</span></div>
        <div className="flex items-center gap-2"><span className="h-[3px] w-6 bg-red-500" /> <span className="text-slate-400">Ownership</span></div>
      </div>

      {/* Selected node card */}
      {selected && (() => {
        const n = NETWORK.nodes.find(x => x.id === selected)
        if (!n) return null
        return (
          <div className="absolute right-3 top-3 w-[220px] rounded-sm border border-cyber-500/25 bg-ink-900/90 p-3 font-mono text-[10.5px] backdrop-blur">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-display text-[11px] uppercase tracking-widest text-cyber-300">Entity Focus</span>
              <span className="chip" style={{ borderColor: riskColor(n.risk), color: riskColor(n.risk) }}>{n.risk}</span>
            </div>
            <div className="text-[12.5px] text-slate-100">{n.label}</div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500">kind · {n.kind}</div>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between"><span className="text-slate-500">degree</span><span className="text-cyber-300">{NETWORK.edges.filter(e => e.from === n.id || e.to === n.id).length}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">cluster</span><span className="text-cyber-300">Syndicate-A</span></div>
              <div className="flex justify-between"><span className="text-slate-500">cases</span><span className="text-cyber-300">OP/SUNBURST · OP/LIGHTHOUSE</span></div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}

export function MiniGraph({ nodes, edges, height = 160, width = 300 }: {
  nodes: GraphNode[]
  edges: { from: string; to: string; weight: number; kind?: string }[]
  height?: number
  width?: number
}) {
  const scaled = nodes.map(n => ({ ...n, cx: n.x * width, cy: n.y * height }))
  const find = (id: string) => scaled.find(n => n.id === id)!
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
      {edges.map((e, i) => {
        const a = find(e.from), b = find(e.to)
        if (!a || !b) return null
        return <line key={i} x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy} stroke="rgba(34,211,238,0.4)" strokeWidth="1" />
      })}
      {scaled.map(n => (
        <g key={n.id}>
          <circle cx={n.cx} cy={n.cy} r={n.r * 0.5} fill={riskColor(n.risk)} opacity="0.15" />
          <circle cx={n.cx} cy={n.cy} r={Math.max(3, n.r * 0.25)} fill={riskColor(n.risk)} />
        </g>
      ))}
    </svg>
  )
}
