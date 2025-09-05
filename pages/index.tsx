// import React from 'react';
import { Heading } from '@twilio-paste/core/heading';
import { Text } from '@twilio-paste/core/text';
import { Column, Grid } from '@twilio-paste/core/grid';
import { ProductUsageIcon } from '@twilio-paste/icons/cjs/ProductUsageIcon';
import { AgentIcon } from "@twilio-paste/icons/cjs/AgentIcon";
import { NewIcon } from '@twilio-paste/icons/cjs/NewIcon';
import { AddListIcon } from '@twilio-paste/icons/cjs/AddListIcon';
import { WarningIcon } from '@twilio-paste/icons/cjs/WarningIcon';
import type { NextPage } from "next";
import Head from "next/head";
import { Box } from '@twilio-paste/core';
import { EnterpriseCard } from '../components/EnterpriseCard';
import { QuickActions } from '../components/QuickActions';

// import { PrototypeAnchor } from '../components/site/PrototypeAnchor';
const Demos: NextPage = () => {
  return (
  <>
    <Box as="main" padding="space70">
    <Head>
      <title>Connie Plus NextJS App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {/* Logo Header */}
    <Box marginBottom="space70">
      <Heading as="h1" variant="heading10" marginBottom="space0">
        <Text as="span" fontWeight="fontWeightBold" fontSize="fontSize90" color="colorText">
          CONNIE
        </Text>
        <Text as="span" fontWeight="fontWeightBold" fontSize="fontSize90" color="colorText" marginLeft="space20">
          +
        </Text>
      </Heading>
    </Box>
    
    
    {/* Quick Actions */}
    <QuickActions
      actions={[
        { 
          label: 'View Documentation', 
          href: 'https://docs.connie.one',
          variant: 'secondary'
        },
        { 
          label: 'Get Support', 
          href: '/support/',
          variant: 'secondary',
          statusIndicator: (
            <Box 
              width="8px" 
              height="8px" 
              borderRadius="borderRadiusCircle"
              backgroundColor="colorBackgroundSuccess"
              title="Support team is online"
            />
          )
        },
        { 
          label: 'Report Bug', 
          href: '/support/report-bug',
          variant: 'secondary',
          icon: <WarningIcon decorative size="sizeIcon20" />
        }
      ]}
    />
    
    <Grid gutter="space30" marginBottom="space50">
      <Column>
        <EnterpriseCard
          icon={<AgentIcon decorative={true} size="sizeIcon50" />}
          title="Staff Agent Tools & Data"
          description="Helpful tools and resources for Staff Agents & Volunteers."
          href="/agent-tools-data"
          status="ua-testing"
          version="2.0.1"
          type="Tools"
          docsLink="https://bit.ly/connie-docs"
        />
      </Column>
      <Column>
        <EnterpriseCard
          icon={<AddListIcon decorative={true} size="sizeIcon50" />}
          title="Admin Tools & Data"
          description="Network and account management tools. Data, reports and performance dashboards. Access recordings."
          href="/admin-tools-data"
          status="ua-testing"
          version="2.0.1"
          type="Admin"
          docsLink="https://bit.ly/connie-docs"
        />
      </Column>
    </Grid>
    
    <Grid gutter="space30" marginBottom="space50">
      <Column>
        <EnterpriseCard
          icon={<ProductUsageIcon decorative={true} size="sizeIcon50" />}
          title="Learning & Support Center"
          description="Learn everything you need to know to Connie like a pro! Support services."
          href="#"
          status="development"
          version="1.5.0"
          type="Support"
          docsLink="https://bit.ly/connie-docs"
        />
      </Column>
      <Column>
        <EnterpriseCard
          icon={<NewIcon decorative={true} size="sizeIcon50" />}
          title="Connie Showroom"
          description="Product Roadmap, pre-release demos, make a suggestion & win cool stuff!"
          href="#"
          status="development"
          version="0.9.0"
          type="Preview"
          docsLink="https://bit.ly/connie-docs"
        />
      </Column>
    </Grid>
    </Box>
  </>
  );
};
export default Demos