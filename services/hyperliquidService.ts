type PriceUpdateCallback = (symbol: string, price: number, volume?: number) => void;
const HL_WS_URL = 'wss://api.hyperliquid.xyz/ws';
const ASSET_MAPPING: Record<string, string> = { 'BTC': 'BTC', 'ETH': 'ETH', 'SOL': 'SOL', 'XRP': 'XRP', 'TAO': 'TAO', 'DOGE': 'DOGE', 'BNB': 'BNB', 'PURR/USDC': 'ASTR', 'ASTR': 'ASTR', 'ASTER': 'ASTR' };
export const connectToHyperliquid = (onPriceUpdate: PriceUpdateCallback) => {
  let socket: WebSocket | null = null; let pingInterval: any;
  try {
    socket = new WebSocket(HL_WS_URL);
    socket.onopen = () => { console.log('Connected to Hyperliquid L1 WS'); socket?.send(JSON.stringify({ method: "subscribe", subscription: { type: "allMids" } })); pingInterval = setInterval(() => { if (socket?.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ method: "ping" })); }, 50000); };
    socket.onmessage = (event) => { const msg = JSON.parse(event.data); if (msg.channel === 'allMids') { const mids = msg.data.mids; Object.keys(ASSET_MAPPING).forEach(hlTicker => { if (mids[hlTicker]) { const assetId = ASSET_MAPPING[hlTicker]; let price = parseFloat(mids[hlTicker]); if (assetId === 'ASTR' && price > 10) price = price / 1000; onPriceUpdate(assetId, price, Math.random() * 50); } }); } };
    socket.onerror = (error) => console.error('Hyperliquid WS Error:', error);
    socket.onclose = () => { console.log('Hyperliquid WS Disconnected'); clearInterval(pingInterval); };
  } catch (e) { console.error("Failed to connect to Hyperliquid:", e); }
  return () => { if (socket) socket.close(); clearInterval(pingInterval); };
};
