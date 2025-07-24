import { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';
import { getCredentialsWithFallback } from './secrets-manager';

export interface DecodedToken {
  sub: string;
  name: string;
  email: string;
  groups?: string[];
  organization_id?: string;
  twilio_account_sid?: string;
  authorized_accounts?: string[];
  [key: string]: any;
}

/**
 * Extracts and validates the user token from the request
 * Supports both Authorization header and query parameter
 */
export function extractUserToken(req: NextApiRequest): string | null {
  // Try Authorization header first
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Fallback to query parameter (for iframe contexts)
  const tokenParam = req.query.token;
  if (typeof tokenParam === 'string') {
    return tokenParam;
  }
  
  return null;
}

/**
 * Decodes JWT token without verification (for development)
 * In production, this should verify the token signature
 */
export function decodeUserToken(token: string): DecodedToken | null {
  try {
    // For development - decode without verification
    // TODO: Add proper JWT verification in production
    const decoded = jwt.decode(token) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

/**
 * Validates that the authenticated user is authorized to access the requested accountSid
 * This is the critical security function that prevents cross-account access
 */
export function isUserAuthorizedForAccount(userToken: string | null, requestedAccountSid: string): boolean {
  if (!userToken || !requestedAccountSid) {
    console.warn('Missing token or accountSid for authorization check');
    return false;
  }
  
  const decodedToken = decodeUserToken(userToken);
  if (!decodedToken) {
    console.warn('Failed to decode user token');
    return false;
  }
  
  console.log('Authorization check:', {
    user: decodedToken.email,
    requestedAccount: requestedAccountSid,
    userGroups: decodedToken.groups,
    authorizedAccounts: decodedToken.authorized_accounts
  });
  
  // Method 1: Direct account mapping in Okta custom claims
  if (decodedToken.twilio_account_sid === requestedAccountSid) {
    console.log('✅ Access granted via direct account mapping');
    return true;
  }
  
  // Method 2: Authorized accounts list in Okta custom claims
  if (decodedToken.authorized_accounts?.includes(requestedAccountSid)) {
    console.log('✅ Access granted via authorized accounts list');
    return true;
  }
  
  // Method 3: Organization-based mapping (for development/testing)
  // This would be replaced with proper account mapping in production
  const orgAccountMapping: Record<string, string[]> = {
    'connie-healthcare': ['AC1234healthcare', 'AC5678healthcare'],
    'connie-social': ['AC9999social', 'AC0000social'],
    'connie-education': ['AC1111education']
  };
  
  if (decodedToken.organization_id) {
    const allowedAccounts = orgAccountMapping[decodedToken.organization_id] || [];
    if (allowedAccounts.includes(requestedAccountSid)) {
      console.log('✅ Access granted via organization mapping');
      return true;
    }
  }
  
  // Method 4: Group-based access (fallback for existing users)
  // Allow ConnieOne-Admins to access any account during transition period
  if (decodedToken.groups?.includes('ConnieOne-Admins')) {
    console.log('⚠️ Access granted via admin group (transition period only)');
    return true;
  }
  
  console.warn('❌ Access denied - user not authorized for account:', {
    user: decodedToken.email,
    requestedAccount: requestedAccountSid,
    availableMethods: ['twilio_account_sid', 'authorized_accounts', 'organization_id', 'groups']
  });
  
  return false;
}

/**
 * Gets Twilio API credentials for a specific account
 * Now integrated with AWS Secrets Manager for production use
 */
export async function getCredentialsForAccount(accountSid: string): Promise<{ sid: string; token: string } | null> {
  // Use the enhanced lookup that tries Secrets Manager first, then falls back
  return await getCredentialsWithFallback(accountSid);
}

/**
 * Audit logging for account access
 * Important for security monitoring and compliance
 */
export function logAccountAccess(
  userEmail: string | undefined,
  accountSid: string,
  action: string,
  success: boolean,
  userAgent?: string
) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    user: userEmail || 'unknown',
    accountSid,
    action,
    success,
    userAgent,
    ip: 'unknown' // Would extract from request in production
  };
  
  // TODO: Send to proper logging service (DataDog, CloudWatch, etc.)
  console.log('AUDIT:', JSON.stringify(logEntry));
}