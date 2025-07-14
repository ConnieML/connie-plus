// pages/callback.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { oktaAuth } from '../lib/auth';
import { Box } from '@twilio-paste/core/box';
import { Spinner } from '@twilio-paste/core/spinner';
import { Paragraph } from '@twilio-paste/core/paragraph';
import type { NextPage } from 'next';

const CallbackPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Handle the callback from Okta
        await oktaAuth.handleLoginRedirect();
        
        // Check if we're in an iframe
        const isInIframe = window.self !== window.top;
        
        if (isInIframe) {
          // Notify parent window of successful authentication
          window.parent.postMessage({
            type: 'OKTA_AUTH_SUCCESS',
            redirect: '/'
          }, '*');
        } else {
          // Standard redirect
          router.push('/');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        
        // Redirect to error page or home
        router.push('/?error=auth_failed');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
      padding="space70"
    >
      <Box textAlign="center">
        <Spinner decorative={false} title="Processing..." size="sizeIcon40" />
        <Paragraph>
          Processing authentication...
        </Paragraph>
      </Box>
    </Box>
  );
};

export default CallbackPage;