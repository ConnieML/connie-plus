import React, { useState } from 'react';
import { Box } from '@twilio-paste/core/box';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Button } from '@twilio-paste/core/button';

const TestOkta = () => {
  const [results, setResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testEndpoint = async (url: string, description: string) => {
    try {
      addResult(`Testing ${description}: ${url}`);
      const response = await fetch(url);
      if (response.ok) {
        addResult(`✅ ${description} - SUCCESS (${response.status})`);
      } else {
        addResult(`❌ ${description} - FAILED (${response.status})`);
      }
    } catch (error) {
      addResult(`❌ ${description} - ERROR: ${error}`);
    }
  };

  const runTests = async () => {
    setResults([]);
    addResult('Starting Okta endpoint tests...');
    
    // Test various possible endpoints
    await testEndpoint('https://trial-2094636.okta.com/.well-known/openid-configuration', 'Root OIDC Config');
    await testEndpoint('https://trial-2094636.okta.com/oauth2/default/.well-known/openid-configuration', 'Default Auth Server');
    await testEndpoint('https://trial-2094636.okta.com/oauth2/v1/.well-known/openid-configuration', 'V1 Auth Server');
    await testEndpoint('https://trial-2094636.okta.com/.well-known/openid_configuration', 'Alternative OIDC Config');
    
    addResult('Tests complete!');
  };

  return (
    <Box padding="space70">
      <Heading as="h1" variant="heading10">Okta Endpoint Tester</Heading>
      
      <Box marginTop="space60">
        <Button variant="primary" onClick={runTests}>
          Test All Okta Endpoints
        </Button>
      </Box>

      <Box marginTop="space60">
        <Heading as="h2" variant="heading20">Results:</Heading>
        <Box backgroundColor="colorBackgroundBody" padding="space40" borderRadius="borderRadius20" marginTop="space30">
          {results.map((result, index) => (
            <Paragraph key={index}>{result}</Paragraph>
          ))}
        </Box>
      </Box>

      <Box marginTop="space60">
        <Heading as="h2" variant="heading20">Current Environment:</Heading>
        <Box backgroundColor="colorBackgroundBody" padding="space40" borderRadius="borderRadius20" marginTop="space30">
          <Paragraph><strong>OKTA_ISSUER:</strong> {process.env.NEXT_PUBLIC_OKTA_ISSUER}</Paragraph>
          <Paragraph><strong>CLIENT_ID:</strong> {process.env.NEXT_PUBLIC_OKTA_CLIENT_ID}</Paragraph>
          <Paragraph><strong>REDIRECT_URI:</strong> {process.env.NEXT_PUBLIC_OKTA_REDIRECT_URI}</Paragraph>
        </Box>
      </Box>
    </Box>
  );
};

export default TestOkta;