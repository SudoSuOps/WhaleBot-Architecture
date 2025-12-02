import React from 'react';
import { Lock, Server, Link, ShieldCheck, Cpu, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const ProtocolView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"><div className="relative overflow-hidden rounded-2xl border border-trenchGold-500/30 bg-whale-900 p-8 text-center shadow-[0_0_50px_rgba(255,215,0,0.1)]"><div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-trenchGold-500 to-transparent"></div><h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">THIS IS <span className="text-trenchGold-500">NOT</span> A CASINO</h1><p className="text-xl text-whale-text max-w-2xl mx-auto font-light leading-relaxed">The first verifiable, local-node perpetual trading protocol running on <span className="text-diamond-500 font-mono">Real Hardware</span>.</p></div></div>
  );
};
export default ProtocolView;
