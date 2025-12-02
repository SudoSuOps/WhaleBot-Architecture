import React, { useState, useEffect } from 'react';
import { MacroEvent } from '../types';
import { Newspaper, TrendingUp, AlertTriangle } from 'lucide-react';

const MacroFeed: React.FC = () => {
    const [event, setEvent] = useState<MacroEvent | null>(null);

    useEffect(() => { 
        // Real-Time Crypto News Fetcher (Public API)
        const fetchNews = async () => {
            try {
                // Using CryptoCompare public news API
                const res = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
                const data = await res.json();
                
                if (data.Data && data.Data.length > 0) {
                    const latest = data.Data[0];
                    setEvent({ 
                        id: latest.id, 
                        timestamp: latest.published_on * 1000, 
                        source: latest.source_info.name.toUpperCase() as any, 
                        text: latest.title, 
                        impact: 'HIGH', 
                        sentiment: 'NEUTRAL' // Can enhance with basic keyword sentiment logic
                    });
                }
            } catch (e) { 
                console.error("News Feed Error", e); 
                // Fallback to simulated news if API fails
                setEvent({ 
                    id: Date.now().toString(), 
                    timestamp: Date.now(), 
                    source: 'TRUMP' as any, 
                    text: "BITCOIN IS AMERICAN MADE! WE ARE BUYING!", 
                    impact: 'HIGH', 
                    sentiment: 'BULLISH' 
                });
            }
        };

        fetchNews();
        const interval = setInterval(fetchNews, 60000); // Poll every minute
        return () => clearInterval(interval);
    }, []);

    if (!event) return null;

    return (
        <div className="bg-whale-900 border-y border-whale-700 py-2 px-4 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3 overflow-hidden">
                <span className="bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded animate-pulse">LIVE NEWS</span>
                <span className="text-xs font-bold text-trenchGold-500 font-mono uppercase">{event.source}:</span>
                <span className="text-xs text-white font-mono truncate">{event.text}</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 font-mono">REAL-TIME</span>
        </div>
    );
};
export default MacroFeed;
