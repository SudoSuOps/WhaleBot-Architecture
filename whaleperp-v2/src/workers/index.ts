import { PositionManager } from './durable-objects/PositionManager';

export { PositionManager };

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Position Management
    if (path.startsWith('/api/user/')) {
      const userId = url.searchParams.get('userId');
      if (!userId) {
        return new Response('Missing userId', { status: 400, headers: corsHeaders });
      }

      const id = env.POSITION_MANAGER.idFromName(userId);
      const stub = env.POSITION_MANAGER.get(id);

      const newUrl = new URL(request.url);
      newUrl.pathname = path.replace('/api/user', '');
      const newRequest = new Request(newUrl.toString(), request);
      return stub.fetch(newRequest);
    }

    // Health check
    if (path === '/health') {
      return new Response(JSON.stringify({ status: 'ok', version: '2.0.0' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  }
};
