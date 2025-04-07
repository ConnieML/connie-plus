import * as React from 'react';
import { Anchor } from "@twilio-paste/core/anchor";
import { Box } from "@twilio-paste/core/box";
import { Heading } from "@twilio-paste/core/heading";
import { ListItem, UnorderedList } from "@twilio-paste/core/list";
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Separator } from "@twilio-paste/core/separator";
import type { NextPage } from "next";
import Head from "next/head";

const AgentTools: NextPage = () => {
  return (
    
    <Box as="main" padding="space70">
      <Head>
        <title>Connie CBO Agent Tools Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading as="h1" variant="heading10">
       Agent Tools & Data
      </Heading>
      <Paragraph>
      Here you will find information and resources for Staff Agents. Below is a list of links, tools and resources commonly used by staff members. Return to home page by clicking {' '}  <Anchor href="/">Home</Anchor>.
      </Paragraph>
      <Separator orientation="horizontal" verticalSpacing="space120" />
            <Heading as="h2" variant="heading20">
        Client / Partner Directories
      </Heading>
      <UnorderedList>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="/templates/iframe-embed-airtable-client" showExternal>
            🔎 Client Directory (Airtable)
            </Anchor>
          </Heading>
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <Paragraph></Paragraph>
          </ListItem>
          <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="/templates/iframe-embed-airtable-partner">
            🏥 Community Partner Directory (Airtable)
            </Anchor>
          </Heading>
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <Paragraph></Paragraph>
        </ListItem>
      </UnorderedList>
      <Separator orientation="horizontal" verticalSpacing="space120" />
      <Heading as="h2" variant="heading20">
        CRM / EMR
      </Heading>
      <UnorderedList>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="https://staging.myadulthomecare.com/referral?phone_number=510-930-9015" showExternal>
            📋 My Adult Daycare (EMR)
            </Anchor>
          </Heading>
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <Paragraph></Paragraph>
          </ListItem>
          <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="/agent-tools/myadultdaycare">
            📋 My Adult Daycare (iFrame)
            </Anchor>
          </Heading>
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <Paragraph></Paragraph>
        </ListItem>
      </UnorderedList>
      <Separator orientation="horizontal" verticalSpacing="space120" />
      <Heading as="h2" variant="heading20">
        FAX
      </Heading>
      <UnorderedList>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="https://bit.ly/connie-demo-fax-cover-1" showExternal>
            📠 Fax Cover Sheet Templates
            </Anchor>
          </Heading>
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <Paragraph></Paragraph>
          </ListItem>
          <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="/demos/iframes/iframe-embed-fax1">
            📠 Fax Coversheet Templates (iFrame)
            </Anchor>
          </Heading>
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <Paragraph></Paragraph>
        </ListItem>
      </UnorderedList>
      <Heading as="h2" variant="heading20">
      Online Forms
      </Heading>
      <UnorderedList>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="/forms/connie-formbuilder-nss-referral-online">
            📋 H2H Referral Form (Online)
            </Anchor>
          </Heading>
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <Paragraph></Paragraph>
        </ListItem>
      </UnorderedList>
</Box>
  );
};

export default AgentTools