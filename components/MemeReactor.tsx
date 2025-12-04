import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Image as ImageIcon, Share2, Twitter, Copy, Zap, RefreshCw, Aperture, Skull, Smile, Download, Crown, Palette, Code } from 'lucide-react';
import { generateMemeJSON, renderMemeToCanvas } from '../services/memeService';
import { Position, WhaleTransaction } from '../types';

const PERSONALITIES = [
    { id: 'WHALEBOT', name: 'WhaleBot AI', icon: <Zap size={16} className="text-diamond-500"/>, color: 'border-diamond-500/30 text-diamond-400' },
    { id: 'PERPGOAT', name: 'PerpGoat', icon: <Skull size={16} className="text-rose-500"/>, color: 'border-rose-500/30 text-rose-400' },
    { id: 'TRUMP', name: 'DONALD PUMP', icon: <Crown size={16} className="text-trenchGold-500"/>, color: 'border-trenchGold-500/30 text-trenchGold-400 bg-trenchGold-500/10' },
    { id: 'PERPSHARK', name: 'PerpShark', icon: <Aperture size={16} className="text-blue-500"/>, color: 'border-blue-500/30 text-blue-400' },
    { id: 'PERPJEET', name: 'PerpJeet', icon: <Smile size={16} className="text-emerald-500"/>, color: 'border-emerald-500/30 text-emerald-400' },
];

interface MemeReactorProps { positions?: Position[]; whaleFeed?: WhaleTransaction[]; }

const MemeReactor: React.FC<MemeReactorProps> = ({ positions = [], whaleFeed = [] }) => {
    const [topic, setTopic] = useState('BTC PUMP');
    const [personality, setPersonality] = useState('WHALEBOT');
    const [isGenerating, setIsGenerating] = useState(false);
    const [jsonContent, setJsonContent] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const handleGenerate = async (customTopic?: string) => {
        setIsGenerating(true);
        const ctx = {
            persona: personality,
            asset: 'BTC', // Dynamic in real app
            side: 'LONG',
            leverage: 10,
            pnl_pct: 25.5,
            funding: 'positive',
            context_text: customTopic || topic
        };
        
        const jsonStr = await generateMemeJSON(ctx as any);
        setJsonContent(jsonStr);
        setIsGenerating(false);
    };

    useEffect(() => {
        if (jsonContent && canvasRef.current) {
            renderMemeToCanvas(jsonContent, canvasRef.current);
        }
    }, [jsonContent]);

    const handleDownload = () => {
        if (canvasRef.current) {
            const link = document.createElement('a');
            link.download = `whaleperp-signal-${Date.now()}.png`;
            link.href = canvasRef.current.toDataURL();
            link.click();
        }
    };

    const handleTwitterShare = () => {
        const tweetText = `Incoming Signal detected on WhalePerp 🐳\n\n#WhalePerp #Alpha #JSON`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
                <div className="bg-whale-800 border border-trenchGold-500/30 rounded-xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5"><Code size={150} /></div>
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="p-2 bg-whale-900 rounded-lg border border-trenchGold-500/50 shadow-[0_0_15px_rgba(255,215,0,0.2)]"><Code className="text-trenchGold-500" size={24} /></div>
                        <div><h1 className="text-3xl font-black text-white tracking-tight leading-none">ARTIFACT GENERATOR</h1><p className="text-xs text-trenchPurple-400 font-mono tracking-widest">v1.5 // TERMINAL JSON MODE</p></div>
                    </div>

                    <div className="space-y-6 relative z-10">
                        <div><label className="text-xs text-slate-500 uppercase tracking-wider mb-3 block font-bold flex items-center gap-2"><Palette size={12}/> Select Personality Engine</label><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">{PERSONALITIES.map(p => (<button key={p.id} onClick={() => setPersonality(p.id)} className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${personality === p.id ? `bg-whale-900 ${p.color} shadow-[0_0_15px_rgba(0,0,0,0.3)] ring-1 ring-white/10` : 'bg-whale-900/50 border-whale-700 text-slate-500 hover:text-slate-300'}`}>{p.icon} <span className="text-xs font-bold">{p.name}</span></button>))}</div></div>
                        <div className="flex gap-2"><input type="text" value={topic} onChange={e => setTopic(e.target.value)} className="flex-1 bg-whale-900 border border-whale-700 rounded-lg px-4 py-3 text-white focus:border-trenchGold-500 outline-none font-mono text-sm placeholder:text-slate-600" placeholder="Enter context (e.g. ETH, TRUMP, JEETS)..." /><button onClick={() => handleGenerate()} disabled={isGenerating} className="bg-trenchGold-500 hover:bg-trenchGold-400 text-whale-900 font-bold px-6 py-3 rounded-lg transition-transform active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(255,215,0,0.3)]">{isGenerating ? <RefreshCw className="animate-spin" size={20}/> : <Zap size={20} fill="currentColor"/>} MINT JSON</button></div>
                    </div>
                </div>

                <div className={`bg-whale-900 border border-whale-700 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${jsonContent ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`}>
                    <div className="relative bg-[#1e1e1e] aspect-[16/10] flex items-center justify-center">
                        {!jsonContent && <p className="text-slate-600 font-mono text-xs animate-pulse">AWAITING INPUT DATA...</p>}
                        <canvas ref={canvasRef} width={1000} height={625} className={`w-full h-full ${!jsonContent && 'hidden'}`} />
                    </div>
                    <div className="bg-whale-800 p-4 flex justify-between items-center border-t border-whale-700">
                        <div className="flex gap-2"><button onClick={handleDownload} disabled={!jsonContent} className="p-2 bg-whale-700 hover:bg-whale-600 rounded text-slate-300 transition-colors flex items-center gap-2 text-xs font-bold px-4 border border-whale-600 disabled:opacity-50"><Download size={14}/> DOWNLOAD ARTIFACT</button></div>
                        <button onClick={handleTwitterShare} disabled={!jsonContent} className="flex items-center gap-2 bg-[#1DA1F2] hover:bg-[#1a91da] text-white px-5 py-2 rounded font-bold text-xs transition-transform active:scale-95 disabled:opacity-50 shadow-lg"><Twitter size={14} fill="currentColor"/> POST TO X</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MemeReactor;
