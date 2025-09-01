import type { NextApiRequest, NextApiResponse } from 'next';
import { Twilio } from 'twilio';

// Initialize Twilio client for Care Team account
const careTeamClient = new Twilio(
  process.env.CARE_TEAM_ACCOUNT_SID,
  process.env.CARE_TEAM_AUTH_TOKEN
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Test Care Team account connection
    const account = await careTeamClient.api.accounts(process.env.CARE_TEAM_ACCOUNT_SID || '').fetch();
    
    return res.status(200).json({
      status: 'healthy',
      service: 'Connie Cross-Account Support Bridge',
      careTeamAccount: account.friendlyName,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return res.status(500).json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}