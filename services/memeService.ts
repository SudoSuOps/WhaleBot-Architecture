import { WhaleLogoIcon } from '../components/BrandAssets';

const PERSONALITIES = {
    'PERPGOAT': "You are PerpGoat. Capra hircus degenerus. You love leverage. You hate jeets. You speak in capslock. Use terms: CRASHOUT, RUGGED, SEND IT.",
    'PERPSHARK': "You are PerpShark. Cold. Liquidator. You smell blood. Short sentences. Ruthless.",
    'WHALEBOT': "You are WhaleBot AI. Analytical but condescending. You see humans as liquidity.",
    'PERPJEET': "You are PerpJeet. Nervous. Paper hands. Always selling the bottom. Uses lowercase.",
    'TRUMP': "You are Donald Trump. You love Bitcoin. It's huge. China hates it. We love it. The best coin. Tremendous volume. Making crypto great again."
};

export const generateMemeText = async (topic: string, personality: keyof typeof PERSONALITIES = 'WHALEBOT'): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (personality === 'TRUMP') {
        return [
            `BITCOIN IS GOING TO THE MOON. WE HAVE THE BEST MINERS. THE BEST. JEETS ARE A DISASTER!`,
            `GARY GENSLER? A TOTAL DISASTER. WE ARE GOING TO FIRE HIM. CRYPTO IS FREE!`,
            `I SAW THE CHART. IT'S A BEAUTIFUL CHART. PERFECT HIGHS. TREMENDOUS VOL.`,
            `CHINA WANTS TO KILL BITCOIN. NOT ON MY WATCH. WE ARE BUYING ALL OF IT.`,
            `ETHEREUM? VERY SLOW. LOW ENERGY. WE LIKE BITCOIN. STRONG!`,
            `THE DOLLAR IS CRASHING. BITCOIN IS THE FUTURE. I HAVE BILLIONS IN BITCOIN.`,
        ][Math.floor(Math.random() * 6)];
    }

    const templates = [
        `JUST WATCHED A $5M LONG GET RUGGED. NATURE IS HEALING. 🐳`,
        `IMAGINE SELLING ${topic.toUpperCase()} RIGHT NOW. CRASHOUT BEHAVIOR. 💎🙌`,
        `FUNDING FLIPPED NEGATIVE. THE SQUEEZE IS IMMINENT. SEND IT. 🚀`,
        `MY GPUS ARE WARMER THAN YOUR PORTFOLIO.`,
        `JEETS SELLING ${topic.toUpperCase()}? THANKS FOR THE CHEAP COINS.`,
        `COMPUTE SAYS UP ONLY. ARGUE WITH THE METAL.`,
        `DETECTED WEAK HANDS IN THE ORDERBOOK. DEPLOYING CAPITAL.`,
        `ALTS ARE MOVING. YOUR BAGS ARE STILL HEAVY. NGMI.`,
        `STOP LOSS HUNTED. THANKS FOR THE LIQUIDITY, ANON.`,
        `MAX BIDDING THIS DIP. JEETS IN SHAMBLES.`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
};

// BROWSER-SIDE CANVAS RENDERER
export const renderMemeToCanvas = (text: string, canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // 1. Background (Deep Trench Gradient)
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#0a051e'); // Whale 900
    grad.addColorStop(1, '#02010a'); // Whale 950
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // 2. Grid Pattern (Subtle)
    ctx.strokeStyle = 'rgba(126, 34, 206, 0.1)'; // TrenchPurple low opacity
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    // 3. Abstract "Crash" Chart Line
    ctx.strokeStyle = Math.random() > 0.5 ? '#34d399' : '#fb7185'; // Green or Red
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, h/2);
    for (let x = 0; x < w; x+=20) {
        ctx.lineTo(x, h/2 + (Math.random() * 100 - 50));
    }
    ctx.stroke();

    // 4. Text Rendering (Impact Style)
    ctx.font = '900 40px "Inter", sans-serif'; // Fallback font
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Word Wrap Logic
    const words = text.split(' ');
    let line = '';
    const lines = [];
    const maxWidth = w - 80;
    const lineHeight = 50;

    for(let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    // Draw Text with Shadow
    const startY = (h - (lines.length * lineHeight)) / 2;
    lines.forEach((l, i) => {
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(l.toUpperCase(), w/2, startY + (i * lineHeight));
    });

    // 5. Watermark
    ctx.font = 'bold 14px monospace';
    ctx.fillStyle = '#ffd700'; // Gold
    ctx.shadowBlur = 0;
    ctx.fillText("WHALEPERP.ETH // MEME REACTOR v2", w - 150, h - 20);
};
