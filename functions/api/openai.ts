interface Env {
  OPENAI_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const body = await request.json() as { prompt: string; system?: string };

    const gatewayBase = "https://gateway.ai.cloudflare.com/v1/6abec5e82728df0610a98be9364918e4/whaleperp-core/compat";

    const payload = {
      model: "gpt-4.1",
      messages: [
        { role: "system", content: body.system || "You are WhaleBot, a trench-native crypto trading assistant." },
        { role: "user", content: body.prompt }
      ]
    };

    const res = await fetch(`${gatewayBase}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(
        JSON.stringify({ error: "OpenAI Gateway error", status: res.status, body: errText }),
        { status: 500 }
      );
    }

    const data: any = await res.json();
    const text =
      data?.choices?.[0]?.message?.content ??
      JSON.stringify(data);

    return new Response(JSON.stringify({ response: text }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: "OpenAI Gateway inference failed",
        details: err.toString()
      }),
      { status: 500 }
    );
  }
};
