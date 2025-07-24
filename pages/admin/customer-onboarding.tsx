import React, { useState } from 'react';
import { Box } from '@twilio-paste/core/box';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Card } from '@twilio-paste/core/card';
import { Button } from '@twilio-paste/core/button';
import { Alert } from '@twilio-paste/core/alert';
import { Spinner } from '@twilio-paste/core/spinner';
import { Form, FormControl, FormActions } from '@twilio-paste/core/form';
import { Label } from '@twilio-paste/core/label';
import { Input } from '@twilio-paste/core/input';
import { HelpText } from '@twilio-paste/core/help-text';
import { RadioGroup, Radio } from '@twilio-paste/core/radio-group';
import { Separator } from '@twilio-paste/core/separator';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAuth } from '../../lib/auth';
import { useRouter } from 'next/router';

interface FormData {
  organizationName: string;
  accountSid: string;
  authType: 'authToken' | 'apiKey';
  authToken: string;
  apiKeySid: string;
  apiKeySecret: string;
  adminEmail: string;
  adminName: string;
}

const CustomerOnboarding: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    organizationName: '',
    accountSid: '',
    authType: 'authToken',
    authToken: '',
    apiKeySid: '',
    apiKeySecret: '',
    adminEmail: '',
    adminName: ''
  });

  // Check admin access
  const hasAdminAccess = () => {
    return isAuthenticated && user?.groups?.includes('ConnieOne-Admins');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null); // Clear error on input change
  };

  const handleAuthTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, authType: value as 'authToken' | 'apiKey' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      // Get user token
      const flexToken = (window as any).flexAuthToken;
      
      // Prepare request body
      const requestBody: any = {
        organizationName: formData.organizationName,
        accountSid: formData.accountSid,
        adminEmail: formData.adminEmail,
        adminName: formData.adminName
      };

      // Add credentials based on auth type
      if (formData.authType === 'authToken') {
        requestBody.authToken = formData.authToken;
      } else {
        requestBody.apiKeySid = formData.apiKeySid;
        requestBody.apiKeySecret = formData.apiKeySecret;
      }

      const response = await fetch('/api/onboard-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': flexToken ? `Bearer ${flexToken}` : ''
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`Successfully onboarded ${data.accountDetails?.organizationName || formData.organizationName}!`);
        // Clear form
        setFormData({
          organizationName: '',
          accountSid: '',
          authType: 'authToken',
          authToken: '',
          apiKeySid: '',
          apiKeySecret: '',
          adminEmail: '',
          adminName: ''
        });
      } else {
        setError(data.error || 'Failed to onboard customer');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Onboarding error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Box padding="space70">
        <Box textAlign="center">
          <Spinner decorative size="sizeIcon60" />
        </Box>
      </Box>
    );
  }

  // Access denied
  if (!hasAdminAccess()) {
    return (
      <Box padding="space70">
        <Head>
          <title>Access Denied - Customer Onboarding</title>
        </Head>
        <Alert variant="warning">
          <Heading as="h2" variant="heading30">Access Denied</Heading>
          <Paragraph>
            This page is only accessible to administrators.
          </Paragraph>
        </Alert>
      </Box>
    );
  }

  return (
    <Box padding="space70">
      <Head>
        <title>Customer Onboarding - Connie Plus</title>
      </Head>

      <Box marginBottom="space70">
        <Heading as="h1" variant="heading10">
          Customer Onboarding
        </Heading>
        <Paragraph>
          Add a new customer organization to the Connie platform.
        </Paragraph>
      </Box>

      {success && (
        <Box marginBottom="space50">
          <Alert variant="neutral" onDismiss={() => setSuccess(null)}>
            <Paragraph>{success}</Paragraph>
          </Alert>
        </Box>
      )}

      {error && (
        <Box marginBottom="space50">
          <Alert variant="warning" onDismiss={() => setError(null)}>
            <Paragraph>{error}</Paragraph>
          </Alert>
        </Box>
      )}

      <Card>
        <Form onSubmit={handleSubmit}>
          <Box marginBottom="space50">
            <Heading as="h2" variant="heading30">
              Organization Details
            </Heading>
          </Box>

          <Box marginBottom="space50">
            <FormControl>
              <Label htmlFor="organizationName" required>
                Organization Name
              </Label>
              <Input
                id="organizationName"
                name="organizationName"
                type="text"
                value={formData.organizationName}
                onChange={handleInputChange}
                required
                placeholder="Healthcare CBO"
              />
              <HelpText>The name of the customer organization</HelpText>
            </FormControl>
          </Box>

          <Box marginBottom="space50">
            <FormControl>
              <Label htmlFor="accountSid" required>
                Twilio Account SID
              </Label>
              <Input
                id="accountSid"
                name="accountSid"
                type="text"
                value={formData.accountSid}
                onChange={handleInputChange}
                required
                placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              />
              <HelpText>The customer's Twilio Account SID (starts with AC)</HelpText>
            </FormControl>
          </Box>

          <Separator orientation="horizontal" />

          <Box marginBottom="space50" marginTop="space50">
            <Heading as="h2" variant="heading30">
              Twilio Credentials
            </Heading>
          </Box>

          <Box marginBottom="space50">
            <FormControl>
              <RadioGroup
                name="authType"
                value={formData.authType}
                onChange={handleAuthTypeChange}
                legend="Authentication Type"
                required
              >
                <Radio id="authToken" value="authToken">
                  Auth Token (Simple)
                </Radio>
                <Radio id="apiKey" value="apiKey">
                  API Key & Secret (Recommended)
                </Radio>
              </RadioGroup>
            </FormControl>
          </Box>

          {formData.authType === 'authToken' ? (
            <Box marginBottom="space50">
              <FormControl>
                <Label htmlFor="authToken" required>
                  Auth Token
                </Label>
                <Input
                  id="authToken"
                  name="authToken"
                  type="password"
                  value={formData.authToken}
                  onChange={handleInputChange}
                  required
                  placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                />
                <HelpText>The customer's Twilio Auth Token</HelpText>
              </FormControl>
            </Box>
          ) : (
            <>
              <Box marginBottom="space50">
                <FormControl>
                  <Label htmlFor="apiKeySid" required>
                    API Key SID
                  </Label>
                  <Input
                    id="apiKeySid"
                    name="apiKeySid"
                    type="text"
                    value={formData.apiKeySid}
                    onChange={handleInputChange}
                    required
                    placeholder="SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  />
                  <HelpText>The API Key SID (starts with SK)</HelpText>
                </FormControl>
              </Box>

              <Box marginBottom="space50">
                <FormControl>
                  <Label htmlFor="apiKeySecret" required>
                    API Key Secret
                  </Label>
                  <Input
                    id="apiKeySecret"
                    name="apiKeySecret"
                    type="password"
                    value={formData.apiKeySecret}
                    onChange={handleInputChange}
                    required
                    placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  />
                  <HelpText>The API Key Secret</HelpText>
                </FormControl>
              </Box>
            </>
          )}

          <Separator orientation="horizontal" />

          <Box marginBottom="space50" marginTop="space50">
            <Heading as="h2" variant="heading30">
              Administrator Contact
            </Heading>
          </Box>

          <Box marginBottom="space50">
            <FormControl>
              <Label htmlFor="adminName" required>
                Admin Name
              </Label>
              <Input
                id="adminName"
                name="adminName"
                type="text"
                value={formData.adminName}
                onChange={handleInputChange}
                required
                placeholder="John Smith"
              />
            </FormControl>
          </Box>

          <Box marginBottom="space50">
            <FormControl>
              <Label htmlFor="adminEmail" required>
                Admin Email
              </Label>
              <Input
                id="adminEmail"
                name="adminEmail"
                type="email"
                value={formData.adminEmail}
                onChange={handleInputChange}
                required
                placeholder="admin@organization.com"
              />
              <HelpText>Primary contact for this organization</HelpText>
            </FormControl>
          </Box>

          <FormActions>
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? 'Onboarding...' : 'Onboard Customer'}
            </Button>
            <Button variant="secondary" type="button" onClick={() => router.push('/admin-tools-data')}>
              Cancel
            </Button>
          </FormActions>
        </Form>
      </Card>
    </Box>
  );
};

export default CustomerOnboarding;