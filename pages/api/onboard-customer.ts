import type { NextApiRequest, NextApiResponse } from 'next';
import { extractUserToken, isUserAuthorizedForAccount, decodeUserToken, logAccountAccess } from '../../lib/account-validation';
import { storeCredentialsInSecrets } from '../../lib/secrets-manager';
import twilio from 'twilio';

interface OnboardRequest {
  organizationName: string;
  accountSid: string;
  authToken?: string;
  apiKeySid?: string;
  apiKeySecret?: string;
  adminEmail: string;
  adminName: string;
}

interface OnboardResponse {
  success: boolean;
  message?: string;
  error?: string;
  accountDetails?: {
    accountSid: string;
    organizationName: string;
    phoneNumbers: number;
    messagingServices: number;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OnboardResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  // Extract and validate user token
  const userToken = extractUserToken(req);
  const decodedToken = userToken ? decodeUserToken(userToken) : null;
  
  // Check if user is a super admin (only they can onboard new customers)
  if (!decodedToken || !decodedToken.groups?.includes('ConnieOne-Admins')) {
    logAccountAccess(
      decodedToken?.email,
      'onboarding-attempt',
      'customer_onboard',
      false,
      req.headers['user-agent']
    );
    
    return res.status(403).json({
      success: false,
      error: 'Unauthorized: Only administrators can onboard new customers'
    });
  }

  // Validate request body
  const {
    organizationName,
    accountSid,
    authToken,
    apiKeySid,
    apiKeySecret,
    adminEmail,
    adminName
  } = req.body as OnboardRequest;

  // Validate required fields
  if (!organizationName || !accountSid || !adminEmail || !adminName) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: organizationName, accountSid, adminEmail, adminName'
    });
  }

  // Validate credentials - must provide either authToken OR apiKey pair
  if (!authToken && (!apiKeySid || !apiKeySecret)) {
    return res.status(400).json({
      success: false,
      error: 'Must provide either authToken or both apiKeySid and apiKeySecret'
    });
  }

  try {
    // Validate the provided Twilio credentials by making a test API call
    console.log(`🔍 Validating Twilio credentials for account ${accountSid}...`);
    
    let testClient;
    if (apiKeySid && apiKeySecret) {
      testClient = twilio(apiKeySid, apiKeySecret, { accountSid });
    } else {
      testClient = twilio(accountSid, authToken!);
    }

    // Test the credentials by fetching account details
    const account = await testClient.api.accounts(accountSid).fetch();
    const phoneNumbers = await testClient.incomingPhoneNumbers.list({ limit: 1 });
    const messagingServices = await testClient.messaging.v1.services.list({ limit: 1 });

    console.log(`✅ Credentials validated for ${account.friendlyName}`);

    // Store credentials in AWS Secrets Manager
    const credentialsStored = await storeCredentialsInSecrets(accountSid, {
      authToken: authToken || '',
      apiKeySid,
      apiKeySecret
    });

    if (!credentialsStored) {
      throw new Error('Failed to store credentials in Secrets Manager');
    }

    // Log successful onboarding
    logAccountAccess(
      decodedToken.email,
      accountSid,
      'customer_onboard_success',
      true,
      req.headers['user-agent']
    );

    // TODO: Additional steps for complete onboarding:
    // 1. Add organization to database
    // 2. Create Okta group for organization
    // 3. Add authorized_accounts claim to admin user
    // 4. Send welcome email to admin
    // 5. Create initial audit log entry

    res.status(200).json({
      success: true,
      message: `Successfully onboarded ${organizationName}`,
      accountDetails: {
        accountSid: account.sid,
        organizationName: account.friendlyName || organizationName,
        phoneNumbers: phoneNumbers.length,
        messagingServices: messagingServices.length
      }
    });

  } catch (error: any) {
    console.error('❌ Onboarding error:', error.message);
    
    // Log failed onboarding attempt
    logAccountAccess(
      decodedToken.email,
      accountSid,
      'customer_onboard_failed',
      false,
      req.headers['user-agent']
    );

    // Determine if it's a credential error or system error
    if (error.message?.includes('Authenticate') || error.status === 401) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Twilio credentials provided. Please check and try again.'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to onboard customer. Please check the logs and try again.'
    });
  }
}

// Example usage:
// POST /api/onboard-customer
// Headers: { Authorization: 'Bearer <okta-jwt-token>' }
// Body: {
//   "organizationName": "Healthcare CBO",
//   "accountSid": "ACxxxxxxxxxxxxxxxxxx",
//   "authToken": "xxxxxxxxxxxxxxxxxx", // OR use API key below
//   "apiKeySid": "SKxxxxxxxxxxxxxxxxxx",
//   "apiKeySecret": "xxxxxxxxxxxxxxxxxx",
//   "adminEmail": "admin@healthcarecbo.org",
//   "adminName": "John Admin"
// }