import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if current time is within business hours (9 AM - 5 PM PST)
  const now = new Date();
  const pstOffset = -8; // PST is UTC-8
  const utcHours = now.getUTCHours();
  const pstHours = (utcHours + pstOffset + 24) % 24;
  const dayOfWeek = now.getUTCDay();
  
  // Business hours: Monday-Friday, 9 AM - 5 PM PST
  const isBusinessHours = dayOfWeek >= 1 && dayOfWeek <= 5 && pstHours >= 9 && pstHours < 17;
  
  // TODO: In production, you would also check:
  // - If any support agents are actually online in Twilio Flex
  // - If the chat queue isn't full
  // - If there's a scheduled maintenance window
  
  res.status(200).json({
    available: isBusinessHours,
    businessHours: '9:00 AM - 5:00 PM PST',
    currentTime: now.toISOString(),
    message: isBusinessHours 
      ? 'Support agents are available' 
      : 'Support is currently offline. Please submit an email ticket.'
  });
}