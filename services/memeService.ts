import { MemeContext, MemeResponse } from '../types';

const BG_PRESETS: Record<string, { gradientFrom: string, gradientTo: string, accent: string, shape: 'RINGS' | 'PEAKS' | 'GRID' | 'CHAOS' }> = {
  WHALE_DEPTH_METAL: { gradientFrom: '#02091f', gradientTo: '#071d3b', accent: '#38bdf8', shape: 'RINGS' },
  GOAT_SUMMIT_GOLD: { gradientFrom: '#1b0b03', gradientTo: '#5b3200', accent: '#facc15', shape: 'PEAKS' },
  APE_CANDLE_FOREST: { gradientFrom: '#040f0e', gradientTo: '#064e3b', accent: '#22c55e', shape: 'CHAOS' },
  SHARK_TRENCH_ABYSS: { gradientFrom: '#020617', gradientTo: '#0f172a', accent: '#60a5fa', shape: 'RINGS' },
  TERMINAL_MONITOR_GLOW: { gradientFrom: '#000000', gradientTo: '#111827', accent: '#10b981', shape: 'GRID' },
  GPU_RACK_NEBULA: { gradientFrom: '#2e1065', gradientTo: '#000000', accent: '#c084fc', shape: 'CHAOS' },
  CASINO_RUG_ALERT: { gradientFrom: '#450a0a', gradientTo: '#000000', accent: '#f43f5e', shape: 'GRID' },
};

// Simulated LLM Response Generator (In prod, this calls your Cloudflare AI Worker with the JSON schema)
export const generateMemeJSON = async (ctx: MemeContext): Promise<MemeResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Fake think time

    // Simple heuristic to pick a "Smart" template based on input
    // This mocks the AI logic for the demo
    let style: MemeResponse['bg_style'] = 'TERMINAL_MONITOR_GLOW';
    if (ctx.persona === 'PerpGoat') style = 'GOAT_SUMMIT_GOLD';
    if (ctx.persona === 'PerpShark') style = 'SHARK_TRENCH_ABYSS';
    if (ctx.persona === 'WhaleBot') style = 'WHALE_DEPTH_METAL';
    if (ctx.pnl_pct < -20) style = 'CASINO_RUG_ALERT';
    if (ctx.context_text.toLowerCase().includes('pump')) style = 'APE_CANDLE_FOREST';

    const headlines = [
        `COMPUTE SAYS UP ONLY.`,
        `JEETS SELLING ${ctx.asset}? THANKS.`,
        `LIQUIDATION CASCADE INBOUND.`,
        `${ctx.leverage}x LEVERAGE IS A LIFESTYLE.`,
        `ALGO DETECTED WEAK HANDS.`,
        `GOD CANDLE LOADING...`,
        `YOUR STOP LOSS IS MY ENTRY.`
    ];
    
    const sublines = [
        `Nature is healing.`,
        `Argue with the metal.`,
        `Imagine selling right now.`,
        `Funding flipped. Send it.`,
        `Gpu cluster active.`,
        `Deploying capital.`
    ];

    // TRUMP MODE OVERRIDE
    if (ctx.context_text.toLowerCase().includes('trump') || ctx.context_text.toLowerCase().includes('maga')) {
        return {
            headline: `WE ARE BUILDING A HUGE WALL OF BIDS!`,
            subline: `And the Jeets are going to pay for it.`,
            tone: "MAX_DEGEN",
            risk_vibe: "PRESIDENTIAL PUMP",
            bg_style: "GOAT_SUMMIT_GOLD",
            hashtags: ["#maga", "#btc", "#pump"]
        };
    }

    return {
        headline: headlines[Math.floor(Math.random() * headlines.length)],
        subline: sublines[Math.floor(Math.random() * sublines.length)],
        tone: "MAX_DEGEN",
        risk_vibe: `${ctx.leverage}x ${ctx.side} ON ${ctx.asset}`,
        bg_style: style,
        hashtags: ["#whaleperp", "#" + ctx.asset.toLowerCase(), "#realyield"]
    };
};

export const renderMemeToCanvas = (data: MemeResponse, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const style = BG_PRESETS[data.bg_style] || BG_PRESETS['TERMINAL_MONITOR_GLOW'];

    // 1. Gradient Background
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, style.gradientFrom);
    grad.addColorStop(1, style.gradientTo);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // 2. Procedural FX Layers
    ctx.lineWidth = 2;
    ctx.strokeStyle = style.accent + '40'; // Low opacity

    if (style.shape === 'GRID') {
        for (let x = 0; x < w; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
        for (let y = 0; y < h; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    }
    
    if (style.shape === 'RINGS') {
        for(let i=0; i<5; i++) {
            ctx.beginPath();
            ctx.arc(w/2, h/2, 50 + (i*80), 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    if (style.shape === 'PEAKS') {
        ctx.beginPath();
        ctx.moveTo(0, h);
        for(let x=0; x<=w; x+=10) {
            ctx.lineTo(x, h - (Math.random() * 200));
        }
        ctx.lineTo(w, h);
        ctx.fillStyle = style.accent + '20';
        ctx.fill();
    }

    if (style.shape === 'CHAOS') {
        for(let i=0; i<20; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random()*w, Math.random()*h);
            ctx.lineTo(Math.random()*w, Math.random()*h);
            ctx.stroke();
        }
    }

    // 3. Text Rendering (Impact Style)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Headline
    ctx.font = '900 60px "Inter", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = style.accent;
    ctx.shadowBlur = 20;
    ctx.fillText(data.headline.toUpperCase(), w/2, h/2 - 20);

    // Subline
    ctx.font = 'bold 30px "Courier New", monospace';
    ctx.fillStyle = style.accent;
    ctx.shadowBlur = 0;
    ctx.fillText(data.subline, w/2, h/2 + 50);

    // 4. Footer Meta
    ctx.font = 'bold 16px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.fillText("WHALEPERP.ETH", 30, h - 30);
    
    ctx.textAlign = 'right';
    ctx.fillStyle = style.accent;
    ctx.fillText(data.risk_vibe, w - 30, h - 30);
};
