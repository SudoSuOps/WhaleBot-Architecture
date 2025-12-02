
import React, { useState, useEffect } from 'react';
import { Globe, Shield, Wifi, Server, MapPin, Zap, Lock, CheckCircle, Smartphone, Activity } from 'lucide-react';

const NetworkView: React.FC = () => {
  const [latency, setLatency] = useState({
    frankfurt: 3,
    london: 8,
    tokyo: 145,
    newyork: 95
  });

  // Simulate latency jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => ({
        frankfurt: Math.max(2, prev.frankfurt + (Math.random() > 0.5 ? 1 : -1)),
        london: Math.max(5, prev.london + (Math.random() > 0.5 ? 1 : -1)),
        tokyo: Math.max(140, prev.tokyo + (Math.random() > 0.5 ? 2 : -2)),
        newyork: Math.max(90, prev.newyork + (Math.random() > 0.5 ? 2 : -2)),
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const TierCard = ({ title, price, subtitle, features, recommended }: any) => (
      <div className={`relative p-6 rounded-xl border ${recommended ? 'bg-whale-800 border-trenchGold-500 shadow-[0_0_30px_rgba(255,215,0,0.1)]' : 'bg-whale-900 border-whale-700'} flex flex-col h-full group transition-all hover:-translate-y-1`}>
          {recommended && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-trenchGold-500 text-whale-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  MOST POPULAR
              </div>
          )}
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-sm text-slate-500 mb-4">{subtitle}</p>
          <div className="mb-6">
              <span className="text-3xl font-mono font-bold text-white">${price}</span>
              <span className="text-slate-500">/mo</span>
          </div>
          <ul className="space-y-3 mb-8 flex-1">
              {features.map((f: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle size={16} className={`mt-0.5 ${recommended ? 'text-trenchGold-500' : 'text-slate-600'}`} />
                      {f}
                  </li>
              ))}
          </ul>
          <button className={`w-full py-3 rounded-lg font-bold transition-all ${
              recommended 
              ? 'bg-trenchGold-500 hover:bg-trenchGold-400 text-whale-900 shadow-[0_0_15px_rgba(255,215,0,0.4)]' 
              : 'bg-whale-800 hover:bg-whale-700 text-white border border-whale-600'
          }`}>
              DEPLOY NODE
          </button>
      </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        
        {/* Command Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-whale-800 border border-trenchGold-500/30 rounded-xl p-8 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Globe size={200} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <Activity className="text-trenchGold-500 animate-pulse" />
                        <span className="text-trenchGold-500 font-mono text-sm tracking-widest">NETWORK STATUS: ONLINE</span>
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-4">WHALE TUNNEL NETWORK</h1>
                    <p className="text-lg text-slate-400 max-w-xl">
                        Trader-grade routing infrastructure. 
                        Zero-trust identity, static IPs, and direct fiber lines to major exchange hubs.
                    </p>
                    
                    <div className="mt-8 flex gap-4">
                         <div className="bg-whale-900/80 p-4 rounded-lg border border-whale-700 backdrop-blur-sm">
                            <p className="text-xs text-slate-500 uppercase">Current Exit Node</p>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-white font-mono font-bold">FRANKFURT-1</span>
                            </div>
                        </div>
                        <div className="bg-whale-900/80 p-4 rounded-lg border border-whale-700 backdrop-blur-sm">
                            <p className="text-xs text-slate-500 uppercase">Tunnel Protocol</p>
                            <div className="flex items-center gap-2">
                                <Lock size={14} className="text-trenchPurple-500" />
                                <span className="text-white font-mono font-bold">WIREGUARD (MTU 1420)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Latency Matrix */}
            <div className="bg-whale-900 border border-whale-700 rounded-xl p-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Wifi size={18}/> LIVE LATENCY</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-whale-950 rounded border border-whale-800">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🇩🇪</span>
                            <div>
                                <p className="text-white font-bold text-sm">Frankfurt</p>
                                <p className="text-xs text-slate-500">Binance / Kraken</p>
                            </div>
                        </div>
                        <span className="text-emerald-400 font-mono font-bold">{latency.frankfurt}ms</span>
                    </div>
                     <div className="flex items-center justify-between p-3 bg-whale-950 rounded border border-whale-800">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🇬🇧</span>
                            <div>
                                <p className="text-white font-bold text-sm">London</p>
                                <p className="text-xs text-slate-500">Coinbase / LSE</p>
                            </div>
                        </div>
                        <span className="text-emerald-400 font-mono font-bold">{latency.london}ms</span>
                    </div>
                     <div className="flex items-center justify-between p-3 bg-whale-950 rounded border border-whale-800 opacity-60">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🇺🇸</span>
                            <div>
                                <p className="text-white font-bold text-sm">New York</p>
                                <p className="text-xs text-slate-500">NYSE / NASDAQ</p>
                            </div>
                        </div>
                        <span className="text-yellow-500 font-mono font-bold">{latency.newyork}ms</span>
                    </div>
                     <div className="flex items-center justify-between p-3 bg-whale-950 rounded border border-whale-800 opacity-60">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🇯🇵</span>
                            <div>
                                <p className="text-white font-bold text-sm">Tokyo</p>
                                <p className="text-xs text-slate-500">BitFlyer</p>
                            </div>
                        </div>
                        <span className="text-rose-500 font-mono font-bold">{latency.tokyo}ms</span>
                    </div>
                </div>
            </div>
        </div>

        {/* The Zero Confusion Manifesto */}
        <div className="bg-whale-800 border border-whale-700 rounded-xl p-8">
            <div className="max-w-4xl mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">ZERO TRUST. ZERO CONFUSION.</h2>
                <p className="text-slate-400">
                    We provide the infrastructure. You provide the execution. 
                    <span className="text-white font-bold"> We never see your screen, keys, or wallets.</span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* WHAT WE PROVIDE */}
                <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-6 relative">
                    <div className="absolute -top-3 left-6 bg-emerald-500 text-whale-900 px-3 py-1 text-xs font-bold rounded shadow-lg uppercase tracking-wider">
                        WHAT WE PROVIDE
                    </div>
                    <ul className="space-y-4 mt-2">
                         <li className="flex gap-3">
                            <Server className="text-emerald-500 shrink-0" />
                            <div>
                                <strong className="text-white block text-sm">Secure Tunnel Endpoint</strong>
                                <p className="text-xs text-slate-400">A clean, DDoS-protected static IP exit node.</p>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <Zap className="text-emerald-500 shrink-0" />
                            <div>
                                <strong className="text-white block text-sm">Low-Latency Routing</strong>
                                <p className="text-xs text-slate-400">Optimized paths to exchange data centers.</p>
                            </div>
                        </li>
                         <li className="flex gap-3">
                            <Shield className="text-emerald-500 shrink-0" />
                            <div>
                                <strong className="text-white block text-sm">Privacy & Security</strong>
                                <p className="text-xs text-slate-400">Your ISP sees encrypted noise. Exchanges see our clean IP.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                 {/* WHAT WE DO NOT TOUCH */}
                 <div className="bg-rose-900/10 border border-rose-500/20 rounded-xl p-6 relative">
                    <div className="absolute -top-3 left-6 bg-rose-500 text-white px-3 py-1 text-xs font-bold rounded shadow-lg uppercase tracking-wider">
                        WHAT WE DO NOT TOUCH
                    </div>
                    <ul className="space-y-4 mt-2">
                         <li className="flex gap-3">
                            <Smartphone className="text-rose-500 shrink-0" />
                            <div>
                                <strong className="text-white block text-sm">Your Device</strong>
                                <p className="text-xs text-slate-400">We cannot see your screen, apps, or browser.</p>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <Lock className="text-rose-500 shrink-0" />
                            <div>
                                <strong className="text-white block text-sm">Private Keys</strong>
                                <p className="text-xs text-slate-400">Keys never leave your local machine. Period.</p>
                            </div>
                        </li>
                         <li className="flex gap-3">
                            <Activity className="text-rose-500 shrink-0" />
                            <div>
                                <strong className="text-white block text-sm">Trading Logic</strong>
                                <p className="text-xs text-slate-400">You control the bot. We just provide the road.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Pricing Tiers */}
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Select Your Infrastructure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <TierCard 
                    title="Shared VPN" 
                    price="29" 
                    subtitle="Good for retail traders."
                    features={[
                        "Shared Static IP",
                        "WireGuard Protocol",
                        "Frankfurt / London",
                        "DDoS Protection"
                    ]}
                />
                <TierCard 
                    title="Dedicated IP" 
                    price="199" 
                    subtitle="For API whitelisting."
                    recommended={true}
                    features={[
                        "Dedicated Static IP",
                        "Zero-Trust Auth",
                        "API Whitelisting Ready",
                        "Priority Routing",
                        "Multi-Region Failover"
                    ]}
                />
                <TierCard 
                    title="HFT-Lite Node" 
                    price="299" 
                    subtitle="Bot runners & strategies."
                    features={[
                        "Ultra-Low Latency",
                        "Tokyo / Chicago Access",
                        "MEV Protection",
                        "RPC Optimization",
                        "Private Mempool"
                    ]}
                />
                 <TierCard 
                    title="White Glove" 
                    price="999" 
                    subtitle="Hedge funds & desks."
                    features={[
                        "Custom Node Deployment",
                        "Colocation Services",
                        "Key Vault Setup",
                        "Latency Testing",
                        "24/7 Engineer Access"
                    ]}
                />
            </div>
        </div>

    </div>
  );
};

export default NetworkView;
