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

    // Prepare data for connie.tech serverless function
    const serverlessPayload = {
      title: bugReport.title,
      description: bugReport.description,
      stepsToReproduce: bugReport.stepsToReproduce,
      expectedBehavior: bugReport.expectedBehavior,
      actualBehavior: bugReport.actualBehavior,
      urgency: bugReport.severity, // Map severity to urgency
      userName: bugReport.userName,
      userEmail: bugReport.userEmail,
      organization: bugReport.organization,
      userAgent: userAgent,
      url: referer,
      timestamp: new Date().toISOString()
    };

    // Call connie.tech serverless function for email routing
    const serverlessUrl = process.env.CONNIE_TECH_SERVERLESS_DOMAIN 
      ? `https://${process.env.CONNIE_TECH_SERVERLESS_DOMAIN}/send-bug-report-email`
      : 'https://bug-tracker-functions-dev.twil.io/send-bug-report-email'; // Default development URL

    console.log('Calling serverless function:', serverlessUrl);
    console.log('Bug report payload:', JSON.stringify(serverlessPayload, null, 2));

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

    // Log the bug report for tracking
    console.log('Bug Report Successfully Routed to ConnieCare Team:', {
      ...bugReport,
      mailgunId: result.mailgunId,
      timestamp: new Date().toISOString()
    });

    // Send success response
    res.status(200).json({ 
      success: true, 
      message: 'Bug report submitted successfully and routed to ConnieCare Team',
      ticketId: `BUG-${Date.now()}`, // Generate a simple ticket ID
      emailSent: true,
      mailgunId: result.mailgunId
    });

  } catch (error) {
    console.error('Error processing bug report:', error);
    res.status(500).json({ 
      error: 'Failed to submit bug report',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}