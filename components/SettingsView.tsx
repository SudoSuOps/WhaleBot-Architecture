
import React, { useState } from 'react';
import { User, Wallet, Globe, Key, ShieldAlert, Save, RefreshCw } from 'lucide-react';

const SettingsView: React.FC = () => {
  const [subdomain, setSubdomain] = useState('giga');
  const [walletAddress, setWalletAddress] = useState('0x71C...9A23');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
          <div>
              <h2 className="text-2xl font-bold text-white">Client Identity</h2>
              <p className="text-slate-400 text-sm">Manage your decentralized presence and trading preferences.</p>
          </div>
          <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-emerald-400 text-xs font-bold">NODE ACTIVE</span>
          </div>
      </div>

      {/* WHALEPERP IDENTITY */}
      <div className="bg-whale-800 border border-trenchGold-500/30 rounded-xl p-6 shadow-[0_0_30px_rgba(255,215,0,0.05)]">
        <div className="flex items-center gap-3 mb-6 border-b border-whale-700 pb-4">
            <Globe className="text-trenchGold-500" />
            <h3 className="text-lg font-bold text-white">WhalePerp Subdomain</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">Claim your handle</label>
                <div className="flex items-center">
                    <input 
                        type="text" 
                        value={subdomain}
                        onChange={(e) => setSubdomain(e.target.value)}
                        disabled={!isEditing}
                        className="bg-whale-900 border border-whale-700 text-white p-3 rounded-l-lg w-full focus:outline-none focus:border-trenchGold-500 font-mono text-right"
                    />
                    <div className="bg-whale-700 border border-whale-700 border-l-0 text-slate-300 p-3 rounded-r-lg font-mono">
                        .whaleperp.eth
                    </div>
                </div>
                <p className="text-xs text-trenchGold-500 mt-2 flex items-center gap-1">
                    <ShieldAlert size={12}/> {subdomain}.whaleperp.eth is available to mint.
                </p>
            </div>
            
            <div className="flex items-end">
                {isEditing ? (
                    <button 
                        onClick={() => setIsEditing(false)}
                        className="w-full bg-trenchGold-500 hover:bg-trenchGold-400 text-whale-900 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <Save size={18} /> Mint Identity
                    </button>
                ) : (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-whale-700 hover:bg-whale-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors border border-whale-600"
                    >
                        <RefreshCw size={18} /> Change Handle
                    </button>
                )}
            </div>
        </div>
      </div>

      {/* WALLET & EXCHANGES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Wallet Connection */}
          <div className="bg-whale-800 border border-whale-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
                <Wallet className="text-diamond-500" />
                <h3 className="text-lg font-bold text-white">Connected Wallet</h3>
            </div>
            <div className="bg-whale-900 p-4 rounded-lg border border-whale-700 flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                    <div>
                        <p className="text-white font-mono text-sm">{walletAddress}</p>
                        <p className="text-xs text-slate-500">Base Network</p>
                    </div>
                </div>
                <button className="text-xs text-rose-400 hover:text-rose-300">Disconnect</button>
            </div>
            <button className="w-full border border-whale-600 text-slate-300 py-2 rounded hover:bg-whale-700 transition-colors text-sm">
                View On-Chain Assets
            </button>
          </div>

          {/* API Keys */}
          <div className="bg-whale-800 border border-whale-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
                <Key className="text-trenchPurple-500" />
                <h3 className="text-lg font-bold text-white">Exchange APIs</h3>
            </div>
            <div className="space-y-3">
                <div className="flex items-center justify-between bg-whale-900 p-3 rounded border border-whale-700">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-sm text-white">Kraken Futures</span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Read/Write</span>
                </div>
                <div className="flex items-center justify-between bg-whale-900 p-3 rounded border border-whale-700 opacity-50">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                        <span className="text-sm text-slate-400">Binance</span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Disconnected</span>
                </div>
            </div>
             <button className="w-full mt-4 border border-dashed border-whale-600 text-slate-400 py-2 rounded hover:border-trenchPurple-500 hover:text-trenchPurple-400 transition-colors text-sm">
                + Add Exchange Key
            </button>
          </div>
      </div>

      {/* DANGER ZONE */}
      <div className="border border-rose-900/30 bg-rose-950/10 rounded-xl p-6">
          <h3 className="text-rose-500 font-bold mb-2 flex items-center gap-2"><ShieldAlert size={18}/> Emergency Controls</h3>
          <p className="text-xs text-rose-400/70 mb-4">
              These actions are irreversible and will execute directly on the smart contract.
          </p>
          <div className="flex gap-4">
              <button className="bg-rose-900/50 hover:bg-rose-900 text-rose-200 px-4 py-2 rounded text-sm border border-rose-800 transition-colors font-bold">
                  REVOKE ALL APPROVALS
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-bold shadow-[0_0_15px_rgba(220,38,38,0.4)] animate-pulse">
                  PANIC CLOSE ALL POSITIONS
              </button>
          </div>
      </div>
    </div>
  );
};

export default SettingsView;
