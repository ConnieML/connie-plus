// pages/api/voicemail-audio/[recordingSid].ts
// Secure audio proxy following Twilio Support best practices
import type { NextApiRequest, NextApiResponse } from 'next';

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID!;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Validate recording SID parameter
  const { recordingSid } = req.query;
  if (!recordingSid || typeof recordingSid !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid recordingSid' });
  }

  // 2. Future: Add user authentication check here
  // const session = await getSession({ req });
  // if (!session || !session.user) {
  //   return res.status(401).json({ error: 'Unauthorized' });
  // }

  try {
    // 3. Build Twilio Recording URL
    const twilioRecordingUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Recordings/${recordingSid}.mp3`;
    
    console.log('Proxying audio request for:', recordingSid);

    // 4. Fetch recording with server-side credentials (never exposed to browser)
    const twilioRes = await fetch(twilioRecordingUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64')
      }
    });

    if (!twilioRes.ok) {
      console.error('Failed to fetch recording:', twilioRes.status, twilioRes.statusText);
      return res.status(twilioRes.status).json({ error: 'Failed to fetch recording' });
    }

    // 5. Set appropriate headers for secure audio streaming
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'private, max-age=3600'); // Cache for 1 hour
    
    // 6. Stream audio to browser (recommended approach)
    if (twilioRes.body) {
      // @ts-ignore - Node.js streams
      twilioRes.body.pipe(res);
    } else {
      // Fallback for environments where .body is not a stream
      const audioBuffer = await twilioRes.arrayBuffer();
      res.status(200).send(Buffer.from(audioBuffer));
    }

  } catch (error) {
    console.error('Audio proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to proxy audio',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}