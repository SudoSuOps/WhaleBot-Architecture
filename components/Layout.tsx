import React from 'react';
import { LayoutDashboard, Activity, Settings, Cpu, Globe, Shield, BookOpen, Brain } from 'lucide-react';
interface LayoutProps { children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void; }
const WhaleLogo = () => (
  <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">
    <path d="M15 35 C 15 35, 30 20, 50 20 C 70 20, 90 40, 95 60 C 95 60, 80 85, 50 85 C 30 85, 10 70, 5 50" fill="url(#glowGradient)" opacity="0.2" />
    <path d="M25 65 L 30 80 M 35 68 L 40 82 M 45 70 L 50 83 M 55 70 L 60 82 M 65 68 L 70 80" stroke="#7e22ce" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 45 C 10 30, 30 25, 45 25 C 70 25, 90 45, 92 60 C 94 75, 70 82, 50 82 C 30 82, 15 70, 10 45 Z" fill="#02010a" stroke="#00f0ff" strokeWidth="1.5" />
    <path d="M48 25 L 58 5 L 68 25" fill="#0a051e" stroke="#ffd700" strokeWidth="2" strokeLinejoin="round" />
    <path d="M58 5 L 58 25" stroke="#ffd700" strokeWidth="1" opacity="0.5" />
    <path d="M20 50 L 30 50 L 35 40 L 55 40 L 60 48" stroke="#00f0ff" strokeWidth="1" strokeLinecap="round" className="animate-pulse" />
    <circle cx="20" cy="50" r="1.5" fill="#00f0ff" />
    <circle cx="60" cy="48" r="1.5" fill="#00f0ff" />
    <path d="M40 30 L 45 35 L 65 35" stroke="#a855f7" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
    <circle cx="65" cy="35" r="1.5" fill="#a855f7" />
    <circle cx="82" cy="55" r="2" fill="#ffd700" className="animate-pulse" />
    <defs><linearGradient id="glowGradient" x1="0" y1="0" x2="100" y2="100"><stop offset="0%" stopColor="#00f0ff" /><stop offset="100%" stopColor="#7e22ce" /></linearGradient></defs>
  </svg>
);
const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navItems = [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }, { id: 'whalebot', label: 'WhaleBot / Copilot', icon: Brain }, { id: 'network', label: 'Network / VPN', icon: Globe }, { id: 'protocol', label: 'The Protocol', icon: Shield }, { id: 'how-it-works', label: 'How It Works', icon: BookOpen }, { id: 'strategy', label: 'Strategy Config', icon: Activity }, { id: 'system', label: 'Rig Status', icon: Cpu }, { id: 'settings', label: 'Settings', icon: Settings }];
  return (
    <div className="flex h-screen bg-whale-950 text-whale-text font-sans overflow-hidden">
      <div className="w-64 border-r border-whale-700 flex flex-col bg-whale-900 z-20">
        <div className="p-6 border-b border-whale-700 bg-gradient-to-b from-whale-800 to-whale-900 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-1 relative z-10"><WhaleLogo /><div><h1 className="text-xl font-black text-white tracking-widest font-mono">WHALE<span className="text-diamond-500">PERP</span></h1></div></div>
          <p className="text-[9px] text-trenchGold-500 font-mono tracking-[0.2em] pl-12 opacity-80">BLACKWELL CORE // v3.2</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (<button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 border border-transparent ${activeTab === item.id ? 'bg-whale-800 text-trenchGold-500 border-l-trenchGold-500 border-l-4' : 'hover:bg-whale-800 hover:text-white'}`}><item.icon size={20} /><span className="font-medium">{item.label}</span></button>))}
        </nav>
        <div className="p-4 bg-whale-900 border-t border-whale-700"><div className="bg-gradient-to-br from-whale-800 to-whale-900 rounded-lg p-3 border border-whale-700 shadow-inner"><div className="text-xl font-bold text-white font-mono">$124,592.00</div><div className="text-[10px] text-slate-500 font-mono">VAULT BALANCE</div></div></div>
      </div>
      <main className="flex-1 overflow-y-auto bg-whale-950 p-8 relative scroll-smooth">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>
        <div className="relative z-10 max-w-7xl mx-auto min-h-screen flex flex-col">
            <div className="flex-1">{children}</div>
            <div className="mt-24 py-8 border-t border-whale-800 text-center opacity-60"><p className="text-[10px] text-slate-500">NON-CUSTODIAL INFRASTRUCTURE. WE DO NOT HOLD ASSETS.</p></div>
        </div>
      </main>
    </div>
  );
};
export default Layout;
