import React, { useState } from 'react';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Column, Grid } from '@twilio-paste/core/grid';
import { Card } from '@twilio-paste/core/card';
import { MediaObject, MediaBody, MediaFigure } from '@twilio-paste/core/media-object';
import { Anchor } from '@twilio-paste/core/anchor';
import { Button } from '@twilio-paste/core/button';
import { DataBarChartIcon } from '@twilio-paste/icons/cjs/DataBarChartIcon';
import { PlayIcon } from "@twilio-paste/icons/cjs/PlayIcon";
import { UnpinIcon } from '@twilio-paste/icons/cjs/UnpinIcon';
import { Table, THead, TBody, Tr, Td, Th } from '@twilio-paste/core/table';
import type { NextPage } from "next";
import Head from "next/head";
import { Box } from '@twilio-paste/core';
import { Stack } from "@twilio-paste/core/stack";
import { CustomizationProvider } from "@twilio-paste/core/customization";
import { Alert } from "@twilio-paste/core/alert";

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


// VoicemailPlayer component for NSS voicemail listing
const VoicemailPlayer = () => {
  const [voicemails, setVoicemails] = useState<Voicemail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVoicemails, setShowVoicemails] = useState(false);

  const fetchVoicemails = async () => {
    setLoading(true);
    setError('');
    try {
      // Call our Next.js API proxy (no CORS issues)
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

  return (
    <Box>
      <Box marginBottom="space40">
        <Button variant="primary" onClick={fetchVoicemails} loading={loading} disabled={loading}>
          {loading ? 'Loading...' : 'Load NSS Voicemails'}
        </Button>
      </Box>
      
      {error && (
        <Box marginBottom="space40">
          <Alert variant="error">{error}</Alert>
        </Box>
      )}
      
      {showVoicemails && voicemails.length > 0 && (
        <Box marginBottom="space40">
          <Box marginBottom="space30">
            <Heading as="h3" variant="heading30">
              Recent NSS Voicemails ({voicemails.length})
            </Heading>
          </Box>
          <Table>
            <THead>
              <Tr>
                <Th>Date</Th>
                <Th>Duration</Th>
                <Th>Playback</Th>
              </Tr>
            </THead>
            <TBody>
              {voicemails.map((voicemail) => (
                <Tr key={voicemail.sid}>
                  <Td>{voicemail.createdAt}</Td>
                  <Td>{voicemail.duration}s</Td>
                  <Td>
                    <audio controls style={{ width: '200px', height: '30px' }}>
                      <source src={voicemail.uri} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

const Demos: NextPage = () => {
  return (
  <>
    <Box as="main" padding="space70">
    <Head>
      <title>Connie Plus Data and Reporting Center</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Heading as="h1" variant="heading10">
      Connie Datacenter
    </Heading><Paragraph>
        Welcome to the Connie Datacenter! Select the Data & Reports option below to access all stored transaction data as well as powerful, readymade dashboard reports that you can send or download with one click. 
        In addition to raw data and dashboard reports, you can search for and access all stored media associated with completed tasks completed from the Playback Machine.
        both realtime and historical Or click to go{' '}
        <Anchor href="/">Home</Anchor>.
      </Paragraph><Heading as="h2" variant="heading20">
        Admin Data & Reporting Resources
        <CustomizationProvider
        baseTheme="default"
        elements={{
          ALERT: {
            borderRadius: "borderRadius30",
            variants: {
              error: {
                fontWeight: "fontWeightBold"
              },
              warning: {
                fontWeight: "fontWeightBold"
              }
            }
          },
          CUSTOM_ALERT: {
            borderRadius: "borderRadius30",
            borderStyle: "solid",
            borderWidth: "borderWidth10",
            paddingY: "space80",
            variants: {
              neutral: {
                borderColor: "colorBorderPrimaryWeak"
              },
              error: {
                borderColor: "colorBorderErrorWeak"
              },
              warning: {
                borderColor: "colorBorderWarningWeak"
              }
            }
          }
        }}
      >
        <Box padding="space100">
          <Stack orientation="vertical" spacing="space40">
            <Alert variant="neutral">PLEASE NOTE: As of Connie Prototype v1.5, All reporting feature and functions are under active development. Currently, there are no custom report build tools available. To build a custom report, please download the raw data sets you need and import into a local spreadsheet application. Custom report generation will be generally available as of Connie MVPv1.0. If you would like early access to advanced Connie reporting features, please consider participainting in the Connie Reporting Cohort Group by contacting us <Anchor href="/empty-state">here</Anchor>.</Alert>
          </Stack>
        </Box>
      </CustomizationProvider>

      </Heading><Grid gutter="space30" marginBottom="space50">

        <Column>
          <Card>
            <MediaObject as="div">
              <MediaFigure as="div" spacing="space50">
                <DataBarChartIcon decorative={true} size="sizeIcon50" />
              </MediaFigure>
              <MediaBody as="div">
                <Heading as="h2" variant="heading30">
                  <MediaObject verticalAlign="center">
                    <MediaBody>
                      <Anchor href="/data-center/dashboard">Analytics Dashboard</Anchor>
                    </MediaBody>
                    <MediaFigure align="end" spacing="space40">
                      <Button variant="link">
                        <UnpinIcon decorative={false} title="Unpin Voice from navigation" size="sizeIcon50" />
                      </Button>
                    </MediaFigure>
                  </MediaObject>
                </Heading>
                <Paragraph>Real-time analytics and insights from your contact center.</Paragraph>
                <Anchor href="https://docs.google.com/presentation/d/10FvsaIWYulWj72B2wUdXjw0mvJ-bB8uc/edit#slide=id.p10" showExternal>
                  docs
                </Anchor>
              </MediaBody>
            </MediaObject>
          </Card>
        </Column>

        <Column>
          <Card>
            <MediaObject as="div">
              <MediaFigure as="div" spacing="space50">
                <PlayIcon decorative={true} size="sizeIcon50" />
              </MediaFigure>
              <MediaBody as="div">
                <Heading as="h2" variant="heading30">
                  <MediaObject verticalAlign="center">
                    <MediaBody>
                      Playback Machine
                    </MediaBody>
                    <MediaFigure align="end" spacing="space40">
                      <Button variant="link">
                        <UnpinIcon decorative={false} title="Unpin Voice from navigation" size="sizeIcon50" />
                      </Button>
                    </MediaFigure>
                  </MediaObject>
                </Heading>
                <Paragraph>Retrieve & playback task media & call recordings.</Paragraph>
                <Box marginTop="space40">
                  <VoicemailPlayer />
                </Box>
                <Anchor href="https://docs.google.com/presentation/d/10FvsaIWYulWj72B2wUdXjw0mvJ-bB8uc/edit#slide=id.p10" showExternal>
                  docs
                </Anchor>
              </MediaBody>
            </MediaObject>
          </Card>
        </Column>
      </Grid>
    </Box>
  </>
  );
};
export default Demos