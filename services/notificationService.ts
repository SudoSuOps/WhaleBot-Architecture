import { ClosedTrade, Position } from '../types';

export const sendDiscordAlert = async (webhookUrl: string, type: 'OPEN' | 'CLOSE' | 'TP' | 'SL' | 'BOT', data: any) => {
    if (!webhookUrl) return;
    let title = ''; let color = 0; let fields = [];
    if (type === 'OPEN') {
        const pos = data as Position; title = `🐋 WHALE OPENED ${pos.type} ${pos.asset}`; color = pos.type === 'LONG' ? 0x00ff00 : 0xff0000;
        fields = [ { name: "Entry", value: `$${pos.entryPrice}`, inline: true }, { name: "Size", value: `$${pos.size} (${pos.leverage}x)`, inline: true }, { name: "Origin", value: pos.origin || 'USER', inline: true } ];
    } else {
        const trade = data as ClosedTrade; const isWin = trade.pnl >= 0; title = isWin ? `💰 SECURED THE BAG (${trade.asset})` : `🛑 REKT (${trade.asset})`; color = isWin ? 0x00ff00 : 0xff0000;
        fields = [ { name: "PnL", value: `$${trade.pnl.toFixed(2)} (${trade.pnlPercent.toFixed(2)}%)`, inline: true }, { name: "Exit Price", value: `$${trade.exitPrice}`, inline: true }, { name: "Type", value: `${trade.type} ${trade.leverage}x`, inline: true } ];
    }
    const payload = { username: "WhaleBot v3.2", avatar_url: "https://i.imgur.com/8QZ9X9r.png", embeds: [{ title: title, color: color, fields: fields, footer: { text: "WhalePerp • Diamond Fins v3 Strategy" }, timestamp: new Date().toISOString() }] };
    try { await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); } catch (e) { console.error("Discord Webhook Error", e); }
};
