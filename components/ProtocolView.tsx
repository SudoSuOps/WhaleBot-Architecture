
import React from 'react';
import { Lock, Server, Link, ShieldCheck, Cpu, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const ProtocolView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Manifesto Header */}
      <div className="relative overflow-hidden rounded-2xl border border-trenchGold-500/30 bg-whale-900 p-8 text-center shadow-[0_0_50px_rgba(255,215,0,0.1)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-trenchGold-500 to-transparent"></div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          THIS IS <span className="text-trenchGold-500">NOT</span> A CASINO
        </h1>
        <p className="text-xl text-whale-text max-w-2xl mx-auto font-light leading-relaxed">
          The first verifiable, local-node perpetual trading protocol running on <span className="text-diamond-500 font-mono">Real Hardware</span>.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* ZERO TRUST */}
        <div className="bg-whale-800 border border-whale-700 hover:border-trenchGold-500/50 p-6 rounded-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Lock size={100} />
          </div>
          <div className="w-12 h-12 bg-whale-900 rounded-lg flex items-center justify-center mb-4 border border-whale-700 group-hover:border-trenchGold-500 text-trenchGold-500">
            <Lock size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">ZERO TRUST TUNNELS</h3>
          <p className="text-sm text-whale-text leading-relaxed">
            Secured via <span className="text-blue-400 font-bold">Cloudflare Zero-Trust</span>. No exposed ports. No centralized exchange holds your money. The vault is on-chain.
          </p>
        </div>

        {/* LOCAL NODE */}
        <div className="bg-whale-800 border border-whale-700 hover:border-diamond-500/50 p-6 rounded-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Server size={100} />
          </div>
          <div className="w-12 h-12 bg-whale-900 rounded-lg flex items-center justify-center mb-4 border border-whale-700 group-hover:border-diamond-500 text-diamond-500">
            <Cpu size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">EDGE INFERENCE</h3>
          <p className="text-sm text-whale-text leading-relaxed">
            Runs on <span className="text-diamond-500 font-bold">RTX 5090 GPU clusters</span>. Not AWS shared instances. Real edge inference for sub-second signal generation.
          </p>
        </div>

        {/* ON-CHAIN VAULT */}
        <div className="bg-whale-800 border border-whale-700 hover:border-trenchPurple-500/50 p-6 rounded-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Link size={100} />
          </div>
          <div className="w-12 h-12 bg-whale-900 rounded-lg flex items-center justify-center mb-4 border border-whale-700 group-hover:border-trenchPurple-500 text-trenchPurple-500">
            <Link size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">ON-CHAIN VAULT</h3>
          <p className="text-sm text-whale-text leading-relaxed">
            Entry fees go directly to a smart contract. Not our wallet. <span className="text-purple-400 font-bold">Chainlink Automation</span> triggers payouts. No "pending review."
          </p>
        </div>

        {/* PURE SKILL */}
        <div className="bg-whale-800 border border-whale-700 hover:border-rose-500/50 p-6 rounded-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ShieldCheck size={100} />
          </div>
          <div className="w-12 h-12 bg-whale-900 rounded-lg flex items-center justify-center mb-4 border border-whale-700 group-hover:border-rose-500 text-rose-500">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">PURE SKILL</h3>
          <p className="text-sm text-whale-text leading-relaxed">
            Same starting balance. Same market. Same rules. The best trader wins. <span className="text-rose-400 font-bold">No house edge.</span> No rake. No hidden fees.
          </p>
        </div>

        {/* CHAINLINK ORACLES */}
        <div className="bg-whale-800 border border-whale-700 hover:border-blue-500/50 p-6 rounded-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Link size={100} />
          </div>
          <div className="w-12 h-12 bg-whale-900 rounded-lg flex items-center justify-center mb-4 border border-whale-700 group-hover:border-blue-500 text-blue-500">
            <Link size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">CHAINLINK ORACLES</h3>
          <p className="text-sm text-whale-text leading-relaxed">
            Winner determined by math, not moderators. <span className="text-blue-400 font-bold">Chainlink Functions</span> fetch results. Payouts execute automatically.
          </p>
        </div>

        {/* VERIFIABLE */}
        <div className="bg-whale-800 border border-whale-700 hover:border-emerald-500/50 p-6 rounded-xl transition-all hover:-translate-y-1 group relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckCircle size={100} />
          </div>
          <div className="w-12 h-12 bg-whale-900 rounded-lg flex items-center justify-center mb-4 border border-whale-700 group-hover:border-emerald-500 text-emerald-500">
            <CheckCircle size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">VERIFIABLE</h3>
          <p className="text-sm text-whale-text leading-relaxed">
            Every trade <span className="text-emerald-400 font-bold">SHA-256 hashed</span> with timestamp, price, and wallet signature. Verify any trade. No manipulation possible.
          </p>
        </div>
      </div>

      {/* Regulatory Architecture Breakdown */}
      <div className="bg-whale-900/50 border border-whale-700 rounded-xl p-8 mt-12">
        <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="text-trenchGold-500" />
            <h2 className="text-2xl font-bold text-white">INFRASTRUCTURE DEFINITION</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
                <h3 className="text-rose-400 font-bold tracking-widest text-sm border-b border-rose-900/50 pb-2">WHAT WE ARE NOT</h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-slate-400">
                        <XCircle className="text-rose-500 shrink-0 mt-0.5" size={16} />
                        <span className="text-sm">We are <strong>NOT</strong> an exchange.</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-400">
                        <XCircle className="text-rose-500 shrink-0 mt-0.5" size={16} />
                        <span className="text-sm">We do <strong>NOT</strong> custody funds or assets.</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-400">
                        <XCircle className="text-rose-500 shrink-0 mt-0.5" size={16} />
                        <span className="text-sm">We do <strong>NOT</strong> operate an orderbook.</span>
                    </li>
                     <li className="flex items-start gap-3 text-slate-400">
                        <XCircle className="text-rose-500 shrink-0 mt-0.5" size={16} />
                        <span className="text-sm">We do <strong>NOT</strong> offer fiat on-ramps/off-ramps.</span>
                    </li>
                </ul>
            </div>

            <div className="space-y-4">
                <h3 className="text-emerald-400 font-bold tracking-widest text-sm border-b border-emerald-900/50 pb-2">WHAT WE ARE</h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-slate-300">
                        <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                        <span className="text-sm">Secure AI Intelligence Platform</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                        <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                        <span className="text-sm">High-Performance Compute Provider (IaaS)</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-300">
                        <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                        <span className="text-sm">Low-Latency Routing Infrastructure</span>
                    </li>
                     <li className="flex items-start gap-3 text-slate-300">
                        <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                        <span className="text-sm">Non-Custodial Interface for YOUR API Keys</span>
                    </li>
                </ul>
            </div>
        </div>
      </div>

      {/* Trust Footer */}
      <div className="mt-12 text-center border-t border-whale-700 pt-8">
          <p className="text-whale-text font-mono text-sm tracking-widest uppercase">
              Trust Protocol v1.0 • Verified on Base • Powered by Local Compute
          </p>
      </div>
    </div>
  );
};

export default ProtocolView;
