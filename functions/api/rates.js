/**
 * Cloudflare Function Handler
 * @param {EventContext} context
 */
export async function onRequest(context) {
    // API Key
    const API_KEY = context.env.EXCHANGE_RATE_API_KEY;

    if (!API_KEY) {
      return new Response('API key not configured', { status: 500 });
    }
  
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/CNY`;
  
    try {

      const response = await fetch(API_URL);
  

      if (!response.ok) {
        throw new Error(`External API responded with status: ${response.status}`);
      }
  
      const data = await response.json();
  

      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
      
    } catch (error) {
      console.error('Error fetching from external API:', error);
      return new Response('Failed to fetch exchange rates', { status: 500 });
    }
  }
  