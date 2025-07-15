import React, { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { Box } from '@twilio-paste/core/box';
import { Button } from '@twilio-paste/core/button';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Card } from '@twilio-paste/core/card';
import { Text } from '@twilio-paste/core/text';
import { Alert } from '@twilio-paste/core/alert';
import type { NextPage } from 'next';
import Head from 'next/head';

const DebugPage: NextPage = () => {
  const { isAuthenticated, user, loading, error, login, logout, checkAuth, requestTokenFromParent } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isInIframe = () => {
    if (!isClient) return false;
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  };

  const testPostMessage = () => {
    if (isInIframe()) {
      window.parent.postMessage({
        type: 'TEST_MESSAGE',
        timestamp: new Date().toISOString()
      }, process.env.NEXT_PUBLIC_ALLOWED_PARENT_ORIGIN || 'http://localhost:3001');
    } else {
      alert('Not in iframe - cannot test postMessage');
    }
  };

  return (
    <Box as="main" padding="space70">
      <Head>
        <title>Debug - Okta Authentication</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading as="h1" variant="heading10">
        🐛 Authentication Debug Page
      </Heading>

      <Box marginTop="space60">
        <Card>
          <Heading as="h2" variant="heading20">
            Authentication State
          </Heading>
          
          <Box marginTop="space40">
            <Paragraph>
              <strong>Status:</strong>{' '}
              <Text as="span" color={isAuthenticated ? 'colorTextSuccess' : 'colorTextError'}>
                {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
              </Text>
            </Paragraph>
            
            <Paragraph>
              <strong>Loading:</strong>{' '}
              <Text as="span" color={loading ? 'colorTextWarning' : 'colorTextNeutral'}>
                {loading ? 'Loading...' : 'Ready'}
              </Text>
            </Paragraph>
            
            <Paragraph>
              <strong>Context:</strong>{' '}
              <Text as="span" color={isInIframe() ? 'colorTextWarning' : 'colorTextNeutral'}>
                {isInIframe() ? 'In Iframe' : 'Standalone'}
              </Text>
            </Paragraph>
          </Box>

          {error && (
            <Box marginTop="space40">
              <Alert variant="error">
                <strong>Error:</strong> {error}
              </Alert>
            </Box>
          )}

          {user && (
            <Box marginTop="space40">
              <Heading as="h3" variant="heading30">User Info</Heading>
              <Box backgroundColor="colorBackgroundBody" padding="space40" borderRadius="borderRadius20">
                <Paragraph><strong>ID:</strong> {user.sub}</Paragraph>
                <Paragraph><strong>Name:</strong> {user.name}</Paragraph>
                <Paragraph><strong>Email:</strong> {user.email}</Paragraph>
                {user.groups && (
                  <Paragraph><strong>Groups:</strong> {user.groups.join(', ')}</Paragraph>
                )}
              </Box>
            </Box>
          )}
        </Card>
      </Box>

      <Box marginTop="space60">
        <Card>
          <Heading as="h2" variant="heading20">
            Environment Configuration
          </Heading>
          
          <Box marginTop="space40">
            <Box backgroundColor="colorBackgroundBody" padding="space40" borderRadius="borderRadius20">
              <Paragraph><strong>Okta Issuer:</strong> {process.env.NEXT_PUBLIC_OKTA_ISSUER || 'Not configured'}</Paragraph>
              <Paragraph><strong>Client ID:</strong> {process.env.NEXT_PUBLIC_OKTA_CLIENT_ID || 'Not configured'}</Paragraph>
              <Paragraph><strong>Redirect URI:</strong> {process.env.NEXT_PUBLIC_OKTA_REDIRECT_URI || 'Not configured'}</Paragraph>
              <Paragraph><strong>Allowed Parent Origin:</strong> {process.env.NEXT_PUBLIC_ALLOWED_PARENT_ORIGIN || 'Not configured'}</Paragraph>
            </Box>
          </Box>
        </Card>
      </Box>

      <Box marginTop="space60">
        <Card>
          <Heading as="h2" variant="heading20">
            Test Controls
          </Heading>
          
          <Box marginTop="space40" display="flex" flexWrap="wrap" columnGap="space40" rowGap="space40">
            <Button variant="primary" onClick={login} disabled={loading}>
              Test Login
            </Button>
            
            <Button variant="destructive" onClick={logout} disabled={loading || !isAuthenticated}>
              Test Logout
            </Button>
            
            <Button variant="secondary" onClick={checkAuth} disabled={loading}>
              Refresh Auth
            </Button>
            
            {isInIframe() && (
              <>
                <Button variant="secondary" onClick={requestTokenFromParent}>
                  Request Token from Parent
                </Button>
                
                <Button variant="secondary" onClick={testPostMessage}>
                  Test PostMessage
                </Button>
              </>
            )}
          </Box>
        </Card>
      </Box>

      <Box marginTop="space60">
        <Card>
          <Heading as="h2" variant="heading20">
            Security Headers Test
          </Heading>
          
          <Box marginTop="space40">
            <Paragraph>
              Open browser DevTools → Network tab and check for these headers:
            </Paragraph>
            <Box backgroundColor="colorBackgroundBody" padding="space40" borderRadius="borderRadius20" marginTop="space30">
              <Paragraph>✅ <strong>X-Frame-Options:</strong> ALLOW-FROM https://flex.twilio.com</Paragraph>
              <Paragraph>✅ <strong>Content-Security-Policy:</strong> frame-ancestors 'self' https://flex.twilio.com</Paragraph>
              <Paragraph>✅ <strong>Access-Control-Allow-Origin:</strong> https://flex.twilio.com</Paragraph>
            </Box>
          </Box>
        </Card>
      </Box>

      <Box marginTop="space60">
        <Alert variant="neutral">
          <Heading as="h3" variant="heading40">Testing Instructions</Heading>
          <Paragraph>
            1. <strong>Standalone:</strong> Test authentication at this URL<br/>
            2. <strong>Iframe:</strong> Open test-iframe.html in browser<br/>
            3. <strong>Security:</strong> Check Network tab for headers<br/>
            4. <strong>Messages:</strong> Monitor console for postMessage activity
          </Paragraph>
        </Alert>
      </Box>
    </Box>
  );
};

export default DebugPage;