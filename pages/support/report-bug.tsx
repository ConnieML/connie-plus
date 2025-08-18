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
import { Spinner } from '@twilio-paste/core/spinner';
import { Stack } from '@twilio-paste/core/stack';
// import { ArrowBackIcon } from '@twilio-paste/icons/esm/ArrowBackIcon';

const ReportBug: NextPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    severity: 'medium',
    category: 'bug',
    description: '',
    stepsToReproduce: '',
    expectedBehavior: '',
    actualBehavior: '',
    userEmail: '',
    userName: '',
    organization: ''
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
      const response = await fetch('/api/support/submit-bug', {
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
          title: '',
          severity: 'medium',
          category: 'bug',
          description: '',
          stepsToReproduce: '',
          expectedBehavior: '',
          actualBehavior: '',
          userEmail: '',
          userName: '',
          organization: ''
        });
        // Redirect after 3 seconds
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Failed to submit bug report');
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
        <title>Report a Bug - Connie Support</title>
      </Head>
      <Box padding="space70" maxWidth="800px" margin="auto">
        <Stack orientation="vertical" spacing="space60">
          <Button variant="link" size="small" onClick={() => router.back()}>
            ← Back
          </Button>

          <Heading as="h1" variant="heading10">
            Report a Bug or Issue
          </Heading>

          {submitStatus === 'success' && (
            <Alert variant="neutral">
              <strong>Bug report submitted successfully!</strong> We'll review your report and get back to you soon. Redirecting...
            </Alert>
          )}

          {submitStatus === 'error' && (
            <Alert variant="error">
              <strong>Error submitting report:</strong> {errorMessage}
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
                  <HelpText>Provide a clear, concise title for the issue</HelpText>
                </FormControl>

                <Box display="flex" columnGap="space40">
                  <FormControl>
                    <Label htmlFor="severity" required>
                      Severity
                    </Label>
                    <Select
                      id="severity"
                      name="severity"
                      value={formData.severity}
                      onChange={handleInputChange}
                      required
                    >
                      <Option value="critical">Critical - System Down</Option>
                      <Option value="high">High - Major Feature Broken</Option>
                      <Option value="medium">Medium - Feature Partially Working</Option>
                      <Option value="low">Low - Minor Issue</Option>
                    </Select>
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
                      <Option value="bug">Bug</Option>
                      <Option value="feature-request">Feature Request</Option>
                      <Option value="enhancement">Enhancement</Option>
                      <Option value="documentation">Documentation</Option>
                    </Select>
                  </FormControl>
                </Box>

                <FormControl>
                  <Label htmlFor="description" required>
                    Description
                  </Label>
                  <TextArea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder="Detailed description of the issue"
                  />
                  <HelpText>Provide as much detail as possible</HelpText>
                </FormControl>

                <FormControl>
                  <Label htmlFor="stepsToReproduce">
                    Steps to Reproduce
                  </Label>
                  <TextArea
                    id="stepsToReproduce"
                    name="stepsToReproduce"
                    value={formData.stepsToReproduce}
                    onChange={handleInputChange}
                    placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                  />
                  <HelpText>List the steps to reproduce the issue</HelpText>
                </FormControl>

                <FormControl>
                  <Label htmlFor="expectedBehavior">
                    Expected Behavior
                  </Label>
                  <TextArea
                    id="expectedBehavior"
                    name="expectedBehavior"
                    value={formData.expectedBehavior}
                    onChange={handleInputChange}
                    placeholder="What should happen?"
                  />
                </FormControl>

                <FormControl>
                  <Label htmlFor="actualBehavior">
                    Actual Behavior
                  </Label>
                  <TextArea
                    id="actualBehavior"
                    name="actualBehavior"
                    value={formData.actualBehavior}
                    onChange={handleInputChange}
                    placeholder="What actually happens?"
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
                      'Submit Bug Report'
                    )}
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

export default ReportBug;