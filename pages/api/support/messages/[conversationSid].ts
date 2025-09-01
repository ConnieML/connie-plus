import type { NextApiRequest, NextApiResponse } from 'next';
import { Twilio } from 'twilio';
import { allowedOrigins } from '../cors-config';

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

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { conversationSid } = req.query;
    const limit = parseInt(req.query.limit as string) || 50;
    
    if (!conversationSid || typeof conversationSid !== 'string') {
      return res.status(400).json({
        error: 'Missing conversationSid parameter'
      });
    }

    console.log(`Fetching messages for conversation ${conversationSid}`);

    // Fetch messages from Care Team conversation
    const messages = await careTeamClient.conversations.v1
      .conversations(conversationSid)
      .messages
      .list({ limit });

    // Format messages for client
    const formattedMessages = messages.map(msg => ({
      sid: msg.sid,
      author: msg.author,
      body: msg.body,
      timestamp: msg.dateCreated,
      attributes: msg.attributes
    }));

    return res.status(200).json({
      success: true,
      conversationSid,
      messages: formattedMessages.reverse() // Return in chronological order
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    return res.status(500).json({
      error: 'Failed to fetch messages',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}