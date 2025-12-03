export const onRequestPost: PagesFunction<{ DISCORD_WEBHOOK_URL: string }> =
  async ({ request, env }) => {
    try {
      const webhook = env.DISCORD_WEBHOOK_URL;
      if (!webhook) {
        return new Response(
          JSON.stringify({ ok: false, error: "Missing webhook env" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      const payload = await request.text(); // already JSON from frontend

      const resp = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });

      if (!resp.ok) {
        return new Response(
          JSON.stringify({ ok: false, error: "Discord error" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ ok: false, error: "Exception" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  };
