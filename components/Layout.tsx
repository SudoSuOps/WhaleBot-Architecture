
import React from 'react';
import { LayoutDashboard, Activity, Settings, Cpu, Globe, Shield, BookOpen, Brain, BrainCircuit } from 'lucide-react';
import { WhaleLogoFull } from './BrandAssets';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'whalebot', label: 'WhaleBot / Copilot', icon: Brain },
    { id: 'network', label: 'Network / VPN', icon: Globe },
    { id: 'protocol', label: 'The Protocol', icon: Shield },
    { id: 'how-it-works', label: 'How It Works', icon: BookOpen },
    { id: 'strategy', label: 'Strategy Config', icon: Activity },
    { id: 'system', label: 'Rig Status', icon: Cpu },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-whale-950 text-whale-text font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r border-whale-700 flex flex-col bg-whale-900 z-20">
        <div className="p-6 border-b border-whale-700 bg-gradient-to-b from-whale-800 to-whale-900 relative overflow-hidden">
          {/* Subtle grid background for the header */}
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
          
          <div className="relative z-10 mb-1">
            <WhaleLogoFull />
          </div>
          <p className="text-[9px] text-trenchGold-500 font-mono tracking-[0.2em] pl-12 opacity-80">BLACKWELL CORE // v3.2</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 border border-transparent ${
                activeTab === item.id
                  ? 'bg-whale-800 text-trenchGold-500 border-l-trenchGold-500 border-l-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                  : 'hover:bg-whale-800 hover:text-white hover:border-whale-700'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'animate-pulse' : ''} />
              <span className={`font-medium ${activeTab === item.id ? 'font-bold' : ''}`}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer - Socials & Status */}
        <div className="p-4 bg-whale-900 border-t border-whale-700">
            {/* Social Links */}
            <div className="flex justify-between items-center mb-4 px-2">
                <a href="https://github.com/SudoSuOps" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors" title="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a href="https://discord.gg/k6uUWU7nsq" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-[#5865F2] transition-colors" title="Discord">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76C15.07 6.69 13.6 6.05 12 6c-1.6.05-3.07.69-4.24 1.76C6.11 9.42 5.6 11.53 6.31 13.64c.26.77.77 1.44 1.45 1.9.89.6 1.95.93 3.03.95 1.24 0 2.44-.37 3.44-1.07.67-.47 1.18-1.13 1.44-1.89.72-2.12.2-4.22-1.44-5.88zM9.5 13c-.83 0-1.5-.9-1.5-2s.67-2 1.5-2 1.5.9 1.5 2-.67 2-1.5 2zm5 0c-.83 0-1.5-.9-1.5-2s.67-2 1.5-2 1.5.9 1.5 2-.67 2-1.5 2z"/></svg>
                </a>
                <a href="https://twitter.com/whalecompute" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-[#1DA1F2] transition-colors" title="Twitter / X">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                </a>
                 <a href="#" className="text-slate-500 hover:text-[#FFD21E] transition-colors" title="HuggingFace">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                </a>
            </div>

            <div className="bg-gradient-to-br from-whale-800 to-whale-900 rounded-lg p-3 border border-whale-700 shadow-inner group relative overflow-hidden">
                {/* Rack animation overlay */}
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                
                <div className="flex justify-between items-center mb-2 relative z-10">
                    <span className="text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1"><BrainCircuit size={10} className="text-trenchPurple-500"/> Vault Balance</span>
                    <span className="text-xs text-emerald-400 font-bold">+2.4%</span>
                </div>
                <div className="text-xl font-bold text-white font-mono tracking-tight relative z-10">$124,592.00</div>
                <div className="w-full bg-whale-950 h-1.5 mt-2 rounded-full overflow-hidden border border-whale-700 relative z-10">
                    <div className="bg-gradient-to-r from-trenchGold-600 to-trenchGold-400 h-full w-[45%] shadow-[0_0_10px_#ffd700]"></div>
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-slate-500 font-mono relative z-10">
                    <span>LOCKED</span>
                    <span>AVAILABLE</span>
                </div>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-whale-950 p-8 relative scroll-smooth">
        {/* Grain effect overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>
        
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/4 w-1/2 h-64 bg-trenchPurple-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto min-h-screen flex flex-col">
            <div className="flex-1">
                {children}
            </div>

            {/* LEGAL FOOTER - GLOBAL ON EVERY PAGE */}
            <div className="mt-24 py-8 border-t border-whale-800 text-center opacity-60 hover:opacity-100 transition-opacity">
               <div className="flex items-center justify-center gap-2 mb-4 text-slate-600">
                   <Shield size={16} />
                   <span className="text-xs font-bold uppercase tracking-widest">Legal & Regulatory Notice</span>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                   <div>
                       <h5 className="text-[10px] font-bold text-trenchGold-600 uppercase mb-2">Non-Custodial Infrastructure</h5>
                       <p className="text-[10px] text-slate-500 leading-relaxed">
                           WhalePerp is a <strong>software and infrastructure provider</strong>. We are not a cryptocurrency exchange, broker, bank, or custodian. 
                           We do not hold client assets. We do not run orderbooks. We do not facilitate fiat on-ramps. 
                           The platform functions solely as a secure interface, intelligence engine, and routing layer.
                       </p>
                   </div>
                   <div>
                       <h5 className="text-[10px] font-bold text-trenchGold-600 uppercase mb-2">User Sovereignty</h5>
                       <p className="text-[10px] text-slate-500 leading-relaxed">
                           All trades are executed directly on third-party exchanges (e.g., Kraken, Binance) via API keys controlled exclusively by the user. 
                           Users retain full custody of their funds at all times. WhalePerp has no ability to withdraw or transfer assets.
                           Trading cryptocurrencies involves significant risk of loss.
                       </p>
                   </div>
               </div>
               <p className="mt-6 text-[9px] text-slate-700 font-mono">
                   © 2025 WHALE COMPUTE SYSTEMS LTD. | BUILT ON BASE | VERIFIED INFRASTRUCTURE
               </p>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
