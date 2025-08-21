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

    // Call trouble-ticket-app for unified ticket handling
    const ticketPayload = {
      title: ticket.subject,
      description: `Category: ${ticket.category}
Priority: ${priority}

${ticket.message}`,
      customerName: ticket.userName,
      customerPhone: ticket.userEmail // Using email as phone for contact info
    };

    console.log('Calling trouble-ticket-app:', JSON.stringify(ticketPayload, null, 2));

    const response = await fetch('https://trouble-ticket-app.vercel.app/api/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Trouble-ticket-app error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`Ticket creation failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Trouble-ticket-app result:', result);

    // Log the support ticket for tracking
    console.log('Support Ticket Successfully Created:', {
      ...ticket,
      priority,
      ticketId: result.id,
      timestamp: new Date().toISOString()
    });

    // Send success response
    res.status(200).json({ 
      success: true, 
      message: 'Support request submitted successfully and routed to ConnieCare Team',
      ticketId: result.id,
      ticketCreated: true,
      taskCreated: true // This should be true since trouble-ticket-app creates tasks
    });

  } catch (error) {
    console.error('Error processing support ticket:', error);
    res.status(500).json({ error: 'Failed to submit support request' });
  }
}