// components/AuthGuard.tsx
import React from 'react';
import { useAuth } from '../lib/auth';
import { Box } from '@twilio-paste/core/box';
import { Button } from '@twilio-paste/core/button';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Spinner } from '@twilio-paste/core/spinner';
import { Alert } from '@twilio-paste/core/alert';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, fallback }) => {
  const { isAuthenticated, loading, error, login } = useAuth();

  // Loading state
  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        padding="space70"
      >
        <Box textAlign="center">
          <Spinner decorative={false} title="Loading..." size="sizeIcon40" />
          <Paragraph>Checking authentication...</Paragraph>
        </Box>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box padding="space70">
        <Alert variant="error">
          <Heading as="h2" variant="heading30">Authentication Error</Heading>
          <Paragraph>{error}</Paragraph>
          <Button variant="primary" onClick={login}>
            Try Again
          </Button>
        </Alert>
      </Box>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        padding="space70"
      >
        <Box textAlign="center" maxWidth="400px">
          <Heading as="h1" variant="heading30">
            Authentication Required
          </Heading>
          <Paragraph>
            Please log in to access this application. You'll be redirected to Okta for authentication.
          </Paragraph>
          <Button variant="primary" onClick={login}>
            Log In
          </Button>
        </Box>
      </Box>
    );
  }

  // Authenticated - render children
  return <>{children}</>;
};

// Higher-order component for page-level protection
export const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    return (
      <AuthGuard>
        <Component {...props} />
      </AuthGuard>
    );
  };

  AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;
  return AuthenticatedComponent;
};