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
import { Alert } from '@twilio-paste/core/alert';
import { Form, FormControl, FormActions } from '@twilio-paste/core/form';
import { Label } from '@twilio-paste/core/label';
import { Input } from '@twilio-paste/core/input';
import { TextArea } from '@twilio-paste/core/textarea';
import { Select, Option } from '@twilio-paste/core/select';
import { Spinner } from '@twilio-paste/core/spinner';
import { Text } from '@twilio-paste/core/text';
import { Anchor } from '@twilio-paste/core/anchor';
import { ChatIcon } from '@twilio-paste/icons/cjs/ChatIcon';
import { NewIcon } from '@twilio-paste/icons/cjs/NewIcon';

// Declare Twilio global for TypeScript
declare global {
  interface Window {
    Twilio?: any;
  }
}

const GetHelp: NextPage = () => {
  const router = useRouter();
  const [supportAvailable, setSupportAvailable] = useState<boolean | null>(true);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [webChatLoaded, setWebChatLoaded] = useState(false);
  const [webChatInitialized, setWebChatInitialized] = useState(false);

  const [formData, setFormData] = useState({
    subject: '',
    category: 'general',
    message: '',
    userName: '',
    userEmail: '',
    organization: ''
  });

  const [chatFormData, setChatFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    checkSupportAvailability();
    detectChildAccount();
  }, []);

  // Load WebChat SDK when component mounts
  useEffect(() => {
    loadWebChatScript();
  }, []);

  const checkSupportAvailability = async () => {
    try {
      const response = await fetch('/api/support/check-availability');
      const data = await response.json();
      setSupportAvailable(data.available);
    } catch (error) {
      // Default to email if check fails
      setSupportAvailable(false);
    }
  };

  // Detect which child account is accessing this page
  const detectChildAccount = () => {
    // Check if we're in an iframe
    if (typeof window !== 'undefined' && window.parent !== window) {
      // Try to detect from referrer or parent URL
      const referrer = document.referrer;
      console.log('Detected referrer:', referrer);
      
      // Parse subdomain from referrer
      if (referrer) {
        try {
          const url = new URL(referrer);
          const hostname = url.hostname;
          
          // Store the child account info
          sessionStorage.setItem('childAccount', hostname);
          sessionStorage.setItem('isInIframe', 'true');
          
          console.log('Child account detected:', hostname);
        } catch (e) {
          console.error('Error parsing referrer:', e);
        }
      }
    }
  };

  // Load Twilio WebChat SDK
  const loadWebChatScript = () => {
    if (document.querySelector('script[src*="webchat.min.js"]')) {
      console.log('WebChat script already loaded');
      setWebChatLoaded(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://media.twiliocdn.com/sdk/js/webchat/v3.0/webchat.min.js';
    script.async = true;
    script.onload = () => {
      console.log('WebChat SDK loaded successfully');
      setWebChatLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load WebChat SDK');
    };
    document.head.appendChild(script);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Initialize WebChat with direct widget approach (Support's recommendation)
  const startWebChat = (customerData: { name: string; email: string }) => {
    if (!webChatLoaded || typeof window.Twilio === 'undefined') {
      alert('WebChat is still loading. Please try again in a moment.');
      return;
    }

    if (webChatInitialized) {
      console.log('WebChat already initialized - expanding widget');
      // If already initialized, just expand it
      if (window.Twilio?.FlexWebChat?.Actions?.toggleChatVisibility) {
        window.Twilio.FlexWebChat.Actions.toggleChatVisibility();
      }
      return;
    }

    // Get child account info from sessionStorage
    const childAccount = sessionStorage.getItem('childAccount') || 'unknown';
    const isInIframe = sessionStorage.getItem('isInIframe') === 'true';

    console.log('Initializing WebChat with context:', {
      childAccount,
      customerData,
      isInIframe
    });

    // Configuration following Support's exact pattern
    const appConfig = {
      accountSid: 'AC[redacted]', // ConnieCare Team account
      flexFlowSid: 'FO43b2a992702a247a309c284e5e0be796', // From your WebChannel list
      
      // Context to pass to parent Flex
      context: {
        childAccount: childAccount,
        agentName: customerData.name,
        agentEmail: customerData.email,
        supportRequest: true,
        timestamp: new Date().toISOString()
      },

      // Pre-engagement form configuration
      startEngagementOnInit: false,
      preEngagementConfig: {
        description: "Let's get you connected with the ConnieCare Team",
        fields: [
          {
            label: 'Name',
            type: 'InputItem',
            attributes: {
              name: 'friendlyName',
              type: 'text',
              required: true,
              value: customerData.name,
              readOnly: false
            }
          },
          {
            label: 'Email',
            type: 'InputItem',
            attributes: {
              name: 'email',
              type: 'email',
              required: true,
              value: customerData.email,
              readOnly: false
            }
          },
          {
            label: 'Your Organization',
            type: 'InputItem',
            attributes: {
              name: 'childAccount',
              type: 'text',
              required: true,
              value: childAccount,
              readOnly: true
            }
          },
          {
            label: 'How can we help?',
            type: 'TextareaItem',
            attributes: {
              name: 'question',
              type: 'text',
              required: false,
              placeholder: 'Describe your issue or question...'
            }
          }
        ],
        submitLabel: 'Start Chat with ConnieCare Team'
      },

      // UI Configuration
      colorTheme: {
        overrides: {
          backgroundColors: {
            colorBackgroundBody: '#FFFFFF'
          }
        }
      }
    };

    try {
      // Initialize WebChat
      window.Twilio.FlexWebChat.renderWebChat(appConfig);
      setWebChatInitialized(true);
      
      console.log('WebChat initialized successfully');
      
      // Auto-open the chat widget after a brief delay
      setTimeout(() => {
        if (window.Twilio?.FlexWebChat?.Actions?.toggleChatVisibility) {
          window.Twilio.FlexWebChat.Actions.toggleChatVisibility();
        }
      }, 500);
      
    } catch (error) {
      console.error('Failed to initialize WebChat:', error);
      alert('Failed to start chat. Please try again or use the support ticket option.');
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/support/submit-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Clear form
        setFormData({
          subject: '',
          category: 'general',
          message: '',
          userName: '',
          userEmail: '',
          organization: ''
        });
        // Redirect after 3 seconds
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Failed to submit support request');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      timeZoneName: 'short' 
    });
  };

  return (
    <>
      <Head>
        <title>Get Support - Connie Help Center</title>
        <style>{`
          /* Ensure WebChat widget appears above everything */
          #twilio-webchat-frame,
          .twilio-webchat,
          [id*="twilio"],
          [class*="twilio"],
          [data-twilio] {
            z-index: 999999 !important;
          }
          
          /* Container for the WebChat widget */
          #webchat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
          }
        `}</style>
      </Head>
      
      {/* WebChat widget will render in this container */}
      <div id="webchat-container"></div>
      
      <Box padding="space70" maxWidth="1200px" margin="auto" backgroundColor="colorBackgroundBody">
        <Stack orientation="vertical" spacing="space60">
          <Button variant="link" size="small" onClick={() => router.back()}>
            ← Back
          </Button>

          <Heading as="h1" variant="heading10">
            Get Support
          </Heading>

          {/* Debug info for testing */}
          {process.env.NODE_ENV === 'development' && (
            <Alert variant="neutral">
              <Text as="p" fontSize="fontSize20">
                <strong>Debug Info:</strong><br />
                Child Account: {sessionStorage.getItem('childAccount') || 'Not detected'}<br />
                In iFrame: {sessionStorage.getItem('isInIframe') || 'false'}<br />
                WebChat Loaded: {webChatLoaded ? 'Yes' : 'No'}<br />
                WebChat Initialized: {webChatInitialized ? 'Yes' : 'No'}
              </Text>
            </Alert>
          )}

          {submitStatus === 'success' && (
            <Alert variant="neutral">
              <strong>Support request submitted!</strong> We'll get back to you within 24 hours. Redirecting...
            </Alert>
          )}

          {submitStatus === 'error' && (
            <Alert variant="error">
              <strong>Error submitting request:</strong> {errorMessage}
            </Alert>
          )}

          {!showEmailForm && (
            <>
              <Alert variant="neutral">
                <Stack orientation="horizontal" spacing="space20">
                  🕒
                  <span>Current time: {getCurrentTime()}</span>
                </Stack>
              </Alert>

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
                          width: 'calc(50% - 10px)',
                          minWidth: '300px'
                        }}
                      >
                        {/* Card Header */}
                        <Box display="flex" alignItems="flex-start" justifyContent="space-between" marginBottom="space50">
                          <Box
                            id="twilio-chat-launcher-container"
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
                            backgroundColor={supportAvailable ? "colorBackgroundSuccess" : "colorBackgroundStrong"}
                          >
                            <Text
                              as="span"
                              fontSize="fontSize10"
                              fontWeight="fontWeightBold"
                              color="colorTextInverse"
                              textTransform="uppercase"
                              letterSpacing="wider"
                            >
                              DIRECT WIDGET
                            </Text>
                          </Box>
                        </Box>
                        
                        {/* Card Content */}
                        <Box flexGrow={1} display="flex" flexDirection="column">
                          <Box marginBottom="space30">
                            <Text as="h3" fontSize="fontSize50" fontWeight="fontWeightBold" color={supportAvailable ? "colorText" : "colorTextWeak"}>
                              Chat with ConnieCare Team
                            </Text>
                          </Box>
                          
                          <Text as="p" color="colorTextWeak" fontSize="fontSize30" marginBottom="space50">
                            Connect with a support agent now for immediate assistance.
                          </Text>

                          {/* Quick chat form */}
                          <Stack orientation="vertical" spacing="space30">
                            <FormControl>
                              <Label htmlFor="chatName">Your Name</Label>
                              <Input
                                id="chatName"
                                type="text"
                                value={chatFormData.name}
                                onChange={(e) => setChatFormData({...chatFormData, name: e.target.value})}
                                placeholder="Enter your name"
                                required
                              />
                            </FormControl>
                            
                            <FormControl>
                              <Label htmlFor="chatEmail">Email</Label>
                              <Input
                                id="chatEmail"
                                type="email"
                                value={chatFormData.email}
                                onChange={(e) => setChatFormData({...chatFormData, email: e.target.value})}
                                placeholder="Enter your email"
                                required
                              />
                            </FormControl>
                            
                            <Button 
                              variant="primary" 
                              onClick={() => {
                                if (chatFormData.name && chatFormData.email) {
                                  startWebChat(chatFormData);
                                }
                              }}
                              disabled={!chatFormData.name || !chatFormData.email || !webChatLoaded}
                            >
                              {!webChatLoaded ? 'Loading WebChat...' : 'Start Live Chat'}
                            </Button>
                          </Stack>
                          
                          <Box marginBottom="space40" marginTop="space40">
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
                              2.0.0
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
                              WebChat 3.0
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
                              AVAILABLE 24/7
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
          )}

          {showEmailForm && (
            <Card>
              <Form onSubmit={handleEmailSubmit}>
                <Stack orientation="vertical" spacing="space60">
                  <Heading as="h2" variant="heading20">
                    Submit Support Request
                  </Heading>

                  <FormControl>
                    <Label htmlFor="subject" required>
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Brief description of your issue"
                    />
                  </FormControl>

                  <FormControl>
                    <Label htmlFor="category" required>
                      Category
                    </Label>
                    <Select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <Option value="general">General Question</Option>
                      <Option value="technical">Technical Issue</Option>
                      <Option value="training">Training Request</Option>
                      <Option value="feature">Feature Question</Option>
                      <Option value="urgent">Urgent - System Down</Option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <Label htmlFor="message" required>
                      Message
                    </Label>
                    <TextArea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Please describe your issue or question in detail"
                    />
                  </FormControl>

                  <Heading as="h3" variant="heading30">
                    Contact Information
                  </Heading>

                  <FormControl>
                    <Label htmlFor="userName" required>
                      Your Name
                    </Label>
                    <Input
                      id="userName"
                      name="userName"
                      type="text"
                      value={formData.userName}
                      onChange={handleInputChange}
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <Label htmlFor="userEmail" required>
                      Email Address
                    </Label>
                    <Input
                      id="userEmail"
                      name="userEmail"
                      type="email"
                      value={formData.userEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <Label htmlFor="organization" required>
                      Organization
                    </Label>
                    <Input
                      id="organization"
                      name="organization"
                      type="text"
                      value={formData.organization}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., NSS, HHOVV"
                    />
                  </FormControl>

                  <FormActions>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Spinner decorative size="sizeIcon20" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Request'
                      )}
                    </Button>
                    <Button 
                      variant="secondary" 
                      type="button" 
                      onClick={() => setShowEmailForm(false)}
                    >
                      Back
                    </Button>
                  </FormActions>
                </Stack>
              </Form>
            </Card>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default GetHelp;