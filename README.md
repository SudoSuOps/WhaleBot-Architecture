
# 🐳 WhaleBot Architecture (Diamond Fins v3)

**The Bridge Between Your Laptop and Industrial-Grade Supremacy.**

WhaleBot is a secure, non-custodial trading infrastructure platform that allows users to run institutional-grade AI strategies on bare-metal GPU clusters via Cloudflare Zero-Trust tunnels.

> **THIS IS NOT A CASINO.**
> We do not custody funds. We do not run orderbooks. We do not provide leverage.
> We provide the compute, the intelligence, and the routing rails. You keep the keys.

## 🏗 Architecture

### 1. The Interface (Client Side)
- **Tech:** React 19, TailwindCSS, Lucide Icons.
- **Role:** Configuration Cockpit.
- **Security:** User keys never leave the local browser environment until signed execution intents are sent.

### 2. The Tunnel (Network Layer)
- **Tech:** Cloudflare Zero-Trust, WireGuard (MTU 1420).
- **Role:** Secure, encrypted pipeline between client and rig.
- **Features:**
  - Static IP Exit Nodes (Frankfurt, London, Tokyo).
  - DDoS Protection.
  - Zero-Trust Identity Enforcement.

### 3. The Metal (Compute Layer)
- **Hardware:** 6x NVIDIA RTX 5090 Clusters.
- **CPU:** Intel Xeon W-3475X Sapphire Rapids (36 Cores / 72 Threads).
- **RAM:** 256GB Kingston Fury ECC Registered (RDIMM) - Zero-Error Tolerance.
- **Role:** Edge Inference & Signal Processing.
- **Engine:**
  - **Market Regime Detection:** (Trend/Chop/Squeeze).
  - **Microstructure Scoring:** Orderbook imbalance & vol crush.
  - **Risk Guardrails:** Server-side enforcement of Max DD & Exposure.

## 🧠 WhaleBot Intelligence Modules

The system runs isolated containers for each user with configurable logic modules:

1.  **Volatility Crush:** Shorts volatility spikes > 2 sigma.
2.  **Funding Arbitrage:** Scalps funding rate deviations across venues.
3.  **Trend Rider:** Momentum entries based on EMA cross + Volume confirmation.
4.  **Microstructure Pulse:** Front-runs iceberg orders and liquidity voids.

## 🛡 Security Model

1.  **Zero-Trust Access:** No open ports. Mutual TLS.
2.  **Local Custody:** Keys remain with the user.
3.  **Static IP Whitelisting:** Exchanges only accept orders from our secure exit nodes.
4.  **Isolated Compute:** Kubernetes-style container isolation per user tenant.

## 🚀 Deployment Instructions

### Local Development
```bash
# Clone the repository
git clone git@github.com:SudoSuOps/WhaleBot-Architecture.git

# Install dependencies
npm install

# Run local dashboard
npm run dev
```

### Web3 Production Deployment (ENS + IPFS)

This project is optimized for the **whaleperp.eth.limo** gateway.

1. **Build the Artifacts:**
   ```bash
   npm run build
   ```

2. **Upload to IPFS:**
   Upload the `dist/` folder to IPFS (via Pinata, Fleek, or local node).
   Copy the resulting CID (Hash).

3. **Configure ENS:**
   - Go to app.ens.domains
   - Manage `whaleperp.eth`
   - Set **Content Hash** record to `ipfs://<YOUR_CID>`

4. **Access:**
   Your dashboard is now live at `https://whaleperp.eth.limo`

## 📜 License

Proprietary Software.
© 2025 Whale Compute Systems Ltd.
