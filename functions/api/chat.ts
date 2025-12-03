interface Env {
  AI: any;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  
  try {
    const body = await request.json() as { prompt: string; system: string };
    
    // Using Mistral 7B Instruct
    const response = await env.AI.run('@cf/mistral/mistral-7b-instruct-v0.1', {
      messages: [
        { role: 'system', content: body.system || "You are WhaleBot." },
        { role: 'user', content: body.prompt }
      ]
    });

    return new Response(JSON.stringify({ response: response.response }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "AI Inference Failed", details: err.toString() }), { status: 500 });
  }
};
