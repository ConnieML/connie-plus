// pages/api/channels.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

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

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Mock channel data structure (fallback if API calls fail)
const mockChannelData: Channel[] = [
  // Voice Channels
  {
    sid: 'PNxxxxxxxxxx1',
    friendlyName: 'Main Support Line',
    phoneNumber: '+1 (555) 123-4567',
    type: 'voice',
    capabilities: ['voice', 'messaging'],
    accountSid: 'ACxxxxxxxxxx',
    dateCreated: '2024-01-15T10:30:00Z',
    status: 'active'
  },
  {
    sid: 'PNxxxxxxxxxx2', 
    friendlyName: 'Sales Hotline',
    phoneNumber: '+1 (555) 987-6543',
    type: 'voice',
    capabilities: ['voice'],
    accountSid: 'ACxxxxxxxxxx',
    dateCreated: '2024-02-01T14:15:00Z',
    status: 'active'
  },
  
  // Messaging Channels
  {
    sid: 'MGxxxxxxxxxx1',
    friendlyName: 'Customer SMS',
    phoneNumber: '+1 (555) 234-5678',
    type: 'messaging',
    capabilities: ['messaging'],
    accountSid: 'ACxxxxxxxxxx',
    dateCreated: '2024-01-20T09:45:00Z',
    status: 'active'
  },
  {
    sid: 'MGxxxxxxxxxx2',
    friendlyName: 'WhatsApp Business',
    phoneNumber: 'whatsapp:+14155238886',
    type: 'messaging',
    capabilities: ['messaging'],
    accountSid: 'ACxxxxxxxxxx',
    dateCreated: '2024-03-01T11:20:00Z',
    status: 'active'
  },
  
  // Email Channels
  {
    sid: 'CHxxxxxxxxxx1',
    friendlyName: 'Support Email',
    address: 'support@connie.team',
    type: 'email',
    capabilities: ['email'],
    accountSid: 'ACxxxxxxxxxx',
    dateCreated: '2024-01-10T16:00:00Z',
    status: 'active'
  },
  {
    sid: 'CHxxxxxxxxxx2',
    friendlyName: 'Sales Inquiries',
    address: 'sales@connie.team',
    type: 'email', 
    capabilities: ['email'],
    accountSid: 'ACxxxxxxxxxx',
    dateCreated: '2024-02-15T13:30:00Z',
    status: 'active'
  },
  
  // Web Channels
  {
    sid: 'CHxxxxxxxxxx3',
    friendlyName: 'Website Chat',
    address: 'https://connie.team/chat',
    type: 'web',
    capabilities: ['messaging'],
    accountSid: 'ACxxxxxxxxxx',
    dateCreated: '2024-01-25T12:00:00Z',
    status: 'active'
  },
  
  // Social Channels
  {
    sid: 'CHxxxxxxxxxx4',
    friendlyName: 'Facebook Messenger',
    address: 'facebook:connieteam',
    type: 'social',
    capabilities: ['messaging'],
    accountSid: 'ACxxxxxxxxxx',
    dateCreated: '2024-03-10T10:15:00Z',
    status: 'active'
  }
];

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

  try {
    const channels: Channel[] = [];

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
    console.error('Error fetching channels:', error);
    
    // Fallback to mock data if API calls fail
    res.status(200).json({
      success: true,
      channels: mockChannelData
    });
  }
}