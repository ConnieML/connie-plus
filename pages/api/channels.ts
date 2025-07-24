// pages/api/channels.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';
import { 
  extractUserToken, 
  isUserAuthorizedForAccount, 
  getCredentialsForAccount,
  logAccountAccess,
  decodeUserToken
} from '../../lib/account-validation';

export interface Channel {
  sid: string;
  friendlyName: string;
  phoneNumber?: string;
  address?: string;
  type: 'voice' | 'messaging' | 'email' | 'web' | 'social';
  capabilities: string[];
  accountSid: string;
  dateCreated: string;
  status: string;
}

export interface ChannelsResponse {
  channels: Channel[];
  success: boolean;
  error?: string;
}

// Initialize Twilio client function with dynamic credentials
const getClient = (accountSid: string) => {
  const credentials = getCredentialsForAccount(accountSid);
  
  if (!credentials) {
    throw new Error(`No credentials found for account: ${accountSid}`);
  }
  
  console.log('Creating Twilio client for account:', accountSid);
  return twilio(credentials.sid, credentials.token);
};

// Note: Mock data removed - we now use real Twilio API calls only
// with proper account-specific credentials and authorization

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChannelsResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
      channels: []
    });
  }

  // Extract account context and user authorization
  const { accountSid } = req.query;
  const userToken = extractUserToken(req);
  
  // Validate required parameters
  if (!accountSid || typeof accountSid !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Missing or invalid accountSid parameter',
      channels: []
    });
  }

  // Validate user authorization for the requested account
  if (!isUserAuthorizedForAccount(userToken, accountSid)) {
    // Log unauthorized access attempt
    const decodedToken = userToken ? decodeUserToken(userToken) : null;
    logAccountAccess(
      decodedToken?.email,
      accountSid,
      'channels_access',
      false,
      req.headers['user-agent']
    );
    
    return res.status(403).json({
      success: false,
      error: 'Unauthorized: You do not have access to this account',
      channels: []
    });
  }

  try {
    const channels: Channel[] = [];
    const client = getClient(accountSid);
    
    // Log successful access
    const decodedToken = userToken ? decodeUserToken(userToken) : null;
    logAccountAccess(
      decodedToken?.email,
      accountSid,
      'channels_access',
      true,
      req.headers['user-agent']
    );

    // Fetch phone numbers (Voice channels)
    const phoneNumbers = await client.incomingPhoneNumbers.list();
    for (const phoneNumber of phoneNumbers) {
      const capabilities = [];
      if (phoneNumber.capabilities.voice) capabilities.push('voice');
      if (phoneNumber.capabilities.sms) capabilities.push('messaging');
      if (phoneNumber.capabilities.mms) capabilities.push('messaging');

      channels.push({
        sid: phoneNumber.sid,
        friendlyName: phoneNumber.friendlyName || phoneNumber.phoneNumber,
        phoneNumber: phoneNumber.phoneNumber,
        type: 'voice',
        capabilities,
        accountSid: phoneNumber.accountSid,
        dateCreated: phoneNumber.dateCreated?.toISOString() || new Date().toISOString(),
        status: 'active'
      });
    }

    // Fetch messaging services (Messaging channels)
    const messagingServices = await client.messaging.v1.services.list();
    for (const service of messagingServices) {
      channels.push({
        sid: service.sid,
        friendlyName: service.friendlyName,
        address: service.sid,
        type: 'messaging',
        capabilities: ['messaging'],
        accountSid: service.accountSid,
        dateCreated: service.dateCreated?.toISOString() || new Date().toISOString(),
        status: 'active'
      });
    }

    // Note: Email, Web, and Social channels would require additional API calls
    // depending on your specific integrations (SendGrid, Flex, etc.)

    res.status(200).json({
      success: true,
      channels
    });

  } catch (error) {
    console.error('Error fetching channels for account', accountSid, ':', error);
    
    // Log the error
    const decodedToken = userToken ? decodeUserToken(userToken) : null;
    logAccountAccess(
      decodedToken?.email,
      accountSid,
      'channels_access_error',
      false,
      req.headers['user-agent']
    );
    
    // Return error instead of fallback mock data for security
    res.status(500).json({
      success: false,
      error: 'Failed to fetch channel data for the requested account',
      channels: []
    });
  }
}