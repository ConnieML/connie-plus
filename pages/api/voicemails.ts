// pages/api/voicemails.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // The URL of our Twilio Function (correct path with /functions/)
    const TWILIO_FUNCTION_URL = 'https://voicemail-player-functions-8887-dev.twil.io/functions/list-voicemails';

    console.log('Proxying request to Twilio Function:', TWILIO_FUNCTION_URL);

    // Call the Twilio Function server-side (no CORS issues)
    const twilioResponse = await fetch(TWILIO_FUNCTION_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'connie-plus-proxy/1.0'
      },
    });

    console.log('Twilio Function response status:', twilioResponse.status);

    if (!twilioResponse.ok) {
      console.error('Twilio Function error:', twilioResponse.status, twilioResponse.statusText);
      return res.status(twilioResponse.status).json({ 
        error: 'Failed to fetch voicemails from Twilio Function',
        status: twilioResponse.status 
      });
    }

    const data = await twilioResponse.json();
    console.log('Twilio Function returned:', data.success ? `${data.count} voicemails` : 'error');

    // Return the data to the frontend
    res.status(200).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}