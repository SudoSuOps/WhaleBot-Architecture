import React, { useState, useEffect } from 'react';
import { Brain, Zap, TrendingUp } from 'lucide-react';
import { positionService } from './services/positionService';
import { WHALE_CONFIG } from './constants';

function App() {
  const [userId] = useState('demo-user-' + Math.random().toString(36).substr(2, 9));
  const [positions, setPositions] = useState<any[]>([]);
  const [vault, setVault] = useState({ balance: 1000000, initial: 1000000 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [posData, vaultData] = await Promise.all([
        positionService.loadPositions(userId),
        positionService.loadVault(userId)
      ]);
      setPositions(posData);
      setVault(vaultData);
      setLoading(false);
    };
    loadData();
  }, [userId]);

  const handleCreatePosition = async () => {
    const newPos = {
      asset: 'BTC',
      type: 'LONG',
      entryPrice: 96000,
      currentPrice: 96000,
      size: 10000,
      leverage: 10,
      pnl: 0,
      pnlPercent: 0
    };
    
    try {
      const result = await positionService.createPosition(userId, newPos);
      if (result.success) {
        setPositions([result.position, ...positions]);
      }
    } catch (error) {
      console.error('Failed to create position:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-whale-950 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-diamond-500 animate-pulse mx-auto mb-4" />
          <p className="text-white font-mono">Loading WhalePerp V2...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-whale-950 text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Zap className="w-10 h-10 text-trenchGold-500" />
            <div>
              <h1 className="text-3xl font-black tracking-tight">
                WHALE<span className="text-diamond-500">PERP</span> <span className="text-trenchGold-500">V2</span>
              </h1>
              <p className="text-xs text-slate-500 font-mono">{WHALE_CONFIG.codename}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase">Vault Balance</p>
            <p className="text-2xl font-bold font-mono">${vault.balance.toLocaleString()}</p>
            <p className="text-xs text-emerald-400">
              +{(((vault.balance - vault.initial) / vault.initial) * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Positions Panel */}
          <div className="bg-whale-900 border border-whale-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Active Positions</h2>
              <button
                onClick={handleCreatePosition}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-whale-900 font-bold rounded-lg transition-colors flex items-center gap-2"
              >
                <TrendingUp size={16} />
                Open Long
              </button>
            </div>
            
            {positions.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <p>No active positions</p>
                <p className="text-xs mt-2">Click "Open Long" to test the Durable Objects backend</p>
              </div>
            ) : (
              <div className="space-y-3">
                {positions.map((pos) => (
                  <div key={pos.id} className="bg-whale-950 p-4 rounded-lg border border-whale-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-lg">{pos.asset}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            pos.type === 'LONG' 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : 'bg-rose-500/20 text-rose-400'
                          }`}>
                            {pos.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Entry: ${pos.entryPrice.toLocaleString()} • 
                          Size: ${pos.size.toLocaleString()} • 
                          {pos.leverage}x
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-mono font-bold text-emerald-400">
                          +$0.00
                        </p>
                        <p className="text-xs text-slate-500">0.00%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="bg-whale-900 border border-whale-700 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">WhalePerp V2 Features</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5"></div>
                <div>
                  <p className="font-bold text-white">Cloudflare Durable Objects</p>
                  <p className="text-slate-400">Persistent position state with zero downtime</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-trenchPurple-500 mt-1.5"></div>
                <div>
                  <p className="font-bold text-white">Multi-Tenant Architecture</p>
                  <p className="text-slate-400">Isolated user instances with rate limiting</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-diamond-500 mt-1.5"></div>
                <div>
                  <p className="font-bold text-white">WebSocket Community Chat</p>
                  <p className="text-slate-400">Real-time chat rooms with whale verification</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-trenchGold-500 mt-1.5"></div>
                <div>
                  <p className="font-bold text-white">Workers AI Integration</p>
                  <p className="text-slate-400">Edge inference with Mistral-7B</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-whale-950 rounded-lg border border-whale-800">
              <p className="text-xs font-mono text-slate-500 mb-2">User ID:</p>
              <p className="text-xs font-mono text-trenchGold-500 break-all">{userId}</p>
            </div>

            <div className="mt-4 p-4 bg-emerald-900/10 border border-emerald-500/30 rounded-lg">
              <p className="text-xs text-emerald-400 font-bold mb-1">✓ Backend Connected</p>
              <p className="text-xs text-slate-400">
                Your positions are persisted in Cloudflare Durable Objects
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
