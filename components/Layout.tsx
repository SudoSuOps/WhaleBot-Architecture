import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Activity, Settings, Cpu, Globe, Shield, BookOpen, Brain, BrainCircuit, Server, Wallet, Share2, PlusCircle, MessageSquare, Megaphone, Sparkles } from 'lucide-react';
import { WhaleLogoFull } from './BrandAssets';
import IdentityMint from './IdentityMint'; 

interface LayoutProps { children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; vaultEquity: number; initialEquity: number; }

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, vaultEquity, initialEquity }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'whalebot', label: 'WhaleBot / Copilot', icon: Brain },
    { id: 'warroom', label: 'War Room', icon: MessageSquare }, 
    { id: 'meme-reactor', label: 'Meme Reactor', icon: Sparkles },
    { id: 'marketing', label: 'Share Alpha', icon: Megaphone },
    { id: 'network', label: 'Network / VPN', icon: Globe }, 
    { id: 'protocol', label: 'The Protocol', icon: Shield }, 
    { id: 'how-it-works', label: 'How It Works', icon: BookOpen }, 
    { id: 'strategy', label: 'Strategy Config', icon: Activity }, 
    { id: 'system', label: 'Rig Status', icon: Cpu }, 
    { id: 'settings', label: 'Settings', icon: Settings }
  ];
  const pnl = vaultEquity - initialEquity; const pnlPct = (pnl / initialEquity) * 100;

  return (
    <div className="flex h-screen bg-whale-950 text-whale-text font-sans overflow-hidden">
      <div className="w-64 border-r border-whale-700 flex flex-col bg-whale-900 z-20">
        <div className="p-6 border-b border-whale-700 bg-gradient-to-b from-whale-800 to-whale-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
          <div className="relative z-10 mb-1"><WhaleLogoFull /></div>
          <p className="text-[9px] text-trenchGold-500 font-mono tracking-[0.2em] pl-12 opacity-80">BLACKWELL CORE // v3.6</p>
        </div>
        <div className="p-4 bg-whale-950/50 border-b border-whale-800"><button onClick={() => setActiveTab('settings')} className="w-full bg-whale-800 hover:bg-whale-700 border border-whale-700 rounded-lg p-3 flex items-center justify-between group transition-colors"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-gradient-to-tr from-trenchPurple-500 to-diamond-500 flex items-center justify-center text-white font-bold text-xs">ID</div><div className="text-left"><p className="text-[10px] text-slate-400 font-bold uppercase">Identity</p><p className="text-xs text-white font-mono">Mint Handle</p></div></div><PlusCircle size={16} className="text-slate-500 group-hover:text-trenchGold-500"/></button></div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">{navItems.map((item) => (<button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 border border-transparent ${activeTab === item.id ? 'bg-whale-800 text-trenchGold-500 border-l-trenchGold-500 border-l-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : 'hover:bg-whale-800 hover:text-white hover:border-whale-700'}`}><item.icon size={20} className={activeTab === item.id ? 'animate-pulse' : ''} /><span className={`font-medium ${activeTab === item.id ? 'font-bold' : ''}`}>{item.label}</span></button>))}</nav>
        <div className="p-4 bg-whale-900 border-t border-whale-700">
            <div className="bg-gradient-to-br from-whale-800 to-whale-900 rounded-lg p-3 border border-whale-700 shadow-inner group relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="flex justify-between items-center mb-2 relative z-10"><span className="text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1"><BrainCircuit size={10} className="text-trenchPurple-500"/> Total Equity</span><span className={`text-xs font-bold ${pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{pnl >= 0 ? '+' : ''}{pnlPct.toFixed(2)}%</span></div>
                <div className="text-xl font-bold text-white font-mono tracking-tight relative z-10">${vaultEquity.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                <div className="w-full bg-whale-950 h-1.5 mt-2 rounded-full overflow-hidden border border-whale-700 relative z-10"><div className="bg-gradient-to-r from-trenchGold-600 to-trenchGold-400 h-full w-[45%] shadow-[0_0_10px_#ffd700]"></div></div>
            </div>
        </div>
      </div>
      <main className="flex-1 overflow-y-auto bg-whale-950 p-8 relative scroll-smooth">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>
        <div className="absolute top-0 left-1/4 w-1/2 h-64 bg-trenchPurple-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 max-w-7xl mx-auto min-h-screen flex flex-col"><div className="flex-1">{children}</div><div className="mt-24 py-8 border-t border-whale-800 text-center opacity-60 hover:opacity-100 transition-opacity"><div className="flex items-center justify-center gap-2 mb-4 text-slate-600"><Shield size={16} /><span className="text-xs font-bold uppercase tracking-widest">Non-Custodial Infrastructure</span></div><p className="mt-6 text-[9px] text-slate-700 font-mono">© 2025 WHALE COMPUTE SYSTEMS LTD. | BUILT ON BASE | VERIFIED INFRASTRUCTURE</p></div></div>
      </main>
    </div>
  );
};
export default Layout;
