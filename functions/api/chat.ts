interface Env {
  AI: any;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  
  try {
    const body = await request.json() as { prompt: string; system: string; model?: string };
    
    // Model Selector
    let modelId = '@cf/mistral/mistral-7b-instruct-v0.1'; // Default
    if (body.model === 'LLAMA') modelId = '@cf/meta/llama-3-8b-instruct';
    if (body.model === 'QWEN') modelId = '@cf/qwen/qwen1.5-14b-chat-awq'; // Example Qwen ID

    // Using Cloudflare Workers AI
    const response = await env.AI.run(modelId, {
      messages: [
        { role: 'system', content: body.system || "You are WhaleBot." },
        { role: 'user', content: body.prompt }
      ]
    });

    return new Response(JSON.stringify({ response: response.response, model: modelId }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "AI Inference Failed", details: err.toString() }), { status: 500 });
  }
};
