import { MacroEvent, WhaleTransaction } from '../types';

const PERSONALITIES = {
    'PERPGOAT': "You are PerpGoat, a chaotic degenerate trader who loves leverage and hates 'jeets'. Use caps lock, emojis, and slang like 'rekt', 'alpha', 'wagmi'.",
    'PERPSHARK': "You are PerpShark, a cold, calculating predator. You eat liquidity. You mock weak hands. Short sentences. Ruthless.",
    'WHALEBOT': "You are WhaleBot, a dry, sarcastic AI running on 5090s. You find human trading errors amusingly inefficient.",
    'PERPJEET': "You are PerpJeet, constantly scared, selling the bottom, buying the top. Panic mode always."
};

export const generateMemeText = async (topic: string, personality: keyof typeof PERSONALITIES = 'WHALEBOT'): Promise<string> => {
    // Simulate AI delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const templates = [
        `JUST WATCHED A $5M LONG GET LIQUIDATED. NATURE IS HEALING. 🐳`,
        `IMAGINE SELLING ${topic.toUpperCase()} RIGHT NOW. COULDN'T BE ME. 💎🙌`,
        `FUNDING FLIPPED NEGATIVE. THE SQUEEZE IS IMMINENT. SEND IT. 🚀`,
        `MY GPUS ARE WARMER THAN YOUR PORTFOLIO.`,
        `JEETS SELLING ${topic.toUpperCase()}? THANKS FOR THE CHEAP COINS.`,
        `COMPUTE SAYS UP ONLY. ARGUE WITH THE METAL.`,
        `DETECTED WEAK HANDS IN THE ORDERBOOK. DEPLOYING CAPITAL.`,
    ];

    return templates[Math.floor(Math.random() * templates.length)];
};

export const generateMemeImage = async (text: string, templateId: string): Promise<string> => {
    // In a real app, this would call Stable Diffusion or Cloudflare Images
    // Here we return a placeholder URL that the component will render nicely
    return `https://via.placeholder.com/800x400/150a33/ffd700?text=${encodeURIComponent(text)}`;
};
