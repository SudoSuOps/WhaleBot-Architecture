import React, { useState } from 'react';
import { WHALE_CONFIG } from '../constants';
import { checkDomainAvailability, mintSubdomain } from '../services/ensService';
import { Globe, Search, Loader2, CheckCircle, XCircle, Zap } from 'lucide-react';
import { UserProfile } from '../types';

interface IdentityMintProps { onMintComplete: (profile: UserProfile) => void; }

const IdentityMint: React.FC<IdentityMintProps> = ({ onMintComplete }) => {
    const [handle, setHandle] = useState('');
    const [selectedRoot, setSelectedRoot] = useState(WHALE_CONFIG.domains.available[0]);
    const [status, setStatus] = useState<'IDLE'|'CHECKING'|'AVAILABLE'|'TAKEN'|'MINTING'>('IDLE');

    const handleCheck = async () => { if (!handle) return; setStatus('CHECKING'); const isFree = await checkDomainAvailability(handle, selectedRoot); setStatus(isFree ? 'AVAILABLE' : 'TAKEN'); };
    const handleMint = async () => { setStatus('MINTING'); const profile = await mintSubdomain(handle, selectedRoot, "0xUserWallet"); onMintComplete(profile); };
    const cost = (WHALE_CONFIG.domains.costs as any)[selectedRoot];

    return (
        <div className="bg-whale-800 border border-trenchGold-500/30 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Globe size={120} /></div>
            <h3 className="text-lg font-bold text-white mb-4 relative z-10">MINT IDENTITY</h3>
            <div className="space-y-4 relative z-10">
                <div className="flex gap-2"><select value={selectedRoot} onChange={e=>setSelectedRoot(e.target.value)} className="bg-whale-900 border border-whale-700 text-white text-sm rounded-lg p-2.5 focus:border-trenchGold-500 outline-none">{WHALE_CONFIG.domains.available.map(d => <option key={d} value={d}>{d}</option>)}</select><div className="flex-1 relative"><input type="text" value={handle} onChange={e=>setHandle(e.target.value)} placeholder="your-handle" className="w-full bg-whale-900 border border-whale-700 text-white text-sm rounded-lg pl-4 pr-10 py-2.5 focus:border-trenchGold-500 outline-none font-mono" /><button onClick={handleCheck} className="absolute right-2 top-2 text-slate-400 hover:text-white"><Search size={16}/></button></div></div>
                {status === 'CHECKING' && <div className="text-xs text-trenchGold-500 flex items-center gap-2"><Loader2 size={12} className="animate-spin"/> Verifying on L2 Registry...</div>}
                {status === 'TAKEN' && <div className="text-xs text-rose-500 flex items-center gap-2"><XCircle size={12}/> Handle taken. Try another.</div>}
                {status === 'AVAILABLE' && (<div className="bg-emerald-900/10 border border-emerald-500/30 rounded-lg p-4 animate-in fade-in slide-in-from-top-2"><div className="flex justify-between items-center mb-3"><span className="text-emerald-400 font-mono font-bold text-lg">{handle}.{selectedRoot}</span><span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded flex items-center gap-1"><CheckCircle size={10}/> AVAILABLE</span></div><div className="flex justify-between items-center border-t border-emerald-500/20 pt-3"><span className="text-xs text-slate-400">Minting Fee (Gasless)</span><span className="text-white font-bold">{cost === 0 ? 'FREE' : `$${cost} USDC`}</span></div><button onClick={handleMint} className="w-full mt-3 bg-emerald-500 hover:bg-emerald-400 text-whale-900 font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">{status === 'MINTING' ? <Loader2 className="animate-spin"/> : <Zap size={16} fill="currentColor"/>}{cost === 0 ? 'CLAIM FREE HANDLE' : 'MINT NOW'}</button></div>)}
            </div>
        </div>
    );
};
export default IdentityMint;
