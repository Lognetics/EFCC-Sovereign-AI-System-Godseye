# EFCC SOVEREIGN AI SYSTEM

## GOD'S EYE — National Financial Intelligence & Investigation System (GE-NFIIS)

A unified, AI-native, sovereign financial-intelligence platform for the Economic &
Financial Crimes Commission — transforming EFCC from fragmented investigations into
a real-time, predictive, globally-integrated financial-intelligence state.

This repository is the interactive **operator interface** for the full system
vision: a futuristic command-and-control UI covering every layer of the proposed
architecture, built with React + TypeScript + Tailwind and rendering live demo data.

> All names, accounts, wallets, and identifiers in the interface are synthetic /
> fictional and exist strictly for system demonstration.

---

## What you get

Eleven fully-designed operational modules, each rendered as its own HUD-styled view:

| # | Module | Purpose |
|---|---|---|
| 1 | **Command & Control Center** | War-room dashboard with national heatmap, radar, syndicate graph, case portfolio, auto-briefing |
| 2 | **Data Fusion & Digital Twin** | 18 live feeds, sovereign architecture, entity resolution, inter-agency integrations |
| 3 | **AI Intelligence Core — God's Eye Brain** | Behavioral, graph, predictive, deepfake/voice-clone, explainability, model registry |
| 4 | **Sovereign Blockchain Intelligence Grid** | 8-chain node mesh, wallet clustering, cross-chain tracing, smart-contract forensics, dark-web monitor |
| 5 | **Real-Time Financial Monitoring Radar** | 2.89M tx/hr inspection, rule engine, auto-freeze, risk tiers, rail-level flow, frozen accounts |
| 6 | **Digital Forensics & Evidence Lab** | Device/cloud acquisition, timeline reconstruction, document authenticity, chain-of-custody |
| 7 | **AI Investigator Copilot** | Per-officer LLM copilot for case summaries, drafting, evidence linking, court-ready output |
| 8 | **Cybersecurity & Defense Core** | Zero-trust posture, insider threat, immutable audit, post-quantum keys, topology |
| 9 | **Global Intelligence & Recovery Bridge** | INTERPOL / Europol / FBI / FATF / AFRIPOL partnerships, MLATs, world-arc asset flows |
| 10 | **Legal, Ethical & Governance** | Oversight board, warrants, privacy-preserving stack, rights check, FOI pipeline |
| 11 | **Human Capital & EFCC AI Academy** | 7 programs, career track, role capacity, 18 partner institutions |

---

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

Build:

```bash
npm run build
npm run preview
```

---

## Design language

- Dark futuristic HUD aesthetic, scan-line and targeting-ring motifs
- Cyan / violet / amber / red accents mapped to operational risk
- JetBrains Mono + Rajdhani / Orbitron display fonts
- Custom SVG visualizations (network graph, Nigeria map, world arcs,
  radar scope, heatmaps, live charts) — no heavy chart dependencies

---

## Stack

- React 18 · TypeScript · Vite 6
- TailwindCSS 3
- lucide-react for icons

---

## Structure

```
src/
├── App.tsx                         # Boot splash + routing shell
├── main.tsx                        # React entry
├── index.css                       # Tailwind + HUD styles
├── components/
│   ├── layout/                     # Sidebar, TopBar, StatusBar
│   └── widgets/                    # Panel, StatCard, NetworkGraph, NigeriaMap,
│                                   #  RadarScope, WorldArcs, Charts, LiveFeed
├── modules/                        # 11 operational modules
└── data/mockData.ts                # Entities, feeds, alerts, cases, models, etc.
```
