import type { NextApiRequest, NextApiResponse } from 'next';
import { Twilio } from 'twilio';
import { allowedOrigins } from './cors-config';

// Initialize Twilio client for Care Team account
const careTeamClient = new Twilio(
  process.env.CARE_TEAM_ACCOUNT_SID,
  process.env.CARE_TEAM_AUTH_TOKEN
);

// Handle CORS
function setCORSHeaders(req: NextApiRequest, res: NextApiResponse) {
  const origin = req.headers.origin;
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  setCORSHeaders(req, res);

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { conversationSid, author, body } = req.body;
    
    // Validate required fields
    if (!conversationSid || !author || !body) {
      return res.status(400).json({
        error: 'Missing required fields: conversationSid, author, body'
      });
    }

    console.log(`Sending message to conversation ${conversationSid} from ${author}`);

    // Add message to Care Team conversation
    const message = await careTeamClient.conversations.v1
      .conversations(conversationSid)
      .messages
      .create({
        author: author,
        body: body
      });

    console.log(`Message sent: ${message.sid}`);

    return res.status(200).json({
      success: true,
      messageSid: message.sid,
      timestamp: message.dateCreated
    });

  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({
      error: 'Failed to send message',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}