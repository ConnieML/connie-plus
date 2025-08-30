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
  const [supportAvailable, setSupportAvailable] = useState<boolean | null>(true);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<any>(null);
  
  // Ticket status tracking
  const [userTickets, setUserTickets] = useState<any[]>([]);
  const [showTicketLookup, setShowTicketLookup] = useState(false);
  const [ticketLookup, setTicketLookup] = useState({
    customerName: '',
    customerPhone: ''
  });
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);

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

  const fetchUserTickets = async (customerName: string, customerPhone: string) => {
    if (!customerName || !customerPhone) return;
    
    setIsLoadingTickets(true);
    try {
      const response = await fetch(`https://trouble-ticket-app.vercel.app/api/tickets?name=${encodeURIComponent(customerName)}&phone=${encodeURIComponent(customerPhone)}`);
      if (response.ok) {
        const tickets = await response.json();
        setUserTickets(tickets || []);
      }
    } catch (error) {
      console.error('Error fetching user tickets:', error);
    } finally {
      setIsLoadingTickets(false);
    }
  };

  const handleTicketLookupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTicketLookup(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTicketLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUserTickets(ticketLookup.customerName, ticketLookup.customerPhone);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // WebChat now handled via iframe - no postMessage needed

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted, starting API call');
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      console.log('Making API call to:', '/api/support/submit-ticket');
      const response = await fetch('/api/support/submit-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (response.ok) {
        setSubmitStatus('success');
        // The local API returns {success: true, ticketId: 123, ...} not the ticket object directly
        // So let's create a mock ticket object for display
        const ticketForDisplay = {
          id: data.ticketId,
          ticketId: data.ticketId,
          status: 'Open',
          ...data
        };
        setSubmittedTicket(ticketForDisplay);
        console.log('Submitted ticket state:', ticketForDisplay);
        // Store original form data for display
        // Don't clear form immediately - show details first
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
          /* Simple z-index fix for WebChat */
          [id*="twilio"],
          [class*="twilio"],
          [data-twilio] {
            z-index: 9999 !important;
          }
        `}</style>
      </Head>
      
      {/* WebChat now handled by parent Flex window via postMessage */}
      
      <Box padding="space70" maxWidth="1200px" margin="auto" backgroundColor="colorBackgroundBody">
        <Stack orientation="vertical" spacing="space60">
          <Button variant="link" size="small" onClick={() => router.back()}>
            ← Back
          </Button>

          <Heading as="h1" variant="heading10">
            Get Support
          </Heading>

          {submitStatus === 'success' && submittedTicket && (
            <>
              <Alert variant="neutral">
                <strong>Support ticket created successfully!</strong> Your request has been sent to the Connie Care Team and a task has been created in our support queue.
              </Alert>
              
              <Card>
                <Stack orientation="vertical" spacing="space40">
                  <Heading as="h2" variant="heading30">
                    Your Ticket Details
                  </Heading>
                  
                  <Box display="flex" columnGap="space40">
                    <FormControl>
                      <Label>Ticket ID</Label>
                      <Input type="text" value={submittedTicket.ticketId || submittedTicket.id || 'N/A'} readOnly />
                    </FormControl>
                    
                    <FormControl>
                      <Label>Status</Label>
                      <Input type="text" value="Open" readOnly />
                    </FormControl>
                  </Box>
                  
                  <FormControl>
                    <Label>Subject</Label>
                    <Input type="text" value={formData.subject} readOnly />
                  </FormControl>
                  
                  <FormControl>
                    <Label>Message</Label>
                    <TextArea value={formData.message} readOnly rows={3} />
                  </FormControl>
                  
                  <Box display="flex" columnGap="space40">
                    <FormControl>
                      <Label>Submitted By</Label>
                      <Input type="text" value={formData.userName} readOnly />
                    </FormControl>
                    
                    <FormControl>
                      <Label>Contact</Label>
                      <Input type="text" value={formData.userEmail} readOnly />
                    </FormControl>
                  </Box>
                  
                  <FormControl>
                    <Label>Submitted</Label>
                    <Input type="text" value={new Date().toLocaleString()} readOnly />
                  </FormControl>
                  
                  <Alert variant="neutral">
                    <Text as="p">
                      <strong>What happens next:</strong> Your ticket has been routed to the Connie Care Team. 
                      A team member will review your request and respond within 24 hours. 
                      Save your Ticket ID for reference when following up.
                    </Text>
                  </Alert>
                  
                  <FormActions>
                    <Button variant="primary" onClick={() => router.push('/')}>
                      Return to Dashboard
                    </Button>
                    <Button variant="secondary" onClick={() => {
                      setSubmitStatus('idle');
                      setSubmittedTicket(null);
                      setShowEmailForm(false);
                      setFormData({
                        subject: '',
                        category: 'general',
                        message: '',
                        userName: '',
                        userEmail: '',
                        organization: ''
                      });
                    }}>
                      Submit Another Request
                    </Button>
                  </FormActions>
                </Stack>
              </Card>
            </>
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
                              UA TESTING
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
                            Click the button below to open WebChat in a new window.
                          </Text>

                          {/* Open WebChat in new window to avoid iframe-in-iframe issues */}
                          <Stack orientation="vertical" spacing="space40">
                            <Button 
                              variant="primary" 
                              onClick={() => {
                                // Dynamic routing with URL parameters to preserve organization context
                                const referrer = document.referrer;
                                let orgName;
                                let webChatPage;
                                
                                if (referrer.includes('nss.connie.team')) {
                                  orgName = 'NSS';
                                  webChatPage = `/nss-webchat.html?org=NSS&source=${encodeURIComponent(referrer)}`;
                                } else if (referrer.includes('hhovv.connie.team')) {
                                  orgName = 'HHOVV';
                                  webChatPage = `/hhovv-webchat.html?org=HHOVV&source=${encodeURIComponent(referrer)}`;
                                } else if (referrer.includes('dev.connie.team')) {
                                  orgName = 'DevSandbox';
                                  webChatPage = `/test-webchat.html?org=DevSandbox&source=${encodeURIComponent(referrer)}`;
                                } else {
                                  // Fallback for testing/unknown
                                  orgName = 'Test';
                                  webChatPage = `/test-webchat.html?org=Test&source=${encodeURIComponent(referrer)}`;
                                }
                                
                                console.log(`Opening ${orgName} WebChat with parameters: ${webChatPage}`);
                                const webChatWindow = window.open(webChatPage, 'ConnieWebChat', 'width=400,height=600');
                                if (!webChatWindow) {
                                  alert('Please allow popups for this site to use WebChat');
                                }
                              }}
                              size="default"
                            >
                              Open WebChat Support
                            </Button>
                            
                            <Alert variant="neutral">
                              <Text as="p" fontSize="fontSize30">
                                <strong>Note:</strong> WebChat will open in a new window to ensure proper functionality when accessed from the CRM container.
                              </Text>
                            </Alert>
                          </Stack>
                          
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
          )}

          {/* Ticket Status Section - moved below support cards */}
          <Card>
            <Stack orientation="vertical" spacing="space40">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Heading as="h2" variant="heading30">
                  Your Open Tickets
                </Heading>
                <Button
                  variant="link"
                  size="small"
                  onClick={() => setShowTicketLookup(!showTicketLookup)}
                >
                  {showTicketLookup ? 'Hide Lookup' : 'Check Ticket Status'}
                </Button>
              </Box>

              {showTicketLookup && (
                <Box backgroundColor="colorBackgroundBody" padding="space40" borderRadius="borderRadius20">
                  <Form onSubmit={handleTicketLookupSubmit}>
                    <Stack orientation="vertical" spacing="space40">
                      <Text as="p" fontSize="fontSize30" color="colorTextWeak">
                        Enter your name and contact info to view your open support tickets:
                      </Text>
                      
                      <Box display="flex" columnGap="space40">
                        <FormControl>
                          <Label htmlFor="customerName">Your Name</Label>
                          <Input
                            id="customerName"
                            name="customerName"
                            type="text"
                            value={ticketLookup.customerName}
                            onChange={handleTicketLookupChange}
                            placeholder="Full name used when submitting tickets"
                          />
                        </FormControl>

                        <FormControl>
                          <Label htmlFor="customerPhone">Email or Phone</Label>
                          <Input
                            id="customerPhone"
                            name="customerPhone"
                            type="text"
                            value={ticketLookup.customerPhone}
                            onChange={handleTicketLookupChange}
                            placeholder="Contact info used when submitting tickets"
                          />
                        </FormControl>
                      </Box>

                      <FormActions>
                        <Button variant="primary" type="submit" disabled={isLoadingTickets}>
                          {isLoadingTickets ? (
                            <>
                              <Spinner decorative size="sizeIcon20" />
                              Loading...
                            </>
                          ) : (
                            'Check My Tickets'
                          )}
                        </Button>
                      </FormActions>
                    </Stack>
                  </Form>
                </Box>
              )}

              {userTickets.length > 0 && (
                <Stack orientation="vertical" spacing="space30">
                  <Alert variant="neutral">
                    Found {userTickets.length} open ticket{userTickets.length !== 1 ? 's' : ''} for your account:
                  </Alert>
                  
                  {userTickets.slice(0, 5).map((ticket) => (
                    <Box 
                      key={ticket.id}
                      padding="space30"
                      borderStyle="solid"
                      borderWidth="borderWidth10"
                      borderColor="colorBorder"
                      borderRadius="borderRadius20"
                      backgroundColor="colorBackgroundBody"
                    >
                      <Stack orientation="horizontal" spacing="space40">
                        <Box minWidth="80px">
                          <Paragraph marginBottom="space0">
                            <strong>#{ticket.id}</strong>
                          </Paragraph>
                        </Box>
                        <Box flex="1">
                          <Paragraph marginBottom="space0">{ticket.title}</Paragraph>
                        </Box>
                        <Box>
                          <Paragraph marginBottom="space0">
                            <strong style={{color: ticket.status === 'Open' ? '#04b85c' : '#757575'}}>
                              {ticket.status}
                            </strong>
                          </Paragraph>
                        </Box>
                        <Box minWidth="120px">
                          <Paragraph marginBottom="space0">
                            <small>{new Date(ticket.createdat).toLocaleDateString()}</small>
                          </Paragraph>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                  
                  <Alert variant="neutral">
                    Reference these ticket numbers when following up with the ConnieCare Team. 
                    Tickets are handled in order of priority and submission time.
                  </Alert>
                </Stack>
              )}

              {showTicketLookup && userTickets.length === 0 && !isLoadingTickets && ticketLookup.customerName && ticketLookup.customerPhone && (
                <Alert variant="neutral">
                  No open tickets found for the provided contact information.
                </Alert>
              )}
            </Stack>
          </Card>

          {/* Community Slack Card */}
          <Card>
            <Stack orientation="vertical" spacing="space50">
              <Box display="flex" alignItems="center" justifyContent="center" columnGap="space40">
                <Box
                  width="60px"
                  height="60px"
                  backgroundColor="colorBackgroundPrimaryWeakest"
                  borderRadius="borderRadius30"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {/* Slack-style icon using existing Paste icons */}
                  <Text as="span" fontSize="fontSize70" fontWeight="fontWeightBold" color="colorTextIconBrandHighlight">
                    #
                  </Text>
                </Box>
                <Box flexGrow={1} textAlign="center">
                  <Box marginBottom="space30">
                    <Heading as="h2" variant="heading30">
                      Join the Growing Connie Community
                    </Heading>
                  </Box>
                  <Text as="p" color="colorTextWeak" fontSize="fontSize40">
                    Connect with other CBOs, share best practices, and get help from the community.
                  </Text>
                </Box>
              </Box>
              
              <Box textAlign="center">
                <Alert variant="neutral">
                  <Stack orientation="vertical" spacing="space30">
                    <Text as="p">
                      <strong>Coming Soon!</strong> Our Slack workspace will provide:
                    </Text>
                    <Box display="flex" justifyContent="center" flexWrap="wrap" columnGap="space60" rowGap="space20">
                      <Text as="span" fontSize="fontSize30">• Peer support network</Text>
                      <Text as="span" fontSize="fontSize30">• Best practice sharing</Text>
                      <Text as="span" fontSize="fontSize30">• Feature discussions</Text>
                      <Text as="span" fontSize="fontSize30">• Community events</Text>
                    </Box>
                    <Text as="p" fontSize="fontSize30" color="colorTextWeak">
                      Stay tuned for updates on joining the Connie Community Slack!
                    </Text>
                  </Stack>
                </Alert>
              </Box>
            </Stack>
          </Card>

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