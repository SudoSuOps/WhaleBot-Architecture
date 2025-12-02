type PriceUpdateCallback = (symbol: string, price: number, volume?: number) => void;
const KRAKEN_WS_URL = 'wss://futures.kraken.com/ws/v1';
const ASSET_MAPPING: Record<string, string> = { 'PI_XBTUSD': 'BTC', 'PF_XBTUSD': 'BTC', 'PI_ETHUSD': 'ETH', 'PF_ETHUSD': 'ETH', 'PI_SOLUSD': 'SOL', 'PF_SOLUSD': 'SOL', 'PI_XRPUSD': 'XRP', 'PF_XRPUSD': 'XRP', 'PF_TAOUSD': 'TAO', 'PF_ASTRUSD': 'ASTR', 'PF_DOGEUSD': 'DOGE', 'PF_BNBUSD': 'BNB' };
export const connectToKrakenFutures = (onPriceUpdate: PriceUpdateCallback) => {
  let socket: WebSocket | null = null; let pingInterval: any;
  try {
    socket = new WebSocket(KRAKEN_WS_URL);
    socket.onopen = () => { console.log('Connected to Kraken Futures WS'); socket?.send(JSON.stringify({ event: 'subscribe', feed: 'ticker', product_ids: Object.keys(ASSET_MAPPING) })); };
    socket.onmessage = (event) => { const data = JSON.parse(event.data); if (data.feed === 'ticker' && data.product_id) { const asset = ASSET_MAPPING[data.product_id]; if (asset && data.last) onPriceUpdate(asset, data.last, data.volume || 0); } };
    socket.onerror = (error) => console.error('Kraken WS Error:', error);
    socket.onclose = () => { console.log('Kraken WS Disconnected'); clearInterval(pingInterval); };
  } catch (e) { console.error("Failed to connect to Kraken:", e); }
  return () => { if (socket) socket.close(); clearInterval(pingInterval); };
};
