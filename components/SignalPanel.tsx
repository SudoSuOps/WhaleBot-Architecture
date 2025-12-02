
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, SystemStatus } from '../types';
import { Brain, Send, Terminal } from 'lucide-react';
import { queryWhaleBot } from '../services/aiService';

interface SignalPanelProps {
  prices: Record<string, number>;
  selectedAsset: string;
  systemStatus: SystemStatus;
}

const SignalPanel: React.FC<SignalPanelProps> = ({ prices, selectedAsset, systemStatus }) => {
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
      { id: 'init', role: 'bot', text: `WhaleBot v3.2 Online. Connected to 6x RTX 5090 Cluster.\nMonitoring ${selectedAsset} real-time data feeds.\nHow can I assist your execution?`, timestamp: Date.now() }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
      if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
  }, [messages, isThinking]);

  const handleSend = async (text: string = input) => {
      if (!text.trim() || isThinking) return;

      const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: text, timestamp: Date.now() };
      setMessages(prev => [...prev, userMsg]);
      setInput('');
      setIsThinking(true);

      try {
          // Query the local AI service with full context (All Prices + System Stats)
          const responseText = await queryWhaleBot(text, systemStatus, prices, selectedAsset);
          
          const botMsg: ChatMessage = { 
              id: (Date.now() + 1).toString(), 
              role: 'bot', 
              text: responseText, 
              timestamp: Date.now() 
          };
          setMessages(prev => [...prev, botMsg]);
      } catch (e) {
          const errorMsg: ChatMessage = { id: Date.now().toString(), role: 'bot', text: "Error: Inference Engine Timeout.", timestamp: Date.now() };
          setMessages(prev => [...prev, errorMsg]);
      } finally {
          setIsThinking(false);
      }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
      }
  };

  const promptChips = [
      "Analyze Quant Score",
      "Check Whale Flows",
      "Risk Assessment",
      "Price Prediction"
  ];

  return (
    <div className="bg-whale-800 border border-whale-700 rounded-xl overflow-hidden shadow-lg shadow-black/20 flex flex-col h-[500px]">
      {/* Header */}
      <div className="p-4 border-b border-whale-700 flex justify-between items-center bg-whale-800/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Brain className="text-diamond-500" size={20} />
          <h2 className="font-bold text-slate-100 tracking-wide">AI ANALYST CORE</h2>
        </div>
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-whale-900 rounded border border-whale-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] text-slate-400 font-mono">MISTRAL-7B</span>
            </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 bg-whale-950 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-whale-700" ref={scrollRef}>
          {messages.map((msg) => (
              <div key={msg.id} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed font-mono ${
                      msg.role === 'user' 
                      ? 'bg-whale-800 border border-whale-700 text-slate-200' 
                      : 'bg-transparent text-trenchGold-400/90'
                  }`}>
                      {msg.role === 'bot' && <span className="mr-2 text-diamond-500 opacity-50">{'>'}</span>}
                      {msg.role === 'bot' ? (
                          <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<b class="text-white">$1</b>').replace(/\n/g, '<br/>') }} />
                      ) : (
                          msg.text
                      )}
                  </div>
              </div>
          ))}
          {isThinking && (
              <div className="flex items-center gap-2 text-trenchPurple-500/50 text-xs font-mono animate-pulse pl-2">
                  <Brain size={12} />
                  <span>Processing context vectors...</span>
              </div>
          )}
      </div>

      {/* Quick Chips */}
      <div className="px-4 py-2 bg-whale-900 border-t border-whale-800 flex gap-2 overflow-x-auto scrollbar-hide">
          {promptChips.map(chip => (
              <button 
                key={chip} 
                onClick={() => handleSend(chip)}
                className="flex-shrink-0 px-3 py-1 bg-whale-800 hover:bg-whale-700 border border-whale-700 hover:border-diamond-500/30 rounded-full text-[10px] text-slate-400 hover:text-diamond-400 transition-all whitespace-nowrap"
              >
                  {chip}
              </button>
          ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-whale-900 border-t border-whale-700">
          <div className="flex gap-2 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Terminal size={14} className="text-slate-500" />
              </div>
              <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask the Whale..."
                  disabled={isThinking}
                  className="w-full bg-whale-800 border border-whale-700 text-slate-200 text-sm rounded-lg pl-9 pr-10 py-2.5 focus:outline-none focus:border-diamond-500/50 focus:ring-1 focus:ring-diamond-500/20 font-mono placeholder:text-slate-600"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isThinking}
                className="absolute inset-y-0 right-0 pr-2 flex items-center text-diamond-500 hover:text-white disabled:opacity-30 disabled:hover:text-diamond-500 transition-colors"
              >
                  <Send size={16} />
              </button>
          </div>
      </div>
    </div>
  );
};

export default SignalPanel;
