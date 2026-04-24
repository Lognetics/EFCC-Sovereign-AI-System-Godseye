// ==========================================================
// GE-NFIIS Mock Intelligence Dataset
// All names, accounts and identifiers are synthetic / fictional
// and are used strictly for system demonstration.
// ==========================================================

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'MODERATE' | 'LOW'
export type EntityKind = 'person' | 'company' | 'wallet' | 'account' | 'bank' | 'exchange' | 'shell'

export interface Entity {
  id: string
  name: string
  kind: EntityKind
  risk: RiskLevel
  tags: string[]
  location?: string
  net: number // net flow (naira)
  degree: number
}

export interface Transaction {
  id: string
  ts: string
  from: string
  to: string
  amount: number
  currency: 'NGN' | 'USD' | 'USDT' | 'BTC' | 'ETH'
  rail: 'NIP' | 'SWIFT' | 'CBDC' | 'CRYPTO' | 'CARD' | 'BUREAU'
  risk: RiskLevel
  tags: string[]
  status: 'FLAGGED' | 'CLEARED' | 'FROZEN' | 'UNDER_REVIEW'
}

export interface Alert {
  id: string
  ts: string
  title: string
  severity: RiskLevel
  entity: string
  module: string
  summary: string
  confidence: number
}

export interface Case {
  id: string
  code: string
  title: string
  lead: string
  stage: 'INTAKE' | 'TRIAGE' | 'INVESTIGATION' | 'PROSECUTION' | 'RECOVERY' | 'CLOSED'
  priority: RiskLevel
  entities: number
  value: number
  opened: string
  lastUpdate: string
  progress: number
}

export const STATES = [
  'Abuja (FCT)', 'Lagos', 'Rivers', 'Kano', 'Kaduna', 'Enugu', 'Akwa Ibom',
  'Ogun', 'Delta', 'Oyo', 'Edo', 'Cross River', 'Anambra', 'Borno', 'Plateau'
]

export const BANKS = [
  'Access Holdings', 'Zenith Bank', 'GTBank', 'UBA', 'First Bank',
  'Union Bank', 'Fidelity Bank', 'Polaris', 'Stanbic IBTC', 'Wema Bank',
  'Sterling', 'FCMB', 'Kuda (Fintech)', 'Opay (Fintech)', 'Moniepoint',
  'PalmPay'
]

export const AGENCIES = [
  { code: 'EFCC',     name: 'Economic & Financial Crimes Commission', status: 'CORE' },
  { code: 'NFIU',     name: 'Nigerian Financial Intelligence Unit', status: 'LINKED' },
  { code: 'CBN',      name: 'Central Bank of Nigeria', status: 'LINKED' },
  { code: 'NIMC',     name: 'National Identity Management Commission', status: 'LINKED' },
  { code: 'NIBSS',    name: 'Nigeria Inter-Bank Settlement System', status: 'LINKED' },
  { code: 'CAC',      name: 'Corporate Affairs Commission', status: 'LINKED' },
  { code: 'NDLEA',    name: 'National Drug Law Enforcement Agency', status: 'LINKED' },
  { code: 'NIS',      name: 'Nigeria Immigration Service', status: 'LINKED' },
  { code: 'CUSTOMS',  name: 'Nigeria Customs Service', status: 'LINKED' },
  { code: 'DSS',      name: 'Department of State Services', status: 'RESTRICTED' },
  { code: 'NPF',      name: 'Nigeria Police Force — Intel', status: 'RESTRICTED' },
  { code: 'ONSA',     name: 'Office of the National Security Adviser', status: 'RESTRICTED' },
  { code: 'INTERPOL', name: 'INTERPOL Abuja NCB', status: 'EXTERNAL' },
  { code: 'EUROPOL',  name: 'Europol — EFECC Liaison', status: 'EXTERNAL' },
  { code: 'FBI',      name: 'US Federal Bureau of Investigation', status: 'EXTERNAL' },
  { code: 'FATF',     name: 'Financial Action Task Force', status: 'EXTERNAL' }
]

// --- Entities ---------------------------------------------------
export const ENTITIES: Entity[] = [
  { id: 'E-001', name: 'Aderemi Ogundipe', kind: 'person', risk: 'CRITICAL', tags: ['PEP', 'SANCTIONED', 'SHELL_OWNER'], location: 'Lagos', net: -18_240_000_000, degree: 43 },
  { id: 'E-002', name: 'NorthStar Energy Ltd', kind: 'shell', risk: 'CRITICAL', tags: ['SHELL', 'OIL_SUBSIDY', 'GHOST_DIRECTORS'], location: 'Abuja', net: -9_100_000_000, degree: 31 },
  { id: 'E-003', name: 'Chidinma Okafor', kind: 'person', risk: 'HIGH', tags: ['MULE_NETWORK', 'ROMANCE_SCAM'], location: 'Enugu', net: -420_000_000, degree: 22 },
  { id: 'E-004', name: 'BlueHorizon Capital', kind: 'company', risk: 'HIGH', tags: ['PONZI', 'UNREGISTERED_INVESTMENT'], location: 'Lagos', net: -2_800_000_000, degree: 28 },
  { id: 'E-005', name: 'Musa Ibrahim', kind: 'person', risk: 'ELEVATED', tags: ['PEP_ASSOCIATE', 'LIFESTYLE_MISMATCH'], location: 'Kano', net: -630_000_000, degree: 14 },
  { id: 'E-006', name: 'bc1q…8fqrz', kind: 'wallet', risk: 'CRITICAL', tags: ['DARKNET', 'MIXER', 'RANSOMWARE'], net: -1_420_000_000, degree: 57 },
  { id: 'E-007', name: '0x9aF3…E2c1', kind: 'wallet', risk: 'HIGH', tags: ['TORNADO_EXIT', 'CEX_INBOUND'], net: -980_000_000, degree: 39 },
  { id: 'E-008', name: 'Olumide Bakare', kind: 'person', risk: 'MODERATE', tags: ['CRYPTO_OTC'], location: 'Ibadan', net: -140_000_000, degree: 9 },
  { id: 'E-009', name: 'ProsperPay NG', kind: 'exchange', risk: 'HIGH', tags: ['UNLICENSED', 'P2P'], net: -3_300_000_000, degree: 34 },
  { id: 'E-010', name: 'Adaeze Nwosu', kind: 'person', risk: 'ELEVATED', tags: ['SMURFING', 'BVN_MISMATCH'], location: 'Owerri', net: -210_000_000, degree: 12 },
  { id: 'E-011', name: 'HighTower Logistics', kind: 'shell', risk: 'HIGH', tags: ['TRADE_MIS_INVOICING', 'CUSTOMS_FLAG'], location: 'Port Harcourt', net: -1_650_000_000, degree: 24 },
  { id: 'E-012', name: 'Kelechi Obi', kind: 'person', risk: 'LOW', tags: ['CLEARED'], location: 'Abuja', net: 35_000_000, degree: 4 },
  { id: 'E-013', name: 'ACC-0027891…', kind: 'account', risk: 'CRITICAL', tags: ['FROZEN', 'STRUCTURED_DEPOSITS'], net: -710_000_000, degree: 19 },
  { id: 'E-014', name: 'VelocityX Exchange', kind: 'exchange', risk: 'ELEVATED', tags: ['FOREIGN_VASP', 'NIGERIA_FLOW'], net: -4_400_000_000, degree: 41 }
]

// --- Live transaction stream ------------------------------------
function rid(prefix: string) {
  return prefix + '-' + Math.random().toString(36).slice(2, 8).toUpperCase()
}

export function genTransaction(): Transaction {
  const rails: Transaction['rail'][] = ['NIP', 'SWIFT', 'CBDC', 'CRYPTO', 'CARD', 'BUREAU']
  const rail = rails[Math.floor(Math.random() * rails.length)]
  const amount = Math.round((Math.random() ** 2.5) * 1_200_000_000) + 10_000
  const risk: RiskLevel =
    amount > 500_000_000 ? 'CRITICAL' :
    amount > 80_000_000 ? 'HIGH' :
    amount > 10_000_000 ? 'ELEVATED' :
    amount > 1_500_000 ? 'MODERATE' : 'LOW'
  const currency: Transaction['currency'] =
    rail === 'CRYPTO' ? (Math.random() > 0.5 ? 'USDT' : 'BTC') :
    rail === 'SWIFT' ? 'USD' : 'NGN'
  const tagsPool = ['STRUCTURED', 'CROSS_BORDER', 'PEP_LINK', 'HIGH_VELOCITY', 'NEW_BENEFICIARY', 'ROUND_TRIP', 'SMURFING', 'NIGHT_HOURS']
  const tags = Array.from(new Set(Array.from({ length: Math.floor(Math.random() * 3) }, () => tagsPool[Math.floor(Math.random() * tagsPool.length)])))
  const statuses: Transaction['status'][] = risk === 'CRITICAL' ? ['FLAGGED', 'FROZEN', 'UNDER_REVIEW'] : risk === 'HIGH' ? ['FLAGGED', 'UNDER_REVIEW', 'CLEARED'] : ['CLEARED', 'UNDER_REVIEW']
  return {
    id: rid('TX'),
    ts: new Date().toISOString(),
    from: ENTITIES[Math.floor(Math.random() * ENTITIES.length)].name,
    to: ENTITIES[Math.floor(Math.random() * ENTITIES.length)].name,
    amount,
    currency,
    rail,
    risk,
    tags,
    status: statuses[Math.floor(Math.random() * statuses.length)]
  }
}

export const SEED_TRANSACTIONS: Transaction[] = Array.from({ length: 24 }, () => genTransaction())

// --- Alerts -----------------------------------------------------
export const ALERTS: Alert[] = [
  { id: 'A-1021', ts: '12s ago',  title: 'Sudden ₦1.2B transfer from sanctioned entity',      severity: 'CRITICAL', entity: 'Aderemi Ogundipe',     module: 'Behavioral AI',       summary: 'Net-worth spike 17,400% over rolling 30-day baseline. Beneficiary chain passes through 3 shell tiers before exiting through offshore VASP.', confidence: 98 },
  { id: 'A-1020', ts: '34s ago',  title: 'Round-tripping pattern detected (Layer-3)',          severity: 'CRITICAL', entity: 'NorthStar Energy Ltd', module: 'Graph Intelligence',  summary: 'Funds originating from TSA disbursement returning through 4-hop chain within 72h window. Clustering signature matches 2023 oil-subsidy fraud ring.',               confidence: 94 },
  { id: 'A-1019', ts: '2m ago',   title: 'Ransomware wallet inflow — NGN equivalent ₦310M',    severity: 'HIGH',     entity: 'bc1q…8fqrz',           module: 'Blockchain Grid',     summary: 'Wallet linked to LockBit-affiliate cluster received 4.7 BTC via known mixer. Destination pathway points to Nigerian OTC exchange.',                                confidence: 91 },
  { id: 'A-1018', ts: '4m ago',   title: 'Synthetic KYC identity detected at onboarding',      severity: 'HIGH',     entity: 'PalmPay — batch 0912',  module: 'Deepfake Shield',     summary: 'Liveness video scored 0.02/1.0 on authenticity. Composite face artifacts consistent with StyleGAN3 outputs.',                                                         confidence: 96 },
  { id: 'A-1017', ts: '7m ago',   title: 'Structured deposits under reporting threshold',       severity: 'ELEVATED', entity: 'Adaeze Nwosu',          module: 'Radar',               summary: '14 deposits of ₦4.9M over 3h across 9 branches. Classic smurfing signature.',                                                                                          confidence: 88 },
  { id: 'A-1016', ts: '11m ago',  title: 'Lifestyle/income mismatch — 312% deviation',          severity: 'ELEVATED', entity: 'Musa Ibrahim',          module: 'Behavioral AI',       summary: 'Declared income ₦14M/yr. Observed card/POS lifestyle spend ₦58M/yr. Property transfers flag.',                                                                          confidence: 82 },
  { id: 'A-1015', ts: '18m ago',  title: 'Cross-chain bridge exit via Tornado remnant',         severity: 'HIGH',     entity: '0x9aF3…E2c1',           module: 'Blockchain Grid',     summary: 'Bridge from Ethereum → BSC → TRON → Binance Nigerian OTC. ML classifier: 0.94 laundering probability.',                                                                 confidence: 94 },
  { id: 'A-1014', ts: '23m ago',  title: 'Trade mis-invoicing — cashew export',                 severity: 'ELEVATED', entity: 'HighTower Logistics',   module: 'Customs Fusion',      summary: 'Declared export value 41% below benchmark for lot weight. Corresponding inward remittance pattern indicates value retention offshore.',                                 confidence: 79 },
  { id: 'A-1013', ts: '31m ago',  title: 'Ponzi payout structure identified',                   severity: 'HIGH',     entity: 'BlueHorizon Capital',   module: 'Network Intelligence', summary: 'Peeling chain: new deposits funding prior withdrawals. Collapse probability next 14d: 62%.',                                                                        confidence: 88 },
  { id: 'A-1012', ts: '44m ago',  title: 'Insider threat — elevated access off-hours',          severity: 'HIGH',     entity: 'ANALYST-0217',          module: 'Defense Core',        summary: 'User queried 214 unrelated BVN records 02:11–02:34 WAT. No active case assignment.',                                                                                 confidence: 97 }
]

// --- Cases ------------------------------------------------------
export const CASES: Case[] = [
  { id: 'C-9021', code: 'OP / SUNBURST',   title: 'Subsidy diversion ring — 9 ministries',       lead: 'DCP A. Okonkwo',        stage: 'INVESTIGATION', priority: 'CRITICAL', entities: 147, value: 241_800_000_000, opened: '2025-11-04', lastUpdate: '14m ago',  progress: 68 },
  { id: 'C-9020', code: 'OP / GHOSTVEIN',  title: 'Ghost accounts — civil service payroll',       lead: 'CSP B. Adesanya',       stage: 'PROSECUTION',   priority: 'HIGH',     entities: 62,  value: 18_400_000_000,  opened: '2025-09-19', lastUpdate: '1h ago',   progress: 82 },
  { id: 'C-9019', code: 'OP / LIGHTHOUSE', title: 'Transnational crypto-OTC laundering',          lead: 'ACP F. Lawal',          stage: 'INVESTIGATION', priority: 'CRITICAL', entities: 218, value: 88_200_000_000,  opened: '2026-01-12', lastUpdate: '22m ago',  progress: 41 },
  { id: 'C-9018', code: 'OP / RAVENCALL',  title: 'Romance scam syndicate — West Africa',         lead: 'CSP M. Danjuma',        stage: 'INVESTIGATION', priority: 'HIGH',     entities: 94,  value: 6_800_000_000,   opened: '2025-12-02', lastUpdate: '2h ago',   progress: 55 },
  { id: 'C-9017', code: 'OP / BLACKSTEEL', title: 'Trade mis-invoicing — port operations',        lead: 'ACP J. Ekanem',         stage: 'INVESTIGATION', priority: 'HIGH',     entities: 37,  value: 14_100_000_000,  opened: '2025-10-11', lastUpdate: '3h ago',   progress: 49 },
  { id: 'C-9016', code: 'OP / VERIDIAN',   title: 'BDC-fronted FX round-tripping',                lead: 'DCP O. Nwachukwu',      stage: 'TRIAGE',         priority: 'ELEVATED', entities: 23,  value: 3_600_000_000,   opened: '2026-03-29', lastUpdate: '6h ago',   progress: 18 },
  { id: 'C-9015', code: 'OP / MIDNIGHT',   title: 'Ransomware-linked OTC wallet cluster',         lead: 'CSP R. Audu',           stage: 'RECOVERY',      priority: 'HIGH',     entities: 51,  value: 2_900_000_000,   opened: '2025-08-27', lastUpdate: '1d ago',   progress: 91 },
  { id: 'C-9014', code: 'OP / CLEARWATER', title: 'PEP offshore concealment — identified',        lead: 'DCP A. Okonkwo',        stage: 'PROSECUTION',   priority: 'CRITICAL', entities: 77,  value: 54_700_000_000,  opened: '2025-06-15', lastUpdate: '5h ago',   progress: 74 }
]

// --- Sensors / ingest feeds ------------------------------------
export const INGEST_FEEDS = [
  { id: 'F-NIBSS-NIP',      name: 'NIBSS / NIP real-time rails',          rate: '2.41M tx/hr',   status: 'ONLINE', latency: 117 },
  { id: 'F-CBN-RTGS',       name: 'CBN RTGS + TSA',                         rate: '48K tx/hr',     status: 'ONLINE', latency: 240 },
  { id: 'F-CBN-CBDC',       name: 'eNaira CBDC ledger',                     rate: '910K tx/hr',    status: 'ONLINE', latency: 63  },
  { id: 'F-NFIU-STR',       name: 'NFIU STR / CTR reports',                 rate: '12K /hr',       status: 'ONLINE', latency: 820 },
  { id: 'F-BVN',            name: 'BVN authoritative sync',                 rate: '60M records',   status: 'SYNCED', latency: 0   },
  { id: 'F-NIN',            name: 'NIMC / NIN registry',                    rate: '110M records',  status: 'SYNCED', latency: 0   },
  { id: 'F-CAC',            name: 'CAC beneficial-ownership registry',       rate: '4.9M records',  status: 'SYNCED', latency: 0   },
  { id: 'F-NIS',            name: 'Immigration — crossings + visas',        rate: '38K events/hr', status: 'ONLINE', latency: 410 },
  { id: 'F-CUSTOMS',        name: 'Customs trade & manifest',               rate: '19K events/hr', status: 'ONLINE', latency: 520 },
  { id: 'F-TELECOM',        name: 'Telecom CDR (court-warrant bound)',      rate: 'warrant-based', status: 'GATED',  latency: 0   },
  { id: 'F-BTC',            name: 'Bitcoin node & mempool',                 rate: '3 blk/30m',     status: 'ONLINE', latency: 820 },
  { id: 'F-ETH',            name: 'Ethereum / L2 archive node',             rate: '12.2 TPS',      status: 'ONLINE', latency: 220 },
  { id: 'F-TRON',           name: 'TRON node (USDT TRC-20 watch)',          rate: '180 TPS',       status: 'ONLINE', latency: 180 },
  { id: 'F-CHAINALYSIS',    name: 'Chainalysis Reactor feed',               rate: 'license API',   status: 'ONLINE', latency: 1200 },
  { id: 'F-TRM',            name: 'TRM Labs attribution',                    rate: 'license API',   status: 'ONLINE', latency: 1100 },
  { id: 'F-DARKWEB',        name: 'Sovereign dark-web crawler',              rate: '912 sources',   status: 'ONLINE', latency: 3200 },
  { id: 'F-OSINT',          name: 'OSINT + social sentiment',               rate: '14M items/day', status: 'ONLINE', latency: 2400 },
  { id: 'F-INTERPOL',       name: 'INTERPOL notices (I-24/7)',              rate: 'push',          status: 'ONLINE', latency: 900 }
]

export const LIVE_METRICS = {
  ingestRate: 2_891_402,       // tx ingested per hour
  entitiesTracked: 148_302_914,
  activeCases: 1_472,
  nationalRisk: 73, // 0..100
  assetsRecovered: 812_400_000_000, // naira cumulative this fiscal year
  frozenLast24h: 41_200_000_000,
  alertsOpen: 4_218,
  predictiveHitRate: 0.814,    // precision of pre-incident alerts
  deepfakeBlocks: 6_291,
  sanctionsScreened: 18_442_219,
  uptime: 99.993,
  modelsServing: 47
}

// --- Heatmap values by Nigerian state ---------------------------
export const RISK_HEATMAP: { state: string; value: number; cases: number }[] = STATES.map((s, i) => ({
  state: s,
  value: [92, 88, 74, 69, 55, 47, 42, 61, 58, 45, 39, 48, 36, 44, 30][i] ?? 40,
  cases: [418, 372, 214, 181, 132, 97, 82, 146, 121, 88, 76, 72, 58, 61, 34][i] ?? 40
}))

// --- Transaction network (nodes + edges) ------------------------
export interface GraphNode { id: string; label: string; x: number; y: number; r: number; kind: EntityKind; risk: RiskLevel }
export interface GraphEdge { from: string; to: string; weight: number; kind: 'flow' | 'ownership' | 'identity' | 'crypto' }

export const NETWORK: { nodes: GraphNode[]; edges: GraphEdge[] } = {
  nodes: [
    { id: 'n1',  label: 'A. Ogundipe',      x: 0.50, y: 0.50, r: 22, kind: 'person',   risk: 'CRITICAL' },
    { id: 'n2',  label: 'NorthStar Energy', x: 0.30, y: 0.30, r: 18, kind: 'shell',    risk: 'CRITICAL' },
    { id: 'n3',  label: 'GTBank 003…21',    x: 0.22, y: 0.58, r: 10, kind: 'account',  risk: 'HIGH' },
    { id: 'n4',  label: 'Access 992…07',    x: 0.38, y: 0.74, r: 10, kind: 'account',  risk: 'HIGH' },
    { id: 'n5',  label: 'bc1q…8fqrz',       x: 0.70, y: 0.62, r: 14, kind: 'wallet',   risk: 'CRITICAL' },
    { id: 'n6',  label: 'BlueHorizon Cap',  x: 0.74, y: 0.36, r: 14, kind: 'company',  risk: 'HIGH' },
    { id: 'n7',  label: '0x9aF3…E2c1',      x: 0.84, y: 0.52, r: 10, kind: 'wallet',   risk: 'HIGH' },
    { id: 'n8',  label: 'C. Okafor',        x: 0.62, y: 0.82, r: 10, kind: 'person',   risk: 'HIGH' },
    { id: 'n9',  label: 'ProsperPay',       x: 0.86, y: 0.78, r: 12, kind: 'exchange', risk: 'HIGH' },
    { id: 'n10', label: 'VelocityX',        x: 0.15, y: 0.82, r: 12, kind: 'exchange', risk: 'ELEVATED' },
    { id: 'n11', label: 'HighTower Log.',   x: 0.18, y: 0.16, r: 12, kind: 'shell',    risk: 'HIGH' },
    { id: 'n12', label: 'M. Ibrahim',       x: 0.48, y: 0.18, r: 10, kind: 'person',   risk: 'ELEVATED' },
    { id: 'n13', label: 'ACC-0027891…',     x: 0.58, y: 0.30, r: 8,  kind: 'account',  risk: 'CRITICAL' },
    { id: 'n14', label: 'A. Nwosu',         x: 0.34, y: 0.50, r: 9,  kind: 'person',   risk: 'ELEVATED' },
    { id: 'n15', label: 'O. Bakare',        x: 0.66, y: 0.22, r: 8,  kind: 'person',   risk: 'MODERATE' }
  ],
  edges: [
    { from: 'n1', to: 'n2',  weight: 9, kind: 'ownership' },
    { from: 'n1', to: 'n3',  weight: 8, kind: 'identity' },
    { from: 'n1', to: 'n13', weight: 7, kind: 'flow' },
    { from: 'n2', to: 'n3',  weight: 6, kind: 'flow' },
    { from: 'n2', to: 'n4',  weight: 7, kind: 'flow' },
    { from: 'n2', to: 'n11', weight: 6, kind: 'ownership' },
    { from: 'n3', to: 'n4',  weight: 5, kind: 'flow' },
    { from: 'n4', to: 'n10', weight: 6, kind: 'flow' },
    { from: 'n10', to: 'n5', weight: 8, kind: 'crypto' },
    { from: 'n5', to: 'n7',  weight: 9, kind: 'crypto' },
    { from: 'n7', to: 'n9',  weight: 7, kind: 'crypto' },
    { from: 'n9', to: 'n8',  weight: 5, kind: 'flow' },
    { from: 'n6', to: 'n1',  weight: 4, kind: 'flow' },
    { from: 'n6', to: 'n7',  weight: 5, kind: 'crypto' },
    { from: 'n13', to: 'n12',weight: 4, kind: 'flow' },
    { from: 'n14', to: 'n4', weight: 3, kind: 'flow' },
    { from: 'n14', to: 'n3', weight: 3, kind: 'flow' },
    { from: 'n12', to: 'n6', weight: 3, kind: 'flow' },
    { from: 'n15', to: 'n5', weight: 2, kind: 'crypto' },
    { from: 'n11', to: 'n10',weight: 4, kind: 'flow' }
  ]
}

export const CRIMETYPE_DISTRIBUTION = [
  { label: 'Cyber fraud (419, BEC, APP)', value: 32, color: '#22d3ee' },
  { label: 'Public-sector diversion',     value: 24, color: '#a855f7' },
  { label: 'Crypto-laundering',           value: 14, color: '#eab308' },
  { label: 'FX / BDC abuse',               value: 11, color: '#ef4444' },
  { label: 'Trade mis-invoicing',          value: 8,  color: '#22c55e' },
  { label: 'Ponzi / investment fraud',      value: 6,  color: '#f97316' },
  { label: 'Synthetic-identity fraud',      value: 5,  color: '#3b82f6' }
]

// --- Predictive models ------------------------------------------
export const MODELS = [
  { id: 'M-BEH-04', name: 'Behavioral Anomaly · Personal',    framework: 'XGBoost + Temporal CNN',      auc: 0.962, precision: 0.908, recall: 0.881, drift: 0.014, status: 'SERVING',  version: 'v4.3.1' },
  { id: 'M-BEH-09', name: 'Behavioral Anomaly · Corporate',    framework: 'LightGBM + LSTM',              auc: 0.943, precision: 0.889, recall: 0.851, drift: 0.021, status: 'SERVING',  version: 'v3.0.7' },
  { id: 'M-GNN-01', name: 'Graph Anomaly — Syndicate',         framework: 'Heterogeneous GNN (HGT)',       auc: 0.972, precision: 0.924, recall: 0.894, drift: 0.009, status: 'SERVING',  version: 'v2.4.0' },
  { id: 'M-LAU-02', name: 'Layering / Structuring Detector',    framework: 'Sequence Transformer',         auc: 0.951, precision: 0.912, recall: 0.864, drift: 0.017, status: 'SERVING',  version: 'v1.9.2' },
  { id: 'M-CRY-03', name: 'Crypto Path Classifier',            framework: 'Path-GNN + Embedding',          auc: 0.968, precision: 0.918, recall: 0.882, drift: 0.011, status: 'SERVING',  version: 'v2.1.5' },
  { id: 'M-DPF-01', name: 'Deepfake / Synthetic KYC',           framework: 'Multi-modal CNN + freq-spec.',  auc: 0.991, precision: 0.962, recall: 0.958, drift: 0.004, status: 'SERVING',  version: 'v5.1.0' },
  { id: 'M-PRD-07', name: 'Predictive Crime — State Risk',      framework: 'Spatio-temporal transformer',   auc: 0.902, precision: 0.842, recall: 0.810, drift: 0.028, status: 'SERVING',  version: 'v1.2.3' },
  { id: 'M-NLP-12', name: 'Court-ready Report Generator',       framework: 'Sovereign Legal LLM (fine-tuned)', auc: 0.0,  precision: 0.0,   recall: 0.0,   drift: 0.006, status: 'SERVING',  version: 'v0.9.4' },
  { id: 'M-VOX-02', name: 'Voice-clone Detector',              framework: 'WaveLM + freq-domain discriminator', auc: 0.986, precision: 0.948, recall: 0.935, drift: 0.005, status: 'SERVING',  version: 'v1.0.2' },
  { id: 'M-SAN-01', name: 'Sanctions / PEP Matcher',           framework: 'Bi-encoder + fuzzy',            auc: 0.997, precision: 0.981, recall: 0.977, drift: 0.002, status: 'SERVING',  version: 'v6.0.0' },
  { id: 'M-TRM-04', name: 'Trade Mis-invoicing Classifier',    framework: 'Gradient Boosting + Benchmark', auc: 0.934, precision: 0.898, recall: 0.847, drift: 0.019, status: 'SERVING',  version: 'v2.0.1' },
  { id: 'M-FUS-01', name: 'Cross-rail Flow Fusion',            framework: 'Multimodal GNN',                auc: 0.961, precision: 0.903, recall: 0.871, drift: 0.013, status: 'CANARY',   version: 'v0.4.1' }
]

// --- Forensic cases / evidence ---------------------------------
export const EVIDENCE = [
  { id: 'EV-8831', case: 'OP / SUNBURST',  type: 'Mobile (iOS 17.5)',   device: 'iPhone 15 Pro',         extracted: '4.2 TB',   hash: 'sha256:9fba…e471', integrity: 'VERIFIED', custody: 'sealed' },
  { id: 'EV-8830', case: 'OP / GHOSTVEIN', type: 'Laptop (Windows 11)', device: 'ThinkPad X1 G11',       extracted: '1.8 TB',   hash: 'sha256:a2c1…9bf0', integrity: 'VERIFIED', custody: 'lab-analysis' },
  { id: 'EV-8829', case: 'OP / LIGHTHOUSE',type: 'Cloud (AWS S3)',       device: 's3://luminex-prod-logs', extracted: '212 GB',   hash: 'sha256:71ed…01aa', integrity: 'VERIFIED', custody: 'sealed' },
  { id: 'EV-8828', case: 'OP / LIGHTHOUSE',type: 'Cloud (Google Drive)', device: 'domain: blueh.ng',     extracted: '82 GB',    hash: 'sha256:0b3a…5fd2', integrity: 'VERIFIED', custody: 'lab-analysis' },
  { id: 'EV-8827', case: 'OP / BLACKSTEEL',type: 'Server image (ESXi)',  device: 'HT-LOG-DC01',          extracted: '9.4 TB',   hash: 'sha256:dc44…87c2', integrity: 'VERIFIED', custody: 'lab-analysis' },
  { id: 'EV-8826', case: 'OP / RAVENCALL', type: 'Android (v14)',        device: 'Pixel 8 (x17)',         extracted: '3.6 TB',   hash: 'sha256:9112…a0c8', integrity: 'VERIFIED', custody: 'court-exhibit' }
]

export const DEEPFAKE_LOG = [
  { id: 'DF-01', ts: '12:41:18', source: 'PalmPay KYC', kind: 'video', verdict: 'SYNTHETIC', score: 0.02, reason: 'Temporal blink inconsistency; pupil dilation anomaly' },
  { id: 'DF-02', ts: '12:39:04', source: 'Opay KYC',    kind: 'video', verdict: 'AUTHENTIC', score: 0.96, reason: 'Liveness, lighting, specular reflections consistent' },
  { id: 'DF-03', ts: '12:38:12', source: 'Kuda KYC',    kind: 'voice', verdict: 'SYNTHETIC', score: 0.05, reason: 'Waveform phase artifacts in frequency bands 4–8 kHz' },
  { id: 'DF-04', ts: '12:37:40', source: 'Moniepoint',  kind: 'image', verdict: 'SUSPECT',   score: 0.42, reason: 'Face-swap probability elevated; manual review required' },
  { id: 'DF-05', ts: '12:34:11', source: 'Stanbic KYC', kind: 'video', verdict: 'AUTHENTIC', score: 0.93, reason: 'Motion field natural' },
  { id: 'DF-06', ts: '12:33:52', source: 'Access KYC',  kind: 'voice', verdict: 'SYNTHETIC', score: 0.06, reason: 'Voice-clone signature matches known MRT-TTS model' }
]

// --- Global recovery / international --------------------------
export const RECOVERY_CASES = [
  { id: 'R-4401', route: 'Dubai → Abuja',       value: '₦28.4B', status: 'repatriated', counterpart: 'UAE FIU' },
  { id: 'R-4400', route: 'Jersey → Abuja',      value: '₦12.1B', status: 'in progress',  counterpart: 'Jersey FCU' },
  { id: 'R-4399', route: 'London → Abuja',      value: '₦71.9B', status: 'repatriated', counterpart: 'UK NCA' },
  { id: 'R-4398', route: 'Zurich → Abuja',      value: '₦44.2B', status: 'in progress',  counterpart: 'Swiss FINMA' },
  { id: 'R-4397', route: 'Washington → Abuja',  value: '₦33.8B', status: 'repatriated', counterpart: 'US DOJ / FBI' },
  { id: 'R-4396', route: 'Singapore → Abuja',   value: '₦9.4B',  status: 'adjudication', counterpart: 'MAS / CAD' },
  { id: 'R-4395', route: 'Nairobi → Abuja',     value: '₦3.2B',  status: 'repatriated', counterpart: 'Kenya ARA' }
]

// --- Cybersecurity -------------------------------------------
export const SECURITY_EVENTS = [
  { id: 'SEC-2201', ts: '00:12', source: '41.203.x.x',        type: 'Brute force (SSH)',      action: 'blocked',  layer: 'Perimeter' },
  { id: 'SEC-2202', ts: '00:34', source: 'ANALYST-0217',      type: 'Abnormal query volume',  action: 'flagged',  layer: 'Insider' },
  { id: 'SEC-2203', ts: '01:02', source: 'cn-geoanom',        type: 'Anomalous SNI probe',     action: 'blocked',  layer: 'Perimeter' },
  { id: 'SEC-2204', ts: '01:18', source: 'endpoint:LAG-0912', type: 'Process injection',       action: 'contained',layer: 'Endpoint' },
  { id: 'SEC-2205', ts: '02:11', source: 'ANALYST-0217',      type: '214 off-scope BVN reads', action: 'quarantined', layer: 'Data' },
  { id: 'SEC-2206', ts: '02:47', source: 'vpn:tor-exit',       type: 'TOR egress attempt',     action: 'blocked',  layer: 'Perimeter' },
  { id: 'SEC-2207', ts: '03:04', source: 'api-gateway',        type: 'JWT replay',             action: 'blocked',  layer: 'AppSec' },
  { id: 'SEC-2208', ts: '03:29', source: 'ml-platform',        type: 'Model drift threshold',  action: 'notified', layer: 'MLOps' }
]

// --- Academy / training --------------------------------------
export const TRAINING_PROGRAMS = [
  { code: 'EAI-101', name: 'Foundations of AI for Financial Investigation',     level: 'Tier-1', weeks: 6,  enrolled: 412, graduated: 348, accred: 'EFCC AI Academy' },
  { code: 'EBC-201', name: 'Blockchain Intelligence & Tracing',                  level: 'Tier-2', weeks: 8,  enrolled: 218, graduated: 162, accred: 'EFCC AI Academy · Chainalysis' },
  { code: 'EDF-202', name: 'Digital Forensics — Mobile & Cloud',                 level: 'Tier-2', weeks: 10, enrolled: 147, graduated: 104, accred: 'EFCC AI Academy · Cellebrite' },
  { code: 'EGN-301', name: 'Graph Intelligence & Network Analysis',              level: 'Tier-3', weeks: 12, enrolled: 86,  graduated: 54,  accred: 'EFCC AI Academy' },
  { code: 'ELG-150', name: 'Legal, Ethics & Court Admissibility',                level: 'Tier-1', weeks: 4,  enrolled: 512, graduated: 461, accred: 'EFCC AI Academy · NBA' },
  { code: 'ECS-303', name: 'Sovereign Cybersecurity & Insider Threat',           level: 'Tier-3', weeks: 12, enrolled: 74,  graduated: 39,  accred: 'EFCC AI Academy · ONSA' },
  { code: 'EPR-401', name: 'Prosecution Dossier & Court-ready AI',               level: 'Tier-4', weeks: 6,  enrolled: 41,  graduated: 22,  accred: 'EFCC AI Academy · NJI' }
]

// --- Governance / oversight ---------------------------------
export const GOVERNANCE_CONTROLS = [
  { id: 'G-01', control: 'Court-warrant gating for telecom CDR',     owner: 'Judicial Review Unit',         status: 'ENFORCED',  cadence: 'per-request' },
  { id: 'G-02', control: 'Two-analyst quorum for PEP escalation',     owner: 'Intelligence Governance',      status: 'ENFORCED',  cadence: 'per-escalation' },
  { id: 'G-03', control: 'Privacy-preserving homomorphic enclaves',   owner: 'Platform Security',            status: 'ENFORCED',  cadence: 'always-on' },
  { id: 'G-04', control: 'Immutable action audit (WORM chain)',       owner: 'Independent Oversight Board',   status: 'ENFORCED',  cadence: 'always-on' },
  { id: 'G-05', control: 'Model-bias & fairness re-certification',    owner: 'AI Ethics Office',              status: 'QUARTERLY', cadence: 'quarterly' },
  { id: 'G-06', control: 'Sovereign data residency (Abuja + Kano)',   owner: 'Platform Security',             status: 'ENFORCED',  cadence: 'always-on' },
  { id: 'G-07', control: 'Red-team adversarial exercises',             owner: 'Defense Core',                 status: 'SCHEDULED', cadence: 'monthly' },
  { id: 'G-08', control: 'Freedom-of-Information disclosure pipeline', owner: 'Legal Affairs',                status: 'ENFORCED',  cadence: 'statutory' },
  { id: 'G-09', control: 'Citizen Redress / rights portal',            owner: 'Office of the Ombuds',         status: 'ENFORCED',  cadence: 'always-on' },
  { id: 'G-10', control: 'External independent audits (B/F board)',    owner: 'National Assembly liaison',    status: 'ANNUAL',    cadence: 'annual' }
]

// --- Utility ---------------------------------------------------
export function formatNaira(n: number) {
  const abs = Math.abs(n)
  const sign = n < 0 ? '-' : ''
  if (abs >= 1_000_000_000_000) return sign + '₦' + (abs / 1_000_000_000_000).toFixed(2) + 'T'
  if (abs >= 1_000_000_000) return sign + '₦' + (abs / 1_000_000_000).toFixed(2) + 'B'
  if (abs >= 1_000_000) return sign + '₦' + (abs / 1_000_000).toFixed(2) + 'M'
  if (abs >= 1_000) return sign + '₦' + (abs / 1_000).toFixed(1) + 'K'
  return sign + '₦' + abs.toString()
}

export function riskColor(r: RiskLevel) {
  switch (r) {
    case 'CRITICAL': return '#ef4444'
    case 'HIGH':     return '#f59e0b'
    case 'ELEVATED': return '#eab308'
    case 'MODERATE': return '#22d3ee'
    case 'LOW':      return '#22c55e'
  }
}

export function riskTextClass(r: RiskLevel) {
  switch (r) {
    case 'CRITICAL': return 'text-red-400'
    case 'HIGH':     return 'text-amber-400'
    case 'ELEVATED': return 'text-yellow-300'
    case 'MODERATE': return 'text-cyber-300'
    case 'LOW':      return 'text-emerald-400'
  }
}

export function riskChipClass(r: RiskLevel) {
  switch (r) {
    case 'CRITICAL': return 'chip chip-red'
    case 'HIGH':     return 'chip chip-amber'
    case 'ELEVATED': return 'chip chip-amber'
    case 'MODERATE': return 'chip'
    case 'LOW':      return 'chip chip-green'
  }
}
