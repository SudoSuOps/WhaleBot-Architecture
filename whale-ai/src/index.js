export default {
  async fetch(request, env) {
    const snapshot = await request.json(); // QuantSnapshot

    const prompt = `
You are Whale-Quant, a perp risk engine.

You receive a JSON snapshot of the market and open risk.
You MUST respond in STRICT JSON only, no extra text.

For the snapshot, compute:
- prob_long: probability going long in the next 60 minutes has positive edge (0.0 - 1.0)
- prob_short: probability going short has positive edge (0.0 - 1.0)
- prob_chop: probability that neither side has meaningful edge (0.0 - 1.0)
All three MUST sum to ~1.0.

Also compute:
- conviction: 0.0 - 1.0, how stable the signal is
- regime: one of ["TREND_UP","TREND_DOWN","MEAN_REVERT","CHOP","EVENT"]
- note: short explanation (max 2 sentences).

Return format:
{
  "prob_long": <number>,
  "prob_short": <number>,
  "prob_chop": <number>,
  "conviction": <number>,
  "regime": "<string>",
  "note": "<string>"
}

JSON snapshot:
${JSON.stringify(snapshot)}
    `.trim();

    const aiRes = await env.AI.run("@cf/mistralai/mistral-small-3.1-24b-instruct", {
      prompt
    });

    // aiRes is { response: "..." } or similar depending on model;
    // parse out JSON safely:
    let parsed;
    try {
      const text = aiRes.response ?? aiRes.result ?? JSON.stringify(aiRes);
      const jsonStr = text.match(/\{[\s\S]*\}/)?.[0] ?? "{}";
      parsed = JSON.parse(jsonStr);
    } catch (e) {
      parsed = {
        prob_long: 0.33,
        prob_short: 0.33,
        prob_chop: 0.34,
        conviction: 0.0,
        regime: "CHOP",
        note: "Fallback due to parse error."
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
