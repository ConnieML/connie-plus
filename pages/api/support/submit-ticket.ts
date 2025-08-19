import type { NextApiRequest, NextApiResponse } from 'next';

type SupportTicket = {
  subject: string;
  category: string;
  message: string;
  userName: string;
  userEmail: string;
  organization: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const ticket: SupportTicket = req.body;

    // Validate required fields
    if (!ticket.subject || !ticket.message || !ticket.userEmail || !ticket.userName || !ticket.organization) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Determine priority based on category
    const priority = ticket.category === 'urgent' ? 'HIGH' : 'NORMAL';

    // Call connie.tech serverless function for email routing
    const serverlessPayload = {
      subject: ticket.subject,
      category: ticket.category,
      message: ticket.message,
      userName: ticket.userName,
      userEmail: ticket.userEmail,
      organization: ticket.organization,
      timestamp: new Date().toISOString()
    };

    const serverlessUrl = process.env.CONNIE_TECH_SERVERLESS_DOMAIN 
      ? `https://${process.env.CONNIE_TECH_SERVERLESS_DOMAIN}/send-support-ticket-email`
      : 'https://bug-tracker-functions-dev.twil.io/send-support-ticket-email'; // Default development URL

    console.log('Calling serverless function:', serverlessUrl);
    console.log('Support ticket payload:', JSON.stringify(serverlessPayload, null, 2));

    const response = await fetch(serverlessUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serverlessPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Serverless function error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`Serverless function failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Serverless function result:', result);

    // Log the support ticket for tracking
    console.log('Support Ticket Successfully Routed to ConnieCare Team:', {
      ...ticket,
      priority,
      mailgunId: result.mailgunId,
      timestamp: new Date().toISOString()
    });

    // Send success response
    res.status(200).json({ 
      success: true, 
      message: 'Support request submitted successfully and routed to ConnieCare Team',
      ticketId: `SUPPORT-${Date.now()}`, // Generate a simple ticket ID
      emailSent: true,
      mailgunId: result.mailgunId
    });

  } catch (error) {
    console.error('Error processing support ticket:', error);
    res.status(500).json({ error: 'Failed to submit support request' });
  }
}