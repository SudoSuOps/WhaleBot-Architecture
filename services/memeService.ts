import { MemeContext, MemeResponse } from '../types';

export const generateMemeJSON = async (ctx: MemeContext): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    // TRUMP MODE (Special JSON)
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

    // STANDARD TRENCH JSON
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

// RENDERER: Draws the JSON string onto a Canvas looking like a VS Code / Terminal window
export const renderMemeToCanvas = (jsonStr: string, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;

    // 1. Background (VS Code Dark)
    ctx.fillStyle = '#1e1e1e'; 
    ctx.fillRect(0, 0, w, h);

    // 2. Header Bar (Mac Style)
    ctx.fillStyle = '#252526';
    ctx.fillRect(0, 0, w, 40);
    // Traffic Lights
    ctx.beginPath(); ctx.arc(20, 20, 6, 0, Math.PI*2); ctx.fillStyle = '#ff5f56'; ctx.fill();
    ctx.beginPath(); ctx.arc(40, 20, 6, 0, Math.PI*2); ctx.fillStyle = '#ffbd2e'; ctx.fill();
    ctx.beginPath(); ctx.arc(60, 20, 6, 0, Math.PI*2); ctx.fillStyle = '#27c93f'; ctx.fill();
    // Title
    ctx.fillStyle = '#cccccc';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('whale_alpha_signal.json — -bash — 80x24', w/2, 24);

    // 3. JSON Syntax Highlighting Logic
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    const fontSize = 20; // Bigger font for readability
    ctx.font = `bold ${fontSize}px "Courier New", monospace`;
    
    const lines = jsonStr.split('\n');
    let y = 60;
    const x = 30;
    const lineHeight = 28;

    lines.forEach(line => {
        // Simple syntax coloring regex
        // Keys (orange), Strings (green), Numbers (blue), Booleans (purple)
        
        // Draw Key (e.g. "timestamp":)
        const keyMatch = line.match(/"(.*?)":/);
        if (keyMatch) {
            const keyText = keyMatch[0];
            const valText = line.substring(line.indexOf(':') + 1);
            
            const indent = line.search(/\S/);
            const indentStr = line.substring(0, indent);
            
            // Indent
            ctx.fillStyle = '#d4d4d4';
            ctx.fillText(indentStr, x, y);
            
            // Key (Blue/Light Blue like VS Code)
            ctx.fillStyle = '#9cdcfe';
            const keyWidth = ctx.measureText(indentStr).width;
            ctx.fillText(keyMatch[1], x + keyWidth + ctx.measureText('"').width, y); // key name
            ctx.fillStyle = '#d4d4d4'; // quotes & colon
            ctx.fillText('":', x + keyWidth + ctx.measureText('"' + keyMatch[1]).width, y);
            ctx.fillText('"', x + keyWidth, y);

            // Value Parsing
            const valX = x + ctx.measureText(indentStr + keyText + ' ').width;
            const cleanVal = valText.trim().replace(/,$/, '');
            
            if (cleanVal.startsWith('"')) {
                ctx.fillStyle = '#ce9178'; // String (Orange/Red)
            } else if (cleanVal === 'true' || cleanVal === 'false') {
                ctx.fillStyle = '#569cd6'; // Boolean (Blue)
            } else if (!isNaN(Number(cleanVal))) {
                ctx.fillStyle = '#b5cea8'; // Number (Green)
            } else {
                ctx.fillStyle = '#d4d4d4'; // Default
            }
            ctx.fillText(valText.trim(), valX, y);

        } else {
            // Brackets / Plain text
            ctx.fillStyle = '#d7ba7d'; // Brackets (Yellowish)
            ctx.fillText(line, x, y);
        }
        
        y += lineHeight;
    });

    // 4. Watermark
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('WHALEPERP.ETH', w - 30, h - 30);
};
