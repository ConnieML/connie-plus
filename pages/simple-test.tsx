import React from 'react';

const SimpleTest = () => {
  const testOktaEndpoint = async () => {
    try {
      console.log('Testing Okta endpoint...');
      const response = await fetch('https://trial-2094636.okta.com/.well-known/openid-configuration');
      console.log('Response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('✅ SUCCESS - Okta config:', data);
      } else {
        console.log('❌ FAILED - Status:', response.status);
      }
    } catch (error) {
      console.log('❌ ERROR:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Simple Okta Test</h1>
      <button onClick={testOktaEndpoint} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Test Okta Endpoint
      </button>
      <p>Check browser console for results</p>
    </div>
  );
};

export default SimpleTest;