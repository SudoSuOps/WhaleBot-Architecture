import React, { useState, useEffect } from 'react';
import { MacroEvent } from '../types';
import { Newspaper, TrendingUp, AlertTriangle } from 'lucide-react';

const NEWS_SOURCE = [
    { text: "FED CHAIR POWELL: 'RATES MAY NEED TO STAY HIGHER FOR LONGER'", source: 'POWELL', sentiment: 'BEARISH' },
    { text: "TRUMP ON TRUTH SOCIAL: 'BITCOIN IS AMERICAN MADE! WE ARE BUYING!'", source: 'TRUMP', sentiment: 'BULLISH' },
    { text: "ELON MUSK TWEETS: 'DOGE'", source: 'ELON', sentiment: 'BULLISH' },
    { text: "BINANCE HALTS SOLANA WITHDRAWALS DUE TO CONGESTION", source: 'EXCHANGE', sentiment: 'BEARISH' },
    { text: "MICROSTRATEGY BUYS ANOTHER 5000 BTC", source: 'NEWS', sentiment: 'BULLISH' }
];

const MacroFeed: React.FC = () => {
    const [event, setEvent] = useState<MacroEvent | null>(null);
    useEffect(() => { const interval = setInterval(() => { if (Math.random() > 0.7) { const item = NEWS_SOURCE[Math.floor(Math.random() * NEWS_SOURCE.length)]; setEvent({ id: Date.now().toString(), timestamp: Date.now(), source: item.source as any, text: item.text, impact: 'HIGH', sentiment: item.sentiment as any }); } }, 8000); return () => clearInterval(interval); }, []);
    if (!event) return null;
    return (
        <div className="bg-whale-900 border-y border-whale-700 py-2 px-4 flex items-center justify-between animate-in fade-in slide-in-from-top-2"><div className="flex items-center gap-3 overflow-hidden"><span className="bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded animate-pulse">BREAKING</span><span className="text-xs font-bold text-trenchGold-500 font-mono uppercase">{event.source}:</span><span className="text-xs text-white font-mono truncate">{event.text}</span></div><span className={`text-[10px] font-bold ${event.sentiment === 'BULLISH' ? 'text-emerald-400' : 'text-rose-400'}`}>{event.sentiment} IMPACT</span></div>
    );
};
export default MacroFeed;
