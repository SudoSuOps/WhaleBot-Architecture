export interface Env {
  AI: Ai;
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") || null;

    // If GET: simple testing
    if (q) {
      const result = await env.AI.run(
        "@cf/mistralai/mistral-small-3.1-24b-instruct",
        {
          messages: [
            { role: "system", content: "You are WhaleBot, a crypto-native LLM." },
            { role: "user", content: q }
          ],
        }
      );
      return new Response(JSON.stringify(result.response), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // POST /chat endpoint for WhaleBot app
    if (request.method === "POST") {
      const body = await request.json();
      const prompt = body.prompt || "Hello";
      const system = body.system || "You are WhaleBot";

      const result = await env.AI.run(
        "@cf/mistralai/mistral-small-3.1-24b-instruct",
        {
          messages: [
            { role: "system", content: system },
            { role: "user", content: prompt }
          ],
        }
      );

      return new Response(JSON.stringify(result.response), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response("Whale-AI Active", { status: 200 });
  }
} satisfies ExportedHandler<Env>;
