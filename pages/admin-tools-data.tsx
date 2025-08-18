import * as React from 'react';
import { Anchor } from "@twilio-paste/core/anchor";
import { Box } from "@twilio-paste/core/box";
import { Heading } from "@twilio-paste/core/heading";
import { Paragraph } from "@twilio-paste/core/paragraph";
import type { NextPage } from "next";
import Head from "next/head";
import { Card } from "@twilio-paste/core";
import { Button } from "@twilio-paste/core";
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
          Essential administrative tools and resources for managing your Connie+ platform. 
          Access channel configuration, reporting dashboards, and documentation.
        </Paragraph>
      </Box>
      {/* Admin Tools Section */}
      <Box marginBottom="space120">
        <Heading as="h2" variant="heading20">
          Core Admin Tools
        </Heading>
        <Grid gutter="space60">
          <Column span={[12, 6]}>
            <Card>
              <Heading as="h3" variant="heading30">
                Channel Manager
              </Heading>
              <Paragraph>
                Manage voice, messaging, email, web, and social channels for your Connie platform.
              </Paragraph>
              <Button variant="primary" as="a" href="/channels">
                Access Channel Manager
              </Button>
              <Box marginTop="space40">
                <Anchor href="https://docs.connie.one/end-users/cbo-admins/getting-started" showExternal>
                  docs
                </Anchor>
              </Box>
            </Card>
          </Column>
          <Column span={[12, 6]}>
            <Card>
              <Heading as="h3" variant="heading30">
                Data & Reporting
              </Heading>
              <Paragraph>
                Access comprehensive reporting tools and analytics for your organization.
              </Paragraph>
              <Button variant="primary" as="a" href="/data-center">
                View Reports
              </Button>
              <Box marginTop="space40">
                <Anchor href="https://docs.connie.one/end-users/cbo-admins/getting-started" showExternal>
                  docs
                </Anchor>
              </Box>
            </Card>
          </Column>
        </Grid>
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
                Admin Documentation
              </Heading>
              <Paragraph>
                Comprehensive documentation covering SDKs, sample applications, and integration guides.
              </Paragraph>
              <Button variant="primary">
                Access Documentation
              </Button>
              <Box marginTop="space40">
                <Anchor href="https://docs.connie.one/end-users/cbo-admins/getting-started" showExternal>
                  docs
                </Anchor>
              </Box>
            </Card>
          </Column>
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
              <Box marginTop="space40">
                <Anchor href="https://docs.connie.one/end-users/cbo-admins/getting-started" showExternal>
                  docs
                </Anchor>
              </Box>
            </Card>
          </Column>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminToolsData