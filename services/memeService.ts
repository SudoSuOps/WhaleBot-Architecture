import { MemeContext, MemeResponse } from '../types';

export const generateMemeJSON = async (ctx: MemeContext): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (ctx.persona === 'TRUMP') {
        return JSON.stringify({
            "president": "DONALD J. TRUMP",
            "asset": ctx.asset,
            "status": "HUGE",
            "jeets": "DEPORTED",
            "chart": "BEAUTIFUL",
            "china_ban": false,
            "prediction": "MOON",
            "message": "WE ARE GOING TO WIN SO MUCH WITH BITCOIN YOU WILL BE TIRED OF WINNING."
        }, null, 2);
    }

    const isRekt = ctx.pnl_pct < -10;
    const isPump = ctx.side === 'LONG';
    
    const payload = {
        "timestamp": new Date().toISOString(),
        "engine": "WHALE_OS_v3.6",
        "signal_id": Math.random().toString(36).substring(7).toUpperCase(),
        "market_context": {
            "asset": ctx.asset,
            "price_action": isPump ? "PARABOLIC" : "DUMPING",
            "funding_rate": ctx.funding,
            "volatility_index": "EXTREME"
        },
        "analysis": {
            "sentiment": isRekt ? "MAX_PAIN" : "EUPHORIA",
            "weak_hands": "FLUSHED",
            "smart_money": "ACCUMULATING",
            "probability_of_god_candle": 0.98
        },
        "execution": {
            "side": ctx.side,
            "leverage": `${ctx.leverage}x`,
            "pnl_status": isRekt ? "LIQUIDATION_IMMINENT" : "PRINTING",
            "instruction": "SEND_IT"
        },
        "message": ctx.context_text.toUpperCase() || "COMPUTE SAYS UP ONLY."
    };

    return JSON.stringify(payload, null, 2);
};

export const renderMemeToCanvas = (jsonStr: string, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High-DPI Scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    const w = rect.width;
    const h = rect.height;

    // 1. Background (Deep Obsidian)
    ctx.fillStyle = '#09090b'; 
    ctx.fillRect(0, 0, w, h);

    // 2. Header Bar
    ctx.fillStyle = '#18181b';
    ctx.fillRect(0, 0, w, 44);
    // Traffic Lights
    ctx.beginPath(); ctx.arc(22, 22, 6, 0, Math.PI*2); ctx.fillStyle = '#ef4444'; ctx.fill();
    ctx.beginPath(); ctx.arc(42, 22, 6, 0, Math.PI*2); ctx.fillStyle = '#eab308'; ctx.fill();
    ctx.beginPath(); ctx.arc(62, 22, 6, 0, Math.PI*2); ctx.fillStyle = '#22c55e'; ctx.fill();
    // Title
    ctx.fillStyle = '#71717a';
    ctx.font = '600 12px "Geist Mono", monospace'; // Modern mono font preference
    ctx.textAlign = 'center';
    ctx.fillText('whale_alpha_signal.json — local — 80x24', w/2, 26);

    // 3. Syntax Highlighting
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    const fontSize = 15;
    ctx.font = `500 ${fontSize}px "Courier New", monospace`;
    
    const lines = jsonStr.split('\n');
    let y = 70;
    const x = 35;
    const lineHeight = 24;

    lines.forEach(line => {
        // Key regex: "key":
        const keyMatch = line.match(/"(.*?)":/);
        
        if (keyMatch) {
            const indent = line.search(/\S/);
            const indentStr = line.substring(0, indent);
            const keyName = keyMatch[1];
            const valText = line.substring(line.indexOf(':') + 1);

            // Draw Indent
            ctx.fillStyle = '#3f3f46'; // zinc-700 invisible char color
            ctx.fillText(indentStr, x, y);
            
            // Draw Key (Sky Blue)
            const keyX = x + ctx.measureText(indentStr).width;
            ctx.fillStyle = '#7dd3fc'; // sky-300
            ctx.fillText(`"${keyName}"`, keyX, y);
            
            // Draw Colon
            const colonX = keyX + ctx.measureText(`"${keyName}"`).width;
            ctx.fillStyle = '#a1a1aa'; // zinc-400
            ctx.fillText(':', colonX, y);

            // Draw Value
            const valX = colonX + ctx.measureText(':').width;
            const cleanVal = valText.trim().replace(/,$/, '');
            
            if (cleanVal.startsWith('"')) {
                ctx.fillStyle = '#fbbf24'; // amber-400 (String)
            } else if (cleanVal === 'true' || cleanVal === 'false') {
                ctx.fillStyle = '#f472b6'; // pink-400 (Boolean)
            } else if (!isNaN(Number(cleanVal))) {
                ctx.fillStyle = '#34d399'; // emerald-400 (Number)
            } else {
                ctx.fillStyle = '#e4e4e7'; // zinc-200
            }
            ctx.fillText(valText, valX, y);

        } else {
            // Brackets/Braces
            ctx.fillStyle = '#fbbf24'; // amber-400 for brackets
            ctx.fillText(line, x, y);
        }
        y += lineHeight;
    });

    // 4. Watermark
    ctx.fillStyle = '#27272a'; // zinc-800
    ctx.font = '900 60px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('WHALEPERP', w - 40, h - 20);
};
