import React, { useState, useEffect, useRef } from 'react';
import { Send, Users, Hash, Crown, ShieldCheck, Radio, Zap, AlertTriangle, Flame, Hammer } from 'lucide-react';
import { ChatRoomMessage, SubscriptionTier } from '../types';

// --- CONFIGURATION ---
const MOCK_USERS = [
  { name: 'giga.whaleperp.eth', tier: 'GIGA', flair: 'GOLD_RIM' },
  { name: 'satoshi.perpjeet.eth', tier: 'FREE', flair: 'BLUE_HAMMER' },
  { name: 'alpha.perpshark.eth', tier: 'WHALE', flair: 'ABYSS' },
  { name: 'vitalik.whaleperp.eth', tier: 'GIGA', flair: 'PURPLE_FLAME' },
  { name: 'liquidated.eth', tier: 'FREE', flair: 'NONE' }
];

const CHANNELS = [
  { id: 'general', name: 'General Trench', users: 142 },
  { id: 'btc-perp', name: 'BTC War Room', users: 89 },
  { id: 'eth-perp', name: 'ETH War Room', users: 56 },
  { id: 'sol-perp', name: 'SOL Degen', users: 234 },
  { id: 'whale-alerts', name: 'Whale Signals', users: 412 }
];

const BANNED_WORDS = ["scam", "drainer", "free mint", "visit my site", "doubler"];

const WarRoom: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatRoomMessage[]>([
      { id: '1', sender: 'giga.whaleperp.eth', text: 'BTC looking heavy here at 96k', timestamp: Date.now() - 100000, tier: 'GIGA' },
      { id: '2', sender: 'WhaleBot AI', text: '🚨 ALERT: Funding Flip on ETH-PERP. Shorts paying Longs. Squeeze potential high.', timestamp: Date.now() - 90000, tier: 'GIGA', isSystem: true },
      { id: '3', sender: 'alpha.perpshark.eth', text: 'Just opened a massive short. Funding is too high.', timestamp: Date.now() - 80000, tier: 'WHALE' }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- 1. AI ASSISTANT & SIMULATION LOOP ---
  useEffect(() => {
      const interval = setInterval(() => {
          // Random User Message
          if (Math.random() > 0.7) {
              const user = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
              const texts = ["Anyone see that wick?", "Funding flip incoming", "Send it", "Rekt", "Just got liquidated lol", "Buying the dip", "Shorting this bounce", "Whale alert fired on SOL"];
              const text = texts[Math.floor(Math.random() * texts.length)];
              const newMsg: ChatRoomMessage = { id: Date.now().toString(), sender: user.name, text, timestamp: Date.now(), tier: user.tier as any };
              setMessages(prev => [...prev.slice(-49), newMsg]);
          }
          
          // AI Bot Alert (Every ~20s)
          if (Math.random() > 0.95) {
              const alerts = [
                  "⚠️ VOLATILITY SPIKE: BTC 1m vol > 2.5 sigma.",
                  "🐋 WHALE ALERT: 500 BTC moved to Coinbase inflow.",
                  "📉 LIQUIDATION: $1.2M Long liquidated on SOL @ $178.40",
                  "⚡ ORDERBOOK: Bid wall detected at $95,500 (250 BTC)."
              ];
              const alertText = alerts[Math.floor(Math.random() * alerts.length)];
              const botMsg: ChatRoomMessage = { 
                  id: `bot-${Date.now()}`, 
                  sender: 'WhaleBot AI', 
                  text: alertText, 
                  timestamp: Date.now(), 
                  tier: 'GIGA', 
                  isSystem: true 
              };
              setMessages(prev => [...prev.slice(-49), botMsg]);
          }
      }, 3500);
      return () => clearInterval(interval);
  }, []);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);

  // --- 2. AI MODERATION HANDLER ---
  const handleSend = () => {
      if (!input.trim()) return;

      // Moderation Check
      const isToxic = BANNED_WORDS.some(word => input.toLowerCase().includes(word));
      if (isToxic) {
          const blockedMsg: ChatRoomMessage = {
              id: `block-${Date.now()}`,
              sender: 'ZERO-TRUST SENTINEL',
              text: `[BLOCKED] Message content flagged by AI Safety Layer.`,
              timestamp: Date.now(),
              tier: 'GIGA',
              isSystem: true
          };
          setMessages(prev => [...prev, blockedMsg]);
          setInput('');
          return;
      }

      const newMsg: ChatRoomMessage = { id: Date.now().toString(), sender: 'YOU (giga.whaleperp.eth)', text: input, timestamp: Date.now(), tier: 'GIGA' };
      setMessages(prev => [...prev, newMsg]); 
      setInput('');
  };

  // --- 3. ENS IDENTITY FLAIR SYSTEM ---
  const renderSender = (msg: ChatRoomMessage) => {
      const user = MOCK_USERS.find(u => u.name === msg.sender);
      const flair = user ? user.flair : 'NONE';
      
      let icon = null;
      let colorClass = 'text-slate-400';
      let flairClass = '';

      if (msg.sender === 'WhaleBot AI' || msg.sender === 'ZERO-TRUST SENTINEL') {
          return <span className="text-trenchGold-500 font-black tracking-wider flex items-center gap-1"><Zap size={12} fill="currentColor"/> {msg.sender}</span>;
      }

      if (msg.sender.includes('YOU')) {
          return <span className="text-emerald-400 font-bold">{msg.sender}</span>;
      }

      switch(flair) {
          case 'PURPLE_FLAME': 
              icon = <Flame size={12} className="text-purple-500 fill-purple-500 animate-pulse"/>;
              colorClass = 'text-purple-400';
              flairClass = 'drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]';
              break;
          case 'GOLD_RIM':
              icon = <Crown size={12} className="text-yellow-500 fill-yellow-500"/>;
              colorClass = 'text-yellow-400';
              break;
          case 'ABYSS':
              icon = <ShieldCheck size={12} className="text-blue-500"/>;
              colorClass = 'text-blue-400';
              break;
          case 'BLUE_HAMMER':
              icon = <Hammer size={12} className="text-slate-500"/>;
              colorClass = 'text-slate-400';
              break;
      }

      return (
          <span className={`flex items-center gap-1.5 font-bold text-xs cursor-pointer hover:underline ${colorClass} ${flairClass}`}>
              {icon} {msg.sender}
          </span>
      );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-4">
        <div className="lg:col-span-1 bg-whale-800 border border-whale-700 rounded-xl p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-6 px-2"><Radio className="text-rose-500 animate-pulse" size={20} /><h2 className="font-bold text-white tracking-wide">LIVE FREQUENCIES</h2></div>
            <div className="space-y-1">{CHANNELS.map(channel => (<button key={channel.id} onClick={() => setActiveChannel(channel.id)} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all ${activeChannel === channel.id ? 'bg-whale-900 text-white border-l-2 border-trenchGold-500' : 'text-slate-400 hover:bg-whale-700 hover:text-slate-200'}`}><div className="flex items-center gap-3"><Hash size={14} className={activeChannel === channel.id ? 'text-trenchGold-500' : 'text-slate-600'} /><span className="font-bold">{channel.name}</span></div><span className="text-[10px] font-mono bg-black/30 px-1.5 py-0.5 rounded text-slate-500">{channel.users}</span></button>))}</div>
            <div className="mt-auto pt-6 border-t border-whale-700"><p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Online Whales</p><div className="flex -space-x-2 overflow-hidden">{[1,2,3,4,5].map(i => (<div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-whale-800 bg-gradient-to-br from-trenchPurple-500 to-blue-600"></div>))}<div className="h-8 w-8 rounded-full bg-whale-700 flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-whale-800">+142</div></div></div>
        </div>
        
        <div className="lg:col-span-3 bg-whale-900 border border-whale-700 rounded-xl flex flex-col relative overflow-hidden">
            <div className="p-4 border-b border-whale-800 flex justify-between items-center bg-whale-900/90 backdrop-blur z-10"><div className="flex items-center gap-3"><Hash size={20} className="text-slate-500" /><div><h3 className="font-bold text-white">{CHANNELS.find(c => c.id === activeChannel)?.name}</h3><p className="text-[10px] text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Live Feed</p></div></div><div className="flex items-center gap-2"><Users size={16} className="text-slate-500" /><span className="text-xs font-mono text-slate-300">1,240 Online</span></div></div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-whale-700" ref={scrollRef}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`group animate-in slide-in-from-left-2 duration-200 ${msg.isSystem ? 'bg-whale-800/50 p-3 rounded border border-whale-700/50' : ''}`}>
                        <div className="flex items-baseline gap-2 mb-1">
                            {renderSender(msg)}
                            <span className="text-[10px] text-slate-600 font-mono">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p className={`text-sm ${msg.isSystem ? 'text-trenchGold-400 font-mono' : 'text-slate-300 pl-5 group-hover:text-white transition-colors leading-relaxed'}`}>
                            {msg.isSystem && <AlertTriangle size={12} className="inline mr-2 -mt-0.5" />}
                            {msg.text}
                        </p>
                    </div>
                ))}
            </div>
            
            <div className="p-4 bg-whale-800 border-t border-whale-700"><div className="relative flex items-center gap-2"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={`Message #${activeChannel}...`} className="w-full bg-whale-900 border border-whale-600 text-white rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-trenchGold-500 transition-colors font-mono text-sm" /><button onClick={handleSend} className="absolute right-2 p-1.5 bg-trenchGold-500 text-whale-900 rounded hover:bg-trenchGold-400 transition-colors"><Send size={16} /></button></div><p className="text-[10px] text-slate-600 mt-2 text-center">Encrypted via WhalePerp Zero-Trust. Messages are ephemeral.</p></div>
        </div>
    </div>
  );
};
export default WarRoom;
