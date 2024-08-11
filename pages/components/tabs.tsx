import React from "react";
import {Heading} from '@twilio-paste/core/heading';
import {Paragraph} from '@twilio-paste/core/paragraph';
import {Tabs, TabList, Tab, TabPanels, TabPanel} from '@twilio-paste/core/tabs';
import {Box} from '@twilio-paste/core/box';
import {Card} from '@twilio-paste/core/card';
import { Stack } from "@twilio-paste/core";


const Component = () => (
  <Box margin="space20" backgroundColor="colorBackground">
    const HorizontalTabsExample = () => {
  const selectedId = useUID();
  return (
    <Tabs selectedId={selectedId} baseId="horizontal-tabs-example">
      <TabList aria-label="Horizontal product tabs">
        <Tab>Programmable communications</Tab>
        <Tab disabled>Super network</Tab>
        <Tab id={selectedId}>Internet of things</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Heading as="h3" variant="heading30">Programmable communications</Heading>
          <Stack orientation="vertical" spacing="space60">
            <Card>
              <Heading as="h5" variant="heading50">Messaging</Heading>
              <Paragraph>Send and receive text messages from your app.</Paragraph>
            </Card>
            <Card>
              <Heading as="h5" variant="heading50">Voice</Heading>
              <Paragraph>Make, receive, and control calls using code.</Paragraph>
            </Card>
          </Stack>
        </TabPanel>
        <TabPanel>
          <Heading as="h3" variant="heading30">Super network</Heading>
          <Stack orientation="vertical" spacing="space60">
            <Card>
              <Heading as="h5" variant="heading50">Phone numbers</Heading>
              <Paragraph>Choose from local or global numbers, Short Codes, Alphanumeric Sender IDs, etc.</Paragraph>
            </Card>
            <Card>
              <Heading as="h5" variant="heading50">Interconnect</Heading>
              <Paragraph>Enable network-level security to protect communications.</Paragraph>
            </Card>
          </Stack>
        </TabPanel>
        <TabPanel>
          <Heading as="h3" variant="heading30">Internet of things</Heading>
          <Card>
            <Heading as="h5" variant="heading50">Internet of things</Heading>
            <Paragraph>Connect IoT devices to global cellular networks.</Paragraph>
          </Card>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default selectedId;