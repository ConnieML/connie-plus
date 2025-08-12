import { NextApiRequest, NextApiResponse } from 'next';

/**
 * NSS Analytics API Proxy - Level 2 Integration
 * Proxies NSS analytics requests to Twilio serverless function
 * 
 * Architecture: connie.plus → This Proxy → Twilio Serverless → TaskRouter API
 * URL: /api/analytics
 * Access: Designed for NSS account via ConnieRTC CRM Container
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('🚀 NSS Analytics API Proxy - Level 2 Integration');
  console.log('Method:', req.method);
  console.log('Timestamp:', new Date().toISOString());

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowed: ['GET'] 
    });
  }

  try {
    // NSS Analytics Twilio serverless function URL (Level 2 Implementation)
    // Correct URL with /functions/ path - verified Aug 12, 2025
    const TWILIO_FUNCTION_URL = 'https://analytics-reader-functions-4971-dev.twil.io/functions/dashboard-data';
    
    console.log('📡 Calling Twilio function:', TWILIO_FUNCTION_URL);

    const twilioResponse = await fetch(TWILIO_FUNCTION_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'connie-plus-analytics/1.0'
      },
    });

    console.log('📊 Twilio response status:', twilioResponse.status);

    if (!twilioResponse.ok) {
      console.error('❌ Twilio function error:', twilioResponse.status);
      return res.status(twilioResponse.status).json({ 
        error: 'Failed to fetch analytics data',
        status: twilioResponse.status,
        statusText: twilioResponse.statusText
      });
    }

    const data = await twilioResponse.json();
    console.log('✅ Analytics data retrieved successfully');
    console.log('📈 Data source:', data.source);

    // Log key metrics for monitoring
    if (data.success && data.data) {
      console.log('📊 Key metrics:', {
        total_calls: data.data.total_calls,
        avg_handle_time: data.data.avg_handle_time,
        utilization: data.data.agent_utilization
      });
    }

    res.status(200).json(data);

  } catch (error) {
    console.error('❌ Analytics proxy error:', error);
    
    // Return fallback error response
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      service: 'analytics-proxy'
    });
  }
}