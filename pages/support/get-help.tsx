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
    alert('Chat integration coming soon! For immediate help, please use the email form.');
    setShowEmailForm(true);
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
      <Box padding="space70" maxWidth="800px" margin="auto">
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
                    How can we help you today?
                  </Heading>
                  
                  <Paragraph>
                    Choose your preferred support method. Live chat is available during business hours 
                    (9 AM - 5 PM PST), or you can submit an email ticket anytime.
                  </Paragraph>

                  <Stack orientation="vertical" spacing="space40">
                    {supportAvailable === null ? (
                      <Box display="flex" justifyContent="center">
                        <Spinner decorative size="sizeIcon40" />
                      </Box>
                    ) : supportAvailable ? (
                      <Card>
                        <Stack orientation="horizontal" spacing="space40">
                          💬
                          <Box flex="1">
                            <Heading as="h3" variant="heading30">
                              Live Chat Available
                            </Heading>
                            <Paragraph marginBottom="space0">
                              Connect with a support agent now for immediate assistance.
                            </Paragraph>
                          </Box>
                          <Button variant="primary" onClick={handleStartChat}>
                            Start Chat
                          </Button>
                        </Stack>
                      </Card>
                    ) : (
                      <Alert variant="neutral">
                        <Stack orientation="horizontal" spacing="space20">
                          💬
                          <span>Live chat is currently offline. Please use email support below.</span>
                        </Stack>
                      </Alert>
                    )}

                    <Card>
                      <Stack orientation="horizontal" spacing="space40">
                        📧
                        <Box flex="1">
                          <Heading as="h3" variant="heading30">
                            Email Support
                          </Heading>
                          <Paragraph marginBottom="space0">
                            Submit a ticket and we'll respond within 24 hours.
                          </Paragraph>
                        </Box>
                        <Button 
                          variant={supportAvailable ? "secondary" : "primary"} 
                          onClick={() => setShowEmailForm(true)}
                        >
                          Send Email
                        </Button>
                      </Stack>
                    </Card>
                  </Stack>
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