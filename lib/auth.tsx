import React, { useState, useEffect, createContext, useContext } from 'react';
import { OktaAuth } from '@okta/okta-auth-js';

// Security configuration
const ALLOWED_PARENT_ORIGIN = process.env.NEXT_PUBLIC_ALLOWED_PARENT_ORIGIN || 'https://flex.twilio.com';

// Okta configuration
const oktaConfig = {
  issuer: process.env.NEXT_PUBLIC_OKTA_ISSUER || 'https://your-okta-domain.okta.com/oauth2/default',
  clientId: process.env.NEXT_PUBLIC_OKTA_CLIENT_ID || 'your-client-id',
  redirectUri: process.env.NEXT_PUBLIC_OKTA_REDIRECT_URI || 'https://v1.connie.plus/callback',
  scopes: ['openid', 'profile', 'email', 'groups'],
  pkce: true,
  // Configure token manager for automatic renewal
  tokenManager: {
    autoRenew: true,
    secure: true
  },
  restoreOriginalUri: async (_oktaAuth: any, originalUri?: string) => {
    const uri = originalUri || '/';
    // In iframe context, we need to handle navigation differently
    if (window.parent !== window) {
      // We're in an iframe, use postMessage to communicate with parent - WITH SECURITY
      window.parent.postMessage({
        type: 'OKTA_AUTH_SUCCESS',
        redirectUri: uri
      }, ALLOWED_PARENT_ORIGIN); // ✅ Secure origin instead of '*'
    } else {
      // Standard navigation
      window.location.replace(uri);
    }
  }
};

export const oktaAuth = new OktaAuth(oktaConfig);

// Types
export interface User {
  sub: string;
  name: string;
  email: string;
  groups?: string[];
  [key: string]: any;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  accountSid: string | null; // NEW: Twilio account context from Flex
}

// Auth Context
const AuthContext = createContext<AuthState & {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  requestTokenFromParent: () => void;
}>({
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
  checkAuth: async () => {},
  requestTokenFromParent: () => {}
});

export const useAuth = () => useContext(AuthContext);

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
    accountSid: null // NEW: Initialize account context
  });

  // Check if we're in an iframe
  const isInIframe = () => {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  };

  // Silent authentication for iframe context
  const silentAuth = async () => {
    try {
      const tokenContainer = await oktaAuth.token.getWithoutPrompt();
      oktaAuth.tokenManager.setTokens(tokenContainer.tokens);
      return true;
    } catch (error) {
      // Different error handling based on error type
      if (error instanceof Error) {
        console.log('Silent auth failed:', error.message);
        
        // Check if it's a network error or auth error
        if (error.message.includes('network') || error.message.includes('timeout')) {
          // Network issues - might retry
          console.warn('Network error during silent auth, may retry');
        } else if (error.message.includes('login_required')) {
          // User needs to login - expected behavior
          console.log('User login required - expected for first time users');
        }
      } else {
        console.log('Silent auth failed with unknown error:', error);
      }
      return false;
    }
  };

  // Check authentication status
  const checkAuth = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      // First check if we have valid tokens
      let isAuthenticated = await oktaAuth.isAuthenticated();
      
      // If not authenticated, try to restore tokens from storage
      if (!isAuthenticated) {
        try {
          // Try to get tokens without prompting
          await oktaAuth.token.getWithoutPrompt();
          isAuthenticated = await oktaAuth.isAuthenticated();
        } catch (error) {
          console.log('Token restoration failed:', error);
        }
      }
      
      if (isAuthenticated) {
        const userInfo = await oktaAuth.getUser();
        setAuthState({
          isAuthenticated: true,
          user: userInfo as User,
          loading: false,
          error: null,
          accountSid: null // Okta auth doesn't provide accountSid
        });
        return;
      }

      // If not authenticated and in iframe, try silent auth
      if (isInIframe()) {
        const silentSuccess = await silentAuth();
        if (silentSuccess) {
          const userInfo = await oktaAuth.getUser();
          setAuthState({
            isAuthenticated: true,
            user: userInfo as User,
            loading: false,
            error: null,
            accountSid: null // Silent auth doesn't provide accountSid
          });
          return;
        }
        
        // If silent auth fails, request token from parent
        requestTokenFromParent();
      }

      // Not authenticated
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
        accountSid: null
      });
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Authentication error',
        accountSid: null
      });
    }
  };

  // Request fresh token from parent
  const requestTokenFromParent = () => {
    if (isInIframe()) {
      window.parent.postMessage({
        type: 'REQUEST_TOKEN'
      }, ALLOWED_PARENT_ORIGIN);
    }
  };

  // Login function
  const login = async () => {
    try {
      console.log('🔐 Login function called');
      console.log('🔧 Okta config:', {
        issuer: oktaConfig.issuer,
        clientId: oktaConfig.clientId,
        redirectUri: oktaConfig.redirectUri
      });
      
      if (isInIframe()) {
        // In Enhanced CRM Container, request authentication context from Flex
        console.log('🔗 Requesting authentication from Flex Enhanced CRM Container');
        window.parent.postMessage({
          type: 'REQUEST_AUTH_CONTEXT'
        }, ALLOWED_PARENT_ORIGIN);
      } else {
        // Standard login flow
        console.log('🚀 Calling oktaAuth.signInWithRedirect()');
        await oktaAuth.signInWithRedirect();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      console.error('Login error:', errorMessage);
      setAuthState(prev => ({
        ...prev,
        error: errorMessage
      }));
    }
  };

  // Logout function with parent synchronization
  const logout = async () => {
    try {
      // Clear local session
      await oktaAuth.signOut();
      
      // Notify parent to logout as well (for synchronized logout)
      if (isInIframe()) {
        window.parent.postMessage({
          type: 'REQUEST_LOGOUT'
        }, ALLOWED_PARENT_ORIGIN);
      }
      
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
        accountSid: null
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Logout failed';
      console.error('Logout error:', errorMessage);
      setAuthState(prev => ({
        ...prev,
        error: errorMessage
      }));
    }
  };

  // Initialize auth on mount
  useEffect(() => {
    checkAuth();

    // Listen for token changes
    const handleTokenChange = () => {
      checkAuth();
    };

    // Handle token errors (expired, invalid, etc.)
    const handleTokenError = (error: any) => {
      console.error('Token error:', error);
      
      // If in iframe, try to get fresh token from parent
      if (isInIframe()) {
        requestTokenFromParent();
      } else {
        // Clear auth state on token error
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: 'Session expired. Please log in again.',
          accountSid: null
        });
      }
    };

    oktaAuth.tokenManager.on('added', handleTokenChange);
    oktaAuth.tokenManager.on('removed', handleTokenChange);
    oktaAuth.tokenManager.on('renewed', handleTokenChange);
    oktaAuth.tokenManager.on('error', handleTokenError);

    // Listen for messages from parent window (Flex) - WITH SECURITY
    const handleMessage = (event: MessageEvent) => {
      // ✅ SECURITY: Validate origin before processing message
      if (event.origin !== ALLOWED_PARENT_ORIGIN) {
        console.warn('Received message from untrusted origin:', event.origin);
        return;
      }

      const { type, token, user, tokens, accountSid } = event.data || {};
      
      switch (type) {
        case 'auth':
          // Enhanced CRM Container authentication (Twilio's standard protocol)
          console.log('Received Flex authentication context:', { token, user, accountSid });
          if (token && user) {
            // Store Flex authentication context
            (window as any).flexAuthToken = token;
            (window as any).flexUser = user;
            (window as any).flexAccountSid = accountSid; // NEW: Store account context
            
            // Update authentication state with account context
            setAuthState({
              isAuthenticated: true,
              user: user,
              loading: false,
              error: null,
              accountSid: accountSid || null // NEW: Include account context
            });
          }
          break;
          
        case 'FLEX_AUTH_TOKEN':
          // Legacy format - Parent (Flex) is sharing auth token
          if (tokens) {
            oktaAuth.tokenManager.setTokens(tokens);
            checkAuth();
          }
          break;
          
        case 'FLEX_LOGOUT':
          // Parent is requesting logout
          logout();
          break;
          
        case 'FLEX_TOKEN_REFRESH':
          // Parent is providing refreshed token
          if (tokens) {
            oktaAuth.tokenManager.setTokens(tokens);
            checkAuth();
          }
          break;
          
        default:
          console.log('Unknown message type from parent:', type);
      }
    };

    if (isInIframe()) {
      window.addEventListener('message', handleMessage);
      
      // Signal to parent that we're ready to receive authentication context
      window.parent.postMessage({ type: 'ready' }, ALLOWED_PARENT_ORIGIN);
      console.log('Sent ready signal to parent:', ALLOWED_PARENT_ORIGIN);
    }

    return () => {
      oktaAuth.tokenManager.off('added', handleTokenChange);
      oktaAuth.tokenManager.off('removed', handleTokenChange);
      oktaAuth.tokenManager.off('renewed', handleTokenChange);
      oktaAuth.tokenManager.off('error', handleTokenError);
      if (isInIframe()) {
        window.removeEventListener('message', handleMessage);
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      checkAuth,
      requestTokenFromParent
    }}>
      {children}
    </AuthContext.Provider>
  );
};
