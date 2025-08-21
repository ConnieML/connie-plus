import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box } from '@twilio-paste/core/box';
import { Card } from '@twilio-paste/core/card';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Button } from '@twilio-paste/core/button';
import { Stack } from '@twilio-paste/core/stack';
import { Spinner } from '@twilio-paste/core/spinner';
import { Text } from '@twilio-paste/core/text';
import { Anchor } from '@twilio-paste/core/anchor';
import { ChatIcon } from '@twilio-paste/icons/cjs/ChatIcon';
import { NewIcon } from '@twilio-paste/icons/cjs/NewIcon';

// TypeScript declarations for Crisp
declare global {
  interface Window {
    $crisp: any;
    CRISP_WEBSITE_ID: string;
  }
}

const GetHelpCrisp: NextPage = () => {
  const router = useRouter();
  const [supportAvailable, setSupportAvailable] = useState<boolean | null>(true);

  useEffect(() => {
    checkSupportAvailability();
  }, []);

  const checkSupportAvailability = async () => {
    try {
      const response = await fetch('/api/support/check-availability');
      const data = await response.json();
      setSupportAvailable(data.available);
    } catch (error) {
      console.error('Error checking availability:', error);
      setSupportAvailable(false);
    }
  };


  // Initialize Crisp chat
  useEffect(() => {
    // Load Crisp chat widget
    if (typeof window !== 'undefined') {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = "d7569150-ce93-42e1-8f9c-e40340a2f588";
      
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      d.getElementsByTagName("head")[0].appendChild(s);
      
      console.log('Crisp chat widget loaded');
    }
  }, []);


  return (
    <>
      <Head>
        <title>Get Support - Connie Help Center (Crisp Test)</title>
        <style>{`
          /* Simple z-index fix for any chat widgets */
          [id*="crisp"],
          [class*="crisp"] {
            z-index: 9999 !important;
          }
        `}</style>
      </Head>
      
      <Box padding="space70" maxWidth="1200px" margin="auto" backgroundColor="colorBackgroundBody">
        <Stack orientation="vertical" spacing="space60">
          <Button variant="link" size="small" onClick={() => router.back()}>
            ← Back
          </Button>

          <Heading as="h1" variant="heading10">
            Get Support (Crisp Test)
          </Heading>

          <>
              <Card>
                <Stack orientation="vertical" spacing="space60">
                  <Heading as="h2" variant="heading20">
                    Welcome to the ConnieCare Team
                  </Heading>
                  
                  <Paragraph>
                    We're here to help. Choose how you'd like to connect with our support team.
                  </Paragraph>
                  
                  {supportAvailable === null ? (
                    <Box display="flex" justifyContent="center" padding="space60">
                      <Spinner decorative size="sizeIcon40" />
                    </Box>
                  ) : (
                    <Box display="flex" columnGap="space40" flexWrap="wrap">
                      {/* Live Chat Card - Now using Crisp */}
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
                          width: 'calc(50% - 10px)',
                          minWidth: '300px'
                        }}
                        onClick={() => {
                          // Try to trigger Crisp chat if it's loaded
                          if (typeof window !== 'undefined' && window.$crisp) {
                            window.$crisp.push(["do", "chat:open"]);
                          }
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
                              CRISP TEST
                            </Text>
                          </Box>
                        </Box>
                        
                        {/* Card Content */}
                        <Box flexGrow={1} display="flex" flexDirection="column">
                          <Box marginBottom="space30">
                            <Text as="h3" fontSize="fontSize50" fontWeight="fontWeightBold" color="colorText">
                              Chat with ConnieCare Team
                            </Text>
                          </Box>
                          
                          <Text as="p" color="colorTextWeak" fontSize="fontSize30" marginBottom="space50">
                            Connect with a support agent now for immediate assistance. (Testing Crisp integration)
                          </Text>
                          
                          <Box marginBottom="space40">
                            <Anchor href="https://docs.connie.one" showExternal>
                              docs
                            </Anchor>
                          </Box>
                        </Box>
                        
                        {/* Card Metadata */}
                        <Box
                          display="flex"
                          flexWrap="wrap"
                          columnGap="space50"
                          rowGap="space20"
                          paddingTop="space50"
                          marginTop="auto"
                          borderTopStyle="solid"
                          borderTopWidth="borderWidth10"
                          borderTopColor="colorBorder"
                        >
                          <Box display="flex" alignItems="center" columnGap="space20">
                            <Text 
                              as="span" 
                              fontWeight="fontWeightSemibold" 
                              fontSize="fontSize20" 
                              color="colorTextWeak" 
                              textTransform="uppercase" 
                              letterSpacing="wider"
                            >
                              Provider
                            </Text>
                            <Text as="span" fontSize="fontSize20" color="colorText">
                              Crisp
                            </Text>
                          </Box>
                          
                          <Box display="flex" alignItems="center" columnGap="space20">
                            <Text 
                              as="span" 
                              fontWeight="fontWeightSemibold" 
                              fontSize="fontSize20" 
                              color="colorTextWeak" 
                              textTransform="uppercase" 
                              letterSpacing="wider"
                            >
                              Type
                            </Text>
                            <Text as="span" fontSize="fontSize20" color="colorText">
                              Test
                            </Text>
                          </Box>
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
                          width: 'calc(50% - 10px)',
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
                              UA TESTING
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
                          
                          <Box marginBottom="space40">
                            <Anchor href="https://docs.connie.one" showExternal>
                              docs
                            </Anchor>
                          </Box>
                        </Box>
                        
                        {/* Card Metadata */}
                        <Box
                          display="flex"
                          flexWrap="wrap"
                          columnGap="space50"
                          rowGap="space20"
                          paddingTop="space50"
                          marginTop="auto"
                          borderTopStyle="solid"
                          borderTopWidth="borderWidth10"
                          borderTopColor="colorBorder"
                        >
                          <Box display="flex" alignItems="center" columnGap="space20">
                            <Text 
                              as="span" 
                              fontWeight="fontWeightSemibold" 
                              fontSize="fontSize20" 
                              color="colorTextWeak" 
                              textTransform="uppercase" 
                              letterSpacing="wider"
                            >
                              Version
                            </Text>
                            <Text as="span" fontSize="fontSize20" color="colorText">
                              1.0.0
                            </Text>
                          </Box>
                          
                          <Box display="flex" alignItems="center" columnGap="space20">
                            <Text 
                              as="span" 
                              fontWeight="fontWeightSemibold" 
                              fontSize="fontSize20" 
                              color="colorTextWeak" 
                              textTransform="uppercase" 
                              letterSpacing="wider"
                            >
                              Type
                            </Text>
                            <Text as="span" fontSize="fontSize20" color="colorText">
                              Support
                            </Text>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Stack>
              </Card>
          </>
        </Stack>
      </Box>
    </>
  );
};

export default GetHelpCrisp;