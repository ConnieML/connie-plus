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

const SupportPortal: NextPage = () => {
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
        const ticketForDisplay = {
          id: data.ticketId,
          ticketId: data.ticketId,
          status: 'Open',
          ...data
        };
        setSubmittedTicket(ticketForDisplay);
        console.log('Submitted ticket state:', ticketForDisplay);
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
        <title>Support Portal - Connie</title>
        <meta name="description" content="Get support from the Connie Care Team" />
        <style>{`
          /* Simple z-index fix for WebChat */
          [id*="twilio"],
          [class*="twilio"],
          [data-twilio] {
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
            Connie Support Portal
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

          {!showEmailForm && submitStatus !== 'success' && (
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
                              LIVE SUPPORT
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
                                // Get agent context from URL parameters if available
                                const urlParams = new URLSearchParams(window.location.search);
                                const agentName = urlParams.get('agentName') || urlParams.get('userName') || 'Support User';
                                const agentEmail = urlParams.get('agentEmail') || urlParams.get('userEmail') || 'user@connie.one';
                                const accountSid = urlParams.get('accountSid') || 'DEVSANDBOX_DEFAULT';

                                // Navigate to support-chat.html with agent context - renamed for consistency
                                const supportUrl = `/support-chat.html?agentName=${encodeURIComponent(agentName)}&agentEmail=${encodeURIComponent(agentEmail)}&accountSid=${encodeURIComponent(accountSid)}`;
                                const webChatWindow = window.open(supportUrl, 'ConnieWebChat', 'width=800,height=600,scrollbars=yes,resizable=yes');
                                if (!webChatWindow) {
                                  alert('Please allow popups for this site to use WebChat');
                                }
                              }}
                              size="default"
                            >
                              Start Support Chat
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

          {/* Ticket Status Section */}
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
                  No open tickets found for "{ticketLookup.customerName}". 
                  Make sure you're using the same name and contact info used when submitting tickets.
                </Alert>
              )}
            </Stack>
          </Card>

          {showEmailForm && submitStatus !== 'success' && (
            <Card>
              <Stack orientation="vertical" spacing="space60">
                <Heading as="h2" variant="heading30">
                  Submit Support Request
                </Heading>
                
                <Form onSubmit={handleEmailSubmit}>
                  <Stack orientation="vertical" spacing="space40">
                    <FormControl>
                      <Label htmlFor="userName">Your Name</Label>
                      <Input
                        id="userName"
                        name="userName"
                        type="text"
                        value={formData.userName}
                        onChange={handleInputChange}
                        placeholder="Full name"
                        required
                      />
                    </FormControl>

                    <FormControl>
                      <Label htmlFor="userEmail">Your Email</Label>
                      <Input
                        id="userEmail"
                        name="userEmail"
                        type="email"
                        value={formData.userEmail}
                        onChange={handleInputChange}
                        placeholder="Email address"
                        required
                      />
                    </FormControl>

                    <FormControl>
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        name="organization"
                        type="text"
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder="Organization name"
                      />
                    </FormControl>

                    <FormControl>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <Option value="general">General Support</Option>
                        <Option value="technical">Technical Issue</Option>
                        <Option value="bug">Bug Report</Option>
                        <Option value="feature">Feature Request</Option>
                        <Option value="account">Account Issue</Option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Brief description of your issue"
                        required
                      />
                    </FormControl>

                    <FormControl>
                      <Label htmlFor="message">Message</Label>
                      <TextArea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please describe your issue or request in detail..."
                        rows={6}
                        required
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
                          'Submit Support Request'
                        )}
                      </Button>
                      <Button variant="secondary" onClick={() => setShowEmailForm(false)}>
                        Cancel
                      </Button>
                    </FormActions>
                  </Stack>
                </Form>
              </Stack>
            </Card>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default SupportPortal;