import { Microscope, HardDrive, FileSearch, Clock, FileCheck2, Lock, Smartphone, Cloud, Server } from 'lucide-react'
import { useToast } from '../components/system/Toast'
import { useModal } from '../components/system/Modal'
import { TopBar } from '../components/layout/TopBar'
import { Panel, InlineStat } from '../components/widgets/Panel'
import { StatCard } from '../components/widgets/StatCard'
import { EVIDENCE } from '../data/mockData'
import { BarGauge } from '../components/widgets/Charts'

const TIMELINE = [
  { ts: '2025-11-04 09:12', ev: 'Subject onboards new account at Zenith (003…21)',         src: 'Banking · NIP',          sev: 'moderate' },
  { ts: '2025-11-14 14:02', ev: 'First inbound ₦482M from NorthStar Energy Ltd',          src: 'Banking',                sev: 'elevated' },
  { ts: '2025-11-20 23:41', ev: 'Wallet 0x9aF3…E2c1 registered on Binance Nigeria',       src: 'Exchange · KYC',         sev: 'elevated' },
  { ts: '2025-12-01 02:04', ev: 'Layer-3 round-trip — ₦318M → Dubai → ₦312M back',        src: 'Radar · Pattern',        sev: 'high' },
  { ts: '2025-12-09 17:33', ev: 'Ransomware payout 4.7 BTC credited to bc1q…8fqrz',       src: 'Blockchain',             sev: 'critical' },
  { ts: '2026-01-12 12:18', ev: 'OP/LIGHTHOUSE opened · multi-jurisdiction warrants filed', src: 'Case Management',       sev: 'critical' },
  { ts: '2026-02-01 08:40', ev: 'Device seizure ex parte order — iPhone 15 Pro extracted', src: 'Forensics',              sev: 'critical' },
  { ts: '2026-03-11 15:05', ev: 'Recovered deleted messages in iCloud backup (iOS 17.5)',  src: 'Forensics · Cloud',      sev: 'high' },
  { ts: '2026-04-03 10:58', ev: 'UK NCA issues MLAT response — ₦71.9B seized',             src: 'Global Bridge',          sev: 'critical' },
  { ts: '2026-04-19 16:41', ev: 'Court-ready dossier generated · 214 pages · cited',       src: 'Copilot · M-NLP-12',     sev: 'moderate' }
]

const DEVICES = [
  { type: 'iPhone 15 Pro · iOS 17.5',      case: 'OP / SUNBURST',  status: 'extracted',   complete: 100 },
  { type: 'Pixel 8 · Android 14',           case: 'OP / RAVENCALL', status: 'extracted',   complete: 100 },
  { type: 'ThinkPad X1 G11 · Win 11',       case: 'OP / GHOSTVEIN', status: 'analyzing',   complete: 72 },
  { type: 'MacBook Pro 14 · macOS 14.4',    case: 'OP / LIGHTHOUSE', status: 'extracted',  complete: 100 },
  { type: 'ESXi image · HT-LOG-DC01',       case: 'OP / BLACKSTEEL', status: 'analyzing',  complete: 41 },
  { type: 'iCloud backup · applied via legal', case: 'OP / SUNBURST', status: 'decrypting', complete: 88 },
  { type: 'Google Workspace · blueh.ng',    case: 'OP / LIGHTHOUSE', status: 'analyzing',  complete: 63 }
]

const DOC_AUTH = [
  { id: 'DA-1102', doc: 'Bank statement · GTB · Jan-25',    verdict: 'AUTHENTIC',  score: 98, reason: 'MICR + watermark + font-kerning match issuer template' },
  { id: 'DA-1103', doc: 'Contract · NorthStar / MinPetrol',  verdict: 'FORGED',    score: 12, reason: 'Embedded metadata anachronism · signer BVN mismatch · font substitution on page 3' },
  { id: 'DA-1104', doc: 'Invoice · HighTower Logistics',     verdict: 'SUSPECT',   score: 42, reason: 'Benchmark deviation on export value 41% below market' },
  { id: 'DA-1105', doc: 'Swift MT103 confirmation (copy)',   verdict: 'AUTHENTIC', score: 95, reason: 'Checksum + SWIFT header consistent with RMA context' }
]

export function Forensics() {
  const toast = useToast()
  const modal = useModal()

  function openEvidence(e: typeof EVIDENCE[number]) {
    modal.open({
      title: <span>Evidence · {e.id}</span>,
      body: (
        <div className="space-y-3 text-[12.5px] text-slate-300">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md border border-white/5 bg-white/[0.02] p-2.5"><div className="stat-label">Case</div><div className="mt-1 font-display text-[14px] text-cyber-200">{e.case}</div></div>
            <div className="rounded-md border border-white/5 bg-white/[0.02] p-2.5"><div className="stat-label">Type</div><div className="mt-1 font-display text-[14px] text-cyber-200">{e.type}</div></div>
            <div className="rounded-md border border-white/5 bg-white/[0.02] p-2.5"><div className="stat-label">Device / source</div><div className="mt-1 font-display text-[14px] text-cyber-200">{e.device}</div></div>
            <div className="rounded-md border border-white/5 bg-white/[0.02] p-2.5"><div className="stat-label">Extracted</div><div className="mt-1 font-display text-[14px] text-cyber-200">{e.extracted}</div></div>
          </div>
          <div className="rounded-md border border-violet-500/30 bg-violet-500/10 p-3 font-mono text-[11px] text-slate-300">
            <div className="mb-1 text-violet-300">integrity: verified</div>
            <div>{e.hash}</div>
            <div className="mt-2 text-violet-300">custody: {e.custody}</div>
          </div>
        </div>
      ),
      footer: (
        <>
          <button className="btn-hud" onClick={() => { modal.close(); toast.success('Exported', 'Exhibit packet downloaded') }}>Export exhibit</button>
          <button className="btn-hud" onClick={() => { modal.close(); toast.info('Re-seal logged', 'WORM ledger updated') }}>Re-seal</button>
        </>
      )
    })
  }

  return (
    <div className="flex h-full flex-col">
      <TopBar
        title="Hyper-Advanced Digital Forensics & Evidence Lab"
        subtitle="Device extraction · cloud acquisition · timeline reconstruction · document authenticity"
        chips={[{ label: 'ISO/IEC 27037', tone: 'green' }, { label: 'CHAIN OF CUSTODY', tone: 'violet' }]}
      />

      <div className="flex-1 overflow-auto p-4 scanlines relative">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
          <StatCard label="Active acquisitions"  value="31" delta="devices + cloud"        icon={<HardDrive />} />
          <StatCard label="Evidence items (FY)"  value="8,421" delta="integrity: 100%"      icon={<FileCheck2 />} tone="green" />
          <StatCard label="TB extracted / month" value="142"    delta="+18% vs prior"        icon={<HardDrive />} tone="cyber" sparkline={[40,48,56,60,65,70,76,80,84,88,90,92]} />
          <StatCard label="AI-recovered items"    value="24,118" delta="deleted / corrupted"  icon={<FileSearch />} tone="violet" />
          <StatCard label="Timeline avg (days)"   value="184"    delta="median per case"       icon={<Clock />} tone="amber" />
          <StatCard label="Court exhibits"        value="1,112"   delta="admitted · this FY"    icon={<Lock />} tone="green" />
        </div>

        {/* Evidence table + timeline */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Evidence register"
            icon={<FileCheck2 className="h-3.5 w-3.5" />}
            tag={<span className="chip chip-green ml-2">Integrity verified</span>}
            className="col-span-12 xl:col-span-7"
            padded={false}
          >
            <table className="data-table">
              <thead>
                <tr>
                  <th>EV-ID</th>
                  <th>CASE</th>
                  <th>TYPE</th>
                  <th>DEVICE / SOURCE</th>
                  <th className="text-right">SIZE</th>
                  <th>HASH</th>
                  <th>CUSTODY</th>
                </tr>
              </thead>
              <tbody>
                {EVIDENCE.map(e => (
                  <tr key={e.id} className="cursor-pointer" onClick={() => openEvidence(e)}>
                    <td className="font-mono text-slate-400">{e.id}</td>
                    <td>{e.case}</td>
                    <td className="text-slate-200">{e.type}</td>
                    <td className="text-slate-400">{e.device}</td>
                    <td className="text-right text-cyber-300">{e.extracted}</td>
                    <td className="font-mono text-[10px] text-slate-500">{e.hash}</td>
                    <td>
                      <span className={
                        e.custody === 'sealed' ? 'chip chip-green' :
                        e.custody === 'court-exhibit' ? 'chip chip-violet' :
                        'chip chip-amber'
                      }>{e.custody}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <Panel
            title="Case timeline · OP / LIGHTHOUSE"
            icon={<Clock className="h-3.5 w-3.5" />}
            className="col-span-12 xl:col-span-5"
          >
            <Timeline />
          </Panel>
        </div>

        {/* Devices + doc auth */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Device / cloud acquisition"
            icon={<Smartphone className="h-3.5 w-3.5" />}
            className="col-span-12 xl:col-span-7"
          >
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {DEVICES.map(d => (
                <div key={d.type + d.case} className="rounded-sm border border-cyber-500/15 bg-ink-900/40 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display text-[12px] text-slate-100">{d.type}</div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{d.case}</div>
                    </div>
                    <span className={
                      d.status === 'extracted' ? 'chip chip-green' :
                      d.status === 'decrypting' ? 'chip chip-amber' :
                      'chip chip-violet'
                    }>{d.status}</span>
                  </div>
                  <div className="mt-2">
                    <BarGauge
                      label="Progress"
                      value={d.complete}
                      color={d.complete === 100 ? '#10b981' : d.complete > 60 ? '#22d3ee' : '#f59e0b'}
                      right={d.complete + '%'}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              <InlineStat label="Toolchain" value="Cellebrite" sub="UFED 4PC · Physical" tone="violet" />
              <InlineStat label="Toolchain" value="Magnet Axiom" sub="Analytic + Cloud" tone="violet" />
              <InlineStat label="Sovereign add-on" value="ADALARA-X" sub="EFCC in-house carver" tone="ok" />
            </div>
          </Panel>

          <Panel
            title="Document authenticity verification"
            icon={<FileSearch className="h-3.5 w-3.5" />}
            className="col-span-12 xl:col-span-5"
            padded={false}
          >
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DOCUMENT</th>
                  <th>VERDICT</th>
                  <th>SCORE</th>
                </tr>
              </thead>
              <tbody>
                {DOC_AUTH.map(d => (
                  <tr key={d.id}>
                    <td className="font-mono text-slate-500">{d.id}</td>
                    <td>
                      <div className="text-slate-100">{d.doc}</div>
                      <div className="text-[10px] text-slate-500">{d.reason}</div>
                    </td>
                    <td>
                      <span className={
                        d.verdict === 'FORGED'  ? 'chip chip-red' :
                        d.verdict === 'SUSPECT' ? 'chip chip-amber' :
                        'chip chip-green'
                      }>{d.verdict}</span>
                    </td>
                    <td className={d.score < 50 ? 'text-red-300' : d.score < 80 ? 'text-amber-300' : 'text-emerald-300'}>{d.score}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>

        {/* Lab capability / chain of custody */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel title="Lab capability matrix" icon={<Microscope className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-6">
            <div className="grid grid-cols-2 gap-3">
              {[
                { k: 'Mobile forensics', v: 'iOS · Android · feature-phone · telematics', c: Smartphone },
                { k: 'Computer forensics', v: 'Windows · macOS · Linux · Live RAM imaging', c: Server },
                { k: 'Cloud forensics', v: 'Workspace · M365 · AWS · GCP · Azure · iCloud', c: Cloud },
                { k: 'Network forensics', v: 'pcap reassembly · TLS decrypt (session keys)', c: Server },
                { k: 'Memory carving',    v: 'RAMCarver · Volatility · ADALARA-X', c: HardDrive },
                { k: 'Malware lab',        v: 'Sandbox fleet · reverse-engineering · YARA', c: HardDrive }
              ].map(x => {
                const Icon = x.c
                return (
                  <div key={x.k} className="rounded-sm border border-cyber-500/15 bg-ink-900/40 p-3">
                    <div className="flex items-center gap-2 font-display text-[12px] text-cyber-200">
                      <Icon className="h-3.5 w-3.5" />
                      {x.k}
                    </div>
                    <div className="mt-1 text-[11px] text-slate-400">{x.v}</div>
                  </div>
                )
              })}
            </div>
          </Panel>

          <Panel title="Chain-of-custody integrity" icon={<Lock className="h-3.5 w-3.5" />} className="col-span-12 xl:col-span-6">
            <div className="space-y-2">
              <BarGauge label="Artifact hash verified"  value={100} color="#10b981" right="100%" />
              <BarGauge label="Court-admissibility checks" value={99} color="#22d3ee" right="99%" />
              <BarGauge label="Tamper-evident logs"     value={100} color="#a78bfa" right="100%" />
              <BarGauge label="Seal / re-seal events"    value={98} color="#10b981" right="98%" />
            </div>

            <div className="mt-4 rounded-sm border border-violet-500/25 bg-violet-500/5 p-3 font-mono text-[11px] text-slate-300">
              <div className="mb-1 flex items-center gap-2 text-violet-300">
                <Lock className="h-3 w-3" /> CUSTODIAL RECEIPT — EV-8830
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed">
seal:     2026-04-12 10:11:02 WAT · by LAB-JOS-12
hash:     sha256:a2c14f8e…9bf0
movement: LAB-JOS-12 → COURT-Abuja-4 (chain 3 of 3)
witness:  Dep.Commissioner F. Lawal, ACP J. Ekanem
worm:    ledger block #2218041 · receipt TX 0x4f…ab12
status:  COURT-EXHIBIT · READY FOR TENDER
              </pre>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

function Timeline() {
  const sevColor = (s: string) => s === 'critical' ? '#ef4444' : s === 'high' ? '#f59e0b' : s === 'elevated' ? '#eab308' : '#22d3ee'
  return (
    <div className="relative">
      <div className="absolute left-[10px] top-1 bottom-1 w-px bg-gradient-to-b from-cyber-500/60 via-cyber-500/20 to-transparent" />
      <ul className="space-y-3">
        {TIMELINE.map((e, i) => (
          <li key={i} className="relative pl-7">
            <span className="absolute left-1.5 top-1 h-4 w-4 rounded-full border-2 bg-ink-900" style={{ borderColor: sevColor(e.sev) }} />
            <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{e.ts} · {e.src}</div>
            <div className="text-[12px] text-slate-200">{e.ev}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
