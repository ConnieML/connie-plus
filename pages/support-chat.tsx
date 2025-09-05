import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box } from '@twilio-paste/core/box';
import { Card } from '@twilio-paste/core/card';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Spinner } from '@twilio-paste/core/spinner';
import { Alert } from '@twilio-paste/core/alert';
import { Text } from '@twilio-paste/core/text';
import { ChatIcon } from '@twilio-paste/icons/cjs/ChatIcon';

const SupportChat: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [agentContext, setAgentContext] = useState<{
    name?: string;
    email?: string;
    accountSid?: string;
  }>({});

  useEffect(() => {
    // Ensure this only runs on the client side and when router is ready
    if (typeof window === 'undefined' || !router.isReady) {
      return;
    }

    const { agentName, agentEmail, accountSid } = router.query;

    // Validate required parameters
    if (!agentName || !agentEmail || !accountSid) {
      setError('🔐 Authorization Required: This support chat is only available to authenticated Connie agents. Please access this page through your Connie interface to get live support.');
      setIsLoading(false);
      return;
    }

    // Store agent context
    setAgentContext({
      name: agentName as string,
      email: agentEmail as string,
      accountSid: accountSid as string,
    });

    // Initialize WebChat with context
    initializeWebChat(agentName as string, agentEmail as string, accountSid as string);
  }, [router.isReady, router.query]);

  const initializeWebChat = (agentName: string, agentEmail: string, accountSid: string) => {
    // Determine organization friendly name from account SID prefix
    const orgMapping: Record<string, string> = {
      'ACac45c': 'DevSandBox',
      'AC595d7': 'HHOVV', 
      'AC82c28': 'NSS'
    };
    
    // Match account SID prefix to organization
    const orgKey = Object.keys(orgMapping).find(key => accountSid.startsWith(key));
    const organizationName = orgKey ? orgMapping[orgKey] : 'Unknown Account';

    // Wait for Twilio WebChat 3.0 to be available
    const checkTwilio = () => {
      // @ts-ignore
      if (window.Twilio && window.Twilio.initWebchat) {
        // Ensure target element exists in DOM before initializing
        const targetElement = document.getElementById('twilio-webchat-widget-root');
        if (!targetElement) {
          console.log('Target element not ready, retrying...');
          setTimeout(checkTwilio, 100);
          return;
        }
        const appConfig = {
          deploymentKey: 'CVd30e7280b3cd760a06c6aa0ab44bb13b', // Care Team deployment key
          targetElement: 'twilio-webchat-widget-root', // Target container
          context: {
            // Pass agent information as context to Care Team
            customerName: agentName,
            customerEmail: agentEmail,
            requestingAccountSid: accountSid,
            requestingOrganization: organizationName,
            supportRequestType: 'agent-support',
            userType: 'flex-agent',
            source: 'enhanced_crm_container'
          }
        };

        console.log(`Initializing WebChat for ${agentName} from ${organizationName}`);
        
        try {
          // @ts-ignore
          window.Twilio.initWebchat(appConfig);
          console.log('WebChat initialized successfully!');
          setIsLoading(false);
        } catch (error) {
          console.error('Failed to initialize WebChat:', error);
          setError('Failed to initialize support chat. Please try again or contact your administrator.');
          setIsLoading(false);
        }
      } else {
        console.log('Twilio WebChat not ready, retrying...');
        setTimeout(checkTwilio, 500);
      }
    };

    checkTwilio();
  };

  // Load Twilio WebChat 3.0 script
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if Twilio WebChat is already loaded
    // @ts-ignore
    if (window.Twilio?.initWebchat) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://media.twiliocdn.com/sdk/js/webchat-v3/releases/3.3.0/webchat.min.js';
    script.integrity = 'sha256-ydLLXnNrb26iFUvKAHsYt9atwfzz0LNcgBmo0NmD5Uk=';
    script.crossOrigin = 'anonymous';
    script.defer = true;
    script.onload = () => {
      console.log('Twilio WebChat 3.0 SDK loaded');
    };
    script.onerror = () => {
      setError('Failed to load WebChat. Please refresh the page and try again.');
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Get Support - Connie Care Team</title>
        <meta name="description" content="Request live support from the Connie Care Team" />
      </Head>

      <Box padding="space60" minHeight="100vh" backgroundColor="colorBackground">
        <Box maxWidth="800px" marginX="auto">
          {error && (
            <Box marginBottom="space60">
              <Alert variant="error">
                <Text as="div">{error}</Text>
              </Alert>
            </Box>
          )}

          <Card padding="space60">
            <Box display="flex" alignItems="center" marginBottom="space40">
              <ChatIcon decorative />
              <Box marginLeft="space30">
                <Heading as="h1" variant="heading20">
                  Connie Support Chat
                </Heading>
              </Box>
            </Box>

            {agentContext.name && !error && (
              <Box marginBottom="space40">
                <Paragraph>
                  <Text as="span" fontWeight="fontWeightMedium">Agent:</Text> {agentContext.name} ({agentContext.email})
                </Paragraph>
                <Paragraph marginBottom="space0">
                  <Text as="span" fontWeight="fontWeightMedium">Account:</Text> {agentContext.accountSid}
                </Paragraph>
              </Box>
            )}

            {isLoading && !error && (
              <Box display="flex" alignItems="center" justifyContent="center" padding="space80">
                <Spinner decorative={false} title="Initializing support chat..." size="sizeIcon60" />
                <Text as="span" marginLeft="space30">Connecting you to the Care Team...</Text>
              </Box>
            )}

            {!error && !isLoading && (
              <Box marginTop="space40">
                <Paragraph marginBottom="space0">
                  You're now connected to our Care Team. They can see your account information and are ready to assist you.
                </Paragraph>
                
                {/* WebChat 3.0 will automatically create its widget here */}
                <Box id="twilio-webchat-widget-root" minHeight="500px" />
              </Box>
            )}
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default SupportChat;