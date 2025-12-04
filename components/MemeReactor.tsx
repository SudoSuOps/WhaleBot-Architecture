import React, { useState } from 'react';
import { Sparkles, Twitter, Copy, Zap, RefreshCw, Skull, Crown, Aperture, CheckCircle } from 'lucide-react';
import { generateMemeText } from '../services/memeService';
import { WhaleLogoIcon } from './BrandAssets';

const PERSONALITIES = [
    { id: 'WHALEBOT', name: 'WhaleBot', icon: <Zap size={14} className="text-diamond-500"/>, style: 'border-diamond-500/30 text-diamond-400' },
    { id: 'PERPGOAT', name: 'PerpGoat', icon: <Skull size={14} className="text-rose-500"/>, style: 'border-rose-500/30 text-rose-400' },
    { id: 'TRUMP', name: 'DONALD PUMP', icon: <Crown size={14} className="text-trenchGold-500"/>, style: 'border-trenchGold-500/30 text-trenchGold-400' },
    { id: 'PERPSHARK', name: 'PerpShark', icon: <Aperture size={14} className="text-blue-500"/>, style: 'border-blue-500/30 text-blue-400' },
];

const MemeReactor: React.FC = () => {
    const [topic, setTopic] = useState('BTC');
    const [personality, setPersonality] = useState('WHALEBOT');
    const [content, setContent] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        setIsGenerating(true);
        const text = await generateMemeText(topic, personality as any);
        setContent(text);
        setIsGenerating(false);
    };

    const handleCopy = () => {
        if (!content) return;
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleTwitter = () => {
        if (!content) return;
        const text = `${content}\n\nvia @WhalePerp 🐳`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 pb-12 pt-8">
            
            {/* HEADER */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-whale-900 rounded-xl border border-trenchGold-500/30 mb-4 shadow-[0_0_20px_rgba(255,215,0,0.1)]">
                    <Sparkles className="text-trenchGold-500" size={32} />
                </div>
                <h1 className="text-3xl font-black text-white tracking-tight mb-2">DEGEN SIGNAL GENERATOR</h1>
                <p className="text-slate-400 text-sm">Select a persona. Generate alpha. Post to the trench.</p>
            </div>

            {/* CONTROLS */}
            <div className="bg-whale-800 border border-whale-700 rounded-2xl p-6 mb-8 shadow-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {PERSONALITIES.map(p => (
                        <button 
                            key={p.id}
                            onClick={() => setPersonality(p.id)}
                            className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${personality === p.id ? `bg-whale-900 ${p.style} shadow-lg` : 'bg-whale-900/50 border-whale-700 text-slate-500 hover:text-slate-300'}`}
                        >
                            {p.icon} <span className="text-xs font-bold">{p.name}</span>
                        </button>
                    ))}
                </div>
                
                <div className="flex gap-3">
                    <input 
                        type="text" 
                        value={topic} 
                        onChange={e => setTopic(e.target.value)} 
                        className="flex-1 bg-whale-900 border border-whale-700 rounded-xl px-4 py-3 text-white focus:border-trenchGold-500 outline-none font-mono text-sm placeholder:text-slate-600 transition-colors" 
                        placeholder="TOPIC (e.g. ETH, JEETS)..." 
                    />
                    <button 
                        onClick={handleGenerate} 
                        disabled={isGenerating} 
                        className="bg-trenchGold-500 hover:bg-trenchGold-400 text-whale-900 font-black px-6 py-3 rounded-xl transition-transform active:scale-95 flex items-center gap-2 shadow-lg shadow-trenchGold-500/20"
                    >
                        {isGenerating ? <RefreshCw className="animate-spin" size={20}/> : <Zap size={20} fill="currentColor"/>} 
                        GENERATE
                    </button>
                </div>
            </div>

            {/* OUTPUT CARD */}
            {content && (
                <div className="bg-black border border-whale-700 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 group relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-trenchGold-500 via-trenchPurple-500 to-diamond-500"></div>
                    
                    <div className="p-10 text-center relative">
                        <div className="absolute top-4 right-4 opacity-30"><WhaleLogoIcon className="w-8 h-8"/></div>
                        <p className="text-2xl md:text-3xl font-black text-white leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] font-sans uppercase italic">
                            "{content}"
                        </p>
                        <p className="text-xs font-mono text-trenchGold-500 mt-6 tracking-widest opacity-70">GENERATED BY WHALEPERP.ETH</p>
                    </div>

                    <div className="bg-whale-900/80 p-4 flex gap-3 border-t border-whale-800 backdrop-blur-sm">
                        <button 
                            onClick={handleCopy} 
                            className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-whale-800 hover:bg-whale-700 text-slate-300'}`}
                        >
                            {copied ? <CheckCircle size={16}/> : <Copy size={16}/>}
                            {copied ? 'COPIED' : 'COPY'}
                        </button>
                        <button 
                            onClick={handleTwitter} 
                            className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-[#1DA1F2] hover:bg-[#1a91da] text-white shadow-lg transition-transform active:scale-95"
                        >
                            <Twitter size={16} fill="currentColor"/> POST TO X
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};
export default MemeReactor;
