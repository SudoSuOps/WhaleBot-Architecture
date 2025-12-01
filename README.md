# 🐳 WhaleBot Architecture — Diamond Fins v3  
### Enterprise AI Copilot for Perpetual Futures  
**Zero-Trust Secured • GPU-Powered • User-Sovereign • Modular Intelligence**

WhaleBot is an AI-powered trading copilot running on **local GPU rigs**, delivered securely over **Cloudflare Zero-Trust**, and integrated with **multi-exchange execution rails** via user-owned API keys.

This repo contains the **full front-end architecture** used for:
- Intelligence Cockpit  
- Strategy Config  
- Risk Guardrails  
- Trading Execution  
- Network / VPN Control  
- Bot Reasoning & Market Regimes  
- GPU Telemetry  

Built with:
- React 19  
- Vite  
- Tailwind  
- TypeScript  
- Custom AI modules (edge-inference simulation)  

---

# 📁 Project File Tree

```
WhaleBot-Architecture/
├── README.md               <-- The Manifesto & Documentation
├── package.json            <-- Dependencies
├── tsconfig.json           <-- TS Config
├── tailwind.config.js      <-- Trench Theme Palette
├── vite.config.ts          <-- Build Config
├── index.html              <-- Entry Point (CSP Secured)
├── index.tsx               <-- React Root
├── types.ts                <-- Data Models (Guardrails, Regimes, Signals)
├── constants.ts            <-- Diamond Fins v3 Config
├── App.tsx                 <-- Main Controller & State
├── components/
│   ├── Layout.tsx          <-- Sidebar & Navigation
│   ├── WhaleBotView.tsx    <-- Intelligence Cockpit (The Brain)
│   ├── NetworkView.tsx     <-- VPN / Zero-Trust Command Center
│   ├── ProtocolView.tsx    <-- Security Architecture & Values
│   ├── HowItWorksView.tsx  <-- Documentation & Glossary
│   ├── TradingChart.tsx    <-- Live Recharts Visualization
│   ├── PositionsTable.tsx  <-- Active Trades & Management
│   ├── TradeExecution.tsx  <-- Long/Short Order Entry
│   ├── TradeHistory.tsx    <-- Immutable Ledger (SHA-256)
│   ├── SignalPanel.tsx     <-- AI Reasoning Output
│   ├── StrategyView.tsx    <-- Strategy Modules & Config
│   ├── SystemMonitor.tsx   <-- 6x GPU Rig Telemetry
│   └── SettingsView.tsx    <-- Identity, Keys, Zero-Trust Config
└── services/
    ├── aiService.ts        <-- Inference Engine Simulation
    └── krakenService.ts    <-- WebSocket Feed (Kraken Futures)
```

---

# 🔐 Security Model (Zero-Trust + Local Custody)

WhaleBot uses:
- **Cloudflare Zero-Trust Tunnels**
- **Static IP enclaves**
- **User-owned API keys (never stored server-side)**
- **Isolated per-user inference containers**
- **Strict risk guardrails**

We do NOT:
- Custody user funds  
- Host wallets or keys  
- Run an exchange  
- Match orders  
- Control user devices  

You stay sovereign.  
We provide compute, AI, and secure routing.

---

# 🚀 Development

## Install dependencies:
```bash
npm install
```

## Run dev server:
```bash
npm run dev
```

## Build for production:
```bash
npm run build
```

Output appears in `/dist`.

---

# 🌐 Deployment (Cloudflare Pages)

**You can deploy this entire dashboard to:**

### `https://whaleperp.com`
### `https://whaleperp.eth.limo`
### `https://whaleperp.eth.link`

Full deployment steps are below in this README.

---

# 🐳 License
MIT — use freely, improve relentlessly.
