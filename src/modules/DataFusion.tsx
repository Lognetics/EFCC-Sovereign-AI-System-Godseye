import { Database, Layers, Network, Server, GitBranch, Lock, Zap, PlugZap, Workflow } from 'lucide-react'
import { useToast } from '../components/system/Toast'
import { TopBar } from '../components/layout/TopBar'
import { Panel, InlineStat } from '../components/widgets/Panel'
import { StatCard } from '../components/widgets/StatCard'
import { INGEST_FEEDS, AGENCIES, LIVE_METRICS } from '../data/mockData'
import { HeatmapGrid, BarGauge } from '../components/widgets/Charts'

export function DataFusion() {
  const toast = useToast()

  return (
    <div className="flex h-full flex-col">
      <TopBar
        title="National Data Fusion & Digital Twin"
        subtitle="18 feeds · 148M entities · real-time continuous mesh"
        chips={[{ label: 'SOVEREIGN DATA', tone: 'violet' }, { label: 'RESIDENT · ABUJA + KANO', tone: 'green' }]}
      />

      <div className="flex-1 overflow-auto p-4 scanlines relative">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Live feeds" value="18 / 18" delta="All nominal" icon={<PlugZap />} tone="green" />
          <StatCard label="Entities in twin" value={(LIVE_METRICS.entitiesTracked / 1e6).toFixed(1) + 'M'} delta="persons + firms + wallets" icon={<Network />} />
          <StatCard label="Relationships" value="4.12B" delta="updated last 5m" icon={<GitBranch />} tone="violet" sparkline={[10, 16, 22, 28, 31, 35, 40, 44, 51, 58, 64, 71]} />
          <StatCard label="Data residency" value="2 vaults" delta="Abuja Prime · Kano Edge" icon={<Lock />} tone="green" />
        </div>

        <div className="mt-3 grid grid-cols-12 gap-3">
          {/* Feed grid */}
          <Panel
            title="Ingest mesh — live feed status"
            icon={<Database className="h-3.5 w-3.5" />}
            tag={<span className="chip chip-green ml-2">ALL GREEN</span>}
            actions={
              <>
                <button className="btn-hud" onClick={() => toast.info('Replay started', 'Stream replay from T-30 min initiated')}>Replay</button>
                <button className="btn-hud" onClick={() => toast.info('Connector SDK', 'Docs opened · scaffold generator ready')}>Connector SDK</button>
              </>
            }
            className="col-span-12 xl:col-span-8"
            padded={false}
          >
            <table className="data-table">
              <thead>
                <tr>
                  <th>FEED</th>
                  <th>SOURCE</th>
                  <th>RATE</th>
                  <th>LATENCY</th>
                  <th>STATUS</th>
                  <th>ENCRYPTION</th>
                </tr>
              </thead>
              <tbody>
                {INGEST_FEEDS.map(f => (
                  <tr key={f.id}>
                    <td className="font-mono text-[10px] text-slate-500">{f.id}</td>
                    <td className="text-slate-200">{f.name}</td>
                    <td className="text-cyber-300">{f.rate}</td>
                    <td>
                      {f.latency > 0 ? (
                        <span className={
                          f.latency < 300 ? 'text-emerald-300' :
                          f.latency < 1000 ? 'text-cyber-300' :
                          'text-amber-300'
                        }>{f.latency} ms</span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                    <td>
                      <span className={
                        f.status === 'ONLINE' ? 'chip chip-green' :
                        f.status === 'GATED'  ? 'chip chip-violet' :
                        f.status === 'SYNCED' ? 'chip' :
                        'chip chip-amber'
                      }>
                        <span className="blink-dot h-1 w-1 bg-current text-current" />
                        {f.status}
                      </span>
                    </td>
                    <td className="font-mono text-[10px] text-slate-400">TLS 1.3 · Kyber-1024 · AES-256-GCM</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          {/* Twin composition */}
          <Panel
            title="Digital twin composition"
            icon={<Layers className="h-3.5 w-3.5" />}
            className="col-span-12 xl:col-span-4"
          >
            <div className="space-y-2">
              <BarGauge label="Persons"          value={104.2} max={160} color="#22d3ee" right="104.2M" />
              <BarGauge label="Companies / beneficial owners" value={4.9} max={10}  color="#a78bfa" right="4.9M" />
              <BarGauge label="Bank accounts"    value={82.3}  max={100} color="#22d3ee" right="82.3M" />
              <BarGauge label="Wallets (tracked)" value={148.7} max={200} color="#eab308" right="148.7K" />
              <BarGauge label="Smart contracts"  value={9.2}   max={30}  color="#22c55e" right="9.2K" />
              <BarGauge label="Devices / endpoints" value={3.4} max={10}  color="#ef4444" right="3.4M" />
              <BarGauge label="Documents / filings" value={11.2} max={15} color="#f59e0b" right="11.2M" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <InlineStat label="Entity resolution accuracy" value="99.42%" sub="bi-encoder + fuzzy" tone="ok" />
              <InlineStat label="Linkage recall" value="98.10%" sub="production cohort" tone="ok" />
              <InlineStat label="Duplicate suppression" value="2.11M" sub="last 30 days" tone="violet" />
              <InlineStat label="Twin refresh" value="4.2 s" sub="event → graph" />
            </div>
          </Panel>
        </div>

        {/* Agency integrations + Lineage */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Inter-agency integrations"
            icon={<Workflow className="h-3.5 w-3.5" />}
            className="col-span-12 xl:col-span-7"
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {AGENCIES.map(a => (
                <div key={a.code} className="relative rounded-sm border border-cyber-500/15 bg-ink-900/40 p-3">
                  <span className="corner-tl" />
                  <span className="corner-br" />
                  <div className="flex items-center justify-between">
                    <div className="font-display text-[12px] text-cyber-200">{a.code}</div>
                    <span className={
                      a.status === 'CORE'       ? 'chip chip-red' :
                      a.status === 'RESTRICTED' ? 'chip chip-violet' :
                      a.status === 'EXTERNAL'   ? 'chip chip-amber' :
                      'chip chip-green'
                    }>{a.status}</span>
                  </div>
                  <div className="mt-1 text-[10.5px] leading-snug text-slate-400">{a.name}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Ingest heatmap (last 7 days × 24h)"
            icon={<Zap className="h-3.5 w-3.5" />}
            className="col-span-12 xl:col-span-5"
          >
            <HeatmapGrid />
            <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-slate-500">
              <span>Peak · Friday 14:00 · <span className="text-cyber-300">3.41M tx/hr</span></span>
              <span>Trough · Sunday 04:00 · <span className="text-cyber-300">0.62M tx/hr</span></span>
            </div>
          </Panel>
        </div>

        {/* Architecture */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Sovereign fusion architecture"
            icon={<Server className="h-3.5 w-3.5" />}
            className="col-span-12"
          >
            <ArchitectureDiagram />
          </Panel>
        </div>
      </div>
    </div>
  )
}

function ArchitectureDiagram() {
  // Layered architecture as SVG
  const L = [
    { title: 'Sources', items: ['NIBSS / NIP', 'CBN RTGS + TSA', 'eNaira CBDC', 'Banks & Fintech', 'CAC / NIN / BVN', 'Immigration / Customs', 'Crypto nodes', 'Chainalysis / TRM', 'OSINT + Dark web', 'Telecom (warrant)'] , color: '#22d3ee' },
    { title: 'Ingestion plane (Kafka + NATS)', items: ['Schema registry', 'PII tokenization', 'Event ordering', 'Back-pressure control', 'Deduplication'], color: '#a78bfa' },
    { title: 'Entity resolution & tokenization', items: ['Bi-encoder matcher', 'Fuzzy + probabilistic join', 'Cross-domain linkage', 'Pseudonymization / k-anon', 'Policy-based masking'], color: '#eab308' },
    { title: 'Digital twin graph (distributed)', items: ['Persons · Companies · Wallets · Accounts · Devices · Transactions', 'Temporal versioning · Immutable lineage · Pluggable storage'], color: '#22c55e' },
    { title: 'Analytics & AI plane', items: ['Stream analytics', 'Feature store', 'Graph intelligence (GNN)', 'Behavioral models', 'LLM copilot'], color: '#22d3ee' },
    { title: 'Delivery plane (to consumers)', items: ['Command & Control', 'Officer workspace', 'Copilot API', 'Case & Prosecution systems', 'External partners (gated)'], color: '#ef4444' }
  ]

  return (
    <div className="space-y-2">
      {L.map((layer, i) => (
        <div key={i} className="relative flex items-center gap-3 rounded-sm border border-cyber-500/15 bg-ink-900/40 p-3">
          <div className="flex h-10 w-24 shrink-0 items-center justify-center rounded-sm border border-cyber-500/25 font-display text-[11px] uppercase tracking-widest" style={{ color: layer.color, borderColor: layer.color + '40' }}>
            L{i + 1}
          </div>
          <div className="flex-1">
            <div className="font-display text-[12.5px] text-cyber-100">{layer.title}</div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {layer.items.map(item => (
                <span key={item} className="rounded-sm border border-white/5 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-300">{item}</span>
              ))}
            </div>
          </div>
          {i < L.length - 1 && (
            <span className="absolute left-12 -bottom-2 h-4 w-px bg-cyber-500/40" />
          )}
        </div>
      ))}
      <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-sm border border-cyber-500/15 bg-ink-900/40 p-3">
          <div className="font-display text-[11px] uppercase tracking-widest text-cyber-300">Privacy-preserving compute</div>
          <ul className="mt-2 list-disc pl-4 text-[11px] leading-relaxed text-slate-300">
            <li>Homomorphic enclaves (CKKS) for PII-bound ML</li>
            <li>Secure multiparty computation for inter-agency joins</li>
            <li>Differential privacy on aggregate dashboards</li>
          </ul>
        </div>
        <div className="rounded-sm border border-cyber-500/15 bg-ink-900/40 p-3">
          <div className="font-display text-[11px] uppercase tracking-widest text-cyber-300">Immutable audit</div>
          <ul className="mt-2 list-disc pl-4 text-[11px] leading-relaxed text-slate-300">
            <li>WORM chain of every query / export / decision</li>
            <li>Cryptographic receipts — inspected by Oversight Board</li>
            <li>Zero-knowledge proofs of policy compliance</li>
          </ul>
        </div>
        <div className="rounded-sm border border-cyber-500/15 bg-ink-900/40 p-3">
          <div className="font-display text-[11px] uppercase tracking-widest text-cyber-300">Sovereignty guarantees</div>
          <ul className="mt-2 list-disc pl-4 text-[11px] leading-relaxed text-slate-300">
            <li>Data residency: Abuja Prime + Kano DR (geo-fenced)</li>
            <li>Post-quantum key exchange (Kyber + X25519)</li>
            <li>Hardware root-of-trust · TPM attested nodes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
