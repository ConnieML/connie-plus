import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box } from '@twilio-paste/core/box';
import { Card } from '@twilio-paste/core/card';
import { Heading } from '@twilio-paste/core/heading';
import { Button } from '@twilio-paste/core/button';
import { Stack } from '@twilio-paste/core/stack';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Text } from '@twilio-paste/core/text';
import { Alert } from '@twilio-paste/core/alert';
import { ChatIcon } from '@twilio-paste/icons/cjs/ChatIcon';
import { NewIcon } from '@twilio-paste/icons/cjs/NewIcon';

const SupportPortal: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Support Portal - Connie</title>
        <meta name="description" content="Get support from the Connie Care Team" />
      </Head>

      <Box padding="space60" minHeight="100vh" backgroundColor="colorBackground">
        <Box maxWidth="1000px" marginX="auto">
          <Box marginBottom="space60">
            <Heading as="h1" variant="heading10">
              Connie Support Portal
            </Heading>
          </Box>

          <Stack orientation="vertical" spacing="space50">
            {/* Support Options Cards */}
            <Box display="flex" flexWrap="wrap" columnGap="space60" rowGap="space50">
              
              {/* Live Chat Card */}
              <Box
                backgroundColor="colorBackgroundBody"
                borderStyle="solid"
                borderWidth="borderWidth10"
                borderColor="colorBorder"
                borderRadius="borderRadius30"
                padding="space70"
                display="flex"
                flexDirection="column"
                height="100%"
                position="relative"
                transition="all 0.2s ease"
                _hover={{
                  boxShadow: 'shadowHigh',
                  transform: 'translateY(-2px)',
                  borderColor: 'colorBorderPrimary'
                }}
                style={{
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px 0 rgba(0,0,0,0.10)',
                  width: 'calc(50% - 30px)',
                  minWidth: '300px'
                }}
              >
                {/* Card Header */}
                <Box display="flex" alignItems="flex-start" justifyContent="space-between" marginBottom="space50">
                  <Box
                    width="40px"
                    height="40px"
                    backgroundColor="colorBackgroundPrimaryWeakest"
                    borderRadius="borderRadius30"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <ChatIcon decorative={true} size="sizeIcon50" />
                  </Box>
                  
                  <Box
                    display="inline-flex"
                    alignItems="center"
                    paddingX="space40"
                    paddingY="space20"
                    borderRadius="borderRadius20"
                    backgroundColor="colorBackgroundSuccess"
                  >
                    <Text
                      as="span"
                      fontSize="fontSize10"
                      fontWeight="fontWeightBold"
                      color="colorTextInverse"
                      textTransform="uppercase"
                      letterSpacing="wider"
                    >
                      LIVE SUPPORT
                    </Text>
                  </Box>
                </Box>
                
                {/* Card Content */}
                <Box flexGrow={1} display="flex" flexDirection="column">
                  <Box marginBottom="space30">
                    <Text as="h3" fontSize="fontSize50" fontWeight="fontWeightBold" color="colorText">
                      Live Support Chat
                    </Text>
                  </Box>
                  
                  <Text as="p" color="colorTextWeak" fontSize="fontSize30" marginBottom="space50">
                    Connect directly with our Care Team via live chat for immediate assistance.
                  </Text>
                  
                  {/* Start Support Chat Button */}
                  <Stack orientation="vertical" spacing="space40">
                    <Button 
                      variant="primary" 
                      onClick={() => {
                        // Get agent context from URL parameters if available
                        const urlParams = new URLSearchParams(window.location.search);
                        const agentName = urlParams.get('agentName') || urlParams.get('userName');
                        const agentEmail = urlParams.get('agentEmail') || urlParams.get('userEmail');
                        const accountSid = urlParams.get('accountSid');

                        // Navigate to the support chat page with agent context
                        const supportUrl = `/support-chat?agentName=${encodeURIComponent(agentName || '')}&agentEmail=${encodeURIComponent(agentEmail || '')}&accountSid=${encodeURIComponent(accountSid || '')}`;
                        window.location.href = supportUrl;
                      }}
                      size="default"
                    >
                      Start Support Chat
                    </Button>
                    
                    <Alert variant="neutral">
                      <Text as="p" fontSize="fontSize30">
                        <strong>Note:</strong> This will connect you directly with our Care Team via live chat.
                      </Text>
                    </Alert>
                  </Stack>
                </Box>
              </Box>

              {/* Support Ticket Card */}
              <Box
                backgroundColor="colorBackgroundBody"
                borderStyle="solid"
                borderWidth="borderWidth10"
                borderColor="colorBorder"
                borderRadius="borderRadius30"
                padding="space70"
                display="flex"
                flexDirection="column"
                height="100%"
                position="relative"
                transition="all 0.2s ease"
                _hover={{
                  boxShadow: 'shadowHigh',
                  transform: 'translateY(-2px)',
                  borderColor: 'colorBorderPrimary'
                }}
                style={{
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px 0 rgba(0,0,0,0.10)',
                  width: 'calc(50% - 30px)',
                  minWidth: '300px'
                }}
                onClick={() => router.push('/support/create-ticket')}
              >
                {/* Card Header */}
                <Box display="flex" alignItems="flex-start" justifyContent="space-between" marginBottom="space50">
                  <Box
                    width="40px"
                    height="40px"
                    backgroundColor="colorBackgroundPrimaryWeakest"
                    borderRadius="borderRadius30"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <NewIcon decorative={true} size="sizeIcon50" />
                  </Box>
                  
                  <Box
                    display="inline-flex"
                    alignItems="center"
                    paddingX="space40"
                    paddingY="space20"
                    borderRadius="borderRadius20"
                    backgroundColor="colorBackgroundWarning"
                  >
                    <Text
                      as="span"
                      fontSize="fontSize10"
                      fontWeight="fontWeightBold"
                      color="colorTextInverse"
                      textTransform="uppercase"
                      letterSpacing="wider"
                    >
                      24/7 TRACKING
                    </Text>
                  </Box>
                </Box>
                
                {/* Card Content */}
                <Box flexGrow={1} display="flex" flexDirection="column">
                  <Box marginBottom="space30">
                    <Text as="h3" fontSize="fontSize50" fontWeight="fontWeightBold" color="colorText">
                      Submit Support Ticket
                    </Text>
                  </Box>
                  
                  <Text as="p" color="colorTextWeak" fontSize="fontSize30" marginBottom="space50">
                    Create detailed tickets with tracking - available 24/7.
                  </Text>
                </Box>
              </Box>
            </Box>

            {/* Additional Information */}
            <Card>
              <Stack orientation="vertical" spacing="space40">
                <Heading as="h2" variant="heading30">
                  Need Help?
                </Heading>
                <Paragraph>
                  Our Care Team is here to help with any questions or issues you may have. 
                  Choose live chat for immediate assistance, or submit a ticket for detailed tracking.
                </Paragraph>
              </Stack>
            </Card>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default SupportPortal;