import type { NextApiRequest, NextApiResponse } from 'next';
import { Twilio } from 'twilio';
import { allowedOrigins } from './cors-config';

// Initialize Twilio client for Care Team account
const careTeamClient = new Twilio(
  process.env.CARE_TEAM_ACCOUNT_SID,
  process.env.CARE_TEAM_AUTH_TOKEN
);

interface SupportRequest {
  agentName: string;
  agentEmail: string;
  organization: string;
  requestTimestamp: string;
}

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
    console.log('Support request received:', req.body);
    
    const { agentName, agentEmail, organization } = req.body as SupportRequest;
    
    // Validate required fields
    if (!agentName || !agentEmail || !organization) {
      return res.status(400).json({
        error: 'Missing required fields: agentName, agentEmail, organization'
      });
    }

    // Create conversation via WebChat deployment key to trigger Studio Flow
    const conversation = await careTeamClient.conversations.v1.conversations.create({
      friendlyName: `${organization} Support Request - ${agentName}`,
      attributes: JSON.stringify({
        pre_engagement_data: {
          friendlyName: agentName,
          email: agentEmail,
          query: `Support request from ${organization} agent`
        },
        context: {
          organization: organization,
          source: 'cross-account-bridge',
          agentName: agentName,
          agentEmail: agentEmail
        }
      })
    });

    console.log(`Conversation created: ${conversation.sid}`);

    // Add requesting agent as participant (CRITICAL: Required before sending message!)
    const participant = await careTeamClient.conversations.v1
      .conversations(conversation.sid)
      .participants
      .create({
        identity: agentEmail // Using email as identity for Flex WebChat
      });

    console.log(`Agent added as participant: ${participant.sid}`);

    // Add Studio webhook to conversation (CRITICAL for triggering Studio Flow!)
    const studioWebhook = await careTeamClient.conversations.v1
      .conversations(conversation.sid)
      .webhooks
      .create({
        target: 'studio',
        'configuration.flowSid': process.env.STUDIO_FLOW_SID || 'FW1d690b0af8be5b6e4fe67bcf776049fc',
        'configuration.filters': ['onMessageAdded']
      });

    console.log(`Studio webhook added: ${studioWebhook.sid}`);

    // Send initial message with xTwilioWebhookEnabled to trigger Studio Flow
    const message = await careTeamClient.conversations.v1
      .conversations(conversation.sid)
      .messages
      .create({
        body: `Support request from ${organization} agent: ${agentName} (${agentEmail}). Please assist with technical support.`,
        author: agentName,
        xTwilioWebhookEnabled: 'true' as any  // CRITICAL: This ensures the webhook fires!
      } as any);

    console.log(`Message sent: ${message.sid} - Studio Flow should now create task`);

    return res.status(200).json({
      success: true,
      conversationSid: conversation.sid,
      message: `Support request created for ${organization} - ${agentName}`
    });

  } catch (error) {
    console.error('Error creating support request:', error);
    
    return res.status(500).json({
      error: 'Failed to create support request',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}