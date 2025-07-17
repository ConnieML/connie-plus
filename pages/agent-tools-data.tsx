import * as React from 'react';
import { Anchor } from "@twilio-paste/core/anchor";
import { Box } from "@twilio-paste/core/box";
import { Heading } from "@twilio-paste/core/heading";
import { Paragraph } from "@twilio-paste/core/paragraph";
import type { NextPage } from "next";
import Head from "next/head";
import { Card } from "@twilio-paste/core";
import { Grid, Column } from '@twilio-paste/core/grid';
import { Breadcrumb, BreadcrumbItem } from '@twilio-paste/core/breadcrumb';

const AgentTools: NextPage = () => {
  return (
    <Box as="main" padding="space70">
      <Head>
        <title>Agent Tools & Data - Connie Platform</title>
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
          <BreadcrumbItem>Agent Tools & Data</BreadcrumbItem>
        </Breadcrumb>
      </Box>
      
      {/* Header Section */}
      <Box marginBottom="space120">
        <Heading as="h1" variant="heading10">
          Agent Tools & Data
        </Heading>
        <Paragraph>
          Essential tools and resources for Staff Agents and volunteers. Access client directories, 
          CRM/EMR systems, forms, and communication tools to support your daily workflows.
        </Paragraph>
      </Box>
      {/* Client & Partner Directories Section */}
      <Box marginBottom="space120">
        <Heading as="h2" variant="heading20">
          Client & Partner Directories
        </Heading>
        <Grid gutter="space60">
          <Column span={[12, 6]}>
            <Card>
              <Heading as="h3" variant="heading30">
                Client Directory
              </Heading>
              <Paragraph>
                Access comprehensive client database with contact information, service history, and case notes.
              </Paragraph>
              <Anchor href="/templates/iframe-embed-airtable-client">
                🔎 View Client Directory
              </Anchor>
            </Card>
          </Column>
          <Column span={[12, 6]}>
            <Card>
              <Heading as="h3" variant="heading30">
                Community Partner Directory
              </Heading>
              <Paragraph>
                Connect with community partners, referral sources, and collaborative organizations.
              </Paragraph>
              <Anchor href="/templates/iframe-embed-airtable-partner">
                🏥 View Partner Directory
              </Anchor>
            </Card>
          </Column>
        </Grid>
      </Box>
      {/* CRM / EMR Systems Section */}
      <Box marginBottom="space120">
        <Heading as="h2" variant="heading20">
          CRM / EMR Systems
        </Heading>
        <Grid gutter="space60">
          <Column span={[12, 6]}>
            <Card>
              <Heading as="h3" variant="heading30">
                My Adult Daycare (EMR)
              </Heading>
              <Paragraph>
                Direct access to the My Adult Daycare electronic medical records system for referrals and case management.
              </Paragraph>
              <Anchor href="https://staging.myadulthomecare.com/referral?phone_number=510-930-9015" showExternal>
                📋 Access EMR System
              </Anchor>
            </Card>
          </Column>
          <Column span={[12, 6]}>
            <Card>
              <Heading as="h3" variant="heading30">
                My Adult Daycare (Embedded)
              </Heading>
              <Paragraph>
                Integrated view of the My Adult Daycare system within the Connie platform interface.
              </Paragraph>
              <Anchor href="/agent-tools/myadultdaycare">
                📋 Open Embedded View
              </Anchor>
            </Card>
          </Column>
        </Grid>
      </Box>
      {/* Fax Services Section */}
      <Box marginBottom="space120">
        <Heading as="h2" variant="heading20">
          Fax Services
        </Heading>
        <Grid gutter="space60">
          <Column span={[12, 6]}>
            <Card>
              <Heading as="h3" variant="heading30">
                Fax Cover Sheet Templates
              </Heading>
              <Paragraph>
                Professional fax cover sheet templates for secure document transmission to partners and clients.
              </Paragraph>
              <Anchor href="https://bit.ly/connie-demo-fax-cover-1" showExternal>
                📠 Access Templates
              </Anchor>
            </Card>
          </Column>
          <Column span={[12, 6]}>
            <Card>
              <Heading as="h3" variant="heading30">
                Embedded Fax Templates
              </Heading>
              <Paragraph>
                Integrated fax template system within the Connie platform for streamlined document workflows.
              </Paragraph>
              <Anchor href="/demos/iframes/iframe-embed-fax1">
                📠 Use Embedded Templates
              </Anchor>
            </Card>
          </Column>
        </Grid>
      </Box>
      {/* Online Forms Section */}
      <Box marginBottom="space120">
        <Heading as="h2" variant="heading20">
          Online Forms
        </Heading>
        <Grid gutter="space60">
          <Column span={[12, 6]}>
            <Card>
              <Heading as="h3" variant="heading30">
                H2H Referral Form
              </Heading>
              <Paragraph>
                Digital referral form for Health-to-Home services, streamlining the client intake and referral process.
              </Paragraph>
              <Anchor href="/forms/connie-formbuilder-nss-referral-online">
                📋 Complete Referral Form
              </Anchor>
            </Card>
          </Column>
          <Column span={[12, 6]}>
            <Card>
              <Heading as="h3" variant="heading30">
                Additional Forms
              </Heading>
              <Paragraph>
                Access to additional intake forms, assessment tools, and documentation templates as needed.
              </Paragraph>
              <Anchor href="#">
                📋 Coming Soon
              </Anchor>
            </Card>
          </Column>
        </Grid>
      </Box>
    </Box>
  );
};

export default AgentTools