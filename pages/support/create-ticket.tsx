import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box } from '@twilio-paste/core/box';
import { Card } from '@twilio-paste/core/card';
import { Heading } from '@twilio-paste/core/heading';
import { Form, FormControl, FormActions } from '@twilio-paste/core/form';
import { Label } from '@twilio-paste/core/label';
import { Input } from '@twilio-paste/core/input';
import { TextArea } from '@twilio-paste/core/textarea';
import { Select, Option } from '@twilio-paste/core/select';
import { Button } from '@twilio-paste/core/button';
import { Alert } from '@twilio-paste/core/alert';
import { HelpText } from '@twilio-paste/core/help-text';
import { Stack } from '@twilio-paste/core/stack';

const CreateTicket: NextPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    customerName: '',
    customerPhone: '',
    priority: 'medium'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://trouble-ticket-app.vercel.app/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          customerName: formData.customerName,
          customerPhone: formData.customerPhone
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmittedTicket(data);
        // Clear form
        setFormData({
          title: '',
          description: '',
          customerName: '',
          customerPhone: '',
          priority: 'medium'
        });
        // Auto redirect removed - let user see their ticket
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Failed to create support ticket');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create Support Ticket - Connie Support</title>
      </Head>
      <Box padding="space70" maxWidth="800px" margin="auto">
        <Stack orientation="vertical" spacing="space60">
          <Button variant="link" size="small" onClick={() => router.back()}>
            ← Back
          </Button>

          <Heading as="h1" variant="heading10">
            Create Support Ticket
          </Heading>

          {submitStatus === 'success' && submittedTicket && (
            <>
              <Alert variant="neutral">
                <strong>Support ticket created successfully!</strong> Your request has been sent to the ConnieCare Team and a task has been created in our support queue.
              </Alert>
              
              <Card>
                <Stack orientation="vertical" spacing="space40">
                  <Heading as="h2" variant="heading30">
                    Your Ticket Details
                  </Heading>
                  
                  <Box display="flex" columnGap="space40">
                    <FormControl>
                      <Label>Ticket ID</Label>
                      <Input type="text" value={submittedTicket.id} readOnly />
                    </FormControl>
                    
                    <FormControl>
                      <Label>Status</Label>
                      <Input type="text" value={submittedTicket.status} readOnly />
                    </FormControl>
                  </Box>
                  
                  <FormControl>
                    <Label>Title</Label>
                    <Input type="text" value={submittedTicket.title} readOnly />
                  </FormControl>
                  
                  <FormControl>
                    <Label>Description</Label>
                    <TextArea value={submittedTicket.description} readOnly rows={3} />
                  </FormControl>
                  
                  <Box display="flex" columnGap="space40">
                    <FormControl>
                      <Label>Submitted By</Label>
                      <Input type="text" value={submittedTicket.customername} readOnly />
                    </FormControl>
                    
                    <FormControl>
                      <Label>Contact</Label>
                      <Input type="text" value={submittedTicket.customerphone} readOnly />
                    </FormControl>
                  </Box>
                  
                  <FormControl>
                    <Label>Submitted</Label>
                    <Input type="text" value={new Date(submittedTicket.createdat).toLocaleString()} readOnly />
                  </FormControl>
                  
                  <HelpText>
                    Save this ticket ID for your records. You can reference it when following up with the ConnieCare Team.
                  </HelpText>
                </Stack>
              </Card>
            </>
          )}

          {submitStatus === 'error' && (
            <Alert variant="error">
              <strong>Error creating ticket:</strong> {errorMessage}
            </Alert>
          )}

          <Card>
            <Form onSubmit={handleSubmit}>
              <Stack orientation="vertical" spacing="space60">
                <FormControl>
                  <Label htmlFor="title" required>
                    Issue Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Brief description of the issue"
                  />
                  <HelpText>Provide a clear, concise title for the support request</HelpText>
                </FormControl>

                <FormControl>
                  <Label htmlFor="description" required>
                    Detailed Description
                  </Label>
                  <TextArea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder="Please provide as much detail as possible about the issue, including steps to reproduce, expected vs actual behavior, and any error messages."
                    rows={6}
                  />
                  <HelpText>Include steps to reproduce, error messages, and any relevant context</HelpText>
                </FormControl>

                <Box display="flex" columnGap="space40">
                  <FormControl>
                    <Label htmlFor="customerName" required>
                      Your Name
                    </Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      type="text"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                    />
                    <HelpText>How should we address you?</HelpText>
                  </FormControl>

                  <FormControl>
                    <Label htmlFor="customerPhone" required>
                      Email or Phone
                    </Label>
                    <Input
                      id="customerPhone"
                      name="customerPhone"
                      type="text"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      required
                      placeholder="Best way to contact you"
                    />
                    <HelpText>Preferred contact method</HelpText>
                  </FormControl>
                </Box>

                <FormControl>
                  <Label htmlFor="priority">
                    Priority Level
                  </Label>
                  <Select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    <Option value="low">Low - General question or enhancement request</Option>
                    <Option value="medium">Medium - Issue affecting work but has workaround</Option>
                    <Option value="high">High - Critical issue blocking work</Option>
                  </Select>
                  <HelpText>How urgently do you need this resolved?</HelpText>
                </FormControl>

                <FormActions>
                  <Button variant="primary" type="submit" loading={isSubmitting}>
                    {isSubmitting ? 'Creating Ticket...' : 'Create Support Ticket'}
                  </Button>
                  <Button variant="secondary" type="button" onClick={() => router.back()}>
                    Cancel
                  </Button>
                </FormActions>
              </Stack>
            </Form>
          </Card>
        </Stack>
      </Box>
    </>
  );
};

export default CreateTicket;