import { Globe2, Plane, Gavel, FileSignature, Handshake, Coins } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Panel } from '../components/widgets/Panel'
import { StatCard } from '../components/widgets/StatCard'
import { WorldArcs } from '../components/widgets/WorldArcs'
import { RECOVERY_CASES } from '../data/mockData'
import { BarGauge, DonutChart } from '../components/widgets/Charts'

const PARTNERS = [
  { code: 'INTERPOL',  name: 'INTERPOL Abuja NCB',       via: 'I-24/7', status: 'ONLINE' },
  { code: 'Europol',   name: 'Europol — EFECC liaison',   via: 'SIENA',  status: 'ONLINE' },
  { code: 'FBI',        name: 'US FBI Legat Lagos',       via: 'MLAT',   status: 'ONLINE' },
  { code: 'NCA',        name: 'UK National Crime Agency',  via: 'MLAT',   status: 'ONLINE' },
  { code: 'DOJ',        name: 'US Dept. of Justice',       via: 'MLAT',   status: 'ONLINE' },
  { code: 'FINCEN',     name: 'US FinCEN',                  via: 'Egmont', status: 'ONLINE' },
  { code: 'FATF',       name: 'Financial Action Task Force', via: 'GS',     status: 'ONLINE' },
  { code: 'AFRIPOL',    name: 'AFRIPOL (AU)',              via: 'Direct', status: 'ONLINE' },
  { code: 'ECOWAS-FIU', name: 'GIABA / ECOWAS FIU',        via: 'Egmont', status: 'ONLINE' },
  { code: 'UAE FIU',    name: 'UAE Financial Intel Unit',    via: 'Egmont', status: 'ONLINE' },
  { code: 'MAS',         name: 'Monetary Authority of SG',    via: 'FIU',    status: 'LIMITED' },
  { code: 'FINMA',       name: 'Swiss FINMA',                 via: 'Egmont', status: 'ONLINE' }
]

const MLATS = [
  { id: 'MLAT-2026-014', subj: 'OP/CLEARWATER (PEP concealment)',   country: 'United Kingdom', submitted: '2025-07-11', status: 'responded',  outcome: '₦71.9B seized' },
  { id: 'MLAT-2026-015', subj: 'OP/LIGHTHOUSE (crypto OTC ring)',    country: 'Jersey',         submitted: '2026-02-01', status: 'in progress', outcome: 'preservation order granted' },
  { id: 'MLAT-2026-016', subj: 'OP/SUNBURST (subsidy diversion)',    country: 'UAE',            submitted: '2026-03-12', status: 'responded',  outcome: '₦28.4B repatriated' },
  { id: 'MLAT-2026-017', subj: 'OP/BLACKSTEEL (trade mis-invoicing)', country: 'Singapore',      submitted: '2026-04-04', status: 'adjudication', outcome: 'pending hearing' },
  { id: 'MLAT-2026-018', subj: 'OP/MIDNIGHT (ransomware OTC)',         country: 'Switzerland',    submitted: '2025-10-22', status: 'responded',  outcome: '₦44.2B frozen' },
  { id: 'MLAT-2026-019', subj: 'OP/GHOSTVEIN (payroll ghosts)',        country: 'USA',            submitted: '2025-09-09', status: 'responded',  outcome: '₦33.8B recovered' }
]

export function GlobalBridge() {
  return (
    <div className="flex h-full flex-col">
      <TopBar
        title="Global Intelligence & Recovery Bridge"
        subtitle="Cross-border asset tracing · INTERPOL · Europol · FBI · FATF · GIABA"
        chips={[{ label: 'SECURE CHANNEL', tone: 'green' }, { label: 'EGMONT / FIU.NET', tone: 'violet' }]}
      />

      <div className="flex-1 overflow-auto p-4 scanlines relative">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          <StatCard label="Active MLATs"       value="48" delta="12 jurisdictions" icon={<FileSignature />} />
          <StatCard label="Red notices"         value="37" delta="subject notices in force" icon={<Globe2 />} tone="red" />
          <StatCard label="Repatriated (FY)"    value="₦178.8B" delta="cross-border recovery" icon={<Coins />} tone="green" sparkline={[12,24,40,50,62,70,76,82,86,88,90,91]} />
          <StatCard label="Freeze orders (intl.)" value="24" delta="in force" icon={<Gavel />} tone="amber" />
          <StatCard label="Joint ops active"    value="9" delta="bilateral · trilateral" icon={<Handshake />} />
          <StatCard label="Flight interdictions" value="14" delta="Immigration coordinated" icon={<Plane />} tone="violet" />
        </div>

        {/* World arcs */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Asset flow corridors — live"
            icon={<Globe2 className="h-3.5 w-3.5" />}
            tag={<span className="chip chip-green ml-2">Secure · classified</span>}
            className="col-span-12 xl:col-span-8"
          >
            <WorldArcs height={440} />
          </Panel>

          <Panel title="Recovery mix" className="col-span-12 xl:col-span-4">
            <DonutChart size={220} data={[
              { label: 'Repatriated',   value: 52, color: '#10b981' },
              { label: 'In progress',   value: 21, color: '#22d3ee' },
              { label: 'Adjudication',  value: 14, color: '#f59e0b' },
              { label: 'Frozen abroad', value: 9,  color: '#a78bfa' },
              { label: 'Contested',      value: 4,  color: '#ef4444' }
            ]} />

            <div className="mt-3 space-y-2">
              <BarGauge label="MLAT response SLA compliance" value={87} color="#10b981" right="87%" />
              <BarGauge label="Red notice issuance speed"     value={79} color="#22d3ee" right="79%" />
              <BarGauge label="Secure comms uptime"            value={99.9} max={100} color="#a78bfa" right="99.9%" />
              <BarGauge label="Joint ops effectiveness"        value={74} color="#f59e0b" right="74%" />
            </div>
          </Panel>
        </div>

        {/* Partners + MLATs */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel title="Partner agencies" icon={<Handshake className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-5">
            <div className="grid grid-cols-2 gap-2">
              {PARTNERS.map(p => (
                <div key={p.code} className="relative rounded-sm border border-cyber-500/15 bg-ink-900/40 p-2.5">
                  <span className="corner-tl" />
                  <span className="corner-br" />
                  <div className="flex items-center justify-between">
                    <div className="font-display text-[12px] text-cyber-200">{p.code}</div>
                    <span className={p.status === 'ONLINE' ? 'chip chip-green' : 'chip chip-amber'}>
                      <span className="blink-dot h-1 w-1 bg-current text-current" />
                      {p.status}
                    </span>
                  </div>
                  <div className="mt-1 text-[10.5px] text-slate-400">{p.name}</div>
                  <div className="mt-0.5 font-mono text-[9.5px] uppercase tracking-widest text-slate-500">via {p.via}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="MLAT tracker" icon={<FileSignature className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-7" padded={false}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>REF</th>
                  <th>SUBJECT</th>
                  <th>JURISDICTION</th>
                  <th>SUBMITTED</th>
                  <th>STATUS</th>
                  <th>OUTCOME</th>
                </tr>
              </thead>
              <tbody>
                {MLATS.map(m => (
                  <tr key={m.id}>
                    <td className="font-mono text-slate-500">{m.id}</td>
                    <td className="text-slate-200">{m.subj}</td>
                    <td>{m.country}</td>
                    <td className="text-slate-500">{m.submitted}</td>
                    <td>
                      <span className={
                        m.status === 'responded' ? 'chip chip-green' :
                        m.status === 'in progress' ? 'chip chip-violet' :
                        'chip chip-amber'
                      }>{m.status}</span>
                    </td>
                    <td className="text-cyber-300">{m.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>

        {/* Recovery */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel title="Recovery casebook" icon={<Coins className="h-3.5 w-3.5" />} className="col-span-12" padded={false}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>REF</th>
                  <th>ROUTE</th>
                  <th>COUNTERPART</th>
                  <th>VALUE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {RECOVERY_CASES.map(r => (
                  <tr key={r.id}>
                    <td className="font-mono text-slate-500">{r.id}</td>
                    <td className="text-slate-200">{r.route}</td>
                    <td>{r.counterpart}</td>
                    <td className="text-emerald-300">{r.value}</td>
                    <td>
                      <span className={
                        r.status === 'repatriated' ? 'chip chip-green' :
                        r.status === 'in progress' ? 'chip chip-violet' :
                        'chip chip-amber'
                      }>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>
      </div>
    </div>
  )
}
