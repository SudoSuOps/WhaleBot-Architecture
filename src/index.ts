import {
  fuseOpinions,
  MarketSnapshot,
  ModelOpinion,
  EnsembleDecision,
  Direction,
} from "./whalebrain/probability";

interface Env {
  AI: any;
  CF_AIG_TOKEN: string;
}

const ACCOUNT_ID = "6abec5e82728df0610a98be9364918e4";
const GATEWAY_ID = "whaleperp-core";

const COMPAT_URL =
  `https://gateway.ai.cloudflare.com/v1/${ACCOUNT_ID}/${GATEWAY_ID}/compat/chat/completions`;

const jsonResponse = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

async function callCompatModel(
  env: Env,
  model: string,
  messages: { role: string; content: string }[]
) {
  const res = await fetch(COMPAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cf-aig-authorization": `Bearer ${env.CF_AIG_TOKEN}`,
    },
    body: JSON.stringify({
      model,
      messages,
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`Compat ${model} HTTP ${res.status}: ${err}`);
  }

  const data = await res.json();
  const content =
    data.choices?.[0]?.message?.content ??
    data.choices?.[0]?.delta?.content ??
    "";

  return { raw: data, text: String(content) };
}

function parseProbJson(
  modelId: string,
  rawText: string
): { direction: Direction; probLong: number; probShort: number; horizon: number; reasoning: string } {
  const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

  try {
    const parsed = JSON.parse(cleaned);
    const dir = (parsed.direction ?? parsed.directional_view ?? "NEUTRAL")
      .toString()
      .toUpperCase() as Direction;

    const probLong = Number(parsed.prob_long ?? parsed.probLong ?? 0.5);
    const probShort = Number(parsed.prob_short ?? parsed.probShort ?? 0.5);
    const horizon =
      Number(parsed.horizon_minutes ?? parsed.horizon ?? 15) || 15;
    const reasoning =
      parsed.reasoning ??
      parsed.explanation ??
      `No reasoning returned from ${modelId}`;

    return {
      direction: ["LONG", "SHORT", "NEUTRAL"].includes(dir) ? dir : "NEUTRAL",
      probLong: isFinite(probLong) ? probLong : 0.5,
      probShort: isFinite(probShort) ? probShort : 0.5,
      horizon,
      reasoning: String(reasoning),
    };
  } catch (_e) {
    return {
      direction: "NEUTRAL",
      probLong: 0.5,
      probShort: 0.5,
      horizon: 15,
      reasoning: `Failed to parse JSON from ${modelId}`,
    };
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        },
      });
    }

    try {
      // --- Workers AI: Mistral 7B
      if (pathname === "/chat" && request.method === "POST") {
        const body = (await request.json().catch(() => ({}))) as {
          prompt?: string;
          system?: string;
        };

        const prompt = body.prompt ?? "gm whale";
        const system =
          body.system ??
          "You are WhaleBot, a trench-native crypto AI. Short, sharp answers. Crypto-native slang allowed, but stay clear and useful.";

        const aiRes = await env.AI.run(
          "@cf/mistral/mistral-7b-instruct-v0.2",
          {
            messages: [
              { role: "system", content: system },
              { role: "user", content: prompt },
            ],
          }
        );

        return jsonResponse({ response: aiRes.response ?? String(aiRes) });
      }

      // --- OpenAI via Gateway compat
      if (pathname === "/openai" && request.method === "POST") {
        const body = (await request.json().catch(() => ({}))) as {
          prompt?: string;
          system?: string;
          model?: string;
        };

        const prompt = body.prompt ?? "gm whale";
        const system =
          body.system ??
          "You are WhaleBot, an institutional-grade perp quant. Be concise, probability-focused, and explain risk in clear language.";

        const model = body.model ?? "openai/gpt-4.1";

        const { text, raw } = await callCompatModel(env, model, [
          { role: "system", content: system },
          { role: "user", content: prompt },
        ]);

        return jsonResponse({ model, response: text, raw });
      }

      // --- Gemini via Gateway compat
      if (pathname === "/gemini" && request.method === "POST") {
        const body = (await request.json().catch(() => ({}))) as {
          prompt?: string;
          system?: string;
        };

        const prompt = body.prompt ?? "gm whaleperp we cooking?";
        const system =
          body.system ??
          "You are WhaleBot running on Gemini 2.0 Flash via Cloudflare. Be fast, fun, and clear. Focus on market structure and risk.";

        const model = "google-ai-studio/gemini-2.0-flash";

        const { text, raw } = await callCompatModel(env, model, [
          { role: "system", content: system },
          { role: "user", content: prompt },
        ]);

        return jsonResponse({ model, response: text, raw });
      }

      // --- Qwen via Workers AI (reasoning-tilted brain)
      if (pathname === "/qwen" && request.method === "POST") {
        const body = (await request.json().catch(() => ({}))) as {
          prompt?: string;
          system?: string;
        };

        const prompt = body.prompt ?? "gm whale, reason through this setup.";
        const system =
          body.system ??
          "You are WhaleBot-Q, a slow-thinking reasoning engine for crypto markets. Walk through your logic step by step, but keep the final answer concise.";

        const qRes = await env.AI.run(
          "@cf/qwen/qwq-32b", // reasoning-focused Qwen model on Workers AI
          {
            messages: [
              { role: "system", content: system },
              { role: "user", content: prompt },
            ],
          }
        );

        return jsonResponse({
          model: "@cf/qwen/qwq-32b",
          response: qRes.response ?? String(qRes),
        });
      }

      // --- Ensemble route: fuse GPT-4.1 + Gemini + Qwen into one decision
      if (pathname === "/ensemble" && request.method === "POST") {
        const body = (await request.json().catch(() => ({}))) as {
          asset: string;
          price: number;
          question?: string;
          snapshot: MarketSnapshot;
        };

        const asset = body.asset ?? "BTC-PERP";
        const price = body.price ?? body.snapshot?.price ?? 0;
        const snapshot: MarketSnapshot = {
          ...body.snapshot,
          asset,
          price,
        };

        const baseContext = `
You are WhaleBot, an institutional crypto quant running on a GPU trench rig.

You are given a real-time market snapshot for ${asset}:

${JSON.stringify(snapshot, null, 2)}

Your task:
- Decide if the edge for the next 30-120 minutes is LONG, SHORT, or NEUTRAL.
- Quantify probabilities for LONG vs SHORT (0-1).
- Respect risk: if liquidity is thin, volatility extreme, or data conflicted, lean NEUTRAL.

You MUST respond in strict JSON with the following shape, no extra text:

{
  "direction": "LONG" | "SHORT" | "NEUTRAL",
  "prob_long": 0.0-1.0,
  "prob_short": 0.0-1.0,
  "horizon_minutes": 30-120,
  "reasoning": "short explanation of key drivers"
}
        `.trim();

        const userQuestion =
          body.question ??
          `Given this snapshot, what is the probabilistic edge over the next 60 minutes for ${asset}?`;

        // Call GPT-4.1 and Gemini via Gateway compat
        const [gpt, gemini, qwen] = await Promise.allSettled([
          callCompatModel(env, "openai/gpt-4.1", [
            { role: "system", content: baseContext },
            { role: "user", content: userQuestion },
          ]),
          callCompatModel(env, "google-ai-studio/gemini-2.0-flash", [
            { role: "system", content: baseContext },
            { role: "user", content: userQuestion },
          ]),
          env.AI.run("@cf/qwen/qwq-32b", {
            messages: [
              { role: "system", content: baseContext },
              { role: "user", content: userQuestion },
            ],
          }),
        ]);

        const opinions: ModelOpinion[] = [];

        if (gpt.status === "fulfilled") {
          const parsed = parseProbJson("openai/gpt-4.1", gpt.value.text);
          opinions.push({
            model: "openai/gpt-4.1",
            direction: parsed.direction,
            probLong: parsed.probLong,
            probShort: parsed.probShort,
            horizonMinutes: parsed.horizon,
            reasoning: parsed.reasoning,
            rawText: gpt.value.text,
          });
        }

        if (gemini.status === "fulfilled") {
          const parsed = parseProbJson(
            "google-ai-studio/gemini-2.0-flash",
            gemini.value.text
          );
          opinions.push({
            model: "google-ai-studio/gemini-2.0-flash",
            direction: parsed.direction,
            probLong: parsed.probLong,
            probShort: parsed.probShort,
            horizonMinutes: parsed.horizon,
            reasoning: parsed.reasoning,
            rawText: gemini.value.text,
          });
        }

        if (qwen.status === "fulfilled") {
          const rawText = String(qwen.value.response ?? qwen.value);
          const parsed = parseProbJson("@cf/qwen/qwq-32b", rawText);
          opinions.push({
            model: "@cf/qwen/qwq-32b",
            direction: parsed.direction,
            probLong: parsed.probLong,
            probShort: parsed.probShort,
            horizonMinutes: parsed.horizon,
            reasoning: parsed.reasoning,
            rawText,
          });
        }

        const ensemble: EnsembleDecision = fuseOpinions(
          asset,
          price,
          snapshot,
          opinions
        );

        return jsonResponse({
          ensemble,
          opinions,
        });
      }

      // Healthcheck
      if (pathname === "/" && request.method === "GET") {
        return jsonResponse({
          ok: true,
          service: "whale-ai",
          message: "WhaleBrain v3 online 🐳",
          routes: ["/chat", "/openai", "/gemini", "/qwen", "/ensemble"],
        });
      }

      return jsonResponse({ error: "Not found", path: pathname }, 404);
    } catch (err: any) {
      return jsonResponse(
        {
          error: "WhaleBrain internal error",
          message: err?.message ?? String(err),
        },
        500
      );
    }
  },
};
