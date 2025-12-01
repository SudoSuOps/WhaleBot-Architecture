WhaleBot-Architecture/
├── README.md               <-- The Manifesto & Documentation
├── package.json            <-- Dependencies
├── tsconfig.json           <-- TS Config
├── tailwind.config.js      <-- Trench Theme Palette
├── vite.config.ts          <-- Build Config
├── index.html              <-- Entry Point (CSP Secured)
├── index.tsx               <-- React Root
├── App.tsx                 <-- Main Controller & State
├── types.ts                <-- Data Models (Guardrails, Regimes, Signals)
├── constants.ts            <-- Diamond Fins v3 Config
├── components/
│   ├── Layout.tsx          <-- Sidebar & Navigation
│   ├── WhaleBotView.tsx    <-- Intelligence Cockpit (The Brain)
│   ├── NetworkView.tsx     <-- VPN / Zero-Trust Command Center
│   ├── ProtocolView.tsx    <-- Security Architecture & Values
│   ├── HowItWorksView.tsx  <-- Documentation & Glossary
│   ├── TradingChart.tsx    <-- Recharts Visualization
│   ├── PositionsTable.tsx  <-- Active Trades & Management
│   ├── TradeExecution.tsx  <-- Long/Short Order Entry
│   ├── TradeHistory.tsx    <-- Immutable Ledger (SHA-256)
│   ├── SignalPanel.tsx     <-- AI Analysis Display
│   ├── StrategyView.tsx    <-- Config Visualization
│   ├── SystemMonitor.tsx   <-- 6x GPU Rig Telemetry
│   └── SettingsView.tsx    <-- Identity & Keys
└── services/
    ├── aiService.ts        <-- Inference Engine Simulation
    └── krakenService.ts    <-- WebSocket Feed
