type PriceUpdateCallback = (symbol: string, price: number, volume?: number) => void;
const KRAKEN_WS_URL = 'wss://futures.kraken.com/ws/v1';
const ASSET_MAPPING: Record<string, string> = { 'PI_XBTUSD': 'BTC', 'PI_ETHUSD': 'ETH', 'PI_SOLUSD': 'SOL' };

export const connectToKrakenFutures = (onPriceUpdate: PriceUpdateCallback) => {
  let socket: WebSocket | null = null;
  try {
    socket = new WebSocket(KRAKEN_WS_URL);
    socket.onopen = () => {
      console.log('Connected to Kraken Futures WS');
      socket?.send(JSON.stringify({ event: 'subscribe', feed: 'ticker', product_ids: ['PI_XBTUSD', 'PI_ETHUSD', 'PI_SOLUSD'] }));
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.feed === 'ticker' && data.product_id) {
        const asset = ASSET_MAPPING[data.product_id];
        if (asset && data.last) onPriceUpdate(asset, data.last, data.volume || 0);
      }
    };
  } catch (e) { console.error("Failed to connect to Kraken:", e); }
  return () => { if (socket) socket.close(); };
};
