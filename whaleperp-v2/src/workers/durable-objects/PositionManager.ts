export class PositionManager {
  state: DurableObjectState;
  env: any;

  constructor(state: DurableObjectState, env: any) {
    this.state = state;
    this.env = env;
  }

  async fetch(request: Request): Promise<Response> {
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

    try {
      if (path === '/positions') {
        if (request.method === 'GET') {
          const positions = await this.state.storage.get('positions') || [];
          return new Response(JSON.stringify({ positions }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        if (request.method === 'POST') {
          const position = await request.json();
          const positions: any[] = await this.state.storage.get('positions') || [];
          
          position.id = crypto.randomUUID();
          position.timestamp = Date.now();
          position.status = 'OPEN';

          positions.push(position);
          await this.state.storage.put('positions', positions);

          return new Response(JSON.stringify({ success: true, position }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        if (request.method === 'DELETE') {
          const { positionId } = await request.json();
          const positions: any[] = await this.state.storage.get('positions') || [];
          const index = positions.findIndex(p => p.id === positionId);

          if (index === -1) {
            return new Response(JSON.stringify({ error: 'Position not found' }), {
              status: 404,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
          }

          const [closedPosition] = positions.splice(index, 1);
          await this.state.storage.put('positions', positions);

          const history: any[] = await this.state.storage.get('history') || [];
          history.unshift(closedPosition);
          await this.state.storage.put('history', history.slice(0, 100));

          return new Response(JSON.stringify({ success: true, closedPosition }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      }

      if (path === '/history') {
        const history = await this.state.storage.get('history') || [];
        return new Response(JSON.stringify({ history }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (path === '/vault') {
        if (request.method === 'GET') {
          const vault = await this.state.storage.get('vault') || { balance: 1000000, initial: 1000000 };
          return new Response(JSON.stringify(vault), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        if (request.method === 'PUT') {
          const { balance } = await request.json();
          const vault = await this.state.storage.get('vault') || { balance: 1000000, initial: 1000000 };
          vault.balance = balance;
          await this.state.storage.put('vault', vault);
          return new Response(JSON.stringify(vault), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      }

      return new Response('Not Found', { status: 404, headers: corsHeaders });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
}
