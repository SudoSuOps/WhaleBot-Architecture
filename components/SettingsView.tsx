import React, { useState } from 'react';
import { User, Wallet, Globe, Key, ShieldAlert, Save, RefreshCw, Power, Copy } from 'lucide-react';
import IdentityMint from './IdentityMint';
import { UserProfile } from '../types';

const SettingsView: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [webhook, setWebhook] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 pb-12">
      
      {/* 1. WALLET CONNECTION (The Key) */}
      <div className="bg-whale-800 border border-whale-700 rounded-xl p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
              <div className="p-3 bg-whale-900 rounded-full border border-whale-700 text-diamond-500"><Wallet size={24}/></div>
              <div>
                  <h2 className="text-lg font-bold text-white">Wallet Connection</h2>
                  <p className="text-sm text-slate-400">{walletConnected ? '0x71C...9A23' : 'Connect your EVM wallet to access features.'}</p>
              </div>
          </div>
          <button onClick={() => setWalletConnected(!walletConnected)} className={`px-6 py-2 rounded-lg font-bold border transition-all ${walletConnected ? 'bg-whale-900 text-rose-400 border-rose-500/30 hover:bg-rose-900/20' : 'bg-diamond-500 text-whale-900 border-diamond-400 hover:bg-diamond-400'}`}>{walletConnected ? 'DISCONNECT' : 'CONNECT WALLET'}</button>
      </div>

      {/* 2. IDENTITY MINTING (Only if connected, or show locked state) */}
      {walletConnected ? (
          profile ? (
              <div className="bg-gradient-to-r from-whale-800 to-whale-900 border border-trenchGold-500/50 rounded-xl p-8 text-center relative overflow-hidden"><div className="absolute top-0 left-0 w-full h-1 bg-trenchGold-500"></div><div className="w-20 h-20 bg-whale-950 rounded-full mx-auto mb-4 border-2 border-trenchGold-500 flex items-center justify-center text-3xl">🐳</div><h2 className="text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-trenchGold-400 to-yellow-200">{profile.handle}</h2><p className="text-sm text-emerald-400 font-bold mt-2 flex items-center justify-center gap-2"><ShieldCheck size={16}/> VERIFIED IDENTITY</p><div className="mt-6 flex justify-center gap-4"><button className="text-xs text-slate-400 hover:text-white flex items-center gap-1"><Copy size={12}/> Copy Handle</button><button className="text-xs text-slate-400 hover:text-white flex items-center gap-1"><Globe size={12}/> View on ENS</button></div></div>
          ) : ( <IdentityMint onMintComplete={setProfile} /> )
      ) : (
          <div className="bg-whale-900/50 border border-dashed border-whale-700 rounded-xl p-8 text-center opacity-50"><p className="text-slate-400">Connect Wallet to Unlock Identity Minting</p></div>
      )}

      {/* 3. API KEYS VAULT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="bg-whale-800 border border-whale-700 rounded-xl p-6"><h3 className="text-white font-bold mb-4 flex items-center gap-2"><Key size={18} className="text-trenchPurple-500"/> API VAULT</h3><div className="space-y-3"><div className="flex justify-between items-center bg-whale-900 p-3 rounded border border-whale-700"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-sm text-white">Kraken Futures</span></div><button className="text-[10px] text-rose-400 hover:underline">REVOKE</button></div><div className="flex justify-between items-center bg-whale-900 p-3 rounded border border-whale-700 opacity-50"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-600"></div><span className="text-sm text-slate-400">Binance</span></div><button className="text-[10px] text-trenchGold-500 hover:underline">CONNECT</button></div></div></div><div className="bg-whale-800 border border-whale-700 rounded-xl p-6"><h3 className="text-white font-bold mb-4 flex items-center gap-2"><Save size={18} className="text-blue-500"/> INTEGRATIONS</h3><label className="text-xs text-slate-400 block mb-2">Discord Webhook</label><input type="text" value={webhook} onChange={e=>setWebhook(e.target.value)} className="w-full bg-whale-900 border border-whale-700 rounded p-2 text-white text-sm mb-2 focus:border-blue-500 outline-none" placeholder="https://discord.com/api/webhooks/..." /><button className="bg-whale-700 hover:bg-whale-600 text-white px-4 py-2 rounded text-xs font-bold transition-colors w-full">SEND TEST ALERT</button></div></div>
    </div>
  );
};
export default SettingsView;
