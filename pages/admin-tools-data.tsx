import * as React from 'react';
import { Anchor } from "@twilio-paste/core/anchor";
import { Box } from "@twilio-paste/core/box";
import { Heading } from "@twilio-paste/core/heading";
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Text } from "@twilio-paste/core/text";
import type { NextPage } from "next";
import Head from "next/head";
import { Grid, Column } from '@twilio-paste/core/grid';
import { Breadcrumb, BreadcrumbItem } from '@twilio-paste/core/breadcrumb';
import { EnterpriseCard } from '../components/EnterpriseCard';
import { AddListIcon } from '@twilio-paste/icons/cjs/AddListIcon';
import { ProductUsageIcon } from '@twilio-paste/icons/cjs/ProductUsageIcon';
import { NewIcon } from '@twilio-paste/icons/cjs/NewIcon';
import { AgentIcon } from '@twilio-paste/icons/cjs/AgentIcon';

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
          <Text as="span" fontWeight="fontWeightBold" fontSize="fontSize70" color="colorText">
            CONNIE
          </Text>
          <Text as="span" fontWeight="fontWeightBold" fontSize="fontSize70" color="colorText" marginLeft="space20">
            +
          </Text>
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
        <Heading as="h2" variant="heading20" marginBottom="space0">
          Core Admin Tools
        </Heading>
        <Grid gutter="space30">
          <Column>
            <EnterpriseCard
              icon={<AddListIcon decorative={true} size="sizeIcon50" />}
              title="Channel Manager"
              description="Manage voice, messaging, email, web, and social channels for your Connie platform."
              href="/channels"
              status="ua-testing"
              version="4.1.2"
              type="Manager"
              docsLink="https://docs.connie.one/end-users/cbo-admins/getting-started"
            />
          </Column>
          <Column>
            <EnterpriseCard
              icon={<ProductUsageIcon decorative={true} size="sizeIcon50" />}
              title="Data & Reporting"
              description="Access comprehensive reporting tools and analytics for your organization."
              href="/data-center"
              status="ua-testing"
              version="2.3.1"
              type="Analytics"
              docsLink="https://docs.connie.one/end-users/cbo-admins/getting-started"
            />
          </Column>
        </Grid>
      </Box>
      
      {/* Action Cards Section */}
      <Box marginBottom="space120">
        <Heading as="h2" variant="heading20" marginBottom="space0">
          Resources & Documentation
        </Heading>
        <Grid gutter="space30">
          <Column>
            <EnterpriseCard
              icon={<NewIcon decorative={true} size="sizeIcon50" />}
              title="Admin Documentation"
              description="Comprehensive documentation covering SDKs, sample applications, and integration guides."
              href="https://docs.connie.one/end-users/cbo-admins/getting-started"
              status="ua-testing"
              version="3.0.0"
              type="Docs"
              docsLink="https://docs.connie.one/end-users/cbo-admins/getting-started"
            />
          </Column>
          <Column>
            <EnterpriseCard
              icon={<AgentIcon decorative={true} size="sizeIcon50" />}
              title="What's New with Connie"
              description="Stay updated with the latest product releases and feature announcements on our roadmap."
              href="/demos/connie-broadcast"
              status="staging"
              version="1.0.0"
              type="Roadmap"
              docsLink="https://docs.connie.one/end-users/cbo-admins/getting-started"
            />
          </Column>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminToolsData