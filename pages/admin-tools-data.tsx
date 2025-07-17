import * as React from 'react';
import { Anchor } from "@twilio-paste/core/anchor";
import { Box } from "@twilio-paste/core/box";
import { Heading } from "@twilio-paste/core/heading";
import { Paragraph } from "@twilio-paste/core/paragraph";
import type { NextPage } from "next";
import Head from "next/head";
import { Card } from "@twilio-paste/core";
import { Button } from "@twilio-paste/core";
import { ProcessSuccessIcon } from '@twilio-paste/icons/cjs/ProcessSuccessIcon';
import { ProcessWarningIcon } from '@twilio-paste/icons/cjs/ProcessWarningIcon';
import { Table } from '@twilio-paste/core';
import { THead } from '@twilio-paste/core';
import { Tr } from '@twilio-paste/core';
import { Th } from '@twilio-paste/core';
import { TBody } from '@twilio-paste/core';
import { Td } from '@twilio-paste/core';
import { Text } from '@twilio-paste/core/text';
import { Grid, Column } from '@twilio-paste/core/grid';
import { Breadcrumb, BreadcrumbItem } from '@twilio-paste/core/breadcrumb';

const AdminToolsData: NextPage = () => {
  return (
    <Box as="main" padding="space70">
      <Head>
        <title>Admin Tools & Data - Connie Platform</title>
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
          <BreadcrumbItem>Admin Tools & Data</BreadcrumbItem>
        </Breadcrumb>
      </Box>
      
      {/* Header Section */}
      <Box marginBottom="space120">
        <Heading as="h1" variant="heading10">
          Admin Tools & Data
        </Heading>
        <Paragraph>
          Comprehensive admin tools and data integration resources for Connie+ platform management. 
          Configure channels, manage integrations, and access reporting tools.
        </Paragraph>
      </Box>
      {/* Admin Tools Section */}
      <Box marginBottom="space120">
        <Heading as="h2" variant="heading20">
          Core Admin Tools
        </Heading>
        <Grid gutter="space60">
          <Column span={[12, 6, 4]}>
            <Card>
              <Heading as="h3" variant="heading30">
                Channel Manager
              </Heading>
              <Paragraph>
                Manage voice, messaging, email, web, and social channels for your Connie platform.
              </Paragraph>
              <Anchor href="/channels">
                🔄 Access Channel Manager
              </Anchor>
            </Card>
          </Column>
          <Column span={[12, 6, 4]}>
            <Card>
              <Heading as="h3" variant="heading30">
                Data & Reporting
              </Heading>
              <Paragraph>
                Access comprehensive reporting tools and analytics for your organization.
              </Paragraph>
              <Anchor href="/data-center/">
                📊 View Reports
              </Anchor>
            </Card>
          </Column>
          <Column span={[12, 6, 4]}>
            <Card>
              <Heading as="h3" variant="heading30">
                Integration Tools
              </Heading>
              <Paragraph>
                Advanced integration management tools for connecting external systems.
              </Paragraph>
              <Text as="span" color="colorTextWeak">
                Coming Soon!
              </Text>
            </Card>
          </Column>
        </Grid>
      </Box>
      {/* Communication Tools Section */}
      <Box marginBottom="space120">
        <Heading as="h2" variant="heading20">
          Communication & Integration Tools
        </Heading>
        <Grid gutter="space60">
          <Column span={[12, 6]}>
            <Card>
              <Heading as="h3" variant="heading30">
                Data Integration Partners
              </Heading>
              <Paragraph>
                Connect with verified data integration partners for seamless data flow.
              </Paragraph>
              <Anchor href="https://outbound-messaging-v2-6965-dev.twil.io/index.html#/login" showExternal>
                Access Partner Portal
              </Anchor>
            </Card>
          </Column>
          <Column span={[12, 6]}>
            <Card>
              <Heading as="h3" variant="heading30">
                Email & eFax Integration
              </Heading>
              <Paragraph>
                Manage email and electronic fax integrations for your communication workflow.
              </Paragraph>
              <Anchor href="https://nextjs.org/docs" showExternal>
                Configure Email/eFax
              </Anchor>
            </Card>
          </Column>
          <Column span={[12, 6]}>
            <Card>
              <Heading as="h3" variant="heading30">
                Social Media Integration
              </Heading>
              <Paragraph>
                Connect social media platforms for comprehensive communication management.
              </Paragraph>
              <Anchor href="https://nextjs.org/docs" showExternal>
                Setup Social Media
              </Anchor>
            </Card>
          </Column>
          <Column span={[12, 6]}>
            <Card>
              <Heading as="h3" variant="heading30">
                Web Framework Integration
              </Heading>
              <Paragraph>
                Connect WordPress, React, and other web frameworks to your Connie platform.
              </Paragraph>
              <Anchor href="https://nextjs.org/docs" showExternal>
                Configure Web Frameworks
              </Anchor>
            </Card>
          </Column>
        </Grid>
      </Box>
      {/* Data Integration Section */}
      <Box marginBottom="space120">
        <Heading as="h2" variant="heading20">
          Data Integration & Mapping Tools
        </Heading>
        
        {/* Database Integrations */}
        <Box marginBottom="space80">
          <Heading as="h3" variant="heading30">
            Database Integrations
          </Heading>
          <Table>
  <THead>
    <Tr>
      <Th>Data Source:</Th>
      <Th>Database</Th>
      <Th>Resources</Th>
    </Tr>
  </THead>
  <TBody>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessSuccessIcon
            color="colorTextIconSuccess"
            decorative={false}
            title="valid" />
          <Text as="p" marginLeft="space20">Available</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2020-09-17</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
          MySQL
        </Text>
      </Td>
      <Td>Requirements + Connie Integration Steps</Td>
    </Tr>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessSuccessIcon
            color="colorTextIconSuccess"
            decorative={false}
            title="Available" />
          <Text as="p" marginLeft="space20">Available</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2024-05-31</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
          MongoDB
        </Text>
      </Td>
      <Td>Requirements + Connie Integration Steps</Td>
    </Tr>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessWarningIcon
            color="colorTextIconWarning"
            decorative={false}
            title="invalid" />
          <Text as="p" marginLeft="space20">In Development</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2020-09-17</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
          SupaBase
        </Text>
      </Td>
      <Td>See Roadmap</Td>
    </Tr>
  </TBody>
          </Table>
        </Box>
        
        {/* Spreadsheet Integrations */}
        <Box marginBottom="space80">
          <Heading as="h3" variant="heading30">
            Spreadsheet Integrations
          </Heading>
          <Table>
  <THead>
    <Tr>
    <Th>Data Source:</Th>
    <Th>Spreadsheet</Th>
    <Th>Resources</Th>
    </Tr>
  </THead>
  <TBody>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessSuccessIcon
            color="colorTextIconSuccess"
            decorative={false}
            title="valid" />
          <Text as="p" marginLeft="space20">Valid</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2024-06-12</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
          Airtable
        </Text>
      </Td>
      <Td>Requirements + Connie Integration Steps</Td>
    </Tr>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessSuccessIcon
            color="colorTextIconSuccess"
            decorative={false}
            title="valid" />
          <Text as="p" marginLeft="space20">Valid</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2024-06-12</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
          GSuite
        </Text>
      </Td>
      <Td>Requirements + Connie Integration Steps</Td>
    </Tr>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessWarningIcon
            color="colorTextIconWarning"
            decorative={false}
            title="In Development" />
          <Text as="p" marginLeft="space20">In Development</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2024-09-01</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
        Office365
        </Text>
      </Td>
      <Td>See Roadmap</Td>
    </Tr>
  </TBody>
          </Table>
        </Box>
        
        {/* CRM/EMR Integrations */}
        <Box marginBottom="space80">
          <Heading as="h3" variant="heading30">
            CRM / EMR Integrations
          </Heading>
          <Table>
  <THead>
    <Tr>
    <Th>Data Source:</Th>
    <Th>CRM / EMR </Th>
    <Th>Integration Steps</Th>
    </Tr>
  </THead>
  <TBody>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessSuccessIcon
            color="colorTextIconSuccess"
            decorative={false}
            title="valid" />
          <Text as="p" marginLeft="space20">Valid</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2023-05-08</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
        <Anchor href="https://www.hubspot.com/" showExternal>
              Hubspot
            </Anchor>
        </Text>
      </Td>
      <Td>Requirements + Connie Integration Steps</Td>
    </Tr>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessSuccessIcon
            color="colorTextIconSuccess"
            decorative={false}
            title="Available" />
          <Text as="p" marginLeft="space20">Available</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2024-06-17</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
          Zoho
        </Text>
      </Td>
      <Td>Requirements + Connie Integration Steps</Td>
    </Tr>
    <Tr>
      <Td>
        <Box display="flex" alignItems="center">
          <ProcessWarningIcon
            color="colorTextIconWarning"
            decorative={false}
            title="invalid" />
          <Text as="p" marginLeft="space20">In Development</Text>
        </Box>
        <Text as="p" color="colorTextWeak" marginLeft="space70">2024-09-01</Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="fontFamilyCode">
          Monday
        </Text>
      </Td>
      <Td>See Roadmap</Td>
    </Tr>
  </TBody>
          </Table>
        </Box>
      </Box>
      
      {/* Action Cards Section */}
      <Box marginBottom="space120">
        <Heading as="h2" variant="heading20">
          Resources & Documentation
        </Heading>
        <Grid gutter="space60">
          <Column span={[12, 6]}>
            <Card>
              <Heading as="h3" variant="heading30">
                What's New with Connie
              </Heading>
              <Paragraph>
                Stay updated with the latest product releases and feature announcements on our roadmap.
              </Paragraph>
              <Button variant="primary">
                View Roadmap
              </Button>
            </Card>
          </Column>
          <Column span={[12, 6]}>
            <Card>
              <Heading as="h3" variant="heading30">
                Admin Documentation
              </Heading>
              <Paragraph>
                Comprehensive documentation covering SDKs, sample applications, and integration guides.
              </Paragraph>
              <Button variant="secondary">
                Access Documentation
              </Button>
            </Card>
          </Column>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminToolsData