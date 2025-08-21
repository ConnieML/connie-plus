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

    // Get browser information for debugging
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const referer = req.headers.referer || req.headers.referrer || 'Unknown';

    // Get browser information for debugging
    console.log('Processing bug report:', {
      title: bugReport.title,
      severity: bugReport.severity,
      userAgent,
      referer
    });

    // Call trouble-ticket-app for unified ticket handling
    const ticketPayload = {
      title: `Bug Report: ${bugReport.title}`,
      description: `${bugReport.description}

Steps to Reproduce:
${bugReport.stepsToReproduce || 'Not provided'}

Expected Behavior:
${bugReport.expectedBehavior || 'Not provided'}

Actual Behavior:
${bugReport.actualBehavior || 'Not provided'}`,
      customerName: bugReport.userName,
      customerPhone: bugReport.userEmail // Using email as phone for contact info
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

    // Log the bug report for tracking
    console.log('Bug Report Successfully Created as Support Ticket:', {
      ...bugReport,
      ticketId: result.id,
      timestamp: new Date().toISOString()
    });

    // Send success response
    res.status(200).json({ 
      success: true, 
      message: 'Bug report submitted successfully and routed to ConnieCare Team',
      ticketId: result.id,
      ticketCreated: true,
      taskCreated: true // This should be true since trouble-ticket-app creates tasks
    });

  } catch (error) {
    console.error('Error processing bug report:', error);
    res.status(500).json({ 
      error: 'Failed to submit bug report',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}