// --- SOVEREIGN CLOUDFLARE WORKER AI PIPE ---
const callWorkerAI = async (prompt: string, systemContext: string) => {
    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, system: systemContext })
        });
        if (!res.ok) throw new Error('Worker AI Error');
        const data = await res.json();
        return data.response;
    } catch (e) {
        console.error("Worker AI Failed:", e);
        return null;
    }
};

export const generateAnalysis = async (currentPrice, asset) => {
  const systemPrompt = "You are a high-frequency trading bot. Output ONLY JSON.";
  const userPrompt = \`Analyze \${asset} at \$\${currentPrice}. Strategy: Diamond Fins v3.\`;

  const res = await callWorkerAI(userPrompt, systemPrompt);
  if (res) {
      try { return JSON.parse(res); }
      catch (e) { console.warn("AI JSON parse failed"); }
  }

  return {
      asset,
      direction: "NEUTRAL",
      confidence: 55,
      reasoning: "Fallback simulation.",
      timestamp: Date.now(),
      indicators: { rsi: 50, macd: "FLAT", volume: 1.0 }
  };
};
