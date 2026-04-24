import { Link2, Wallet, ShieldAlert, Coins, GitMerge, Search, TrendingDown, Globe } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Panel, InlineStat } from '../components/widgets/Panel'
import { StatCard } from '../components/widgets/StatCard'
import { NetworkGraph } from '../components/widgets/NetworkGraph'
import { LiveAreaChart, BarGauge, DonutChart } from '../components/widgets/Charts'

const CHAINS = [
  { name: 'Bitcoin', sym: 'BTC', height: '821,918', tps: '7', watched: 4821, color: '#f7931a' },
  { name: 'Ethereum', sym: 'ETH', height: '19,203,412', tps: '14', watched: 28_441, color: '#627eea' },
  { name: 'Tron', sym: 'TRX', height: '61,204,918', tps: '180', watched: 42_108, color: '#ef4444' },
  { name: 'BSC', sym: 'BNB', height: '38,291,401', tps: '142', watched: 14_221, color: '#f3ba2f' },
  { name: 'Solana', sym: 'SOL', height: '267,114,001', tps: '2900', watched: 6_102, color: '#14f195' },
  { name: 'Polygon', sym: 'MATIC', height: '55,103,011', tps: '40', watched: 5_480, color: '#8247e5' },
  { name: 'Arbitrum', sym: 'ARB', height: '192,104,201', tps: '60', watched: 3_042, color: '#28a0f0' },
  { name: 'Base', sym: 'BASE', height: '11,442,801', tps: '22', watched: 2_210, color: '#0052ff' }
]

const WATCHLIST = [
  { addr: 'bc1q7x2…8fqrz',    chain: 'BTC',   cluster: 'LockBit-AfA',      balance: '4.71 BTC',  usd: '$284K', risk: 'CRITICAL', tag: 'Ransomware · Mixer' },
  { addr: '0x9aF3B1…E2c1',    chain: 'ETH',   cluster: 'Tornado-Exit-12',  balance: '820 ETH',   usd: '$2.47M', risk: 'HIGH',     tag: 'Mixer exit → OTC' },
  { addr: 'TKu9…QJz1',        chain: 'TRX',   cluster: 'NG-OTC-Cluster-A', balance: '2.1M USDT', usd: '$2.10M', risk: 'HIGH',     tag: 'OTC off-ramp · Lagos' },
  { addr: 'bnb18v…kn4u',      chain: 'BNB',   cluster: 'Bridge-Ring-9',    balance: '188 BNB',   usd: '$61K',   risk: 'ELEVATED', tag: 'Bridge hop' },
  { addr: 'So1aNa…9K2p',      chain: 'SOL',   cluster: 'SpamNet-Alpha',    balance: '14K SOL',   usd: '$2.1M',  risk: 'HIGH',     tag: 'Rapid disperse' },
  { addr: '0xA9F0…C8D2',      chain: 'ETH',   cluster: 'DarkPoolX',        balance: '0.4 ETH',   usd: '$1.2K',  risk: 'MODERATE', tag: 'OFAC-adjacent' }
]

const SMART_CONTRACTS = [
  { addr: '0xA9F0…C8D2', name: 'DarkPoolX Router', type: 'AMM + obfuscator', risk: 'HIGH', sigs: 'swap, bridge, obfuscate' },
  { addr: '0xB10F…4231', name: 'Tornado.cash Pool-100', type: 'Mixer', risk: 'CRITICAL', sigs: 'deposit, withdraw' },
  { addr: '0x8F12…9AE7', name: 'BridgePort Hop',   type: 'Bridge',  risk: 'HIGH', sigs: 'lock, mint' },
  { addr: '0x4D81…0E22', name: 'CloakSwap v2',     type: 'Privacy DEX', risk: 'HIGH', sigs: 'cloakedSwap' }
]

export function Blockchain() {
  return (
    <div className="flex h-full flex-col">
      <TopBar
        title="Sovereign Blockchain Intelligence Grid"
        subtitle="Wallet clustering · cross-chain tracing · dark-web monitoring · smart-contract forensics"
        chips={[{ label: 'LIVE NODES', tone: 'green' }, { label: 'CHAINALYSIS + TRM', tone: 'violet' }]}
      />

      <div className="flex-1 overflow-auto p-4 scanlines relative">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Chains covered"       value="8" delta="BTC · ETH · TRX · BNB · SOL · MATIC · ARB · BASE" icon={<Link2 />} />
          <StatCard label="Wallets tracked"     value="148.7K" delta="+1,240 today" icon={<Wallet />} tone="cyber" sparkline={[50,56,60,64,70,74,76,80,84,88,90,92]} />
          <StatCard label="Sanctioned addresses" value="12,441" delta="OFAC · OFSI · UN · FATF" icon={<ShieldAlert />} tone="red" />
          <StatCard label="Crypto-value traced"  value="$1.82B" delta="fiscal year" icon={<Coins />} tone="green" sparkline={[20,28,36,42,50,58,64,70,74,78,80,82]} />
        </div>

        {/* Chain node status */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Node mesh — sovereign chain coverage"
            icon={<Globe className="h-3.5 w-3.5" />}
            className="col-span-12 xl:col-span-8"
            padded={false}
          >
            <table className="data-table">
              <thead>
                <tr>
                  <th>CHAIN</th>
                  <th>HEIGHT</th>
                  <th>LIVE TPS</th>
                  <th className="text-right">WATCHED ADDRS</th>
                  <th>LATENCY</th>
                  <th>STATE</th>
                </tr>
              </thead>
              <tbody>
                {CHAINS.map(c => (
                  <tr key={c.sym}>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-cyber-500/20 font-display text-[9px] font-bold" style={{ color: c.color, borderColor: c.color + '50' }}>{c.sym}</span>
                        <span className="text-slate-100">{c.name}</span>
                      </div>
                    </td>
                    <td className="text-cyber-300">{c.height}</td>
                    <td className="text-slate-300">{c.tps}</td>
                    <td className="text-right text-cyber-300">{c.watched.toLocaleString()}</td>
                    <td className="text-emerald-300">{Math.floor(40 + Math.random() * 400)} ms</td>
                    <td><span className="chip chip-green"><span className="blink-dot h-1 w-1 bg-current text-current" />SYNCED</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          {/* Clusters */}
          <Panel
            title="Cluster attribution"
            icon={<GitMerge className="h-3.5 w-3.5" />}
            className="col-span-12 xl:col-span-4"
          >
            <DonutChart size={200} data={[
              { label: 'Unhosted / non-custodial', value: 38, color: '#22d3ee' },
              { label: 'CEX / licensed',           value: 24, color: '#10b981' },
              { label: 'OTC / P2P',                value: 18, color: '#f59e0b' },
              { label: 'Mixer / privacy',          value: 9,  color: '#ef4444' },
              { label: 'Darknet-linked',           value: 6,  color: '#a855f7' },
              { label: 'Smart contract',           value: 5,  color: '#eab308' }
            ]} />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <InlineStat label="Recovered on-chain" value="$112M" sub="this FY" tone="ok" />
              <InlineStat label="Darknet flagged" value="412" sub="wallets 30d" tone="danger" />
            </div>
          </Panel>
        </div>

        {/* Trace + watchlist */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Cross-chain trace · bc1q…8fqrz → Exit"
            icon={<Search className="h-3.5 w-3.5" />}
            tag={<span className="chip chip-red ml-2">4-hop laundering confirmed</span>}
            actions={<button className="btn-hud">Open sub-graph</button>}
            className="col-span-12 xl:col-span-7"
          >
            <TracePath />
            <div className="mt-3">
              <NetworkGraph height={260} />
            </div>
          </Panel>

          <Panel
            title="Priority watchlist"
            icon={<Wallet className="h-3.5 w-3.5" />}
            className="col-span-12 xl:col-span-5"
            padded={false}
          >
            <table className="data-table">
              <thead>
                <tr>
                  <th>ADDRESS</th>
                  <th>CHAIN</th>
                  <th>CLUSTER</th>
                  <th>BAL</th>
                  <th>RISK</th>
                </tr>
              </thead>
              <tbody>
                {WATCHLIST.map(w => (
                  <tr key={w.addr}>
                    <td className="font-mono text-slate-200">{w.addr}</td>
                    <td>{w.chain}</td>
                    <td className="text-slate-400">{w.cluster}</td>
                    <td>
                      <div className="text-cyber-300">{w.balance}</div>
                      <div className="text-[9.5px] text-slate-500">{w.usd}</div>
                    </td>
                    <td>
                      <span className={
                        w.risk === 'CRITICAL' ? 'chip chip-red' :
                        w.risk === 'HIGH' ? 'chip chip-amber' :
                        w.risk === 'ELEVATED' ? 'chip chip-amber' :
                        'chip'
                      }>{w.risk}</span>
                      <div className="mt-0.5 text-[9px] text-slate-500">{w.tag}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>

        {/* Flow + smart contracts + dark web */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel
            title="Live on-chain flow"
            icon={<TrendingDown className="h-3.5 w-3.5" />}
            className="col-span-12 md:col-span-6 xl:col-span-5"
          >
            <div className="grid grid-cols-2 gap-3">
              <LiveAreaChart label="BTC flagged / min" color="#f7931a" height={110} />
              <LiveAreaChart label="USDT flagged / min" color="#22d3ee" height={110} />
              <LiveAreaChart label="ETH mixer exits / min" color="#627eea" height={110} />
              <LiveAreaChart label="Cross-chain bridge / min" color="#a855f7" height={110} />
            </div>
          </Panel>

          <Panel
            title="Smart-contract forensics"
            icon={<GitMerge className="h-3.5 w-3.5" />}
            className="col-span-12 md:col-span-6 xl:col-span-4"
            padded={false}
          >
            <table className="data-table">
              <thead><tr><th>CONTRACT</th><th>TYPE</th><th>RISK</th></tr></thead>
              <tbody>
                {SMART_CONTRACTS.map(s => (
                  <tr key={s.addr}>
                    <td>
                      <div className="text-slate-100">{s.name}</div>
                      <div className="font-mono text-[9.5px] text-slate-500">{s.addr}</div>
                    </td>
                    <td>{s.type}</td>
                    <td>
                      <span className={s.risk === 'CRITICAL' ? 'chip chip-red' : 'chip chip-amber'}>{s.risk}</span>
                      <div className="mt-0.5 text-[9px] text-slate-500">{s.sigs}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <Panel
            title="Dark-web crypto monitor"
            icon={<ShieldAlert className="h-3.5 w-3.5" />}
            className="col-span-12 md:col-span-12 xl:col-span-3"
          >
            <div className="space-y-2">
              <BarGauge label="Marketplaces watched" value={214} max={1000} color="#22d3ee" right="912" />
              <BarGauge label="Vendor wallets"        value={618} max={1000} color="#ef4444" right="4,211" />
              <BarGauge label="Ransomware clusters"   value={34}  max={100}  color="#ef4444" right="34" />
              <BarGauge label="Stolen-card markets"   value={81}  max={200}  color="#f59e0b" right="81" />
              <BarGauge label="Sources onion / i2p"   value={742} max={1000} color="#a78bfa" right="742" />
            </div>

            <div className="mt-3 rounded-sm border border-red-500/25 bg-red-500/5 p-2.5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-red-300">Recent finding</div>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
                Forum <span className="text-red-300">UrbanVault</span> advertising Nigerian bank-login dumps; payment wallets cluster with bc1q…8fqrz. Evidence preserved.
              </p>
            </div>
          </Panel>
        </div>

        {/* Integrations */}
        <div className="mt-3 grid grid-cols-12 gap-3">
          <Panel title="External integrations" className="col-span-12">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {[
                { k: 'Chainalysis Reactor', v: 'Licensed · API pull', d: 'Attribution, cluster heuristics, compliance datasets', c: 'violet' },
                { k: 'TRM Labs',            v: 'Licensed · API pull', d: 'Risk scoring, address screening, sanctions overlays', c: 'violet' },
                { k: 'EFCC Sovereign Grid', v: 'Owned infrastructure', d: 'Native clustering, federated ML, zero dependency on external uptime for critical paths', c: 'green' }
              ].map(x => (
                <div key={x.k} className={'relative rounded-sm border p-3 bg-ink-900/40 ' + (x.c === 'green' ? 'border-emerald-500/30' : 'border-violet-500/30')}>
                  <span className="corner-tl" />
                  <span className="corner-br" />
                  <div className={'font-display text-[13px] ' + (x.c === 'green' ? 'text-emerald-300' : 'text-violet-300')}>{x.k}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slate-500">{x.v}</div>
                  <p className="mt-2 text-[11px] leading-relaxed text-slate-300">{x.d}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

function TracePath() {
  const HOPS = [
    { h: 'Origin', a: 'bc1q…8fqrz',    chain: 'BTC',  amt: '4.71 BTC', note: 'Ransomware payout' },
    { h: 'Hop 1',  a: '3Fz4…MQn2',     chain: 'BTC',  amt: '4.70 BTC', note: 'Mixer deposit (Wasabi-like)' },
    { h: 'Hop 2',  a: 'Tornado-exit',  chain: 'ETH',  amt: '820 ETH',  note: 'Mixer exit via 0x9aF3…' },
    { h: 'Hop 3',  a: '0xBRIDGE…A1',    chain: 'ETH→BNB', amt: '2.1M USDT', note: 'Cross-chain bridge' },
    { h: 'Hop 4',  a: 'TKu9…QJz1',     chain: 'TRX',  amt: '2.1M USDT', note: 'OTC inflow · Lagos P2P' },
    { h: 'Exit',   a: 'ProsperPay NG', chain: 'Fiat',   amt: '₦3.3B',   note: 'Naira settlement · flagged' }
  ]
  return (
    <div className="relative overflow-hidden rounded-sm border border-cyber-500/15 bg-ink-900/40 p-3">
      <div className="absolute inset-x-4 top-[54px] h-px bg-gradient-to-r from-transparent via-cyber-400/40 to-transparent" />
      <div className="relative grid grid-cols-6 gap-2">
        {HOPS.map((h, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-cyber-500/40 bg-ink-900 font-display text-[11px] text-cyber-200">{i + 1}</div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-cyber-300">{h.h}</div>
            <div className="font-mono text-[10px] text-slate-200">{h.a}</div>
            <div className="font-mono text-[10px] text-slate-500">{h.chain} · {h.amt}</div>
            <div className="font-mono text-[9.5px] text-slate-500">{h.note}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
