import { SecretsManagerClient, GetSecretValueCommand, CreateSecretCommand, UpdateSecretCommand } from "@aws-sdk/client-secrets-manager";

// Initialize AWS Secrets Manager client
const client = new SecretsManagerClient({ 
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  } : undefined // Use default credentials (IAM role) if not provided
});

export interface TwilioCredentials {
  accountSid: string;
  authToken: string;
  apiKeySid?: string;
  apiKeySecret?: string;
}

/**
 * Get Twilio credentials from AWS Secrets Manager
 * @param accountSid - The Twilio account SID to look up
 * @returns The credentials or null if not found
 */
export async function getCredentialsFromSecrets(accountSid: string): Promise<TwilioCredentials | null> {
  try {
    // Secret name format: twilio/credentials/{accountSid}
    const secretName = `twilio/credentials/${accountSid}`;
    
    const command = new GetSecretValueCommand({
      SecretId: secretName,
    });

    const response = await client.send(command);
    
    if (response.SecretString) {
      const credentials = JSON.parse(response.SecretString) as TwilioCredentials;
      console.log(`✅ Retrieved credentials for account ${accountSid} from Secrets Manager`);
      return credentials;
    }
    
    return null;
  } catch (error: any) {
    if (error.name === 'ResourceNotFoundException') {
      console.log(`❌ No credentials found in Secrets Manager for account ${accountSid}`);
      return null;
    }
    
    console.error(`❌ Error retrieving credentials for ${accountSid}:`, error.message);
    
    // In development, you might want to throw the error
    // In production, return null to allow fallback
    if (process.env.NODE_ENV === 'development') {
      console.warn('Secrets Manager error in development - using fallback credentials');
    }
    
    return null;
  }
}

/**
 * Store or update Twilio credentials in AWS Secrets Manager
 * @param accountSid - The Twilio account SID
 * @param credentials - The credentials to store
 * @returns Success boolean
 */
export async function storeCredentialsInSecrets(
  accountSid: string, 
  credentials: Omit<TwilioCredentials, 'accountSid'>
): Promise<boolean> {
  try {
    const secretName = `twilio/credentials/${accountSid}`;
    const secretValue = JSON.stringify({
      accountSid,
      ...credentials,
      lastUpdated: new Date().toISOString()
    });

    // Try to update existing secret first
    try {
      const updateCommand = new UpdateSecretCommand({
        SecretId: secretName,
        SecretString: secretValue,
      });
      
      await client.send(updateCommand);
      console.log(`✅ Updated credentials for account ${accountSid} in Secrets Manager`);
      return true;
    } catch (updateError: any) {
      if (updateError.name === 'ResourceNotFoundException') {
        // Secret doesn't exist, create it
        const createCommand = new CreateSecretCommand({
          Name: secretName,
          SecretString: secretValue,
          Description: `Twilio credentials for account ${accountSid}`,
          Tags: [
            { Key: 'service', Value: 'twilio' },
            { Key: 'accountSid', Value: accountSid },
            { Key: 'managedBy', Value: 'v1.connie.plus' }
          ]
        });
        
        await client.send(createCommand);
        console.log(`✅ Created new credentials for account ${accountSid} in Secrets Manager`);
        return true;
      }
      throw updateError;
    }
  } catch (error: any) {
    console.error(`❌ Error storing credentials for ${accountSid}:`, error.message);
    return false;
  }
}

/**
 * Enhanced credential lookup with Secrets Manager integration
 * Falls back to environment variables if Secrets Manager fails
 */
export async function getCredentialsWithFallback(accountSid: string): Promise<{ sid: string; token: string } | null> {
  // First, try AWS Secrets Manager
  const secretsCredentials = await getCredentialsFromSecrets(accountSid);
  
  if (secretsCredentials) {
    // Prefer API Key if available, otherwise use auth token
    if (secretsCredentials.apiKeySid && secretsCredentials.apiKeySecret) {
      return {
        sid: secretsCredentials.apiKeySid,
        token: secretsCredentials.apiKeySecret
      };
    }
    
    return {
      sid: secretsCredentials.accountSid,
      token: secretsCredentials.authToken
    };
  }
  
  // Fallback to environment variables (development/testing)
  console.log(`⚠️ Using fallback credentials for account ${accountSid}`);
  
  // Development credential mapping (same as before)
  const fallbackMap: Record<string, { sid: string; token: string }> = {
    // Healthcare CBO accounts
    'AC1234healthcare': {
      sid: process.env.TWILIO_HEALTHCARE_SID || process.env.TWILIO_ACCOUNT_SID || '',
      token: process.env.TWILIO_HEALTHCARE_TOKEN || process.env.TWILIO_AUTH_TOKEN || ''
    },
    
    // Social Services CBO accounts  
    'AC9999social': {
      sid: process.env.TWILIO_SOCIAL_SID || process.env.TWILIO_ACCOUNT_SID || '',
      token: process.env.TWILIO_SOCIAL_TOKEN || process.env.TWILIO_AUTH_TOKEN || ''
    },
    
    // Default/development account
    'default': {
      sid: process.env.TWILIO_ACCOUNT_SID || '',
      token: process.env.TWILIO_AUTH_TOKEN || ''
    }
  };
  
  const credentials = fallbackMap[accountSid] || fallbackMap['default'];
  
  if (!credentials.sid || !credentials.token) {
    console.error('❌ No valid credentials found for account:', accountSid);
    return null;
  }
  
  return credentials;
}