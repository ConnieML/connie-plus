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

const Demos: NextPage = () => {
  return (
    
    <Box as="main" padding="space70">
      <Head>
        <title>Connie Broadcast Demo Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading as="h1" variant="heading10">
        Connie Broadcast Services
      </Heading>
      <Paragraph>
        Hear Ye, Hear Ye. Connie Broadcast messaging services allows you to broadcast a message from one source to multiple recipients across voice channels and SMS/MMS text channels. Best of all, it's done with just one click. No more leaving mulitple voice mails or copy and pasting text messages. Read below for more information, and if you're ready to leverage the power of Connie Broadcast Services, following the Admin Deployment instructions or contact to your Connie Rep to get up and running fast. 
      </Paragraph>
      <Separator orientation="horizontal" verticalSpacing="space120" />
      <Heading as="h2" variant="heading20">
        Connie Demo links
      </Heading>

      <UnorderedList>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="https://connieconnect.com" showExternal>
              Broadcast Messaging
            </Anchor>
          </Heading>
          <Paragraph>
            Start here. Find in-depth information about how to get started using Connie.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading as="h3" variant="heading30">
            <Anchor href="https://nextjs.org/docs" showExternal>
              Check back soon for more ...
            </Anchor>
          </Heading>
          <Paragraph>What to know what features we're working on? Check our road map for all of the exciting and powerful new tools coming your way. Also, get notified whenever we release a new feature into production.</Paragraph>
        </ListItem>
      </UnorderedList>
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