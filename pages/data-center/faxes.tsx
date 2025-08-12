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

// TypeScript interface for fax data
interface Fax {
  sid: string;
  faxId: string;
  to: string;
  from: string;
  direction: string;
  status: string;
  pageCount: number;
  duration: number;
  dateCreated: string;
  dateUpdated: string;
  pdfUri: string;
  createdAt: string;
}

const FaxesPage: NextPage = () => {
  const [faxes, setFaxes] = useState<Fax[]>([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState('');
  const [showFaxes, setShowFaxes] = useState(false);

  const fetchFaxes = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/faxes');
      const data = await response.json();
      
      if (data.success === true) {
        setFaxes(data.faxes);
        setShowFaxes(true);
      } else {
        setError(data.error || 'Failed to fetch faxes');
      }
    } catch (err) {
      const error = err as Error;
      setError(`Error connecting to fax service: ${error.message}`);
    }
    setLoading(false);
  };

  // Auto-load faxes when page mounts
  useEffect(() => {
    fetchFaxes();
  }, []);

  return (
    <Box as="main" padding="space70">
      <Head>
        <title>Recent Faxes - Connie Data Center</title>
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
          <BreadcrumbItem>Recent Faxes</BreadcrumbItem>
        </Breadcrumb>
      </Box>
      
      <Heading as="h1" variant="heading10">
        Recent Faxes
      </Heading>
      <Paragraph>
        View and download recent fax documents processed through your system.
        Fax documents are automatically loaded when you visit this page.
      </Paragraph>
      
      {!loading && (
        <Box marginTop="space60" marginBottom="space40">
          <Button 
            variant="secondary" 
            onClick={fetchFaxes} 
            loading={loading} 
            disabled={loading}
          >
            Refresh Faxes
          </Button>
        </Box>
      )}
      
      {loading && (
        <Box marginTop="space60" marginBottom="space40">
          <Alert variant="neutral">
            Loading recent faxes...
          </Alert>
        </Box>
      )}
      
      {error && (
        <Box marginBottom="space40">
          <Alert variant="error">{error}</Alert>
        </Box>
      )}
      
      {showFaxes && faxes.length > 0 && (
        <Box marginBottom="space40">
          <Box marginBottom="space30">
            <Heading as="h2" variant="heading30">
              Fax Documents ({faxes.length})
            </Heading>
            <Paragraph>
              Click "View PDF" to open each fax document in a new tab.
            </Paragraph>
          </Box>
          <Table>
            <THead>
              <Tr>
                <Th>Date</Th>
                <Th>From/To</Th>
                <Th>Direction</Th>
                <Th>Pages</Th>
                <Th>Status</Th>
                <Th>Duration</Th>
                <Th>View Document</Th>
              </Tr>
            </THead>
            <TBody>
              {faxes.map((fax) => (
                <Tr key={fax.faxId}>
                  <Td>{fax.createdAt}</Td>
                  <Td>{fax.direction === 'INBOUND' ? fax.from : fax.to}</Td>
                  <Td>
                    <Box 
                      display="inline-block" 
                      padding="space20" 
                      backgroundColor={fax.direction === 'INBOUND' ? 'colorBackgroundSuccessWeakest' : 'colorBackgroundWarningWeakest'}
                      borderRadius="borderRadius20"
                    >
                      {fax.direction}
                    </Box>
                  </Td>
                  <Td>{fax.pageCount}</Td>
                  <Td>{fax.status}</Td>
                  <Td>{fax.duration}s</Td>
                  <Td>
                    <Anchor 
                      href={fax.pdfUri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      showExternal
                    >
                      View PDF
                    </Anchor>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </Box>
      )}
      
      {showFaxes && faxes.length === 0 && (
        <Box marginBottom="space40">
          <Alert variant="neutral">
            No fax documents found for the current time period.
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default FaxesPage;