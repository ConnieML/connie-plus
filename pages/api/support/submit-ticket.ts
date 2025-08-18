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

    // Format the email content
    const emailContent = `
      <h2>New Support Request from ${ticket.organization}</h2>
      
      <h3>Request Details</h3>
      <p><strong>Subject:</strong> ${ticket.subject}</p>
      <p><strong>Category:</strong> ${ticket.category}</p>
      
      <h3>Message</h3>
      <p>${ticket.message.replace(/\n/g, '<br>')}</p>
      
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${ticket.userName}</p>
      <p><strong>Email:</strong> ${ticket.userEmail}</p>
      <p><strong>Organization:</strong> ${ticket.organization}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `;

    // Determine priority based on category
    const priority = ticket.category === 'urgent' ? 'HIGH' : 'NORMAL';

    // TODO: Integrate with Mailgun API
    // For now, we'll simulate success
    // In production, you would use:
    // const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});
    // const data = {
    //   from: 'Connie Support <support@connie.team>',
    //   to: 'support@connie.team',
    //   subject: `[SUPPORT-${priority}] ${ticket.subject}`,
    //   html: emailContent,
    //   'h:Reply-To': ticket.userEmail
    // };
    // await mailgun.messages().send(data);
    
    // Log email content for development
    console.log('Email content would be:', emailContent);

    // Log the support ticket for now (in production, save to database)
    console.log('Support Ticket Received:', {
      ...ticket,
      priority,
      timestamp: new Date().toISOString()
    });

    // Send success response
    res.status(200).json({ 
      success: true, 
      message: 'Support request submitted successfully',
      ticketId: `SUPPORT-${Date.now()}` // Generate a simple ticket ID
    });

  } catch (error) {
    console.error('Error processing support ticket:', error);
    res.status(500).json({ error: 'Failed to submit support request' });
  }
}