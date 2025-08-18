import type { NextApiRequest, NextApiResponse } from 'next';

type BugReport = {
  title: string;
  severity: string;
  category: string;
  description: string;
  stepsToReproduce?: string;
  expectedBehavior?: string;
  actualBehavior?: string;
  userEmail: string;
  userName: string;
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
    const bugReport: BugReport = req.body;

    // Validate required fields
    if (!bugReport.title || !bugReport.description || !bugReport.userEmail || !bugReport.userName || !bugReport.organization) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Format the email content
    const emailContent = `
      <h2>New Bug Report from ${bugReport.organization}</h2>
      
      <h3>Issue Details</h3>
      <p><strong>Title:</strong> ${bugReport.title}</p>
      <p><strong>Severity:</strong> ${bugReport.severity}</p>
      <p><strong>Category:</strong> ${bugReport.category}</p>
      
      <h3>Description</h3>
      <p>${bugReport.description.replace(/\n/g, '<br>')}</p>
      
      ${bugReport.stepsToReproduce ? `
        <h3>Steps to Reproduce</h3>
        <p>${bugReport.stepsToReproduce.replace(/\n/g, '<br>')}</p>
      ` : ''}
      
      ${bugReport.expectedBehavior ? `
        <h3>Expected Behavior</h3>
        <p>${bugReport.expectedBehavior.replace(/\n/g, '<br>')}</p>
      ` : ''}
      
      ${bugReport.actualBehavior ? `
        <h3>Actual Behavior</h3>
        <p>${bugReport.actualBehavior.replace(/\n/g, '<br>')}</p>
      ` : ''}
      
      <h3>Reporter Information</h3>
      <p><strong>Name:</strong> ${bugReport.userName}</p>
      <p><strong>Email:</strong> ${bugReport.userEmail}</p>
      <p><strong>Organization:</strong> ${bugReport.organization}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `;

    // TODO: Integrate with Mailgun API
    // For now, we'll simulate success
    // In production, you would use:
    // const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});
    // const data = {
    //   from: 'Connie Support <support@connie.team>',
    //   to: 'support@connie.team',
    //   subject: `[BUG-${bugReport.severity.toUpperCase()}] ${bugReport.title}`,
    //   html: emailContent,
    //   'h:Reply-To': bugReport.userEmail
    // };
    // await mailgun.messages().send(data);
    
    // Log email content for development
    console.log('Email content would be:', emailContent);

    // Log the bug report for now (in production, save to database)
    console.log('Bug Report Received:', {
      ...bugReport,
      timestamp: new Date().toISOString()
    });

    // Send success response
    res.status(200).json({ 
      success: true, 
      message: 'Bug report submitted successfully',
      ticketId: `BUG-${Date.now()}` // Generate a simple ticket ID
    });

  } catch (error) {
    console.error('Error processing bug report:', error);
    res.status(500).json({ error: 'Failed to submit bug report' });
  }
}