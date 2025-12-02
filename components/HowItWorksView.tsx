
import React from 'react';
import { Cpu, Zap, Shield, Globe, BookOpen, Terminal, ChevronRight, Server, Code, Network, Laptop, Lock, Anchor, Layers } from 'lucide-react';

const HowItWorksView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl border border-trenchPurple-500/30 bg-whale-900 p-8 shadow-[0_0_50px_rgba(126,34,206,0.1)]">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <BookOpen size={200} />
        </div>
        <h1 className="text-4xl font-black text-white tracking-tighter mb-4">
          HOW IT <span className="text-trenchPurple-500">WORKS</span>
        </h1>
        <p className="text-xl text-whale-text max-w-3xl font-light leading-relaxed">
          The bridge between your laptop and industrial-grade supremacy. 
          We don't sell cloud subscriptions. We rent you raw, physical power and trader-grade routing.
        </p>
      </div>

      {/* The Architecture: Laptop to Supercomputer */}
      <div className="bg-whale-800 border border-trenchGold-500/20 rounded-xl p-8 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-1 h-full bg-trenchGold-500"></div>
         <div className="flex items-center gap-3 mb-6">
            <Network className="text-trenchGold-500" size={32} />
            <h2 className="text-3xl font-bold text-white tracking-tight">YOUR LAPTOP IS THE COCKPIT. <br/><span className="text-slate-500">THE RIG IS THE ENGINE.</span></h2>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
             {/* Stage 1 */}
             <div className="bg-whale-900/50 p-6 rounded-xl border border-whale-700">
                 <Laptop className="text-slate-300 mb-4" size={32} />
                 <h3 className="text-lg font-bold text-white mb-2">1. The Interface</h3>
                 <p className="text-sm text-slate-400 leading-relaxed">
                     Your MacBook or consumer laptop runs the lightweight dashboard. You keep full custody of your keys. No heavy lifting happens here. You are the pilot.
                 </p>
             </div>

             {/* Arrow */}
             <div className="hidden md:flex items-center justify-center text-trenchGold-500">
                 <ChevronRight size={40} className="animate-pulse" />
             </div>

             {/* Stage 2 */}
             <div className="bg-whale-900/50 p-6 rounded-xl border border-whale-700">
                 <Lock className="text-trenchPurple-500 mb-4" size={32} />
                 <h3 className="text-lg font-bold text-white mb-2">2. The Tunnel</h3>
                 <p className="text-sm text-slate-400 leading-relaxed">
                     We establish a <span className="text-trenchPurple-400 font-bold">Cloudflare Zero-Trust Tunnel</span> directly to the hardware. 
                     <br/><br/>
                     <span className="text-xs uppercase tracking-wider text-slate-500">BENEFITS:</span>
                     <ul className="list-disc list-inside mt-1 text-xs text-slate-300">
                         <li>Stable Static IP</li>
                         <li>Zero Geoblocking</li>
                         <li>DDoS Protection</li>
                     </ul>
                 </p>
             </div>

              {/* Arrow */}
             <div className="hidden md:flex items-center justify-center text-trenchGold-500">
                 <ChevronRight size={40} className="animate-pulse" />
             </div>

             {/* Stage 3 */}
             <div className="bg-whale-900/50 p-6 rounded-xl border border-whale-700 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-2 opacity-10">
                     <Cpu size={64} />
                 </div>
                 <Server className="text-trenchGold-500 mb-4" size={32} />
                 <h3 className="text-lg font-bold text-white mb-2">3. The Metal</h3>
                 <p className="text-sm text-slate-400 leading-relaxed">
                     Commands execute on <span className="text-trenchGold-400 font-bold">6x RTX 5090 Clusters</span> via local edge inference. Sub-second signal processing on real silicon in the trenches.
                 </p>
             </div>
         </div>
         
         <div className="mt-8 p-4 bg-trenchGold-500/5 border border-trenchGold-500/20 rounded-lg text-center">
             <p className="text-trenchGold-400 font-mono text-sm">
                 RESULT: Enterprise-grade execution speed and AI capabilities on a coffee shop Wi-Fi connection.
             </p>
         </div>
      </div>

      {/* NEW HYBRID INTELLIGENCE SECTION */}
      <div className="bg-whale-800 border border-trenchPurple-500/30 rounded-xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
              <Layers size={200} />
          </div>
          <div className="flex items-center gap-3 mb-6">
              <Layers className="text-trenchPurple-500" size={32} />
              <h2 className="text-2xl font-bold text-white">Hybrid Intelligence: CEX + DEX Feeds</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                  <h3 className="text-white font-bold mb-2">Why Hyperliquid?</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                      Traditional bots often rely solely on CEX feeds. We aggregate data from <span className="text-trenchGold-500">Kraken Futures (CEX)</span> and <span className="text-trenchPurple-500">Hyperliquid (DEX)</span> simultaneously. 
                      This provides arbitrage visibility and true price discovery transparency.
                  </p>
              </div>
              <div>
                   <h3 className="text-white font-bold mb-2">Alpha Generation</h3>
                   <p className="text-sm text-slate-400 leading-relaxed">
                      By comparing the orderbooks of centralized and decentralized venues in real-time on our GPU rigs, WhaleBot can detect:
                      <ul className="list-disc list-inside mt-2 text-slate-300">
                          <li>Funding rate inefficiencies</li>
                          <li>Liquidation cascades before they propagate</li>
                          <li>True spot price divergence</li>
                      </ul>
                   </p>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Why This Matters */}
        <div className="bg-whale-800 border border-whale-700 rounded-xl p-6 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
                <Shield className="text-emerald-500" size={24} />
                <h2 className="text-2xl font-bold text-white">Not Cloud Hype. Real Hardware.</h2>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
                "Cloud AI" is often shared, throttled, and monitored. WhalePerp allocates dedicated physical GPU lanes to your node.
            </p>
            <ul className="space-y-3">
                <li className="flex items-start gap-3">
                    <Zap className="text-emerald-500 mt-1" size={16} />
                    <div>
                        <strong className="text-white block">Edge Inference</strong>
                        <span className="text-sm text-slate-500">Models run next to the execution engine. Signals generated in milliseconds, not routed through API gateways.</span>
                    </div>
                </li>
                <li className="flex items-start gap-3">
                    <Shield className="text-emerald-500 mt-1" size={16} />
                    <div>
                        <strong className="text-white block">Full Custody</strong>
                        <span className="text-sm text-slate-500">The hardware crunches numbers. It never touches your private keys. You sign the transaction; the rig broadcasts it.</span>
                    </div>
                </li>
            </ul>
        </div>

        {/* White Glove Service */}
        <div className="bg-gradient-to-br from-whale-900 to-whale-800 border border-diamond-500/30 rounded-xl p-6 relative">
            <div className="absolute top-0 right-0 bg-diamond-500/10 text-diamond-500 text-xs font-bold px-3 py-1 rounded-bl-xl border-l border-b border-diamond-500/30">
                WHALES ONLY
            </div>
            <div className="flex items-center gap-3 mb-4">
                <Globe className="text-diamond-500" size={24} />
                <h2 className="text-2xl font-bold text-white">Built for Traders, Not Tourists</h2>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
                This isn't a gamified mobile app. It's a weapon. We offer bespoke rig setup and strategy encoding for serious volume.
            </p>
            <div className="bg-whale-950/50 rounded-lg p-4 border border-whale-700 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Code size={14} className="text-diamond-500" />
                    <span>PineScript &rarr; Rust/TypeScript High Frequency Porting</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Server size={14} className="text-diamond-500" />
                    <span>Dedicated H100 / RTX 5090 Cluster Allocation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Terminal size={14} className="text-diamond-500" />
                    <span>Private Mempool Access on Base/Arbitrum</span>
                </div>
            </div>
        </div>
      </div>

      {/* Glossary */}
      <div className="bg-whale-800 border border-whale-700 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Terminal className="text-slate-400" />
            Definitions & Glossary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div>
                <h3 className="text-trenchGold-500 font-bold font-mono mb-1">ZERO TRUST TUNNEL</h3>
                <p className="text-sm text-slate-400">A secure connection method (via Cloudflare) that exposes applications to the internet without opening firewall ports, preventing DDoS and intrusion.</p>
            </div>
            <div>
                <h3 className="text-trenchGold-500 font-bold font-mono mb-1">EDGE INFERENCE</h3>
                <p className="text-sm text-slate-400">Running AI models locally on the device (or nearby edge server) rather than sending data to a centralized cloud, drastically reducing latency.</p>
            </div>
            <div>
                <h3 className="text-trenchGold-500 font-bold font-mono mb-1">SHA-256 HASH</h3>
                <p className="text-sm text-slate-400">A cryptographic fingerprint. We use this to timestamp every trade execution, creating an immutable, verifiable ledger of your performance.</p>
            </div>
            <div>
                <h3 className="text-trenchGold-500 font-bold font-mono mb-1">DIAMOND FINS</h3>
                <p className="text-sm text-slate-400">Our proprietary trading strategy focusing on high-confidence entries (70%+) with tight trailing stops to capture volatility while preserving capital.</p>
            </div>
            <div>
                <h3 className="text-trenchGold-500 font-bold font-mono mb-1">LOCAL COMPUTE</h3>
                <p className="text-sm text-slate-400">Processing data on physical hardware you control or rent directly, avoiding the "noisy neighbor" problems of shared cloud VPS.</p>
            </div>
            <div>
                <h3 className="text-trenchGold-500 font-bold font-mono mb-1">ALPHA</h3>
                <p className="text-sm text-slate-400">The excess return on an investment relative to the return of a benchmark index. The "edge" generated by the bot.</p>
            </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="border-t border-whale-700 pt-8 flex flex-col items-center justify-center text-center">
          <p className="text-slate-500 mb-4">JOIN THE WHALE COMPUTE NETWORK</p>
          <div className="flex gap-4">
              <a href="https://twitter.com/whalecompute" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-whale-800 hover:bg-whale-700 px-4 py-2 rounded-lg border border-whale-700 transition-colors">
                  <span className="font-bold text-white">@whalecompute</span>
              </a>
          </div>
      </div>

    </div>
  );
};

export default HowItWorksView;
