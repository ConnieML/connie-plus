import * as React from 'react';
import { Anchor } from "@twilio-paste/core/anchor";
import { Box } from "@twilio-paste/core/box";
import { Heading } from "@twilio-paste/core/heading";
import { ListItem, UnorderedList } from "@twilio-paste/core/list";
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Separator } from "@twilio-paste/core/separator";
import type { NextPage } from "next";
import Head from "next/head";
import { Stack } from '@twilio-paste/core/stack';
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

const Demos: NextPage = () => {
  return (
    
    <Box as="main" padding="space70">
      <Head>
        <title>Tasks Features Info Template Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading as="h1" variant="heading10">
        Tools & Data
      </Heading>
      <Paragraph>
      Here you will find resources to help you connect Connie+ to 3rd party software and applications you use every day to provide services. Below is a list of integrations that have been tested and instructions on how to integrate them into Connie. Don't see the program or app you need? Click the Roadmap button below to see if it's currently in development or contact the Connie Cares Team for more information. Return to home page by clicking {' '}  <Anchor href="/">Home</Anchor>.
      </Paragraph>
      <Separator orientation="horizontal" verticalSpacing="space120" />
      <Heading as="h2" variant="heading20">
        Connie Admin Tools
      </Heading>

      <UnorderedList>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="./channel-manager/nss-channelmanager">
            🔄 Channel Manager: Voice, Messaging, Fax
            </Anchor>
          </Heading>
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <Paragraph></Paragraph>
        </ListItem>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="" showExternal>
            Integration Tools (Coming Soon!)
            </Anchor>
          </Heading>
          <Paragraph />
        </ListItem>
      </UnorderedList>
      <Separator orientation="horizontal" verticalSpacing="space120" />
      <Heading as="h2" variant="heading20">
        Connie Messaging & Email Tools
      </Heading>

      <UnorderedList>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="https://outbound-messaging-v2-6965-dev.twil.io/index.html#/login" showExternal>
            Data Integration Partners (Available Now!)
            </Anchor>
          </Heading>
          <Paragraph />
        </ListItem>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="https://nextjs.org/docs" showExternal>
            Email, eFax Integrations (Available Now!)
            </Anchor>
          </Heading>
          <Paragraph />
        </ListItem>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="https://nextjs.org/docs" showExternal>
            Social Media Integrations (Available Now!)
            </Anchor>
          </Heading>
          <Paragraph />
        </ListItem>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="https://nextjs.org/docs" showExternal>
            Web Framework Integrations (Wordpress, React) (Available Now!)
            </Anchor>
          </Heading>
          <Paragraph />
        </ListItem>
      </UnorderedList>
      <Separator orientation="horizontal" verticalSpacing="space120" />
      <Heading as="h2" variant="heading20">
      Connie Data Integration & Mapping Tools
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

      <Heading as="h2" variant="heading20">
      </Heading>

      <Stack orientation="vertical" spacing="space60">
        
    <Card>
      <Heading as="h3" variant="heading30">What's new with Connie</Heading>
      <Paragraph>Check out our newest product releases on the Connie Roadmap.</Paragraph>
      <Button variant="primary">Roadmap</Button>
    </Card>
    <Card>
      <Heading as="h3" variant="heading30">Connie Docs</Heading>
      <Paragraph>Dig into our Admin Docs. You're covered with everything from SDKs in your favorite languages to sample apps for web, iOS, and Android.</Paragraph>
      <Button variant="secondary">Admin Docs</Button>
    </Card>
  </Stack>
</Box>
  );
};

export default Demos