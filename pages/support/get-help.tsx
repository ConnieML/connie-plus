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
// import { ChatIcon } from '@twilio-paste/icons/esm/ChatIcon';
// import { EmailIcon } from '@twilio-paste/icons/esm/EmailIcon';
// import { ArrowBackIcon } from '@twilio-paste/icons/esm/ArrowBackIcon';
// import { CalendarIcon } from '@twilio-paste/icons/esm/CalendarIcon';

const GetHelp: NextPage = () => {
  const router = useRouter();
  const [supportAvailable, setSupportAvailable] = useState<boolean | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    subject: '',
    category: 'general',
    message: '',
    userName: '',
    userEmail: '',
    organization: ''
  });

  useEffect(() => {
    checkSupportAvailability();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStartChat = () => {
    // This would integrate with Twilio WebChat
    // For now, we'll show a placeholder
    alert('Chat integration coming soon! For immediate help, please use support tickets below.');
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
      </Head>
      <Box padding="space70" maxWidth="1200px" margin="auto" backgroundColor="colorBackgroundBody">
        <Stack orientation="vertical" spacing="space60">
          <Button variant="link" size="small" onClick={() => router.back()}>
            ← Back
          </Button>

          <Heading as="h1" variant="heading10">
            Get Support
          </Heading>

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
                        onClick={handleStartChat}
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
                              UA TESTING
                            </Text>
                          </Box>
                        </Box>
                        
                        {/* Card Content */}
                        <Box flexGrow={1} display="flex" flexDirection="column">
                          <Box marginBottom="space30">
                            <Text as="h3" fontSize="fontSize50" fontWeight="fontWeightBold" color={supportAvailable ? "colorText" : "colorTextWeak"}>
                              Live Chat {supportAvailable ? "Available" : "Offline"}
                            </Text>
                          </Box>
                          
                          <Text as="p" color="colorTextWeak" fontSize="fontSize30" marginBottom="space50">
                            {supportAvailable ? "Connect with a support agent now for immediate assistance." : "Live chat is currently offline. Please use support tickets."}
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
                        onClick={() => window.open('https://trouble-ticket-app.vercel.app/', '_blank')}
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