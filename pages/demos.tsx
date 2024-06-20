import { Anchor } from "@twilio-paste/core/anchor";
import { Box } from "@twilio-paste/core/box";
import { Heading } from "@twilio-paste/core/heading";
import { ListItem, UnorderedList } from "@twilio-paste/core/list";
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Separator } from "@twilio-paste/core/separator";
import type { NextPage } from "next";
import Head from "next/head";

const Demos: NextPage = () => {
  return (
    <Box as="main" padding="space70">
      <Head>
        <title>Connie.Plus Feature Demos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading as="h1" variant="heading10">
        Connie Feature Demos
      </Heading>
      <Paragraph>
        Take powerful new Connie features for a test drive and follow the steps to activate them in your Connie environment. Available features are listed in alphabtical order. Just click on any title link to learn more and get started. For a full list of active and upcoming features listed by release date, check out the official Connie Product road map here.
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
    </Box>
  );
};

export default Demos