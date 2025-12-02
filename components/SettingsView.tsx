import React, { useState } from 'react';
import { User, Wallet, Globe, Key, ShieldAlert, Save, RefreshCw } from 'lucide-react';
import IdentityMint from './IdentityMint';
import { UserProfile } from '../types';

const SettingsView: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [webhook, setWebhook] = useState('');

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between mb-8"><div><h2 className="text-2xl font-bold text-white">Client Identity</h2><p className="text-slate-400 text-sm">Manage your decentralized presence and trading preferences.</p></div><div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><span className="text-emerald-400 text-xs font-bold">NODE ACTIVE</span></div></div>
      <IdentityMint onMintComplete={setProfile} />
      {profile && <div className="bg-emerald-900/10 border border-emerald-500/30 p-4 rounded-xl text-center"><p className="text-emerald-400 font-mono text-lg">ACTIVE IDENTITY: {profile.handle}</p></div>}
      <div className="bg-whale-800 border border-whale-700 rounded-xl p-6"><h3 className="text-lg font-bold text-white mb-4">Integrations</h3><label className="text-xs text-slate-400 block mb-2">Discord Webhook</label><input type="text" value={webhook} onChange={e=>setWebhook(e.target.value)} className="w-full bg-whale-900 border border-whale-700 rounded p-2 text-white mb-2" placeholder="https://discord.com/api/webhooks/..." /><button className="bg-whale-700 text-white px-4 py-2 rounded text-xs font-bold">TEST ALERT</button></div>
    </div>
  );
};
export default SettingsView;
