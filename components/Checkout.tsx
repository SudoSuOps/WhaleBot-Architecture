import React, { useState } from 'react';
import { UserProfile } from '../types';
import IdentityMint from './IdentityMint';
import { ShieldCheck, Server, Lock } from 'lucide-react';

interface CheckoutProps { onComplete: (profile: UserProfile) => void; }

const Checkout: React.FC<CheckoutProps> = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    return (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-whale-900 border border-whale-700 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 bg-whale-800 p-6 flex flex-col justify-between border-r border-whale-700">
                    <div>
                        <h2 className="text-2xl font-black text-white mb-2">ACCESS REQUIRED</h2>
                        <p className="text-xs text-slate-400 mb-6">WhaleBot v3.2 requires an active identity signature.</p>
                        <ul className="space-y-3">
                            <li className="flex gap-2 text-xs text-slate-300"><Server size={14} className="text-trenchGold-500"/> 6x 5090 Cluster Access</li>
                            <li className="flex gap-2 text-xs text-slate-300"><ShieldCheck size={14} className="text-emerald-500"/> Zero-Trust Tunnel</li>
                            <li className="flex gap-2 text-xs text-slate-300"><Lock size={14} className="text-rose-500"/> Local Key Custody</li>
                        </ul>
                    </div>
                    <div className="mt-8 pt-4 border-t border-whale-700"><p className="text-[10px] text-slate-500 font-mono">STEP {step} / 2</p></div>
                </div>
                <div className="w-full md:w-2/3 p-8 bg-black/50">
                    {step === 1 ? (
                        <div className="animate-in fade-in slide-in-from-right">
                            <h3 className="text-xl font-bold text-white mb-4">Mint Your Access Pass</h3>
                            <p className="text-sm text-slate-400 mb-6">Create your on-chain identity to unlock the dashboard features. Basic tier is free forever.</p>
                            <IdentityMint onMintComplete={(p) => { setProfile(p); setStep(2); }} />
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-right text-center">
                            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400"><ShieldCheck size={32}/></div>
                            <h3 className="text-2xl font-bold text-white mb-2">Access Granted</h3>
                            <p className="text-slate-400 mb-6">Welcome, <span className="text-emerald-400 font-mono font-bold">{profile?.handle}</span>. The rig is yours.</p>
                            <button onClick={() => profile && onComplete(profile)} className="bg-trenchGold-500 hover:bg-trenchGold-400 text-whale-900 font-bold px-8 py-3 rounded-lg transition-transform hover:scale-105">ENTER DASHBOARD</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Checkout;
