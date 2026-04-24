export type ModuleKey =
  | 'command' | 'fusion' | 'brain' | 'blockchain' | 'radar'
  | 'forensics' | 'copilot' | 'defense' | 'global' | 'governance' | 'academy'

export interface ModuleMeta {
  key: ModuleKey
  title: string
  short: string
  blurb: string
  accent: string
  hue: number           // 0..360 for the 3D orb color
  glyph: string         // single char used in the 3D deck
  orbitRing: 0 | 1 | 2  // which ring it sits on in the deck
  orbitAngle: number    // starting angle in degrees
  orbitSpeed: number    // rad/s
  badge?: 'LIVE' | 'RT' | 'NEW'
}

export const MODULES: ModuleMeta[] = [
  { key: 'command',    title: 'Command & Control',         short: 'War Room',           blurb: 'Real-time national operations cockpit with heatmap, radar and priority alerts.', accent: '#22d3ee', hue: 190, glyph: '⌘', orbitRing: 0, orbitAngle: 0,   orbitSpeed: 0.12, badge: 'LIVE' },
  { key: 'fusion',     title: 'Data Fusion & Digital Twin', short: 'Twin',              blurb: '18 live feeds, 148M entities, sovereign architecture.',                            accent: '#38bdf8', hue: 205, glyph: '◈', orbitRing: 1, orbitAngle: 0,   orbitSpeed: 0.09 },
  { key: 'brain',      title: "AI Intelligence Core",        short: "God's Eye Brain",    blurb: '47 behavioral, graph, predictive and deepfake-shield models.',                      accent: '#a78bfa', hue: 268, glyph: 'ψ', orbitRing: 1, orbitAngle: 60,  orbitSpeed: 0.09 },
  { key: 'blockchain', title: 'Blockchain Grid',             short: 'Chains',             blurb: '8-chain node mesh, wallet clustering, cross-chain tracing, smart-contract forensics.', accent: '#eab308', hue: 50,  glyph: '⛓', orbitRing: 1, orbitAngle: 120, orbitSpeed: 0.09 },
  { key: 'radar',      title: 'Financial Monitoring Radar',  short: 'Radar',              blurb: '2.89M tx/hr inspected in real-time with rule + ML hybrids.',                        accent: '#ef4444', hue: 0,   glyph: '◎', orbitRing: 1, orbitAngle: 180, orbitSpeed: 0.09, badge: 'RT' },
  { key: 'forensics',  title: 'Digital Forensics Lab',       short: 'Forensics',           blurb: 'Device, cloud and document forensics with cryptographic chain-of-custody.',         accent: '#14b8a6', hue: 172, glyph: '⚗', orbitRing: 1, orbitAngle: 240, orbitSpeed: 0.09 },
  { key: 'copilot',    title: 'AI Investigator Copilot',     short: 'Copilot',             blurb: 'Per-officer LLM: natural-language queries, court-ready dossiers.',                 accent: '#f472b6', hue: 330, glyph: '◆', orbitRing: 1, orbitAngle: 300, orbitSpeed: 0.09 },
  { key: 'defense',    title: 'Cybersecurity & Defense',     short: 'Defense',             blurb: 'Zero-trust posture, insider threat, post-quantum keys, WORM audit.',                accent: '#22c55e', hue: 142, glyph: '⛨', orbitRing: 2, orbitAngle: 0,   orbitSpeed: 0.06 },
  { key: 'global',     title: 'Global Intelligence Bridge',   short: 'Global',              blurb: 'INTERPOL, Europol, FBI, FATF, AFRIPOL corridors for cross-border recovery.',        accent: '#06b6d4', hue: 188, glyph: '◐', orbitRing: 2, orbitAngle: 72,  orbitSpeed: 0.06 },
  { key: 'governance', title: 'Legal & Governance',          short: 'Governance',          blurb: 'Warrants, privacy-preserving ML, oversight board, citizen redress.',              accent: '#f59e0b', hue: 38,  glyph: '§',  orbitRing: 2, orbitAngle: 144, orbitSpeed: 0.06 },
  { key: 'academy',    title: 'Human Capital · Academy',      short: 'Academy',             blurb: '7 flagship programs, 18 partner institutions, elite officer career track.',         accent: '#8b5cf6', hue: 258, glyph: '✦', orbitRing: 2, orbitAngle: 216, orbitSpeed: 0.06 }
]

export const moduleByKey = (key: ModuleKey) => MODULES.find(m => m.key === key)!
