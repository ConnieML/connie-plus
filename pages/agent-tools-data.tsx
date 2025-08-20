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
import { UserIcon } from '@twilio-paste/icons/cjs/UserIcon';
import { DataObjectIcon } from '@twilio-paste/icons/cjs/DataObjectIcon';
import { ProductFaxIcon } from '@twilio-paste/icons/cjs/ProductFaxIcon';
import { NewIcon } from '@twilio-paste/icons/cjs/NewIcon';

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
        <Heading as="h2" variant="heading20" marginBottom="space0">
          Client & Partner Directories
        </Heading>
        <Grid gutter="space30">
          <Column>
            <EnterpriseCard
              icon={<UserIcon decorative={true} size="sizeIcon50" />}
              title="Client Directory"
              description="Access comprehensive client database with contact information, service history, and case notes."
              href="#"
              status="development"
              version="2.1.0"
              type="Database"
            />
          </Column>
          <Column>
            <EnterpriseCard
              icon={<UserIcon decorative={true} size="sizeIcon50" />}
              title="Community Partner Directory"
              description="Connect with community partners, referral sources, and collaborative organizations."
              href="#"
              status="development"
              version="2.1.0"
              type="Directory"
            />
          </Column>
        </Grid>
      </Box>
      {/* CRM / EMR Systems Section */}
      <Box marginBottom="space120">
        <Heading as="h2" variant="heading20" marginBottom="space0">
          CRM / EMR Systems
        </Heading>
        <Grid gutter="space30">
          <Column>
            <EnterpriseCard
              icon={<DataObjectIcon decorative={true} size="sizeIcon50" />}
              title="My Adult Daycare (EMR)"
              description="Direct access to the My Adult Daycare electronic medical records system for referrals and case management."
              href="#"
              status="development"
              version="3.2.1"
              type="EMR"
            />
          </Column>
          <Column>
            <EnterpriseCard
              icon={<DataObjectIcon decorative={true} size="sizeIcon50" />}
              title="My Adult Daycare (Embedded)"
              description="Integrated view of the My Adult Daycare system within the Connie platform interface."
              href="#"
              status="development"
              version="3.2.1"
              type="Embedded"
            />
          </Column>
        </Grid>
      </Box>
      {/* Fax Services Section */}
      <Box marginBottom="space120">
        <Heading as="h2" variant="heading20" marginBottom="space0">
          Fax Services
        </Heading>
        <Grid gutter="space30">
          <Column>
            <EnterpriseCard
              icon={<ProductFaxIcon decorative={true} size="sizeIcon50" />}
              title="Fax Cover Sheet Templates"
              description="Professional fax cover sheet templates for secure document transmission to partners and clients."
              href="#"
              status="development"
              version="1.4.0"
              type="Templates"
            />
          </Column>
          <Column>
            <EnterpriseCard
              icon={<ProductFaxIcon decorative={true} size="sizeIcon50" />}
              title="Embedded Fax Templates"
              description="Integrated fax template system within the Connie platform for streamlined document workflows."
              href="#"
              status="development"
              version="1.4.0"
              type="Embedded"
            />
          </Column>
        </Grid>
      </Box>
      {/* Online Forms Section */}
      <Box marginBottom="space120">
        <Heading as="h2" variant="heading20" marginBottom="space0">
          Online Forms
        </Heading>
        <Grid gutter="space30">
          <Column>
            <EnterpriseCard
              icon={<NewIcon decorative={true} size="sizeIcon50" />}
              title="H2H Referral Form"
              description="Digital referral form for Health-to-Home services, streamlining the client intake and referral process."
              href="#"
              status="development"
              version="1.2.0"
              type="Form"
            />
          </Column>
          <Column>
            <EnterpriseCard
              icon={<NewIcon decorative={true} size="sizeIcon50" />}
              title="Additional Forms"
              description="Access to additional intake forms, assessment tools, and documentation templates as needed."
              href="#"
              status="development"
              version="0.1.0"
              type="Forms"
            />
          </Column>
        </Grid>
      </Box>
    </Box>
  );
};

export default AgentTools