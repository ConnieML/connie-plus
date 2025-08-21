import { NextApiRequest, NextApiResponse } from 'next';

// Crisp webhook handler for TaskRouter integration
// This endpoint will be called by Crisp when a chat conversation starts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    console.log('Crisp webhook received:', JSON.stringify(body, null, 2));
    
    // Extract conversation data from Crisp webhook
    const { type, data } = body;
    
    // Only process conversation started events for now
    if (type !== 'message:received') {
      console.log(`Ignoring webhook type: ${type}`);
      return res.status(200).json({ success: true, message: 'Event ignored' });
    }
    
    const {
      session_id,
      website_id,
      user,
      content,
      timestamp
    } = data;
    
    // Extract customer information
    const customerName = user?.nickname || user?.email || 'Anonymous';
    const customerEmail = user?.email || '';
    const customerMessage = content?.text || '';
    
    // Get Twilio credentials from environment variables
    const TWILIO_ACCOUNT_SID = process.env.TWILIO_RTC_ACCOUNT_SID;
    const TWILIO_AUTH_TOKEN = process.env.TWILIO_RTC_AUTH_TOKEN;
    
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
      console.error('Twilio credentials not configured');
      return res.status(200).json({ 
        success: true, 
        warning: 'TaskRouter integration not configured' 
      });
    }
    
    // Determine priority based on message content
    const priority = determinePriority(customerMessage);
    
    // Call TaskRouter API to create a chat task
    const taskRouterUrl = `https://taskrouter.twilio.com/v1/Workspaces/WSfe43abb4378f0f1e2ebb98877c03bd1d/Tasks`;
    
    // Create rich task attributes for Flex display
    const taskAttributes = {
      // Primary display fields
      name: `💬 Live Chat: ${customerName}`,
      type: 'live_chat',
      skill: 'Support',
      
      // Chat information
      sessionId: session_id,
      websiteId: website_id,
      chatMessage: customerMessage,
      urgency: priority,
      
      // Customer information
      customerName: customerName,
      customerPhone: customerEmail, // Using customerPhone field for email
      customers: {
        name: customerName,
        email: customerEmail,
        organization: 'Crisp Chat'
      },
      
      // Metadata
      origin: 'crisp-chat',
      timestamp: new Date(timestamp || Date.now()).toISOString(),
      channel: 'live-chat',
      channelType: 'chat',
      conversationsTaskKey: `crisp_chat_${session_id}`,
      
      // Crisp-specific data
      crisp: {
        sessionId: session_id,
        websiteId: website_id,
        chatUrl: `https://app.crisp.chat/website/${website_id}/conversations/${session_id}`
      }
    };
    
    const taskPayload = new URLSearchParams({
      'WorkflowSid': 'WW2c597b1d5a96635b6cb0b6d261c9ede8', // Same workflow as tickets
      'TaskChannel': 'default',
      'FriendlyName': `💬 Live Chat: ${customerName}`,
      'Priority': priority === 'high' ? '0' : priority === 'medium' ? '5' : '10',
      'Timeout': '1800', // 30 minutes timeout for chat
      'Attributes': JSON.stringify(taskAttributes)
    });

    const response = await fetch(taskRouterUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64')
      },
      body: taskPayload.toString()
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to create TaskRouter task:', errorText);
      return res.status(200).json({ 
        success: false, 
        error: 'Failed to create task',
        details: errorText
      });
    }
    
    const result = await response.json();
    console.log('TaskRouter task created:', result.sid);
    
    return res.status(200).json({
      success: true,
      taskCreated: true,
      taskSid: result.sid,
      taskStatus: result.assignment_status
    });
    
  } catch (error) {
    console.error('Error processing Crisp webhook:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Helper function to determine priority based on message content
function determinePriority(message: string): string {
  if (!message) return 'low';
  
  const content = message.toLowerCase();
  
  if (content.includes('urgent') || content.includes('emergency') || content.includes('help')) {
    return 'high';
  }
  if (content.includes('issue') || content.includes('problem') || content.includes('bug')) {
    return 'medium';
  }
  return 'low';
}