import React, { useState, useEffect } from 'react';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Button } from '@twilio-paste/core/button';
import { Table, THead, TBody, Tr, Td, Th } from '@twilio-paste/core/table';
import type { NextPage } from "next";
import Head from "next/head";
import { Box } from '@twilio-paste/core';
import { Alert } from "@twilio-paste/core/alert";
import { Breadcrumb, BreadcrumbItem } from '@twilio-paste/core/breadcrumb';
import { Anchor } from "@twilio-paste/core/anchor";

// TypeScript interface for voicemail data
interface Voicemail {
  sid: string;
  callSid: string;
  duration: number;
  dateCreated: string;
  dateUpdated: string;
  status: string;
  source: string;
  uri: string;
  createdAt: string;
}

const VoicemailsPage: NextPage = () => {
  const [voicemails, setVoicemails] = useState<Voicemail[]>([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState('');
  const [showVoicemails, setShowVoicemails] = useState(false);

  const fetchVoicemails = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/voicemails');
      const data = await response.json();
      
      if (data.success) {
        setVoicemails(data.voicemails);
        setShowVoicemails(true);
      } else {
        setError(data.error || 'Failed to fetch voicemails');
      }
    } catch (err) {
      setError('Error connecting to voicemail service');
    }
    setLoading(false);
  };

  // Auto-load voicemails when page mounts
  useEffect(() => {
    fetchVoicemails();
  }, []);

  return (
    <Box as="main" padding="space70">
      <Head>
        <title>NSS Voicemails - Connie Data Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Logo Header */}
      <Box marginBottom="space60">
        <Anchor href="/">
          <img 
            src="/assets/connie-plus-logo.svg" 
            alt="Connie Platform Logo" 
            style={{ height: '40px', width: 'auto' }}
          />
        </Anchor>
      </Box>
      
      {/* Breadcrumb Navigation */}
      <Box marginBottom="space60">
        <Breadcrumb aria-label="breadcrumb">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/data-center">Data Center</BreadcrumbItem>
          <BreadcrumbItem>NSS Voicemails</BreadcrumbItem>
        </Breadcrumb>
      </Box>
      
      <Heading as="h1" variant="heading10">
        NSS Voicemails
      </Heading>
      <Paragraph>
        Access and playback voicemail recordings from your NSS contact center.
        Voicemails are automatically loaded when you visit this page.
      </Paragraph>
      
      {!loading && (
        <Box marginTop="space60" marginBottom="space40">
          <Button 
            variant="secondary" 
            onClick={fetchVoicemails} 
            loading={loading} 
            disabled={loading}
          >
            Refresh Voicemails
          </Button>
        </Box>
      )}
      
      {loading && (
        <Box marginTop="space60" marginBottom="space40">
          <Alert variant="neutral">
            Loading voicemails...
          </Alert>
        </Box>
      )}
      
      {error && (
        <Box marginBottom="space40">
          <Alert variant="error">{error}</Alert>
        </Box>
      )}
      
      {showVoicemails && voicemails.length > 0 && (
        <Box marginBottom="space40">
          <Box marginBottom="space30">
            <Heading as="h2" variant="heading30">
              Recent Voicemails ({voicemails.length})
            </Heading>
            <Paragraph>
              Use the audio controls below to listen to each voicemail message.
            </Paragraph>
          </Box>
          <Table>
            <THead>
              <Tr>
                <Th>Date Received</Th>
                <Th>Duration</Th>
                <Th>Playback</Th>
                <Th>Status</Th>
              </Tr>
            </THead>
            <TBody>
              {voicemails.map((voicemail) => (
                <Tr key={voicemail.sid}>
                  <Td>{voicemail.createdAt}</Td>
                  <Td>{voicemail.duration}s</Td>
                  <Td>
                    <audio controls style={{ width: '250px', height: '35px' }}>
                      <source src={voicemail.uri} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </Td>
                  <Td>{voicemail.status}</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </Box>
      )}
      
      {showVoicemails && voicemails.length === 0 && (
        <Box marginBottom="space40">
          <Alert variant="neutral">
            No voicemails found for the current time period.
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default VoicemailsPage;