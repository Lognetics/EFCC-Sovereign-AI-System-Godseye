import { useState } from 'react'
import { Bot, Send, Sparkles, FileText, ListChecks, UserSearch, Link2, Paperclip } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Panel } from '../components/widgets/Panel'
import { StatCard } from '../components/widgets/StatCard'

type Turn = {
  who: 'officer' | 'copilot'
  body: string | React.ReactNode
  chips?: string[]
  citations?: { label: string; source: string }[]
  ts: string
}

const SEED: Turn[] = [
  {
    who: 'officer',
    body: 'Summarize the financial network around NorthStar Energy Ltd and draft an affidavit paragraph to support a preservation order against Access 992…07.',
    ts: '14:02'
  },
  {
    who: 'copilot',
    body: (
      <>
        <p><b className="text-cyber-200">Summary.</b> NorthStar Energy Ltd (RC-6429218) is a shell corporation registered 2023-08-14 with 3 directors linked by BVN clustering to subject <span className="text-red-300">Aderemi Ogundipe</span>. Over the last 180 days, NorthStar has received <b className="text-cyber-200">₦9.1B</b> in inbound flows from 4 subsidy-related vendor contracts and dispersed <b className="text-cyber-200">₦7.8B</b> through a 4-tier peripheral network. Graph Intelligence flags a probability of <b className="text-red-300">0.94</b> that Access 992…07 is a laundering conduit.</p>
        <p className="mt-2"><b className="text-cyber-200">Key findings (top 5).</b></p>
        <ul className="mt-1 list-disc pl-5 space-y-0.5">
          <li>3 ghost directors identified via NIN-BVN mismatch [CAC · BVN]</li>
          <li>Round-tripping ₦318M → Dubai → return within 72h [Radar R-105]</li>
          <li>Exit path via mixer → bc1q…8fqrz [Blockchain Grid]</li>
          <li>Synthetic KYC detected at 2 beneficiary onboarding [Deepfake Shield]</li>
          <li>Trade-invoicing benchmark deviation of 41% [HighTower co-exposure]</li>
        </ul>
        <p className="mt-2"><b className="text-cyber-200">Proposed affidavit paragraph (counsel-ready).</b></p>
        <blockquote className="mt-1 rounded-sm border-l-2 border-cyber-500/70 bg-cyber-500/5 px-3 py-2 text-[11.5px] leading-relaxed text-slate-300">
          Upon analysis of transaction records obtained pursuant to s.38 of the Economic and Financial Crimes Commission (Establishment) Act, 2004, and augmented with corporate registry data from the Corporate Affairs Commission, account Access 992…07 received, within the period 14 November 2025 to 11 April 2026, the aggregate sum of ₦7.8 Billion originating from NorthStar Energy Limited (RC-6429218), whose beneficial ownership, upon examination of BVN records under the Banks and Other Financial Institutions Act, 2020, resolves to individuals associated with Subject 1 (Mr. A. Ogundipe). On the strength of the foregoing, the Commission respectfully prays for a preservation order under the Mutual Assistance in Criminal Matters Act, 2019 restraining all dealings in the said account pending conclusion of investigation.
        </blockquote>
      </>
    ),
    chips: ['94% confidence', 'Court-ready'],
    citations: [
      { label: 'CAC · RC-6429218', source: 'data-fusion' },
      { label: 'BVN cluster · Syndicate-A', source: 'graph-intel' },
      { label: 'Blockchain trace · bc1q…8fqrz', source: 'blockchain' },
      { label: 'Radar · R-105 round-trip', source: 'radar' }
    ],
    ts: '14:02'
  },
  {
    who: 'officer',
    body: 'Draft evidence-linking checklist for tomorrow’s court hearing.',
    ts: '14:04'
  },
  {
    who: 'copilot',
    body: (
      <ul className="list-disc space-y-0.5 pl-5 text-[11.5px] leading-relaxed text-slate-300">
        <li>Exhibit A — Certified CAC search (RC-6429218) · custody EV-8829</li>
        <li>Exhibit B — NIBSS audit trail (Access 992…07) 14/11/25–11/04/26</li>
        <li>Exhibit C — Blockchain trace report (bc1q…8fqrz → TKu9…QJz1) · Chainalysis + TRM attestations</li>
        <li>Exhibit D — Deepfake Shield memo (DF-01/03/06) with model card M-DPF-01</li>
        <li>Exhibit E — Radar case-file (R-105) with sample transactions · timestamps NTP-signed</li>
        <li>Witness 1 · ACP F. Lawal (chain of custody) · Witness 2 · Forensic examiner LAB-JOS-12</li>
      </ul>
    ),
    chips: ['Admissibility checked'],
    ts: '14:05'
  }
]

export function Copilot() {
  const [turns, setTurns] = useState<Turn[]>(SEED)
  const [input, setInput] = useState('')

  function send() {
    if (!input.trim()) return
    const ts = new Date().toLocaleTimeString('en-GB').slice(0, 5)
    setTurns(t => [...t, { who: 'officer', body: input, ts }])
    setTimeout(() => {
      setTurns(t => [...t, {
        who: 'copilot',
        ts,
        body: (
          <>
            <p>Understood. I&apos;ll cross-reference the request against the digital twin and active cases. Drafted response will include full citations and admissibility notes.</p>
            <p className="mt-2 text-[11px] text-slate-400">Model: <span className="text-cyber-200">M-NLP-12 · Sovereign Legal LLM v0.9.4</span> · compliant with Evidence Act 2011 §84.</p>
          </>
        ),
        chips: ['deliberating…'],
        citations: [{ label: 'data-fusion', source: 'twin' }]
      }])
    }, 700)
    setInput('')
  }

  return (
    <div className="flex h-full flex-col">
      <TopBar
        title="AI Investigator Copilot"
        subtitle="Augmenting every officer with natural-language case intelligence"
        chips={[{ label: 'M-NLP-12', tone: 'violet' }, { label: 'COURT-READY', tone: 'green' }]}
      />

      <div className="flex-1 overflow-auto p-4 scanlines relative">
        {/* KPI */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Queries / day"      value="48,211" delta="avg latency 1.8s"    icon={<Bot />} tone="violet" />
          <StatCard label="Dossiers drafted"   value="2,112"  delta="court-ready this FY" icon={<FileText />} tone="green" />
          <StatCard label="Entities linked"    value="184K"   delta="auto-suggested"       icon={<Link2 />} />
          <StatCard label="Sovereign LLM"      value="M-NLP-12" delta="v0.9.4 · fine-tuned"  icon={<Sparkles />} tone="violet" />
        </div>

        {/* Chat + side rails */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Conversation · Case OP / LIGHTHOUSE"
            icon={<Bot className="h-3.5 w-3.5" />}
            actions={<button className="btn-hud">Export PDF</button>}
            className="col-span-12 xl:col-span-8"
          >
            <div className="flex h-[520px] flex-col">
              <div className="flex-1 space-y-3 overflow-auto pr-2">
                {turns.map((t, i) => (
                  <ChatBubble key={i} turn={t} />
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-sm border border-cyber-500/25 bg-ink-900/70 p-2">
                <button className="rounded-sm p-1 text-slate-500 hover:text-cyber-300"><Paperclip className="h-4 w-4" /></button>
                <input
                  className="flex-1 bg-transparent font-mono text-[12px] text-slate-100 placeholder:text-slate-600 focus:outline-none"
                  placeholder="Ask anything about cases, entities, flows, or statutes…"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                />
                <button className="btn-hud" onClick={send}>
                  <Send className="h-3 w-3" /> SEND
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {['Summarize this case', 'Draft preservation order', 'Find similar patterns', 'Generate affidavit', 'Build exhibit list'].map(p => (
                  <button key={p} className="chip" onClick={() => setInput(p)}>{p}</button>
                ))}
              </div>
            </div>
          </Panel>

          <div className="col-span-12 space-y-3 xl:col-span-4">
            <Panel title="Case rail · OP / LIGHTHOUSE" icon={<ListChecks className="h-3.5 w-3.5" />}>
              <div className="space-y-2 text-[11.5px]">
                <div className="flex items-center justify-between"><span className="text-slate-500">Priority</span><span className="chip chip-red">CRITICAL</span></div>
                <div className="flex items-center justify-between"><span className="text-slate-500">Entities</span><span className="text-cyber-200">218</span></div>
                <div className="flex items-center justify-between"><span className="text-slate-500">Exhibits</span><span className="text-cyber-200">37</span></div>
                <div className="flex items-center justify-between"><span className="text-slate-500">Open tasks</span><span className="text-amber-300">12</span></div>
                <div className="flex items-center justify-between"><span className="text-slate-500">Next hearing</span><span className="text-cyber-200">2026-04-28</span></div>
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Auto-suggested tasks</div>
                {[
                  'Obtain MLAT response from Jersey FCU',
                  'Cross-check wallet 0xA9F0…C8D2 with sanctions registry',
                  'Schedule forensic imaging for ESXi HT-LOG-DC01',
                  'Prepare counsel brief with citations'
                ].map(x => (
                  <label key={x} className="flex items-start gap-2 text-[11px] text-slate-300">
                    <input type="checkbox" className="mt-0.5 accent-cyber-400" />
                    {x}
                  </label>
                ))}
              </div>
            </Panel>

            <Panel title="Evidence auto-linked" icon={<UserSearch className="h-3.5 w-3.5" />}>
              <ul className="space-y-1.5 text-[11px]">
                {[
                  'EV-8828 → para 2 (cloud exports)',
                  'EV-8829 → para 3 (cloud logs)',
                  'DA-1103 → para 4 (forged contract)',
                  'Radar R-105 → para 5 (round-trip)'
                ].map(x => (
                  <li key={x} className="flex items-start gap-2 rounded-sm border border-white/5 bg-white/5 px-2 py-1">
                    <Link2 className="mt-0.5 h-3 w-3 text-cyber-300" />
                    <span className="text-slate-300">{x}</span>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="Capabilities" icon={<Sparkles className="h-3.5 w-3.5" />}>
              <ul className="space-y-1.5 text-[11px] leading-relaxed text-slate-300">
                <li>Natural-language queries across the entire digital twin</li>
                <li>Automated case summaries &amp; investigation briefs</li>
                <li>Evidence-linking suggestions with admissibility checks</li>
                <li>Court-ready report generation (Nigerian Evidence Act §84)</li>
                <li>Policy-aware redaction and citizen-rights awareness</li>
                <li>Multi-agency translation (case ↔ CBN ↔ NFIU formats)</li>
              </ul>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatBubble({ turn }: { turn: Turn }) {
  const isOfficer = turn.who === 'officer'
  return (
    <div className={'flex ' + (isOfficer ? 'justify-end' : 'justify-start')}>
      <div className={'max-w-[88%] rounded-md border p-3 ' + (isOfficer
        ? 'border-cyber-500/25 bg-cyber-500/10'
        : 'border-violet-500/25 bg-violet-500/10')}>
        <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">
          <span className={isOfficer ? 'text-cyber-300' : 'text-violet-300'}>{isOfficer ? 'DCP A. Okonkwo' : 'Copilot · M-NLP-12'}</span>
          <span>· {turn.ts}</span>
          {turn.chips?.map(c => <span key={c} className="chip">{c}</span>)}
        </div>
        <div className="text-[12px] leading-relaxed text-slate-200">{turn.body}</div>
        {turn.citations && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {turn.citations.map(c => (
              <span key={c.label} className="inline-flex items-center gap-1 rounded-sm border border-cyber-500/20 bg-cyber-500/5 px-1.5 py-0.5 font-mono text-[9.5px] text-cyber-300">
                <Link2 className="h-2.5 w-2.5" /> {c.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
